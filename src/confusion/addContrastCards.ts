import { db } from '../db/db'
import type { Card, LanguageCode } from '../types/models'
import type { ConfusionPair, ConfusionWord } from '../content/confusion/pairs'

function isTargetLanguageWord(word: ConfusionWord): word is ConfusionWord & { language: LanguageCode } {
  return word.language !== 'it'
}

/**
 * Aggiunge come carte di contrasto i lati della coppia che sono in una delle tre lingue
 * di studio (il lato italiano, quando presente, non diventa una carta: serve solo da confronto).
 */
export async function addContrastCards(pair: ConfusionPair): Promise<number> {
  const sides = [pair.wordA, pair.wordB].filter(isTargetLanguageWord)
  let added = 0

  for (const side of sides) {
    const existing = await db.cards.where('language').equals(side.language).toArray()
    const alreadyAdded = existing.some(
      (card) => card.lemma === side.word && card.tags.includes('confusione'),
    )
    if (alreadyAdded) continue

    const card: Omit<Card, 'id'> = {
      language: side.language,
      lemma: side.word,
      form: side.word,
      exampleL2: side.exampleL2 ?? side.word,
      translationIt: side.exampleIt ?? side.meaningIt,
      tags: ['confusione', pair.id],
      falseFriend: true,
      exerciseTypes: ['recognition'],
      createdAt: Date.now(),
    }
    await db.cards.add(card)
    added++
  }

  return added
}
