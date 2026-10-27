import { db } from '../db/db'
import type { CEFRLevel, LanguageCode } from '../types/models'

export interface OnboardingProfile {
  completed: boolean
  activeLanguages: LanguageCode[]
  priorityLanguage: LanguageCode
  levels: Partial<Record<LanguageCode, CEFRLevel>>
}

export interface SessionSettings {
  dailyBudgetMinutes: number
  dailyNewCardLimit: number
}

const ONBOARDING_KEY = 'onboardingProfile'
const SESSION_SETTINGS_KEY = 'sessionSettings'

export const DEFAULT_SESSION_SETTINGS: SessionSettings = {
  dailyBudgetMinutes: 20,
  dailyNewCardLimit: 10,
}

async function readSetting<T>(key: string): Promise<T | undefined> {
  const row = await db.settings.where('key').equals(key).first()
  return row?.value as T | undefined
}

async function writeSetting<T>(key: string, value: T): Promise<void> {
  const row = await db.settings.where('key').equals(key).first()
  if (row?.id !== undefined) {
    await db.settings.update(row.id, { value })
  } else {
    await db.settings.add({ key, value })
  }
}

export async function getOnboardingProfile(): Promise<OnboardingProfile | undefined> {
  return readSetting<OnboardingProfile>(ONBOARDING_KEY)
}

export async function saveOnboardingProfile(profile: OnboardingProfile): Promise<void> {
  await writeSetting(ONBOARDING_KEY, profile)
}

export async function getSessionSettings(): Promise<SessionSettings> {
  const stored = await readSetting<SessionSettings>(SESSION_SETTINGS_KEY)
  return stored ?? DEFAULT_SESSION_SETTINGS
}

export async function saveSessionSettings(settings: SessionSettings): Promise<void> {
  await writeSetting(SESSION_SETTINGS_KEY, settings)
}
