import { db } from '../db/db'
import type { LanguageCode } from '../types/models'

export async function getKnownLemmas(language: LanguageCode): Promise<Set<string>> {
  const cards = await db.cards.where('language').equals(language).toArray()
  return new Set(cards.map((card) => card.lemma.toLowerCase()))
}
