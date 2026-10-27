export interface FrequencyEntry {
  word: string
  count: number
  rank: number
}

/** Formato hermitdave/FrequencyWords: una riga per voce, `{parola} {occorrenze}`. */
export function parseFrequencyList(raw: string, limit: number): FrequencyEntry[] {
  const entries: FrequencyEntry[] = []

  for (const line of raw.split('\n')) {
    if (entries.length >= limit) break
    const trimmed = line.trim()
    if (!trimmed) continue

    const spaceIndex = trimmed.lastIndexOf(' ')
    if (spaceIndex === -1) continue

    const word = trimmed.slice(0, spaceIndex)
    const count = Number(trimmed.slice(spaceIndex + 1))
    if (!word || Number.isNaN(count)) continue

    // Scarta token troppo corti per essere un lemma utile (apostrofi, lettere isolate).
    if (word.replace(/'/g, '').length < 2) continue

    entries.push({ word, count, rank: entries.length + 1 })
  }

  return entries
}
