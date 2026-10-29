import { useEffect, useState } from 'react'
import { addWordCard } from '../media/addWordCard'
import { checkClozeAnswers, generateCloze, type GeneratedCloze } from '../music/cloze'
import { PLAYLIST } from '../content/music/playlist'
import { ClickableChunk } from '../reading/ClickableChunk'
import { splitIntoChunks } from '../reading/sentences'
import { buildWordStatusIndex, type WordStatusIndex } from '../reading/wordStatus'
import { LANGUAGE_CODES, LANGUAGES } from '../languages'
import { useActivityTimer } from '../stats/activityTimer'
import type { LanguageCode } from '../types/models'

export function Musica() {
  const [language, setLanguage] = useState<LanguageCode>('fr')
  useActivityTimer(language, 'input')
  const [lyrics, setLyrics] = useState('')
  const [statusIndex, setStatusIndex] = useState<WordStatusIndex>({ known: new Set(), learning: new Set() })
  const [addedMessage, setAddedMessage] = useState<string | null>(null)
  const [cloze, setCloze] = useState<GeneratedCloze | null>(null)
  const [clozeInputs, setClozeInputs] = useState<string[]>([])
  const [clozeResult, setClozeResult] = useState<boolean[] | null>(null)

  useEffect(() => {
    void buildWordStatusIndex(language).then(setStatusIndex)
  }, [language])

  const chunks = splitIntoChunks(lyrics)

  async function handleWordClick(word: string, chunk: string) {
    const result = await addWordCard({
      language,
      word: word.toLowerCase(),
      sentenceL2: chunk,
      source: 'musica:testo-incollato',
    })
    setAddedMessage(result === 'added' ? `"${word}" aggiunta all'SRS.` : `"${word}" è già nel tuo mazzo.`)
    setStatusIndex((current) => ({ ...current, learning: new Set(current.learning).add(word.toLowerCase()) }))
  }

  function handleGenerateCloze() {
    const generated = generateCloze(lyrics, statusIndex.known)
    setCloze(generated)
    setClozeInputs(generated.answers.map(() => ''))
    setClozeResult(null)
  }

  function handleCheckCloze() {
    if (!cloze) return
    setClozeResult(checkClozeAnswers(clozeInputs, cloze.answers))
  }

  const clozeSegments = cloze?.displayText.split('___') ?? []

  return (
    <section>
      <h1 className="text-2xl font-bold">Musica</h1>
      <p className="mt-1 max-w-prose text-sm text-slate-600 dark:text-slate-300">
        Il testo che incolli resta solo in questo browser: non viene mai salvato nel codice del
        sito né inviato altrove (§6.6 SPEC).
      </p>

      <div className="mt-4 flex items-end gap-4">
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

      <textarea
        value={lyrics}
        onChange={(e) => {
          setLyrics(e.target.value)
          setCloze(null)
          setClozeResult(null)
        }}
        placeholder="Incolla qui il testo di una canzone…"
        rows={8}
        aria-label="Testo della canzone"
        className="mt-3 w-full rounded border border-slate-400 bg-transparent p-2 dark:border-slate-600"
      />

      {chunks.length > 0 && (
        <>
          <div className="mt-4 max-w-prose space-y-2">
            {chunks.map((chunk, i) => (
              <p key={i} className="text-lg leading-relaxed">
                <ClickableChunk text={chunk} statusIndex={statusIndex} onWordClick={(word) => handleWordClick(word, chunk)} />
              </p>
            ))}
          </div>
          {addedMessage && (
            <p role="status" aria-live="polite" className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {addedMessage}
            </p>
          )}

          <button
            type="button"
            onClick={handleGenerateCloze}
            className="mt-4 rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            Genera esercizio cloze
          </button>
        </>
      )}

      {cloze && (
        <div className="mt-4 max-w-prose rounded border border-slate-200 p-4 dark:border-slate-700">
          <h2 className="font-semibold">Completa il testo</h2>
          {cloze.answers.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">
              Non ho ancora parole note in questo testo da nascondere: rivedi qualche carta e
              riprova.
            </p>
          ) : (
            <>
              <p className="mt-3 text-lg leading-relaxed">
                {clozeSegments.map((segment, i) => (
                  <span key={i}>
                    {segment}
                    {i < clozeSegments.length - 1 && (
                      <input
                        type="text"
                        value={clozeInputs[i] ?? ''}
                        onChange={(e) =>
                          setClozeInputs((current) => {
                            const next = [...current]
                            next[i] = e.target.value
                            return next
                          })
                        }
                        disabled={clozeResult !== null}
                        aria-label={`Parola mancante ${i + 1}`}
                        className={`mx-1 w-24 rounded border px-1 dark:bg-transparent ${
                          clozeResult
                            ? clozeResult[i]
                              ? 'border-green-600 bg-green-50 dark:bg-green-950'
                              : 'border-red-600 bg-red-50 dark:bg-red-950'
                            : 'border-slate-400 dark:border-slate-600'
                        }`}
                      />
                    )}
                  </span>
                ))}
              </p>
              {clozeResult === null ? (
                <button
                  type="button"
                  onClick={handleCheckCloze}
                  className="mt-3 rounded bg-slate-900 px-4 py-2 text-white dark:bg-slate-100 dark:text-slate-900"
                >
                  Verifica
                </button>
              ) : (
                <p className="mt-3">
                  {clozeResult.filter(Boolean).length} su {clozeResult.length} corrette.
                </p>
              )}
            </>
          )}
        </div>
      )}

      <h2 className="mt-8 text-lg font-semibold">Playlist iniziale</h2>
      <ul className="mt-3 space-y-2">
        {PLAYLIST.filter((entry) => entry.language === language).map((entry) => (
          <li key={`${entry.title}-${entry.artist}`} className="rounded border border-slate-200 p-3 dark:border-slate-700">
            <span className="font-medium">{entry.title}</span>
            <span className="text-slate-500"> — {entry.artist}</span>
            <span className="ml-2 text-sm text-slate-500">{entry.level}</span>
            <p className="text-sm text-slate-600 dark:text-slate-300">{entry.reason}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
