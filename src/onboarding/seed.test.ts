import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../db/db'
import type { VocabularyEntry } from '../types/content'
import { seedCardsForLanguage } from './seed'

function entry(lemma: string, rank: number): VocabularyEntry {
  return {
    language: 'fr',
    lemma,
    rank,
    exampleL2: `Phrase avec ${lemma}.`,
    translationIt: `Frase con ${lemma}.`,
    source: { tatoebaSentenceIdL2: rank, tatoebaSentenceIdIt: rank },
  }
}

describe('seedCardsForLanguage', () => {
  beforeEach(async () => {
    await db.cards.clear()
  })

  it('crea una carta per ogni voce non segnata come nota', async () => {
    const entries = [entry('chat', 1), entry('chien', 2), entry('maison', 3)]
    const created = await seedCardsForLanguage('fr', entries, new Set(['chat']))

    expect(created).toBe(2)
    const cards = await db.cards.toArray()
    expect(cards.map((c) => c.lemma).sort()).toEqual(['chien', 'maison'])
  })

  it('non duplica le carte se richiamata una seconda volta', async () => {
    const entries = [entry('chat', 1), entry('chien', 2)]
    await seedCardsForLanguage('fr', entries, new Set())
    const createdSecondRun = await seedCardsForLanguage('fr', entries, new Set())

    expect(createdSecondRun).toBe(0)
    expect(await db.cards.count()).toBe(2)
  })
})
