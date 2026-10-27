import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../db/db'
import { addWordCard } from './addWordCard'

describe('addWordCard', () => {
  beforeEach(async () => {
    await db.cards.clear()
  })

  it('aggiunge una carta con frase, traduzione e fonte/timestamp', async () => {
    const result = await addWordCard({
      language: 'fr',
      word: 'chat',
      sentenceL2: 'Le chat dort.',
      sentenceIt: 'Il gatto dorme.',
      source: 'episodio.srt@00:01:02',
    })

    expect(result).toBe('added')
    const cards = await db.cards.where('language').equals('fr').toArray()
    expect(cards).toHaveLength(1)
    expect(cards[0]).toMatchObject({
      lemma: 'chat',
      exampleL2: 'Le chat dort.',
      translationIt: 'Il gatto dorme.',
      source: 'episodio.srt@00:01:02',
      tags: ['ascolta-guarda'],
    })
  })

  it('usa una traduzione vuota se non sono disponibili sottotitoli IT', async () => {
    await addWordCard({ language: 'fr', word: 'chat', sentenceL2: 'Le chat dort.', source: 'x' })
    const [card] = await db.cards.toArray()
    expect(card?.translationIt).toBe('')
  })

  it('non duplica la stessa coppia parola/frase', async () => {
    await addWordCard({ language: 'fr', word: 'chat', sentenceL2: 'Le chat dort.', source: 'x' })
    const second = await addWordCard({ language: 'fr', word: 'chat', sentenceL2: 'Le chat dort.', source: 'y' })

    expect(second).toBe('duplicate')
    expect(await db.cards.count()).toBe(1)
  })
})
