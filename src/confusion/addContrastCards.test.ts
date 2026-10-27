import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../db/db'
import { CONFUSION_PAIRS } from '../content/confusion/pairs'
import { addContrastCards } from './addContrastCards'

describe('addContrastCards', () => {
  beforeEach(async () => {
    await db.cards.clear()
  })

  it('aggiunge solo i lati della coppia in una lingua di studio, non il lato italiano', async () => {
    const pair = CONFUSION_PAIRS.find((p) => p.id === 'salir-salire')
    if (!pair) throw new Error('coppia non trovata')

    const added = await addContrastCards(pair)
    expect(added).toBe(1) // solo "salir" (es); "salire" è italiano, non diventa una carta

    const cards = await db.cards.toArray()
    expect(cards).toHaveLength(1)
    expect(cards[0]).toMatchObject({ language: 'es', lemma: 'salir', falseFriend: true })
    expect(cards[0]?.tags).toContain('confusione')
  })

  it('aggiunge entrambi i lati quando sono entrambi lingue di studio', async () => {
    const pair = CONFUSION_PAIRS.find((p) => p.id === 'attendre-atender')
    if (!pair) throw new Error('coppia non trovata')

    const added = await addContrastCards(pair)
    expect(added).toBe(2)
    const cards = await db.cards.toArray()
    expect(cards.map((c) => c.language).sort()).toEqual(['es', 'fr'])
  })

  it('non duplica le carte se richiamata due volte sulla stessa coppia', async () => {
    const pair = CONFUSION_PAIRS.find((p) => p.id === 'salir-salire')
    if (!pair) throw new Error('coppia non trovata')

    await addContrastCards(pair)
    const addedSecondTime = await addContrastCards(pair)
    expect(addedSecondTime).toBe(0)
    expect(await db.cards.count()).toBe(1)
  })
})
