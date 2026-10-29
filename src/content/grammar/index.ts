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
 * Scaletta di unità A1 mai assegnate a una tappa (non richieste dal traguardo A1→C1, già
 * raggiunto — vedi CLAUDE.md): restano come possibile estensione futura, solo se richiesto
 * esplicitamente.
 */
export const UPCOMING_UNITS: UpcomingUnit[] = [
  { nodeId: 'preposizioni-luogo', title: 'Preposizioni di luogo', cefrLevel: 'A1' },
  { nodeId: 'interrogativi', title: 'Frasi interrogative', cefrLevel: 'A1' },
  { nodeId: 'numeri-ora', title: 'Numeri e ora', cefrLevel: 'A1' },
]
