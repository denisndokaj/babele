import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../db/db'
import { LANGUAGE_CODES, LANGUAGES } from '../languages'
import { correctJournalEntry, LlmError, saveErrorCards } from '../llm/diary'
import type { LlmErrorItem } from '../llm/schema'
import { getApiKey } from '../settings/settings'
import type { Card, JournalEntry, LanguageCode } from '../types/models'

function pickRandom<T>(items: T[], count: number): T[] {
  const copy = [...items]
  const picked: T[] = []
  while (copy.length > 0 && picked.length < count) {
    const index = Math.floor(Math.random() * copy.length)
    picked.push(copy.splice(index, 1)[0] as T)
  }
  return picked
}

export function Scrivi() {
  const [language, setLanguage] = useState<LanguageCode>('fr')
  const [hasApiKey, setHasApiKey] = useState(false)
  const [text, setText] = useState('')
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [modelSentences, setModelSentences] = useState<Card[]>([])
  const [correctionErrors, setCorrectionErrors] = useState<LlmErrorItem[]>([])
  const [correctedText, setCorrectedText] = useState<string | null>(null)
  const [correcting, setCorrecting] = useState(false)
  const [correctionError, setCorrectionError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const savingRef = useRef(false)
  const correctingRef = useRef(false)
  const lastEntryIdRef = useRef<number | null>(null)

  useEffect(() => {
    void getApiKey().then((key) => setHasApiKey(!!key))
  }, [])

  useEffect(() => {
    void loadEntries()
    void loadModelSentences()
    setCorrectedText(null)
    setCorrectionErrors([])
    setCorrectionError(null)
    lastEntryIdRef.current = null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  async function loadEntries() {
    const rows = await db.journalEntries.where('language').equals(language).toArray()
    setEntries(rows.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5))
  }

  async function loadModelSentences() {
    const cards = await db.cards.where('language').equals(language).toArray()
    setModelSentences(pickRandom(cards, 3))
  }

  async function handleSave() {
    if (savingRef.current || !text.trim()) return
    savingRef.current = true
    try {
      const id = await db.journalEntries.add({ language, text: text.trim(), createdAt: Date.now() })
      lastEntryIdRef.current = id
      setMessage('Frase salvata.')
      setCorrectedText(null)
      setCorrectionErrors([])
      setCorrectionError(null)
      await loadEntries()
    } finally {
      savingRef.current = false
    }
  }

  async function handleCorrect() {
    if (correctingRef.current || !text.trim()) return
    correctingRef.current = true
    setCorrecting(true)
    setCorrectionError(null)
    try {
      const apiKey = await getApiKey()
      if (!apiKey) {
        setCorrectionError('Nessuna chiave API salvata: vai nelle Impostazioni per inserirne una.')
        return
      }
      const { correctedText: corrected, errors } = await correctJournalEntry(apiKey, language, text.trim())
      setCorrectedText(corrected)
      setCorrectionErrors(errors)
      if (lastEntryIdRef.current !== null) {
        await db.journalEntries.update(lastEntryIdRef.current, { correctedText: corrected })
      }
    } catch (error) {
      setCorrectionError(error instanceof LlmError ? error.message : "Errore imprevisto durante la correzione.")
    } finally {
      correctingRef.current = false
      setCorrecting(false)
    }
  }

  async function handleAddCards() {
    const added = await saveErrorCards(language, correctionErrors)
    setMessage(added > 0 ? `${added} carte aggiunte al vocabolario.` : 'Nessun errore da aggiungere.')
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Scrivi</h1>
      <p className="mt-2 max-w-prose text-slate-600 dark:text-slate-300">
        Scrivi qualche frase al giorno in lingua: il diario funziona sempre, anche senza chiave
        API. Con una chiave attiva ricevi correzione, spiegazione degli errori in italiano e le
        parole corrette diventano carte da ripassare.
      </p>

      <label className="mt-4 flex items-center gap-2 text-sm">
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

      <div className="mt-4 max-w-prose">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          aria-label="Scrivi qui il tuo diario"
          placeholder={`Scrivi qualche frase in ${LANGUAGES[language].name.toLowerCase()}...`}
          className="w-full rounded border border-slate-400 bg-transparent p-2 dark:border-slate-600"
        />
        <div className="mt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={!text.trim()}
            className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
          >
            Salva
          </button>
          <button
            type="button"
            onClick={() => void handleCorrect()}
            disabled={!text.trim() || correcting}
            className="rounded border border-slate-400 px-4 py-2 disabled:opacity-40 dark:border-slate-600"
          >
            {correcting ? 'Correzione in corso…' : hasApiKey ? "Correggi con l'IA" : "Correggi con l'IA (serve una chiave)"}
          </button>
        </div>
        <p role="status" aria-live="polite" className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {message}
        </p>

        {!hasApiKey && (
          <p className="mt-2 text-sm text-slate-500">
            Senza chiave API, usa l'autovalutazione qui sotto confrontando la tua frase con le
            frasi di esempio delle carte che già conosci. Puoi aggiungere una chiave nelle{' '}
            <Link to="/impostazioni" className="underline">
              Impostazioni
            </Link>
            .
          </p>
        )}

        {correctionError && (
          <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-400">
            {correctionError}
          </p>
        )}

        {correctedText && (
          <div className="mt-4 rounded border border-slate-200 p-4 dark:border-slate-700">
            <h2 className="font-semibold">Versione corretta</h2>
            <p className="mt-1" style={{ color: LANGUAGES[language].color }}>
              {correctedText}
            </p>
            {correctionErrors.length > 0 ? (
              <>
                <h3 className="mt-3 text-sm font-semibold">Errori spiegati</h3>
                <ul className="mt-1 space-y-2 text-sm">
                  {correctionErrors.map((error, i) => (
                    <li key={i}>
                      <span className="line-through text-red-700 dark:text-red-400">{error.original}</span>
                      {' → '}
                      <span className="text-green-700 dark:text-green-400">{error.correction}</span>
                      <p className="text-slate-600 dark:text-slate-300">{error.explanationIt}</p>
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
              </>
            ) : (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Nessun errore trovato: ottimo lavoro!</p>
            )}
          </div>
        )}

        {!correctedText && modelSentences.length > 0 && (
          <div className="mt-4 rounded border border-slate-200 p-4 dark:border-slate-700">
            <h2 className="font-semibold">Autovalutazione: confronta con frasi che già conosci</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {modelSentences.map((card) => (
                <li key={card.id}>
                  <span style={{ color: LANGUAGES[language].color }}>{card.exampleL2}</span>
                  <span className="text-slate-500"> — {card.translationIt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <div className="mt-8 max-w-prose">
          <h2 className="text-lg font-semibold">Ultime frasi</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {entries.map((entry) => (
              <li key={entry.id} className="rounded border border-slate-200 p-2 dark:border-slate-700">
                <p>{entry.text}</p>
                {entry.correctedText && (
                  <p className="mt-1 text-slate-500">Corretto: {entry.correctedText}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
