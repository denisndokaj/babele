import { describe, expect, it } from 'vitest'
import { errorsToCards } from './diary'

describe('errorsToCards', () => {
  it('trasforma ogni errore in una carta di produzione taggata "diario"', () => {
    const cards = errorsToCards('fr', [
      { original: 'Je manges', correction: 'Je mange', explanationIt: 'niente -s alla prima persona' },
    ])
    expect(cards).toHaveLength(1)
    expect(cards[0]).toMatchObject({
      language: 'fr',
      lemma: 'Je mange',
      form: 'Je mange',
      translationIt: 'niente -s alla prima persona',
      tags: ['diario'],
      exerciseTypes: ['production'],
    })
  })

  it('restituisce un array vuoto se non ci sono errori', () => {
    expect(errorsToCards('de', [])).toEqual([])
  })
})
