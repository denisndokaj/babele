import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../db/db'
import { Rating } from '../srs/fsrs'
import { submitReview } from '../srs/queue'
import { computeLanguageStats } from './languageStats'

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

describe('computeLanguageStats', () => {
  beforeEach(async () => {
    await db.cards.clear()
    await db.reviewLogs.clear()
    await db.dailyStats.clear()
    await db.journalEntries.clear()
    await db.conversations.clear()
  })

  it('conta parole note/in apprendimento e stima il livello di conseguenza', async () => {
    const cardId = await addCard('chat')
    let log = await submitReview(cardId, Rating.Good, new Date('2026-01-01T00:00:00Z'))
    for (let i = 0; i < 3 && log.state !== 2; i++) {
      log = await submitReview(cardId, Rating.Good, new Date(log.due))
    }
    await addCard('chien') // in apprendimento, nessun ripasso

    const stats = await computeLanguageStats('fr')
    expect(stats.wordsKnown).toBe(1)
    expect(stats.wordsLearning).toBe(1)
    expect(stats.estimatedLevel).toBe('A1')
    expect(stats.retention).not.toBeNull()
  })

  it('restituisce zero e null in assenza di qualsiasi dato', async () => {
    const stats = await computeLanguageStats('de')
    expect(stats.wordsKnown).toBe(0)
    expect(stats.wordsLearning).toBe(0)
    expect(stats.retention).toBeNull()
    expect(stats.minutesInput).toBe(0)
    expect(stats.minutesOutput).toBe(0)
    expect(stats.activeDates.size).toBe(0)
  })

  it('include le giornate di diario/conversazione e i minuti registrati nelle date attive', async () => {
    await db.journalEntries.add({ language: 'fr', text: 'Bonjour', createdAt: new Date('2026-02-01T10:00:00Z').getTime() })
    await db.dailyStats.add({ date: '2026-02-03', language: 'fr', wordsKnown: 0, wordsLearning: 0, minutesInput: 5, minutesOutput: 0 })

    const stats = await computeLanguageStats('fr')
    expect(stats.activeDates.has('2026-02-01')).toBe(true)
    expect(stats.activeDates.has('2026-02-03')).toBe(true)
    expect(stats.minutesInput).toBe(5)
  })
})
