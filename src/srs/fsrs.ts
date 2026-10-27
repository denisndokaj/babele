import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating,
  type Card as FsrsCard,
  type Grade,
} from 'ts-fsrs'
import type { ReviewLog } from '../types/models'

export { Rating }
export type { Grade }

/** Stato di ripasso prima di essere salvato (senza `id`, assegnato da Dexie all'inserimento). */
export type ReviewLogInput = Omit<ReviewLog, 'id'>

/**
 * `enable_fuzz` sparge leggermente le date di scadenza tra carte simili,
 * evitando che si accumulino tutte nello stesso giorno (§6.2 SPEC).
 */
const scheduler = fsrs(generatorParameters({ enable_fuzz: true }))

function toFsrsCard(log: ReviewLogInput | undefined, now: Date): FsrsCard {
  if (!log) return createEmptyCard(now)
  return {
    due: new Date(log.due),
    stability: log.stability,
    difficulty: log.difficulty,
    elapsed_days: log.elapsedDays,
    scheduled_days: log.scheduledDays,
    learning_steps: log.learningSteps,
    reps: log.reps,
    lapses: log.lapses,
    state: log.state,
    last_review: log.lastReview !== undefined ? new Date(log.lastReview) : undefined,
  }
}

function fromFsrsCard(cardId: number, card: FsrsCard): ReviewLogInput {
  return {
    cardId,
    due: card.due.getTime(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsedDays: card.elapsed_days,
    scheduledDays: card.scheduled_days,
    learningSteps: card.learning_steps,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    lastReview: card.last_review?.getTime(),
  }
}

/** Applica una valutazione (Again/Hard/Good/Easy) e restituisce il nuovo stato da salvare. */
export function reviewCard(
  cardId: number,
  previousLog: ReviewLogInput | undefined,
  grade: Grade,
  now: Date = new Date(),
): ReviewLogInput {
  const current = toFsrsCard(previousLog, now)
  const { card } = scheduler.next(current, now, grade)
  return fromFsrsCard(cardId, card)
}

export function isDue(log: ReviewLogInput, now: number = Date.now()): boolean {
  return log.due <= now
}

export function isNew(log: ReviewLogInput | undefined): boolean {
  return log === undefined
}
