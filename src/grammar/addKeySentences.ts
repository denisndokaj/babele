import { db } from '../db/db'
import type { Card } from '../types/models'
import type { GrammarUnitContent } from '../types/grammarContent'

/** Aggiunge le frasi chiave di un'unità come carte SRS, saltando quelle già presenti. */
export async function addKeySentencesToSrs(unit: GrammarUnitContent): Promise<number> {
  const existing = await db.cards.where('language').equals(unit.language).toArray()
  const existingExamples = new Set(existing.map((card) => card.exampleL2))

  const now = Date.now()
  const toAdd = unit.keySentences.filter((sentence) => !existingExamples.has(sentence.l2))

  const cards: Omit<Card, 'id'>[] = toAdd.map((sentence) => ({
    language: unit.language,
    lemma: sentence.l2,
    form: sentence.l2,
    exampleL2: sentence.l2,
    translationIt: sentence.it,
    tags: ['grammatica', unit.nodeId],
    source: `grammar:${unit.id}`,
    exerciseTypes: ['recognition'],
    createdAt: now,
  }))

  if (cards.length > 0) {
    await db.cards.bulkAdd(cards)
  }

  return cards.length
}
