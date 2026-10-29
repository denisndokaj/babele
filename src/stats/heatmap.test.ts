import { describe, expect, it } from 'vitest'
import { computeActiveDates, lastNDays } from './heatmap'

const DAY = 24 * 60 * 60 * 1000

describe('computeActiveDates', () => {
  it('unisce le date da tutte le fonti, deduplicando', () => {
    const base = new Date('2026-01-10T12:00:00Z').getTime()
    const dates = computeActiveDates({
      reviewTimestamps: [base, base + DAY],
      dailyStatsDates: ['2026-01-10', '2026-01-12'],
      journalTimestamps: [base + 2 * DAY],
      conversationTimestamps: [base + 3 * DAY],
    })
    expect([...dates].sort()).toEqual(['2026-01-10', '2026-01-11', '2026-01-12', '2026-01-13'])
  })

  it('restituisce un insieme vuoto senza alcuna fonte', () => {
    const dates = computeActiveDates({ reviewTimestamps: [], dailyStatsDates: [], journalTimestamps: [], conversationTimestamps: [] })
    expect(dates.size).toBe(0)
  })
})

describe('lastNDays', () => {
  it('restituisce N chiavi in ordine crescente, terminando con oggi', () => {
    const today = new Date('2026-01-15T08:00:00Z')
    const keys = lastNDays(5, today)
    expect(keys).toEqual(['2026-01-11', '2026-01-12', '2026-01-13', '2026-01-14', '2026-01-15'])
  })
})
