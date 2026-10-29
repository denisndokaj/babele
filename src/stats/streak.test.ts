import { describe, expect, it } from 'vitest'
import { computeStreak } from './streak'

describe('computeStreak', () => {
  it('conta i giorni consecutivi attivi fino a ieri, a prescindere da oggi', () => {
    // Mercoledì 2026-01-14 (oggi), attivo lun-mar, non ancora oggi
    const today = new Date('2026-01-14T09:00:00Z')
    const active = new Set(['2026-01-12', '2026-01-13'])
    expect(computeStreak(active, [], today)).toBe(2)
  })

  it('include oggi se già attivo', () => {
    const today = new Date('2026-01-14T09:00:00Z')
    const active = new Set(['2026-01-12', '2026-01-13', '2026-01-14'])
    expect(computeStreak(active, [], today)).toBe(3)
  })

  it('si interrompe a un giorno non attivo che non è di riposo', () => {
    const today = new Date('2026-01-14T09:00:00Z')
    const active = new Set(['2026-01-10', '2026-01-13']) // manca l'11 e il 12
    expect(computeStreak(active, [], today)).toBe(1)
  })

  it('un giorno di riposo senza attività non interrompe la serie', () => {
    // 2026-01-11 è domenica (giorno 0): impostata come riposo
    const today = new Date('2026-01-14T09:00:00Z')
    const active = new Set(['2026-01-10', '2026-01-12', '2026-01-13'])
    expect(computeStreak(active, [0], today)).toBe(3)
  })

  it('restituisce 0 se non c\'è nessuna attività recente', () => {
    const today = new Date('2026-01-14T09:00:00Z')
    expect(computeStreak(new Set(), [], today)).toBe(0)
  })
})
