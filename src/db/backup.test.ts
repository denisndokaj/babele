import { beforeEach, describe, expect, it } from 'vitest'
import { db } from './db'
import { exportBackup, importBackup } from './backup'

describe('backup', () => {
  beforeEach(async () => {
    await db.cards.clear()
    await db.settings.clear()
  })

  it('esporta e reimporta i dati senza perdite', async () => {
    await db.cards.add({
      language: 'fr',
      lemma: 'chat',
      form: 'chat',
      pos: 'noun',
      gender: 'm',
      exampleL2: 'Le chat dort.',
      translationIt: 'Il gatto dorme.',
      tags: [],
      exerciseTypes: ['recognition'],
      createdAt: Date.now(),
    })
    await db.settings.add({ key: 'activeLanguages', value: ['fr', 'de'] })

    const blob = await exportBackup()
    const file = new File([blob], 'backup.json', { type: 'application/json' })

    await db.cards.clear()
    await db.settings.clear()
    expect(await db.cards.count()).toBe(0)

    await importBackup(file)

    const cards = await db.cards.toArray()
    const settings = await db.settings.toArray()
    expect(cards).toHaveLength(1)
    expect(cards[0]?.lemma).toBe('chat')
    expect(settings.find((s) => s.key === 'activeLanguages')?.value).toEqual(['fr', 'de'])
  })

  it('rifiuta un file che non è un backup valido', async () => {
    const file = new File([JSON.stringify({ foo: 'bar' })], 'junk.json', {
      type: 'application/json',
    })
    await expect(importBackup(file)).rejects.toThrow()
  })
})
