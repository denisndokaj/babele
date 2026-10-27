import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../db/db'
import { Rating } from '../srs/fsrs'
import { submitReview } from '../srs/queue'
import { buildWordStatusIndex, classifyWord } from './wordStatus'

async function addCard(lemma: string) {
  return db.cards.add({
    language: 'fr',
    lemma,
    form: lemma,
    exampleL2: `Phrase avec ${lemma}.`,
    translationIt: `Frase con ${lemma}.`,
    tags: [],
    exerciseTypes: ['recognition'],
    createdAt: Date.now(),
  })
}

describe('buildWordStatusIndex / classifyWord', () => {
  beforeEach(async () => {
    await db.cards.clear()
    await db.reviewLogs.clear()
  })

  it('classifica come "nuova" una parola senza carta', async () => {
    const index = await buildWordStatusIndex('fr')
    expect(classifyWord('inconnu', index)).toBe('nuova')
  })

  it('classifica come "in-apprendimento" una carta senza log o non ancora consolidata', async () => {
    await addCard('chat')
    const index = await buildWordStatusIndex('fr')
    expect(classifyWord('chat', index)).toBe('in-apprendimento')
    expect(classifyWord('CHAT', index)).toBe('in-apprendimento')
  })

  it('classifica come "nota" una carta con ripasso consolidato (stato Review)', async () => {
    const cardId = await addCard('chat')
    // Porta la carta in stato Review con un paio di valutazioni "Good".
    let log = await submitReview(cardId, Rating.Good, new Date('2026-01-01T00:00:00Z'))
    for (let i = 0; i < 3 && log.state !== 2; i++) {
      log = await submitReview(cardId, Rating.Good, new Date(log.due))
    }
    expect(log.state).toBe(2)

    const index = await buildWordStatusIndex('fr')
    expect(classifyWord('chat', index)).toBe('nota')
  })
})
