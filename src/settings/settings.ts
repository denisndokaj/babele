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
const CONFUSION_MISTAKES_KEY = 'confusionMistakes'
const VOICE_PREFERENCES_KEY = 'voicePreferences'
const DICTATION_MISTAKES_KEY = 'dictationMistakes'
const ANTHROPIC_API_KEY_KEY = 'anthropicApiKey'
const GIST_TOKEN_KEY = 'gistToken'
const GIST_ID_KEY = 'gistId'
const GIST_LAST_SYNC_KEY = 'gistLastSyncAt'
const STREAK_SETTINGS_KEY = 'streakSettings'

export type ConfusionMistakes = Record<string, number>
export type VoicePreferences = Partial<Record<LanguageCode, string>>
export type DictationMistakes = Record<string, number>

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

async function clearSetting(key: string): Promise<void> {
  const row = await db.settings.where('key').equals(key).first()
  if (row?.id !== undefined) {
    await db.settings.delete(row.id)
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

export async function getConfusionMistakes(): Promise<ConfusionMistakes> {
  return (await readSetting<ConfusionMistakes>(CONFUSION_MISTAKES_KEY)) ?? {}
}

/** Incrementa il contatore di interferenze rilevate per una coppia e restituisce il nuovo totale. */
export async function incrementConfusionMistake(pairId: string): Promise<number> {
  const current = await getConfusionMistakes()
  const newCount = (current[pairId] ?? 0) + 1
  await writeSetting(CONFUSION_MISTAKES_KEY, { ...current, [pairId]: newCount })
  return newCount
}

export async function getVoicePreferences(): Promise<VoicePreferences> {
  return (await readSetting<VoicePreferences>(VOICE_PREFERENCES_KEY)) ?? {}
}

export async function setVoicePreference(language: LanguageCode, voiceURI: string): Promise<void> {
  const current = await getVoicePreferences()
  await writeSetting(VOICE_PREFERENCES_KEY, { ...current, [language]: voiceURI })
}

export async function getDictationMistakes(): Promise<DictationMistakes> {
  return (await readSetting<DictationMistakes>(DICTATION_MISTAKES_KEY)) ?? {}
}

export async function recordDictationMistake(key: string): Promise<number> {
  const current = await getDictationMistakes()
  const newCount = (current[key] ?? 0) + 1
  await writeSetting(DICTATION_MISTAKES_KEY, { ...current, [key]: newCount })
  return newCount
}

/** Chiave API Anthropic (facoltativa): resta solo in IndexedDB, mai nel codice o nel repo. */
export async function getApiKey(): Promise<string | undefined> {
  return readSetting<string>(ANTHROPIC_API_KEY_KEY)
}

export async function setApiKey(key: string): Promise<void> {
  await writeSetting(ANTHROPIC_API_KEY_KEY, key)
}

export async function clearApiKey(): Promise<void> {
  await clearSetting(ANTHROPIC_API_KEY_KEY)
}

/** Token GitHub (scope "gist") e ID del Gist privato usato per la sincronizzazione (§6/§9 SPEC F7). */
export async function getGistToken(): Promise<string | undefined> {
  return readSetting<string>(GIST_TOKEN_KEY)
}

export async function setGistToken(token: string): Promise<void> {
  await writeSetting(GIST_TOKEN_KEY, token)
}

export async function clearGistToken(): Promise<void> {
  await clearSetting(GIST_TOKEN_KEY)
}

export async function getGistId(): Promise<string | undefined> {
  return readSetting<string>(GIST_ID_KEY)
}

export async function setGistId(id: string): Promise<void> {
  await writeSetting(GIST_ID_KEY, id)
}

export async function getGistLastSyncAt(): Promise<string | undefined> {
  return readSetting<string>(GIST_LAST_SYNC_KEY)
}

export async function setGistLastSyncAt(isoDate: string): Promise<void> {
  await writeSetting(GIST_LAST_SYNC_KEY, isoDate)
}

export interface StreakSettings {
  /** 0 = domenica ... 6 = sabato (§6.13 SPEC: "giorni di riposo configurabili"). */
  restWeekdays: number[]
}

export const DEFAULT_STREAK_SETTINGS: StreakSettings = { restWeekdays: [] }

export async function getStreakSettings(): Promise<StreakSettings> {
  return (await readSetting<StreakSettings>(STREAK_SETTINGS_KEY)) ?? DEFAULT_STREAK_SETTINGS
}

export async function saveStreakSettings(settings: StreakSettings): Promise<void> {
  await writeSetting(STREAK_SETTINGS_KEY, settings)
}
