import { useEffect, useRef, useState } from 'react'
import { db } from '../db/db'
import { LANGUAGE_CODES, LANGUAGES } from '../languages'
import { DICTATION_FALLBACK } from '../content/pronunciation/dictationFallback'
import { MINIMAL_PAIRS, type MinimalPair } from '../content/pronunciation/minimalPairs'
import { SOUND_GUIDE } from '../content/pronunciation/soundGuide'
import { diffChars, diffWords, isExactMatch } from '../dictation/diff'
import { isRecognitionSupported, recognizeSpeech } from '../speech/recognition'
import { getVoicesForLanguage, isSpeechSupported, onVoicesChanged, speak } from '../speech/tts'
import {
  getDictationMistakes,
  getVoicePreferences,
  recordDictationMistake,
  setVoicePreference,
} from '../settings/settings'
import { useActivityTimer } from '../stats/activityTimer'
import type { LanguageCode } from '../types/models'

type Tab = 'pronuncia' | 'dettato'

function pickRandom<T>(items: T[]): T | undefined {
  return items.length === 0 ? undefined : items[Math.floor(Math.random() * items.length)]
}

export function Pronuncia() {
  const [tab, setTab] = useState<Tab>('pronuncia')
  const [language, setLanguage] = useState<LanguageCode>('fr')

  return (
    <section>
      <h1 className="text-2xl font-bold">Pronuncia</h1>

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <div className="flex gap-2" role="tablist" aria-label="Sezione">
          {(['pronuncia', 'dettato'] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded px-3 py-2 text-sm font-medium ${tab === t ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              {t === 'pronuncia' ? 'Pronuncia' : 'Dettato'}
            </button>
          ))}
        </div>

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
      </div>

      {tab === 'pronuncia' ? <PronunciaTab language={language} /> : <DettatoTab language={language} />}
    </section>
  )
}

function PronunciaTab({ language }: { language: LanguageCode }) {
  useActivityTimer(language, 'output')
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined)
  const [practiceWord, setPracticeWord] = useState<string | null>(null)
  const [recognizing, setRecognizing] = useState(false)
  const [recognitionResult, setRecognitionResult] = useState<{ transcript: string; match: boolean } | null>(null)

  useEffect(() => {
    function loadVoices() {
      setVoices(getVoicesForLanguage(language))
    }
    loadVoices()
    return onVoicesChanged(loadVoices)
  }, [language])

  useEffect(() => {
    void getVoicePreferences().then((prefs) => setSelectedVoice(prefs[language]))
  }, [language])

  async function handleVoiceChange(voiceURI: string) {
    setSelectedVoice(voiceURI)
    await setVoicePreference(language, voiceURI)
  }

  async function handlePracticeWord(word: string) {
    setPracticeWord(word)
    setRecognitionResult(null)
    speak(word, language, selectedVoice)
  }

  async function handleRecognize() {
    if (!practiceWord) return
    setRecognizing(true)
    setRecognitionResult(null)
    try {
      const transcript = await recognizeSpeech(language)
      if (transcript) {
        const match = transcript.trim().toLowerCase().includes(practiceWord.toLowerCase())
        setRecognitionResult({ transcript, match })
      } else {
        setRecognitionResult({ transcript: '', match: false })
      }
    } finally {
      setRecognizing(false)
    }
  }

  const guideEntries = SOUND_GUIDE.filter((entry) => entry.language === language)

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Guida ai suoni difficili</h2>
      <ul className="mt-3 max-w-prose space-y-3">
        {guideEntries.map((entry) => (
          <li key={entry.id} className="rounded border border-slate-200 p-3 dark:border-slate-700">
            <p className="font-medium">{entry.title}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{entry.explanation}</p>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => void handlePracticeWord(entry.example.word)}
                className="rounded border border-slate-400 px-3 py-1 text-sm hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                🔊 {entry.example.word}
              </button>
              <span className="text-sm text-slate-500">{entry.example.meaningIt}</span>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-lg font-semibold">Voce</h2>
      {!isSpeechSupported() ? (
        <p className="mt-1 text-sm text-slate-500">
          La sintesi vocale non è supportata da questo browser.
        </p>
      ) : voices.length === 0 ? (
        <p className="mt-1 text-sm text-slate-500">
          Nessuna voce per questa lingua trovata su questo dispositivo: verrà usata la voce di
          sistema predefinita.
        </p>
      ) : (
        <div role="radiogroup" aria-label="Voce" className="mt-2 flex flex-wrap gap-2 text-sm">
          {voices.map((voice) => (
            <button
              key={voice.voiceURI}
              type="button"
              role="radio"
              aria-checked={selectedVoice === voice.voiceURI}
              onClick={() => void handleVoiceChange(voice.voiceURI)}
              className={`rounded px-3 py-1 ${selectedVoice === voice.voiceURI ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'border border-slate-400 dark:border-slate-600'}`}
            >
              {voice.name}
            </button>
          ))}
        </div>
      )}

      {practiceWord && (
        <div className="mt-6 max-w-prose rounded border border-slate-200 p-4 dark:border-slate-700">
          <h2 className="font-semibold">Esercizio: ripeti «{practiceWord}»</h2>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => speak(practiceWord, language, selectedVoice)}
              className="rounded border border-slate-400 px-3 py-1 text-sm dark:border-slate-600"
            >
              🔊 Ascolta di nuovo
            </button>
            {isRecognitionSupported() ? (
              <button
                type="button"
                onClick={() => void handleRecognize()}
                disabled={recognizing}
                className="rounded bg-slate-900 px-3 py-1 text-sm text-white disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900"
              >
                {recognizing ? 'Ascolto…' : '🎙️ Registra la tua pronuncia'}
              </button>
            ) : (
              <p className="text-sm text-slate-500">
                Il riconoscimento vocale non è supportato da questo browser.
              </p>
            )}
          </div>
          {recognitionResult && (
            <p role="status" aria-live="polite" className="mt-2 text-sm">
              {recognitionResult.transcript ? (
                <>
                  Ho sentito: «{recognitionResult.transcript}» —{' '}
                  <span className={recognitionResult.match ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}>
                    {recognitionResult.match ? 'bene!' : 'riprova'}
                  </span>
                </>
              ) : (
                'Non ho capito, riprova.'
              )}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function DettatoTab({ language }: { language: LanguageCode }) {
  useActivityTimer(language, 'input')
  const [sentence, setSentence] = useState<string | null>(null)
  const [typed, setTyped] = useState('')
  const [checked, setChecked] = useState(false)
  const [topMistakes, setTopMistakes] = useState<Array<[string, number]>>([])
  const [pair, setPair] = useState<MinimalPair | null>(null)
  const [pairTarget, setPairTarget] = useState<'A' | 'B' | null>(null)
  const [pairFeedback, setPairFeedback] = useState<'correct' | 'wrong' | null>(null)
  const submittingRef = useRef(false)

  async function loadNewSentence() {
    const cards = await db.cards.where('language').equals(language).toArray()
    const source = cards.length > 0 ? pickRandom(cards)?.exampleL2 : pickRandom(DICTATION_FALLBACK.filter((s) => s.language === language))?.text
    setSentence(source ?? null)
    setTyped('')
    setChecked(false)
  }

  useEffect(() => {
    void loadNewSentence()
    void refreshMistakes()
    pickNewPair()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  async function refreshMistakes() {
    const all = await getDictationMistakes()
    const prefix = `${language}:`
    const entries = Object.entries(all)
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, count]) => [key.slice(prefix.length), count] as [string, number])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
    setTopMistakes(entries)
  }

  async function handleCheck() {
    if (submittingRef.current || !sentence) return
    submittingRef.current = true
    try {
      setChecked(true)
      if (!isExactMatch(typed, sentence)) {
        const missed = diffWords(typed, sentence)
        for (const word of missed) {
          await recordDictationMistake(`${language}:${word.toLowerCase()}`)
        }
        await refreshMistakes()
      }
    } finally {
      submittingRef.current = false
    }
  }

  function pickNewPair() {
    const candidates = MINIMAL_PAIRS.filter((p) => p.language === language)
    const next = pickRandom(candidates) ?? null
    setPair(next)
    setPairTarget(Math.random() < 0.5 ? 'A' : 'B')
    setPairFeedback(null)
  }

  function playPair() {
    if (!pair || !pairTarget) return
    const word = pairTarget === 'A' ? pair.wordA.word : pair.wordB.word
    speak(word, language)
  }

  function answerPair(choice: 'A' | 'B') {
    if (!pairTarget || pairFeedback !== null) return
    setPairFeedback(choice === pairTarget ? 'correct' : 'wrong')
  }

  return (
    <div className="mt-6 space-y-8">
      <div className="max-w-prose">
        <h2 className="text-lg font-semibold">Dettato</h2>
        {sentence ? (
          <>
            <button
              type="button"
              onClick={() => speak(sentence, language)}
              className="mt-2 rounded border border-slate-400 px-3 py-1 text-sm dark:border-slate-600"
            >
              🔊 Ascolta la frase
            </button>
            <textarea
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={checked}
              rows={2}
              aria-label="Scrivi quello che hai sentito"
              className="mt-2 w-full rounded border border-slate-400 bg-transparent p-2 dark:border-slate-600"
            />
            {!checked ? (
              <button
                type="button"
                onClick={() => void handleCheck()}
                disabled={!typed.trim()}
                className="mt-2 rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
              >
                Verifica
              </button>
            ) : (
              <>
                <p role="status" aria-live="polite" className="mt-2 font-mono text-lg">
                  {diffChars(typed, sentence).map((d, i) => (
                    <span key={i} className={d.correct ? '' : 'bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-100'}>
                      {d.char}
                    </span>
                  ))}
                </p>
                <p className="mt-1 text-sm text-slate-500">Frase corretta: {sentence}</p>
                <button
                  type="button"
                  onClick={() => void loadNewSentence()}
                  className="mt-2 rounded border border-slate-400 px-3 py-1 text-sm dark:border-slate-600"
                >
                  Prossima frase
                </button>
              </>
            )}
          </>
        ) : (
          <p className="mt-2 text-sm text-slate-500">Nessuna frase disponibile per questa lingua.</p>
        )}

        {topMistakes.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold">Parole che sbagli più spesso</h3>
            <ul className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {topMistakes.map(([word, count]) => (
                <li key={word}>
                  {word} — {count} {count === 1 ? 'volta' : 'volte'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="max-w-prose">
        <h2 className="text-lg font-semibold">Discriminazione: coppie minime</h2>
        {pair ? (
          <div className="mt-2 rounded border border-slate-200 p-4 dark:border-slate-700">
            <p className="text-sm text-slate-500">{pair.contrast}</p>
            <button type="button" onClick={playPair} className="mt-2 rounded border border-slate-400 px-3 py-1 text-sm dark:border-slate-600">
              🔊 Ascolta
            </button>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={() => answerPair('A')}
                disabled={pairFeedback !== null}
                className="rounded border border-slate-400 px-4 py-2 disabled:opacity-60 dark:border-slate-600"
              >
                {pair.wordA.word}
              </button>
              <button
                type="button"
                onClick={() => answerPair('B')}
                disabled={pairFeedback !== null}
                className="rounded border border-slate-400 px-4 py-2 disabled:opacity-60 dark:border-slate-600"
              >
                {pair.wordB.word}
              </button>
            </div>
            {pairFeedback && (
              <div role="status" aria-live="polite" className="mt-2">
                <p className={pairFeedback === 'correct' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                  {pairFeedback === 'correct' ? 'Corretto!' : 'Non corretto.'} Ho pronunciato «
                  {pairTarget === 'A' ? pair.wordA.word : pair.wordB.word}».
                </p>
                <button type="button" onClick={pickNewPair} className="mt-2 rounded border border-slate-400 px-3 py-1 text-sm dark:border-slate-600">
                  Prossima coppia
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-500">Nessuna coppia minima disponibile per questa lingua.</p>
        )}
      </div>
    </div>
  )
}
