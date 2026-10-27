import { db } from '../db/db'
import type { Card, LanguageCode, ReviewLog } from '../types/models'
import { isDue, type Grade, reviewCard, type ReviewLogInput } from './fsrs'

export interface DueCard {
  card: Card
  log: ReviewLog
}

async function cardsForLanguage(language?: LanguageCode): Promise<Card[]> {
  return language ? db.cards.where('language').equals(language).toArray() : db.cards.toArray()
}

async function logsByCardId(): Promise<Map<number, ReviewLog>> {
  const logs = await db.reviewLogs.toArray()
  return new Map(logs.map((log) => [log.cardId, log]))
}

/** Carte già introdotte e il cui ripasso è scaduto, ordinate per scadenza. */
export async function getDueCards(language?: LanguageCode, now = Date.now()): Promise<DueCard[]> {
  const [cards, logByCardId] = await Promise.all([cardsForLanguage(language), logsByCardId()])

  const due: DueCard[] = []
  for (const card of cards) {
    const log = logByCardId.get(card.id)
    if (log && isDue(log, now)) due.push({ card, log })
  }

  return due.sort((a, b) => a.log.due - b.log.due)
}

/** Carte non ancora introdotte (nessun log di revisione), in ordine di frequenza/creazione. */
export async function getNewCards(language?: LanguageCode, limit = 10): Promise<Card[]> {
  const [cards, logByCardId] = await Promise.all([cardsForLanguage(language), logsByCardId()])

  const unseen = cards.filter((card) => !logByCardId.has(card.id))
  unseen.sort((a, b) => a.createdAt - b.createdAt)
  return unseen.slice(0, limit)
}

export async function countDueCards(language?: LanguageCode, now = Date.now()): Promise<number> {
  const due = await getDueCards(language, now)
  return due.length
}

/** Applica una valutazione FSRS e persiste il nuovo stato di ripasso per la carta. */
export async function submitReview(
  cardId: number,
  grade: Grade,
  now: Date = new Date(),
): Promise<ReviewLogInput> {
  const existing = await db.reviewLogs.where('cardId').equals(cardId).first()
  const next = reviewCard(cardId, existing, grade, now)

  if (existing) {
    await db.reviewLogs.update(existing.id, next)
  } else {
    await db.reviewLogs.add(next)
  }

  return next
}
