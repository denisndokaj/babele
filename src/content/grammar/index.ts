import { FR_UNITS } from './fr'
import { DE_UNITS } from './de'
import { ES_UNITS } from './es'
import type { GrammarUnitContent, UpcomingUnit } from '../../types/grammarContent'
import type { LanguageCode } from '../../types/models'

export { COMPARATIVE_TABLES } from './comparativeTables'
export type { ComparativeTable, ComparativeRow } from './comparativeTables'

const ALL_UNITS: GrammarUnitContent[] = [...FR_UNITS, ...DE_UNITS, ...ES_UNITS]

export function getUnitsForLanguage(language: LanguageCode): GrammarUnitContent[] {
  return ALL_UNITS.filter((unit) => unit.language === language)
}

export function getUnit(id: string): GrammarUnitContent | undefined {
  return ALL_UNITS.find((unit) => unit.id === id)
}

/**
 * Scaletta delle unità ancora da scrivere, estensione verso il C1 (non il C2: a quel punto la
 * competenza è più lessicale/pragmatica che grammaticale, vedi CLAUDE.md) — solo titoli, nessun
 * contenuto ancora, arriveranno nella prossima tappa di sviluppo della Grammatica. Come al B2,
 * al C1 non ci sono argomenti condivisi tra le tre lingue altrettanto netti quanto ad A2/B1.
 */
export const UPCOMING_UNITS: UpcomingUnit[] = [
  { nodeId: 'preposizioni-luogo', title: 'Preposizioni di luogo', cefrLevel: 'A1' },
  { nodeId: 'interrogativi', title: 'Frasi interrogative', cefrLevel: 'A1' },
  { nodeId: 'numeri-ora', title: 'Numeri e ora', cefrLevel: 'A1' },
  { nodeId: 'subjonctif-passe-francese', title: 'Le subjonctif passé et la concordance des temps', cefrLevel: 'C1' },
  { nodeId: 'konjunktiv-vergangenheit-tedesco', title: 'Der Konjunktiv II der Vergangenheit (hätte/wäre + Partizip II)', cefrLevel: 'C1' },
  { nodeId: 'nominalisierung-tedesco', title: 'Die Nominalisierung (il registro nominale/accademico)', cefrLevel: 'C1' },
  { nodeId: 'subjuntivo-pasado-spagnolo', title: 'El pluscuamperfecto de subjuntivo e il periodo hipotético', cefrLevel: 'C1' },
]
