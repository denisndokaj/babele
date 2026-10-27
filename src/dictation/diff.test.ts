import { describe, expect, it } from 'vitest'
import { diffChars, diffWords, isExactMatch } from './diff'

describe('diffChars', () => {
  it('segnala corretti i caratteri che coincidono in posizione, ignorando maiuscole', () => {
    expect(diffChars('Chat', 'chat')).toEqual([
      { char: 'C', correct: true },
      { char: 'h', correct: true },
      { char: 'a', correct: true },
      { char: 't', correct: true },
    ])
  })

  it('segnala scorretti i caratteri diversi e quelli oltre la lunghezza del target', () => {
    expect(diffChars('chac', 'chat')).toEqual([
      { char: 'c', correct: true },
      { char: 'h', correct: true },
      { char: 'a', correct: true },
      { char: 'c', correct: false },
    ])
    expect(diffChars('chats', 'chat')).toEqual([
      { char: 'c', correct: true },
      { char: 'h', correct: true },
      { char: 'a', correct: true },
      { char: 't', correct: true },
      { char: 's', correct: false },
    ])
  })
})

describe('isExactMatch', () => {
  it('ignora maiuscole e spazi ai margini', () => {
    expect(isExactMatch('  Le chat dort.  ', 'le chat dort.')).toBe(true)
  })

  it('segnala diverso un testo che non coincide', () => {
    expect(isExactMatch('Le chien dort.', 'le chat dort.')).toBe(false)
  })
})

describe('diffWords', () => {
  it('restituisce le parole del testo originale assenti nella risposta', () => {
    expect(diffWords('Le chien dort.', 'Le chat dort.')).toEqual(['chat'])
  })

  it('ignora la punteggiatura nel confronto', () => {
    expect(diffWords('le chat dort', 'Le chat dort.')).toEqual([])
  })

  it('restituisce tutte le parole se la risposta è vuota', () => {
    expect(diffWords('', 'Le chat dort.')).toEqual(['Le', 'chat', 'dort.'])
  })
})
