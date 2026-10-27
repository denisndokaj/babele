// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { parseLinks, parseSentences } from './tatoeba'

describe('parseSentences', () => {
  it('legge il formato semplice id/lang/testo', () => {
    const raw = '1115\tfra\tTous les garçons.\n1279\tfra\tJe ne supporte pas ce type.\n'
    const sentences = parseSentences(raw)
    expect(sentences.get(1115)).toEqual({
      id: 1115,
      text: 'Tous les garçons.',
      username: undefined,
    })
  })

  it('legge il formato dettagliato con contributore', () => {
    const raw = '4369\tita\tDevo andare a dormire.\tPharamp\t\\N\t2010-11-07 19:25:18\n'
    const sentences = parseSentences(raw)
    expect(sentences.get(4369)).toEqual({
      id: 4369,
      text: 'Devo andare a dormire.',
      username: 'Pharamp',
    })
  })

  it('tratta \\N come contributore assente', () => {
    const raw = '1\tfra\tBonjour.\t\\N\t\\N\t\\N\n'
    expect(parseSentences(raw).get(1)?.username).toBeUndefined()
  })
})

describe('parseLinks', () => {
  it('estrae le coppie di id come tuple numeriche', () => {
    expect(parseLinks('4369\t373908\n4371\t3094\n')).toEqual([
      [4369, 373908],
      [4371, 3094],
    ])
  })

  it('ignora righe vuote', () => {
    expect(parseLinks('4369\t373908\n\n')).toEqual([[4369, 373908]])
  })
})
