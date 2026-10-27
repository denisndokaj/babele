import { db } from '../db/db'
import type { Card, LanguageCode } from '../types/models'

export interface AddWordCardInput {
  language: LanguageCode
  word: string
  sentenceL2: string
  sentenceIt?: string
  source: string
}

export type AddWordCardResult = 'added' | 'duplicate'

/** Aggiunge una carta dal clic su una parola in un sottotitolo, con frase e fonte/timestamp. */
export async function addWordCard(input: AddWordCardInput): Promise<AddWordCardResult> {
  const existing = await db.cards.where('language').equals(input.language).toArray()
  const isDuplicate = existing.some(
    (card) => card.lemma === input.word && card.exampleL2 === input.sentenceL2,
  )
  if (isDuplicate) return 'duplicate'

  const card: Omit<Card, 'id'> = {
    language: input.language,
    lemma: input.word,
    form: input.word,
    exampleL2: input.sentenceL2,
    translationIt: input.sentenceIt ?? '',
    tags: ['ascolta-guarda'],
    source: input.source,
    exerciseTypes: ['recognition'],
    createdAt: Date.now(),
  }
  await db.cards.add(card)
  return 'added'
}
