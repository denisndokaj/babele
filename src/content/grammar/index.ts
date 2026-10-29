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
 * contenuto ancora, arriveranno nelle prossime tappe di sviluppo della Grammatica. Al B2 non ci
 * sono argomenti condivisi tra le tre lingue altrettanto netti quanto ad A2/B1: la scaletta è
 * quindi tutta di argomenti specifici per lingua (due a testa). Il C1 resta da definire nel
 * dettaglio quando si arriverà a quella tappa.
 */
export const UPCOMING_UNITS: UpcomingUnit[] = [
  { nodeId: 'preposizioni-luogo', title: 'Preposizioni di luogo', cefrLevel: 'A1' },
  { nodeId: 'interrogativi', title: 'Frasi interrogative', cefrLevel: 'A1' },
  { nodeId: 'numeri-ora', title: 'Numeri e ora', cefrLevel: 'A1' },
  { nodeId: 'pronomi-relativi-francesi', title: 'Les pronoms relatifs (qui, que, dont, où)', cefrLevel: 'B2' },
  { nodeId: 'discorso-indiretto-francese', title: 'Le discours indirect', cefrLevel: 'B2' },
  { nodeId: 'passivo-tedesco', title: 'Das Passiv', cefrLevel: 'B2' },
  { nodeId: 'subordinate-tedesche', title: "L'ordine delle subordinate tedesche (Nebensätze)", cefrLevel: 'B2' },
  { nodeId: 'por-para-spagnolo', title: 'Por vs Para', cefrLevel: 'B2' },
  { nodeId: 'imperfecto-indefinido', title: 'Imperfecto vs Indefinido', cefrLevel: 'B2' },
]
