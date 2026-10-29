import { db } from '../db/db'
import type { DailyStats, LanguageCode } from '../types/models'

export type ActivityKind = 'input' | 'output'

function todayKey(now: number = Date.now()): string {
  return new Date(now).toISOString().slice(0, 10)
}

/**
 * Registra minuti di attività di input (ascolto/lettura) o output (scrittura/produzione)
 * per oggi (§6.13 SPEC: "ore di input, ore di output"). `wordsKnown`/`wordsLearning` restano
 * a 0 qui: sono calcolati dal vivo in Statistiche da carte + revisioni, perché uno snapshot
 * giornaliero sarebbe meno accurato di un conteggio sempre aggiornato, per un'app senza
 * lavori in background che potrebbero scriverlo una volta al giorno.
 */
export async function recordActivityMinutes(language: LanguageCode, kind: ActivityKind, minutes: number): Promise<void> {
  if (minutes <= 0) return
  const date = todayKey()
  const existing = await db.dailyStats
    .where('language')
    .equals(language)
    .and((s) => s.date === date)
    .first()
  if (existing?.id !== undefined) {
    await db.dailyStats.update(existing.id, {
      minutesInput: existing.minutesInput + (kind === 'input' ? minutes : 0),
      minutesOutput: existing.minutesOutput + (kind === 'output' ? minutes : 0),
    })
    return
  }
  await db.dailyStats.add({
    date,
    language,
    wordsKnown: 0,
    wordsLearning: 0,
    minutesInput: kind === 'input' ? minutes : 0,
    minutesOutput: kind === 'output' ? minutes : 0,
  })
}

export async function getDailyStatsForLanguage(language: LanguageCode): Promise<DailyStats[]> {
  return db.dailyStats.where('language').equals(language).toArray()
}

export function sumMinutes(stats: DailyStats[]): { input: number; output: number } {
  return stats.reduce(
    (acc, s) => ({ input: acc.input + s.minutesInput, output: acc.output + s.minutesOutput }),
    { input: 0, output: 0 },
  )
}
