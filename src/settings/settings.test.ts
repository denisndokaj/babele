import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../db/db'
import {
  DEFAULT_SESSION_SETTINGS,
  getOnboardingProfile,
  getSessionSettings,
  saveOnboardingProfile,
  saveSessionSettings,
} from './settings'

describe('settings', () => {
  beforeEach(async () => {
    await db.settings.clear()
  })

  it('restituisce undefined se il profilo di onboarding non esiste ancora', async () => {
    expect(await getOnboardingProfile()).toBeUndefined()
  })

  it('salva e ricarica il profilo di onboarding', async () => {
    await saveOnboardingProfile({
      completed: true,
      activeLanguages: ['fr', 'de'],
      priorityLanguage: 'fr',
      levels: { fr: 'A2', de: 'A1' },
    })

    expect(await getOnboardingProfile()).toEqual({
      completed: true,
      activeLanguages: ['fr', 'de'],
      priorityLanguage: 'fr',
      levels: { fr: 'A2', de: 'A1' },
    })
  })

  it('un secondo salvataggio aggiorna il profilo invece di duplicarlo', async () => {
    await saveOnboardingProfile({
      completed: false,
      activeLanguages: ['fr'],
      priorityLanguage: 'fr',
      levels: {},
    })
    await saveOnboardingProfile({
      completed: true,
      activeLanguages: ['fr', 'es'],
      priorityLanguage: 'es',
      levels: { fr: 'A1' },
    })

    expect(await db.settings.count()).toBe(1)
    expect((await getOnboardingProfile())?.priorityLanguage).toBe('es')
  })

  it('usa i default finché le impostazioni di sessione non sono salvate', async () => {
    expect(await getSessionSettings()).toEqual(DEFAULT_SESSION_SETTINGS)
    await saveSessionSettings({ dailyBudgetMinutes: 40, dailyNewCardLimit: 15 })
    expect(await getSessionSettings()).toEqual({ dailyBudgetMinutes: 40, dailyNewCardLimit: 15 })
  })
})
