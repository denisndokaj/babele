import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../db/db'
import {
  DEFAULT_SESSION_SETTINGS,
  getConfusionMistakes,
  getDictationMistakes,
  getOnboardingProfile,
  getSessionSettings,
  getVoicePreferences,
  incrementConfusionMistake,
  recordDictationMistake,
  saveOnboardingProfile,
  saveSessionSettings,
  setVoicePreference,
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

  it('conta le interferenze rilevate per coppia, in modo indipendente', async () => {
    expect(await getConfusionMistakes()).toEqual({})
    expect(await incrementConfusionMistake('salir-salire')).toBe(1)
    expect(await incrementConfusionMistake('salir-salire')).toBe(2)
    expect(await incrementConfusionMistake('vaso-vaso')).toBe(1)
    expect(await getConfusionMistakes()).toEqual({ 'salir-salire': 2, 'vaso-vaso': 1 })
  })

  it('salva la voce preferita per lingua in modo indipendente dalle altre', async () => {
    await setVoicePreference('fr', 'voice-fr-1')
    await setVoicePreference('de', 'voice-de-1')
    expect(await getVoicePreferences()).toEqual({ fr: 'voice-fr-1', de: 'voice-de-1' })
  })

  it('conta gli errori di dettato per chiave, in modo indipendente', async () => {
    expect(await getDictationMistakes()).toEqual({})
    expect(await recordDictationMistake('fr:chat')).toBe(1)
    expect(await recordDictationMistake('fr:chat')).toBe(2)
    expect(await getDictationMistakes()).toEqual({ 'fr:chat': 2 })
  })
})
