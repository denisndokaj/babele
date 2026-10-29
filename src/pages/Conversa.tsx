import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../db/db'
import { LANGUAGE_CODES, LANGUAGES } from '../languages'
import { CONVERSATION_SCENARIOS, type ConversationScenario } from '../content/llm/prompts'
import { LlmError, sendConversationMessage, summarizeConversation } from '../llm/conversation'
import { saveErrorCards } from '../llm/diary'
import type { ConversationSummary } from '../llm/schema'
import { buildWordStatusIndex } from '../reading/wordStatus'
import { getApiKey, getOnboardingProfile } from '../settings/settings'
import { useActivityTimer } from '../stats/activityTimer'
import type { CEFRLevel, ConversationMessage, LanguageCode } from '../types/models'

type Phase = 'setup' | 'chatting' | 'summary'

const OPENING_MESSAGE = 'Ciao! Possiamo iniziare?'

export function Conversa() {
  const [apiKey, setApiKey] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    void getApiKey().then((key) => setApiKey(key ?? null))
  }, [])

  if (apiKey === undefined) return null

  if (!apiKey) {
    return (
      <section>
        <h1 className="text-2xl font-bold">Conversa</h1>
        <p className="mt-2 max-w-prose text-slate-600 dark:text-slate-300">
          Il tutor di conversazione richiede una chiave API Anthropic, perché genera le battute
          in tempo reale. Aggiungine una dalle{' '}
          <Link to="/impostazioni" className="underline">
            Impostazioni
          </Link>{' '}
          per iniziare.
        </p>
      </section>
    )
  }

  return <ConversaWithKey apiKey={apiKey} />
}

function ConversaWithKey({ apiKey }: { apiKey: string }) {
  const [phase, setPhase] = useState<Phase>('setup')
  const [language, setLanguage] = useState<LanguageCode>('fr')
  useActivityTimer(language, 'output')
  const [scenario, setScenario] = useState<ConversationScenario>('bar')
  const [conversationId, setConversationId] = useState<number | null>(null)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<ConversationSummary | null>(null)
  const [addCardsMessage, setAddCardsMessage] = useState<string | null>(null)
  const sendingRef = useRef(false)
  const finishingRef = useRef(false)

  async function handleStart() {
    if (sendingRef.current) return
    sendingRef.current = true
    setSending(true)
    setError(null)
    try {
      const [profile, wordIndex] = await Promise.all([getOnboardingProfile(), buildWordStatusIndex(language)])
      const level: CEFRLevel | undefined = profile?.levels[language]
      const inProgressWords = [...wordIndex.learning].slice(0, 15)
      const opener: ConversationMessage = { role: 'user', text: OPENING_MESSAGE }
      const tutorText = await sendConversationMessage({
        apiKey,
        language,
        scenario,
        level,
        inProgressWords,
        history: [opener],
      })
      const history: ConversationMessage[] = [opener, { role: 'tutor', text: tutorText }]
      const id = await db.conversations.add({ language, scenario, messages: history, createdAt: Date.now() })
      setConversationId(id)
      setMessages(history)
      setPhase('chatting')
    } catch (err) {
      setError(err instanceof LlmError ? err.message : 'Errore imprevisto all\'avvio della conversazione.')
    } finally {
      sendingRef.current = false
      setSending(false)
    }
  }

  async function handleSend() {
    if (sendingRef.current || !input.trim() || conversationId === null) return
    sendingRef.current = true
    setSending(true)
    setError(null)
    try {
      const userMessage: ConversationMessage = { role: 'user', text: input.trim() }
      const historyWithUser = [...messages, userMessage]
      setMessages(historyWithUser)
      setInput('')
      const profile = await getOnboardingProfile()
      const wordIndex = await buildWordStatusIndex(language)
      const tutorText = await sendConversationMessage({
        apiKey,
        language,
        scenario,
        level: profile?.levels[language],
        inProgressWords: [...wordIndex.learning].slice(0, 15),
        history: historyWithUser,
      })
      const finalHistory = [...historyWithUser, { role: 'tutor' as const, text: tutorText }]
      setMessages(finalHistory)
      await db.conversations.update(conversationId, { messages: finalHistory })
    } catch (err) {
      setError(err instanceof LlmError ? err.message : 'Errore imprevisto durante la conversazione.')
    } finally {
      sendingRef.current = false
      setSending(false)
    }
  }

  async function handleFinish() {
    if (finishingRef.current) return
    finishingRef.current = true
    setSending(true)
    setError(null)
    try {
      const result = await summarizeConversation(apiKey, language, messages)
      setSummary(result)
      setPhase('summary')
    } catch (err) {
      setError(err instanceof LlmError ? err.message : 'Errore imprevisto nel riepilogo.')
    } finally {
      finishingRef.current = false
      setSending(false)
    }
  }

  async function handleAddCards() {
    if (!summary) return
    const added = await saveErrorCards(language, summary.errors, 'conversazione')
    setAddCardsMessage(added > 0 ? `${added} carte aggiunte al vocabolario.` : 'Nessun errore da aggiungere.')
  }

  function handleRestart() {
    setPhase('setup')
    setConversationId(null)
    setMessages([])
    setSummary(null)
    setAddCardsMessage(null)
    setError(null)
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Conversa</h1>

      {phase === 'setup' && (
        <div className="mt-4 max-w-prose space-y-4">
          <label className="flex items-center gap-2 text-sm">
            Lingua
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="rounded border border-slate-400 bg-transparent px-2 py-1 dark:border-slate-600"
            >
              {LANGUAGE_CODES.map((code) => (
                <option key={code} value={code}>
                  {LANGUAGES[code].flag} {LANGUAGES[code].name}
                </option>
              ))}
            </select>
          </label>

          <div>
            <h2 className="text-sm font-semibold">Scenario</h2>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {CONVERSATION_SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setScenario(s.id)}
                  className={`rounded border p-3 text-left ${scenario === s.id ? 'border-slate-900 bg-slate-100 dark:border-slate-100 dark:bg-slate-800' : 'border-slate-300 dark:border-slate-700'}`}
                >
                  <p className="font-medium">{s.label}</p>
                  <p className="text-sm text-slate-500">{s.description}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => void handleStart()}
            disabled={sending}
            className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
          >
            {sending ? 'Avvio…' : 'Inizia conversazione'}
          </button>
        </div>
      )}

      {phase === 'chatting' && (
        <div className="mt-4 max-w-prose">
          <ul className="space-y-3">
            {messages.map((m, i) => (
              <li
                key={i}
                className={`rounded p-3 ${m.role === 'user' ? 'ml-auto max-w-[80%] bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'max-w-[80%]'}`}
                style={m.role === 'tutor' ? { borderLeft: `3px solid ${LANGUAGES[language].color}`, paddingLeft: '0.75rem' } : undefined}
              >
                {m.text}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !sending) void handleSend()
              }}
              aria-label="Scrivi la tua risposta"
              disabled={sending}
              className="flex-1 rounded border border-slate-400 bg-transparent p-2 dark:border-slate-600"
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={sending || !input.trim()}
              className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
            >
              Invia
            </button>
          </div>

          <button
            type="button"
            onClick={() => void handleFinish()}
            disabled={sending || messages.length < 2}
            className="mt-3 rounded border border-slate-400 px-3 py-1 text-sm disabled:opacity-40 dark:border-slate-600"
          >
            Termina e riepiloga
          </button>
        </div>
      )}

      {phase === 'summary' && summary && (
        <div className="mt-4 max-w-prose">
          <h2 className="text-lg font-semibold">Riepilogo</h2>
          <p className="mt-1 text-slate-600 dark:text-slate-300">{summary.summaryIt}</p>
          {summary.errors.length > 0 ? (
            <>
              <h3 className="mt-3 text-sm font-semibold">Errori</h3>
              <ul className="mt-1 space-y-2 text-sm">
                {summary.errors.map((e, i) => (
                  <li key={i}>
                    <span className="line-through text-red-700 dark:text-red-400">{e.original}</span>
                    {' → '}
                    <span className="text-green-700 dark:text-green-400">{e.correction}</span>
                    <p className="text-slate-600 dark:text-slate-300">{e.explanationIt}</p>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => void handleAddCards()}
                className="mt-3 rounded border border-slate-400 px-3 py-1 text-sm dark:border-slate-600"
              >
                Aggiungi questi errori come carte
              </button>
              <p role="status" aria-live="polite" className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {addCardsMessage}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Nessun errore: ottimo lavoro!</p>
          )}
          <button
            type="button"
            onClick={handleRestart}
            className="mt-4 rounded bg-slate-900 px-4 py-2 text-white dark:bg-slate-100 dark:text-slate-900"
          >
            Nuova conversazione
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-3 max-w-prose text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </section>
  )
}
