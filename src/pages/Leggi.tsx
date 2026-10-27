import { useEffect, useState } from 'react'
import { addWordCard } from '../media/addWordCard'
import { PHILOSOPHY_EXCERPTS } from '../content/reading/philosophy'
import { PHILOSOPHY_GLOSSARY } from '../content/reading/glossary'
import { ClickableChunk } from '../reading/ClickableChunk'
import { splitIntoChunks } from '../reading/sentences'
import { externalTranslateUrl } from '../reading/translateLink'
import { buildWordStatusIndex, type WordStatusIndex } from '../reading/wordStatus'
import { tokenizeWords } from '../subtitles/coverage'
import { speak } from '../speech/tts'
import { LANGUAGE_CODES, LANGUAGES } from '../languages'
import type { LanguageCode } from '../types/models'

export function Leggi() {
  const [language, setLanguage] = useState<LanguageCode>('fr')
  const [text, setText] = useState('')
  const [sourceLabel, setSourceLabel] = useState('testo incollato')
  const [statusIndex, setStatusIndex] = useState<WordStatusIndex>({ known: new Set(), learning: new Set() })
  const [addedMessage, setAddedMessage] = useState<string | null>(null)
  const [activeExcerpt, setActiveExcerpt] = useState<string | null>(null)

  useEffect(() => {
    void buildWordStatusIndex(language).then(setStatusIndex)
  }, [language])

  const chunks = splitIntoChunks(text)
  const words = tokenizeWords(text)
  const knownPercentage =
    words.length > 0 ? Math.round((words.filter((w) => statusIndex.known.has(w)).length / words.length) * 100) : null

  async function handleWordClick(word: string, chunk: string) {
    const result = await addWordCard({
      language,
      word: word.toLowerCase(),
      sentenceL2: chunk,
      source: sourceLabel,
    })
    setAddedMessage(result === 'added' ? `"${word}" aggiunta all'SRS.` : `"${word}" è già nel tuo mazzo.`)
    setStatusIndex((current) => ({ ...current, learning: new Set(current.learning).add(word.toLowerCase()) }))
  }

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setText(await file.text())
    setSourceLabel(`file:${file.name}`)
    setActiveExcerpt(null)
  }

  function loadExcerpt(id: string) {
    const excerpt = PHILOSOPHY_EXCERPTS.find((e) => e.id === id)
    if (!excerpt) return
    setLanguage(excerpt.language)
    setText(excerpt.text)
    setSourceLabel(`filosofia:${excerpt.id}`)
    setActiveExcerpt(excerpt.id)
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Leggi</h1>

      <div className="mt-4 flex flex-wrap items-end gap-4">
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
        <label className="flex w-full flex-wrap items-center gap-2 text-sm sm:w-auto">
          Importa .txt
          <input type="file" accept=".txt" onChange={handleFile} aria-label="Importa un file di testo" className="min-w-0 max-w-full" />
        </label>
      </div>

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setSourceLabel('testo incollato')
          setActiveExcerpt(null)
        }}
        placeholder="Incolla qui un testo, oppure scegli un estratto dal percorso filosofico qui sotto…"
        rows={6}
        aria-label="Testo da leggere"
        className="mt-3 w-full rounded border border-slate-400 bg-transparent p-2 dark:border-slate-600"
      />

      {knownPercentage !== null && (
        <p className="mt-2 text-sm">
          Parole note in questo testo: <strong>{knownPercentage}%</strong>
        </p>
      )}

      {chunks.length > 0 && (
        <div className="mt-4 max-w-prose space-y-3">
          {chunks.map((chunk, i) => (
            <div key={i} className="flex flex-wrap items-start gap-2">
              <div className="flex-1 text-lg leading-relaxed">
                <ClickableChunk text={chunk} statusIndex={statusIndex} onWordClick={(word) => handleWordClick(word, chunk)} />
              </div>
              <div className="flex gap-1 text-sm">
                <button type="button" onClick={() => speak(chunk, language)} aria-label="Ascolta questa frase" className="rounded px-1 hover:bg-slate-100 dark:hover:bg-slate-800">
                  🔊
                </button>
                <a
                  href={externalTranslateUrl(chunk)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded px-1 underline hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Traduci
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      {addedMessage && (
        <p role="status" aria-live="polite" className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {addedMessage}
        </p>
      )}

      <h2 className="mt-8 text-lg font-semibold">Percorso filosofico</h2>
      <p className="mt-1 max-w-prose text-sm text-slate-600 dark:text-slate-300">
        Estratti brevi, verificati e di pubblico dominio, verso i testi filosofici in lingua
        originale. "Traduci" apre una traduzione esterna; con la chiave API (Fase 6) arriverà
        un supporto integrato.
      </p>
      <ul className="mt-3 space-y-2">
        {PHILOSOPHY_EXCERPTS.map((excerpt) => (
          <li key={excerpt.id} className={`rounded border p-3 dark:border-slate-700 ${activeExcerpt === excerpt.id ? 'border-slate-900 dark:border-slate-100' : 'border-slate-200'}`}>
            <button type="button" onClick={() => loadExcerpt(excerpt.id)} className="text-left font-medium underline">
              {LANGUAGES[excerpt.language].flag} {excerpt.author} — {excerpt.work} ({excerpt.year})
            </button>
            {excerpt.note && <p className="text-sm text-slate-500">{excerpt.note}</p>}
            <p className="text-xs text-slate-400">
              <a href={excerpt.sourceUrl} target="_blank" rel="noreferrer" className="underline">
                Fonte
              </a>{' '}
              · {excerpt.sourceLicense}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-lg font-semibold">Glossario filosofico trilingue</h2>
      <dl className="mt-3 space-y-3 max-w-prose">
        {PHILOSOPHY_GLOSSARY.map((entry) => (
          <div key={entry.term}>
            <dt className="font-medium italic">
              {entry.term}
              {entry.philosopher && <span className="ml-2 text-sm text-slate-500">({entry.philosopher})</span>}
            </dt>
            <dd className="text-sm text-slate-600 dark:text-slate-300">{entry.definitionIt}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
