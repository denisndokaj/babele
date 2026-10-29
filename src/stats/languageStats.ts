import { db } from '../db/db'
import { buildWordStatusIndex } from '../reading/wordStatus'
import type { CEFRLevel, LanguageCode } from '../types/models'
import { estimateCefrLevel } from './cefr'
import { getDailyStatsForLanguage, sumMinutes } from './dailyStats'
import { computeActiveDates } from './heatmap'
import { averageRetrievability } from './retention'

export interface LanguageStats {
  language: LanguageCode
  wordsKnown: number
  wordsLearning: number
  retention: number | null
  minutesInput: number
  minutesOutput: number
  estimatedLevel: CEFRLevel
  activeDates: Set<string>
}

/** Raccoglie le statistiche di una lingua (§6.13 SPEC) dai dati già persistiti, senza snapshot giornalieri. */
export async function computeLanguageStats(language: LanguageCode): Promise<LanguageStats> {
  const [wordIndex, cards, dailyStats, journalEntries, conversations, allLogs] = await Promise.all([
    buildWordStatusIndex(language),
    db.cards.where('language').equals(language).toArray(),
    getDailyStatsForLanguage(language),
    db.journalEntries.where('language').equals(language).toArray(),
    db.conversations.where('language').equals(language).toArray(),
    db.reviewLogs.toArray(),
  ])

  const cardIds = new Set(cards.map((c) => c.id))
  const logsForLanguage = allLogs.filter((log) => cardIds.has(log.cardId))
  const { input, output } = sumMinutes(dailyStats)

  const activeDates = computeActiveDates({
    reviewTimestamps: logsForLanguage.map((l) => l.lastReview).filter((v): v is number => v !== undefined),
    dailyStatsDates: dailyStats.filter((s) => s.minutesInput + s.minutesOutput > 0).map((s) => s.date),
    journalTimestamps: journalEntries.map((e) => e.createdAt),
    conversationTimestamps: conversations.map((c) => c.createdAt),
  })

  return {
    language,
    wordsKnown: wordIndex.known.size,
    wordsLearning: wordIndex.learning.size,
    retention: averageRetrievability(logsForLanguage),
    minutesInput: input,
    minutesOutput: output,
    estimatedLevel: estimateCefrLevel(wordIndex.known.size),
    activeDates,
  }
}
