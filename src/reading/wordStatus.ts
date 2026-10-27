import { State } from 'ts-fsrs'
import { db } from '../db/db'
import type { LanguageCode } from '../types/models'

export type WordStatus = 'nuova' | 'in-apprendimento' | 'nota'

export interface WordStatusIndex {
  known: Set<string>
  learning: Set<string>
}

/** "Nota" = ripasso consolidato (stato FSRS Review); "in apprendimento" = carta presente ma non ancora consolidata. */
export async function buildWordStatusIndex(language: LanguageCode): Promise<WordStatusIndex> {
  const [cards, logs] = await Promise.all([
    db.cards.where('language').equals(language).toArray(),
    db.reviewLogs.toArray(),
  ])
  const logByCardId = new Map(logs.map((log) => [log.cardId, log]))

  const known = new Set<string>()
  const learning = new Set<string>()
  for (const card of cards) {
    const lemma = card.lemma.toLowerCase()
    const log = logByCardId.get(card.id)
    if (log && log.state === State.Review) known.add(lemma)
    else learning.add(lemma)
  }

  return { known, learning }
}

export function classifyWord(word: string, index: WordStatusIndex): WordStatus {
  const lemma = word.toLowerCase()
  if (index.known.has(lemma)) return 'nota'
  if (index.learning.has(lemma)) return 'in-apprendimento'
  return 'nuova'
}
