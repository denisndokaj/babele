import { getDueCards, getNewCards } from '../srs/queue'
import type { LanguageCode } from '../types/models'
import type { SessionSettings } from '../settings/settings'

/** Stime grezze per convertire conteggi di carte in minuti (§6.2 SPEC). */
const REVIEW_SECONDS_PER_CARD = 10
const NEW_CARD_SECONDS = 25

export interface SessionBlockPlan {
  kind: 'srs' | 'new-cards'
  language: LanguageCode
  cardIds: number[]
  estimatedMinutes: number
}

export interface SessionPlan {
  budgetMinutes: number
  blocks: SessionBlockPlan[]
  totalEstimatedMinutes: number
}

/**
 * Genera il piano del giorno dato un budget in minuti: prima le revisioni dovute (per lingua,
 * prioritaria prima; se superano il budget le nuove carte si azzerano, non il contrario),
 * poi le nuove carte con il tempo restante, con metà del tempo residuo alla lingua prioritaria.
 * Le lingue restano in blocchi separati (§3.8 SPEC): non si mescolano le carte tra lingue.
 */
export async function buildSessionPlan(
  activeLanguages: LanguageCode[],
  priorityLanguage: LanguageCode,
  settings: SessionSettings,
  now: number = Date.now(),
): Promise<SessionPlan> {
  const orderedLanguages = [
    priorityLanguage,
    ...activeLanguages.filter((language) => language !== priorityLanguage),
  ]
  const budgetSeconds = settings.dailyBudgetMinutes * 60

  const blocks: SessionBlockPlan[] = []
  let usedSeconds = 0

  for (const language of orderedLanguages) {
    const due = await getDueCards(language, now)
    const remainingSeconds = Math.max(budgetSeconds - usedSeconds, 0)
    const maxCards = Math.floor(remainingSeconds / REVIEW_SECONDS_PER_CARD)
    const take = due.slice(0, maxCards)
    if (take.length === 0) continue

    const seconds = take.length * REVIEW_SECONDS_PER_CARD
    usedSeconds += seconds
    blocks.push({
      kind: 'srs',
      language,
      cardIds: take.map((item) => item.card.id),
      estimatedMinutes: seconds / 60,
    })
  }

  const remainingSeconds = Math.max(budgetSeconds - usedSeconds, 0)
  const otherLanguages = orderedLanguages.filter((language) => language !== priorityLanguage)
  const priorityShareSeconds = otherLanguages.length > 0 ? remainingSeconds * 0.5 : remainingSeconds
  const perOtherLanguageSeconds =
    otherLanguages.length > 0 ? (remainingSeconds - priorityShareSeconds) / otherLanguages.length : 0

  for (const language of orderedLanguages) {
    const allowanceSeconds = language === priorityLanguage ? priorityShareSeconds : perOtherLanguageSeconds
    const limit = Math.max(
      Math.min(Math.floor(allowanceSeconds / NEW_CARD_SECONDS), settings.dailyNewCardLimit),
      0,
    )
    if (limit === 0) continue

    const newCards = await getNewCards(language, limit)
    if (newCards.length === 0) continue

    const seconds = newCards.length * NEW_CARD_SECONDS
    usedSeconds += seconds
    blocks.push({
      kind: 'new-cards',
      language,
      cardIds: newCards.map((card) => card.id),
      estimatedMinutes: seconds / 60,
    })
  }

  return {
    budgetMinutes: settings.dailyBudgetMinutes,
    blocks,
    totalEstimatedMinutes: Math.round((usedSeconds / 60) * 10) / 10,
  }
}
