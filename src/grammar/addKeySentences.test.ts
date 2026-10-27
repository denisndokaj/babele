import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../db/db'
import { getUnit } from '../content/grammar'
import { addKeySentencesToSrs } from './addKeySentences'

describe('addKeySentencesToSrs', () => {
  beforeEach(async () => {
    await db.cards.clear()
  })

  it('aggiunge tutte le frasi chiave di una unità come carte', async () => {
    const unit = getUnit('fr-articoli')
    if (!unit) throw new Error('unità non trovata')

    const added = await addKeySentencesToSrs(unit)
    expect(added).toBe(unit.keySentences.length)

    const cards = await db.cards.where('language').equals('fr').toArray()
    expect(cards).toHaveLength(unit.keySentences.length)
    expect(cards[0]?.tags).toContain('grammatica')
  })

  it('non duplica le frasi già presenti se richiamata due volte', async () => {
    const unit = getUnit('fr-articoli')
    if (!unit) throw new Error('unità non trovata')

    await addKeySentencesToSrs(unit)
    const addedSecondTime = await addKeySentencesToSrs(unit)

    expect(addedSecondTime).toBe(0)
    expect(await db.cards.count()).toBe(unit.keySentences.length)
  })
})
