import { useEffect, useState } from 'react'
import { COMPARATIVE_TABLES, UPCOMING_UNITS, getUnitsForLanguage } from '../content/grammar'
import { addKeySentencesToSrs } from '../grammar/addKeySentences'
import { ExerciseRunner } from '../grammar/ExerciseRunner'
import { LANGUAGE_CODES, LANGUAGES } from '../languages'
import { getOnboardingProfile } from '../settings/settings'
import type { GrammarUnitContent } from '../types/grammarContent'
import type { LanguageCode } from '../types/models'

type View = 'percorso' | 'tabelle'
type UnitPhase = 'detail' | 'exercises' | { score: number; total: number }

export function Grammatica() {
  const [view, setView] = useState<View>('percorso')
  const [language, setLanguage] = useState<LanguageCode>('fr')
  const [selectedUnit, setSelectedUnit] = useState<GrammarUnitContent | null>(null)
  const [unitPhase, setUnitPhase] = useState<UnitPhase>('detail')
  const [srsMessage, setSrsMessage] = useState<string | null>(null)

  useEffect(() => {
    void getOnboardingProfile().then((profile) => {
      if (profile?.priorityLanguage) setLanguage(profile.priorityLanguage)
    })
  }, [])

  const units = getUnitsForLanguage(language)

  function openUnit(unit: GrammarUnitContent) {
    setSelectedUnit(unit)
    setUnitPhase('detail')
    setSrsMessage(null)
  }

  async function handleAddKeySentences(unit: GrammarUnitContent) {
    const added = await addKeySentencesToSrs(unit)
    setSrsMessage(
      added > 0
        ? `${added} ${added === 1 ? 'frase aggiunta' : 'frasi aggiunte'} all'SRS.`
        : 'Le frasi di questa unità sono già tutte nel tuo mazzo.',
    )
  }

  if (selectedUnit) {
    const langMeta = LANGUAGES[selectedUnit.language]
    return (
      <section className="max-w-prose">
        <button type="button" onClick={() => setSelectedUnit(null)} className="text-sm underline">
          ← Torna al percorso
        </button>

        <h1 className={`mt-4 text-2xl font-bold ${langMeta.accentFontClass}`} style={{ color: langMeta.color }}>
          {langMeta.flag} {selectedUnit.title}
        </h1>

        {unitPhase === 'detail' && (
          <>
            <h2 className="mt-6 text-lg font-semibold">Osserva</h2>
            <ul className="mt-2 space-y-1">
              {selectedUnit.noticingExamples.map((example, i) => (
                <li key={i}>
                  <span className="font-medium">{example.l2}</span>{' '}
                  <span className="text-slate-500">— {example.it}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-6 text-lg font-semibold">Spiegazione contrastiva</h2>
            <p className="mt-2 text-slate-700 dark:text-slate-300">{selectedUnit.contrastiveExplanation}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setUnitPhase('exercises')}
                className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
              >
                Fai gli esercizi ({selectedUnit.exercises.length})
              </button>
              <button
                type="button"
                onClick={() => handleAddKeySentences(selectedUnit)}
                className="rounded border border-slate-400 px-4 py-2 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                Aggiungi le frasi chiave all'SRS
              </button>
            </div>
            {srsMessage && (
              <p role="status" aria-live="polite" className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {srsMessage}
              </p>
            )}
          </>
        )}

        {unitPhase === 'exercises' && (
          <div className="mt-6">
            <ExerciseRunner
              exercises={selectedUnit.exercises}
              onFinish={(score, total) => setUnitPhase({ score, total })}
            />
          </div>
        )}

        {typeof unitPhase === 'object' && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">
              Hai risposto correttamente a {unitPhase.score} esercizi su {unitPhase.total}.
            </h2>
            <button
              type="button"
              onClick={() => setUnitPhase('detail')}
              className="mt-4 rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
            >
              Torna all'unità
            </button>
          </div>
        )}
      </section>
    )
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Grammatica</h1>

      <div className="mt-4 flex gap-2" role="tablist" aria-label="Sezione grammatica">
        <button
          type="button"
          role="tab"
          aria-selected={view === 'percorso'}
          onClick={() => setView('percorso')}
          className={`rounded px-3 py-2 text-sm font-medium ${view === 'percorso' ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
        >
          Percorso per lingua
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'tabelle'}
          onClick={() => setView('tabelle')}
          className={`rounded px-3 py-2 text-sm font-medium ${view === 'tabelle' ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
        >
          Tabelle comparative
        </button>
      </div>

      {view === 'percorso' && (
        <div className="mt-6">
          <div className="flex gap-2" role="tablist" aria-label="Lingua">
            {LANGUAGE_CODES.map((code) => (
              <button
                key={code}
                type="button"
                role="tab"
                aria-selected={language === code}
                onClick={() => setLanguage(code)}
                className={`rounded px-3 py-2 text-sm font-medium ${language === code ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                style={language === code ? { backgroundColor: LANGUAGES[code].color } : undefined}
              >
                {LANGUAGES[code].flag} {LANGUAGES[code].name}
              </button>
            ))}
          </div>

          <ul className="mt-4 space-y-2">
            {units.map((unit) => (
              <li key={unit.id}>
                <button
                  type="button"
                  onClick={() => openUnit(unit)}
                  className="w-full rounded border border-slate-200 px-4 py-3 text-left hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <span className="font-medium">{unit.title}</span>
                  <span className="ml-2 text-sm text-slate-500">{unit.cefrLevel}</span>
                </button>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-lg font-semibold">In arrivo</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
            {UPCOMING_UNITS.map((unit) => (
              <li key={unit.nodeId}>
                {unit.title} <span className="text-slate-400">({unit.cefrLevel})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === 'tabelle' && (
        <div className="mt-6 space-y-8 overflow-x-auto">
          {COMPARATIVE_TABLES.map((table) => (
            <div key={table.nodeId}>
              <h2 className="text-lg font-semibold">{table.title}</h2>
              {table.note && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{table.note}</p>}
              <table className="mt-3 w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-300 text-left dark:border-slate-600">
                    <th className="py-2 pr-4"></th>
                    <th className="py-2 pr-4">Italiano</th>
                    <th className="py-2 pr-4" style={{ color: LANGUAGES.fr.color }}>
                      {LANGUAGES.fr.flag} Francese
                    </th>
                    <th className="py-2 pr-4" style={{ color: LANGUAGES.de.color }}>
                      {LANGUAGES.de.flag} Tedesco
                    </th>
                    <th className="py-2 pr-4" style={{ color: LANGUAGES.es.color }}>
                      {LANGUAGES.es.flag} Spagnolo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row) => (
                    <tr key={row.label} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-2 pr-4 text-slate-500">{row.label}</td>
                      <td className="py-2 pr-4">{row.it}</td>
                      <td className="py-2 pr-4">{row.fr}</td>
                      <td className="py-2 pr-4">{row.de}</td>
                      <td className="py-2 pr-4">{row.es}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
