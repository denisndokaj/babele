// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { isGoodExampleSentence, tokenize } from './tokenize'

describe('tokenize', () => {
  it('separa le elisioni francesi come token a sé stanti', () => {
    expect(tokenize("Qu'est-ce que c'est ?")).toEqual([
      "qu'",
      'est',
      'ce',
      'que',
      "c'",
      'est',
    ])
  })

  it('normalizza in minuscolo e ignora la punteggiatura', () => {
    expect(tokenize('Was ist DAS?')).toEqual(['was', 'ist', 'das'])
  })
})

describe('isGoodExampleSentence', () => {
  it('accetta una frase singola di lunghezza ragionevole', () => {
    expect(isGoodExampleSentence('Ich muss schlafen gehen.', 90)).toBe(true)
  })

  it('rifiuta frasi troppo corte', () => {
    expect(isGoodExampleSentence('Sì.', 90)).toBe(false)
  })

  it('rifiuta frasi troppo lunghe', () => {
    expect(isGoodExampleSentence('a'.repeat(91), 90)).toBe(false)
  })

  it('rifiuta più frasi concatenate', () => {
    expect(isGoodExampleSentence('Vieni qui. Siediti.', 90)).toBe(false)
  })

  it('accetta punteggiatura di chiusura tra virgolette', () => {
    expect(isGoodExampleSentence('Il dit : « Je dois aller dormir. »', 90)).toBe(true)
  })
})
