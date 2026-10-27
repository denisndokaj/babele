import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../db/db'
import { Rating } from '../srs/fsrs'
import { submitReview } from '../srs/queue'
import { buildSessionPlan } from './planner'
import type { LanguageCode } from '../types/models'

async function addCard(language: LanguageCode, lemma: string) {
  return db.cards.add({
    language,
    lemma,
    form: lemma,
    exampleL2: `Example ${lemma}.`,
    translationIt: `Esempio ${lemma}.`,
    tags: [],
    exerciseTypes: ['recognition'],
    createdAt: Date.now(),
  })
}

const SETTINGS = { dailyBudgetMinutes: 20, dailyNewCardLimit: 10 }

describe('buildSessionPlan', () => {
  beforeEach(async () => {
    await db.cards.clear()
    await db.reviewLogs.clear()
  })

  it('con sole carte nuove, propone un blocco "new-cards" per lingua attiva', async () => {
    await addCard('fr', 'chat')
    await addCard('de', 'Katze')

    const plan = await buildSessionPlan(['fr', 'de'], 'fr', SETTINGS)
    const kinds = plan.blocks.map((b) => `${b.language}:${b.kind}`)
    expect(kinds).toContain('fr:new-cards')
    expect(kinds).toContain('de:new-cards')
  })

  it('dà alla lingua prioritaria metà del tempo per le nuove carte', async () => {
    for (let i = 0; i < 20; i++) await addCard('fr', `mot${i}`)
    for (let i = 0; i < 20; i++) await addCard('de', `wort${i}`)

    const plan = await buildSessionPlan(['fr', 'de'], 'fr', SETTINGS)
    const frMinutes = plan.blocks.find((b) => b.language === 'fr')?.estimatedMinutes ?? 0
    const deMinutes = plan.blocks.find((b) => b.language === 'de')?.estimatedMinutes ?? 0
    expect(frMinutes).toBeCloseTo(deMinutes, 1)
  })

  it('le revisioni dovute hanno priorità: se saturano il budget, azzerano le nuove carte', async () => {
    const dueNow = new Date('2026-01-01T00:00:00Z')
    for (let i = 0; i < 200; i++) {
      const id = await addCard('fr', `dovuta${i}`)
      await submitReview(id, Rating.Again, dueNow)
    }
    await addCard('fr', 'parolaNuova')

    const muchLater = dueNow.getTime() + 24 * 60 * 60 * 1000
    const plan = await buildSessionPlan(
      ['fr'],
      'fr',
      { dailyBudgetMinutes: 5, dailyNewCardLimit: 10 },
      muchLater,
    )
    expect(plan.blocks.some((b) => b.kind === 'new-cards')).toBe(false)
    expect(plan.blocks.find((b) => b.kind === 'srs')?.cardIds.length).toBeGreaterThan(0)
  })

  it('rispetta il limite giornaliero di nuove carte anche con budget ampio', async () => {
    for (let i = 0; i < 50; i++) await addCard('fr', `mot${i}`)

    const plan = await buildSessionPlan(['fr'], 'fr', { dailyBudgetMinutes: 60, dailyNewCardLimit: 7 })
    expect(plan.blocks.find((b) => b.kind === 'new-cards')?.cardIds.length).toBe(7)
  })

  it('non mescola le carte di lingue diverse nello stesso blocco', async () => {
    await addCard('fr', 'chat')
    await addCard('es', 'gato')

    const plan = await buildSessionPlan(['fr', 'es'], 'fr', SETTINGS)
    for (const block of plan.blocks) {
      expect(new Set(block.cardIds).size).toBe(block.cardIds.length)
    }
    expect(plan.blocks.every((b) => b.language === 'fr' || b.language === 'es')).toBe(true)
  })
})
