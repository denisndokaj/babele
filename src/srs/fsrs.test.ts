import { describe, expect, it } from 'vitest'
import { isDue, isNew, Rating, reviewCard } from './fsrs'

describe('reviewCard', () => {
  const now = new Date('2026-01-01T10:00:00Z')

  it('pianifica una carta nuova nel futuro dopo una valutazione "Good"', () => {
    const log = reviewCard(1, undefined, Rating.Good, now)
    expect(log.cardId).toBe(1)
    expect(log.reps).toBe(1)
    expect(log.due).toBeGreaterThan(now.getTime())
  })

  it('valutazioni successive più alte allungano l\'intervallo', () => {
    const afterGood = reviewCard(1, undefined, Rating.Good, now)
    const nextDue = new Date(afterGood.due)

    const afterEasy = reviewCard(1, afterGood, Rating.Easy, nextDue)
    expect(afterEasy.due).toBeGreaterThan(afterGood.due)
    expect(afterEasy.stability).toBeGreaterThan(afterGood.stability)
  })

  it('una valutazione "Again" su una carta consolidata registra un lapse', () => {
    // Porta la carta fuori dalla fase di apprendimento con alcune valutazioni "Good".
    let log = reviewCard(1, undefined, Rating.Good, now)
    for (let i = 0; i < 3 && log.state !== 2; i++) {
      log = reviewCard(1, log, Rating.Good, new Date(log.due))
    }
    expect(log.state).toBe(2) // State.Review

    const afterAgain = reviewCard(1, log, Rating.Again, new Date(log.due))
    expect(afterAgain.lapses).toBe(1)
  })
})

describe('isDue / isNew', () => {
  it('considera nuova una carta senza log di revisione', () => {
    expect(isNew(undefined)).toBe(true)
  })

  it('una carta è dovuta solo quando la scadenza è passata', () => {
    const log = reviewCard(1, undefined, Rating.Good, new Date('2026-01-01T00:00:00Z'))
    expect(isDue(log, log.due - 1000)).toBe(false)
    expect(isDue(log, log.due + 1000)).toBe(true)
  })
})
