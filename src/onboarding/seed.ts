import { db } from '../db/db'
import type { Card, LanguageCode } from '../types/models'
import type { VocabularyEntry } from '../types/content'

/**
 * Crea le carte iniziali per una lingua a partire dal vocabolario della pipeline,
 * saltando le parole segnate come già note dal test di livello (§6.1 SPEC) e quelle
 * eventualmente già presenti (sicuro da richiamare più volte, es. se si rifà il test).
 */
export async function seedCardsForLanguage(
  language: LanguageCode,
  entries: VocabularyEntry[],
  knownLemmas: Set<string>,
): Promise<number> {
  const existing = await db.cards.where('language').equals(language).toArray()
  const existingLemmas = new Set(existing.map((card) => card.lemma))

  const now = Date.now()
  const toSeed = entries.filter(
    (entry) => !knownLemmas.has(entry.lemma) && !existingLemmas.has(entry.lemma),
  )

  const cards: Omit<Card, 'id'>[] = toSeed.map((entry) => ({
    language,
    lemma: entry.lemma,
    form: entry.lemma,
    exampleL2: entry.exampleL2,
    translationIt: entry.translationIt,
    tags: [],
    source: `tatoeba:${entry.source.tatoebaSentenceIdL2}`,
    exerciseTypes: ['recognition', 'production', 'cloze'],
    createdAt: now,
  }))

  if (cards.length > 0) {
    await db.cards.bulkAdd(cards)
  }

  return cards.length
}
