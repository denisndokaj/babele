import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../db/db'
import { Rating } from './fsrs'
import { countDueCards, getDueCards, getNewCards, submitReview } from './queue'

async function addCard(lemma: string) {
  return db.cards.add({
    language: 'fr',
    lemma,
    form: lemma,
    exampleL2: `Ceci est "${lemma}".`,
    translationIt: `Questo è "${lemma}".`,
    tags: [],
    exerciseTypes: ['recognition'],
    createdAt: Date.now(),
  })
}

describe('srs queue', () => {
  beforeEach(async () => {
    await db.cards.clear()
    await db.reviewLogs.clear()
  })

  it('tratta le carte senza log come nuove', async () => {
    await addCard('chat')
    await addCard('chien')
    const newCards = await getNewCards('fr')
    expect(newCards).toHaveLength(2)
    expect(await getDueCards('fr')).toHaveLength(0)
  })

  it('dopo una revisione la carta non è più "nuova" e scade in futuro', async () => {
    const cardId = await addCard('chat')
    await submitReview(cardId, Rating.Good, new Date('2026-01-01T10:00:00Z'))

    expect(await getNewCards('fr')).toHaveLength(0)
    expect(await countDueCards('fr', new Date('2026-01-01T10:00:00Z').getTime())).toBe(0)
  })

  it('una carta torna dovuta una volta passata la scadenza', async () => {
    const cardId = await addCard('chat')
    const log = await submitReview(cardId, Rating.Good, new Date('2026-01-01T10:00:00Z'))

    const due = await getDueCards('fr', log.due + 1000)
    expect(due).toHaveLength(1)
    expect(due[0]?.card.lemma).toBe('chat')
  })

  it('rispetta il limite di nuove carte richiesto', async () => {
    await addCard('un')
    await addCard('deux')
    await addCard('trois')
    expect(await getNewCards('fr', 2)).toHaveLength(2)
  })
})
