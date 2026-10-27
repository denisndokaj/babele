// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { parseFrequencyList } from './frequency'

describe('parseFrequencyList', () => {
  it('estrae parola, occorrenze e rango in ordine', () => {
    const raw = 'de 8435682\nje 8308698\nest 6942248\n'
    expect(parseFrequencyList(raw, 10)).toEqual([
      { word: 'de', count: 8435682, rank: 1 },
      { word: 'je', count: 8308698, rank: 2 },
      { word: 'est', count: 6942248, rank: 3 },
    ])
  })

  it('rispetta il limite richiesto', () => {
    const raw = 'de 10\nje 9\nest 8\n'
    expect(parseFrequencyList(raw, 2)).toHaveLength(2)
  })

  it('scarta i token troppo corti (es. elisioni isolate)', () => {
    const raw = "c' 100\nchat 50\n"
    expect(parseFrequencyList(raw, 10)).toEqual([{ word: 'chat', count: 50, rank: 1 }])
  })

  it('ignora righe vuote o malformate', () => {
    const raw = 'chat 50\n\nnonsense\n'
    expect(parseFrequencyList(raw, 10)).toEqual([{ word: 'chat', count: 50, rank: 1 }])
  })
})
