import { describe, expect, it } from 'vitest'
import { Rating, reviewCard } from '../srs/fsrs'
import { averageRetrievability } from './retention'

describe('averageRetrievability', () => {
  it('restituisce null senza alcuna carta ripassata', () => {
    expect(averageRetrievability([])).toBeNull()
  })

  it('restituisce un valore alto appena dopo un ripasso riuscito', () => {
    const now = new Date('2026-01-01T12:00:00Z')
    const log = { id: 1, ...reviewCard(1, undefined, Rating.Good, now) }
    const value = averageRetrievability([log], now)
    expect(value).not.toBeNull()
    expect(value as number).toBeGreaterThan(0.9)
  })

  it('diminuisce con il passare dei giorni dall\'ultimo ripasso', () => {
    const reviewedAt = new Date('2026-01-01T12:00:00Z')
    const log = { id: 1, ...reviewCard(1, undefined, Rating.Good, reviewedAt) }
    const soon = averageRetrievability([log], reviewedAt) as number
    const later = averageRetrievability([log], new Date('2026-02-01T12:00:00Z')) as number
    expect(later).toBeLessThan(soon)
  })
})
