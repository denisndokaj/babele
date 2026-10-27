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
 * Scaletta delle unità fino al B1 (§6.4 SPEC): solo titoli, nessun contenuto ancora —
 * arriveranno nelle prossime fasi di sviluppo della Grammatica.
 */
export const UPCOMING_UNITS: UpcomingUnit[] = [
  { nodeId: 'preposizioni-luogo', title: 'Preposizioni di luogo', cefrLevel: 'A1' },
  { nodeId: 'interrogativi', title: 'Frasi interrogative', cefrLevel: 'A1' },
  { nodeId: 'numeri-ora', title: 'Numeri e ora', cefrLevel: 'A1' },
  { nodeId: 'passato-composto', title: 'Il passato (perfetto composto)', cefrLevel: 'A2' },
  { nodeId: 'futuro', title: 'Il futuro', cefrLevel: 'A2' },
  { nodeId: 'comparativi', title: 'Comparativi e superlativi', cefrLevel: 'A2' },
  { nodeId: 'pronomi-complemento', title: 'Pronomi complemento (lo, gli, le…)', cefrLevel: 'A2' },
  { nodeId: 'partitivo-francese', title: 'Il partitivo francese (du, de la, des)', cefrLevel: 'A2' },
  { nodeId: 'casi-tedeschi', title: 'I casi tedeschi (accusativo, dativo)', cefrLevel: 'B1' },
  { nodeId: 'verbi-separabili', title: 'I verbi separabili tedeschi', cefrLevel: 'B1' },
  { nodeId: 'condizionale', title: 'Il condizionale', cefrLevel: 'B1' },
  { nodeId: 'congiuntivo', title: 'Congiuntivo / Subjonctif / Konjunktiv / Subjuntivo', cefrLevel: 'B1' },
]
