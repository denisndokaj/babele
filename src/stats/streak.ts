function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function startOfDay(d: Date): Date {
  const copy = new Date(d)
  copy.setHours(0, 0, 0, 0)
  return copy
}

/**
 * Giorni consecutivi di attività (§6.13 SPEC), senza pressione: un giorno impostato come
 * "di riposo" (0=domenica..6=sabato) non interrompe la serie anche se non c'è attività, e
 * la giornata corrente non la interrompe finché non è ancora finita (basta che ieri sia
 * stato attivo o di riposo).
 */
export function computeStreak(activeDates: Set<string>, restWeekdays: number[], today: Date = new Date()): number {
  let streak = 0
  const cursor = startOfDay(today)
  let isToday = true

  for (let guard = 0; guard < 3650; guard++) {
    const key = dateKey(cursor)
    if (activeDates.has(key)) {
      streak++
    } else if (!restWeekdays.includes(cursor.getDay()) && !isToday) {
      break
    }
    isToday = false
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}
