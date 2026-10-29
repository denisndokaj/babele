import type { CEFRLevel } from '../types/models'

/**
 * Soglie approssimative di parole consolidate per stimare il livello CEFR attuale.
 * Pensate per il vocabolario disponibile (~2000 lemmi per lingua, §7 SPEC): oltre B2 la
 * stima satura, perché il contenuto del sito non arriva a coprire C1/C2 in modo verificabile.
 * Non è un test di livello standardizzato, solo un'indicazione di massima.
 */
const THRESHOLDS: { level: CEFRLevel; minWords: number }[] = [
  { level: 'B2', minWords: 1200 },
  { level: 'B1', minWords: 600 },
  { level: 'A2', minWords: 250 },
  { level: 'A1', minWords: 0 },
]

export function estimateCefrLevel(knownWords: number): CEFRLevel {
  for (const { level, minWords } of THRESHOLDS) {
    if (knownWords >= minWords) return level
  }
  return 'A1'
}
