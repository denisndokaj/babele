function toDateKey(timestampMs: number): string {
  return new Date(timestampMs).toISOString().slice(0, 10)
}

/**
 * Giornate "attive" per la heatmap (§6.13 SPEC): l'utente ha fatto qualcosa in quella
 * lingua, che sia una revisione SRS, del tempo di input/output registrato, una frase di
 * diario o un turno di conversazione. Ogni parametro è già filtrato per la lingua a monte.
 */
export function computeActiveDates(params: {
  reviewTimestamps: number[]
  dailyStatsDates: string[]
  journalTimestamps: number[]
  conversationTimestamps: number[]
}): Set<string> {
  const dates = new Set<string>()
  for (const ts of params.reviewTimestamps) dates.add(toDateKey(ts))
  for (const date of params.dailyStatsDates) dates.add(date)
  for (const ts of params.journalTimestamps) dates.add(toDateKey(ts))
  for (const ts of params.conversationTimestamps) dates.add(toDateKey(ts))
  return dates
}

/** Ultimi `days` giorni (incluso oggi), dal più vecchio al più recente, come chiavi YYYY-MM-DD. */
export function lastNDays(days: number, today: Date = new Date()): string[] {
  const keys: string[] = []
  const cursor = new Date(today)
  cursor.setHours(0, 0, 0, 0)
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(cursor)
    d.setDate(cursor.getDate() - i)
    keys.push(d.toISOString().slice(0, 10))
  }
  return keys
}
