import { scheduler, toFsrsCard } from '../srs/fsrs'
import type { ReviewLog } from '../types/models'

/**
 * Ritenzione media stimata oggi (probabilità di ricordo secondo la curva dell'oblio di
 * FSRS) sulle carte già ripassate almeno una volta. `null` se non ce ne sono ancora.
 */
export function averageRetrievability(logs: ReviewLog[], now: Date = new Date()): number | null {
  if (logs.length === 0) return null
  const sum = logs.reduce((acc, log) => acc + scheduler.get_retrievability(toFsrsCard(log, now), now, false), 0)
  return sum / logs.length
}
