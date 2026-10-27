import { describe, expect, it } from 'vitest'
import { splitIntoChunks } from './sentences'

describe('splitIntoChunks', () => {
  it('divide la prosa in frasi quando una riga ne contiene più di una', () => {
    expect(splitIntoChunks('Le chat dort. Il mange une pomme.')).toEqual([
      'Le chat dort.',
      'Il mange une pomme.',
    ])
  })

  it('mantiene ogni riga di una poesia come unità a sé, anche senza punteggiatura finale', () => {
    const poem = 'Llave del ser, fué en un principio el verbo\npor el que se hizo todo cuanto muda'
    expect(splitIntoChunks(poem)).toEqual([
      'Llave del ser, fué en un principio el verbo',
      'por el que se hizo todo cuanto muda',
    ])
  })

  it('ignora righe vuote', () => {
    expect(splitIntoChunks('Prima riga.\n\n\nSeconda riga.')).toEqual(['Prima riga.', 'Seconda riga.'])
  })

  it('restituisce un array vuoto per un testo vuoto', () => {
    expect(splitIntoChunks('   ')).toEqual([])
  })
})
