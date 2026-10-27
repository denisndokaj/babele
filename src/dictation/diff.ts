export interface CharDiff {
  char: string
  correct: boolean
}

/** Confronto posizionale carattere per carattere (§6.8 SPEC), non un allineamento per edit-distance. */
export function diffChars(typed: string, target: string): CharDiff[] {
  const result: CharDiff[] = []
  for (let i = 0; i < typed.length; i++) {
    const typedChar = typed[i] as string
    const targetChar = target[i]
    result.push({ char: typedChar, correct: targetChar !== undefined && typedChar.toLowerCase() === targetChar.toLowerCase() })
  }
  return result
}

export function isExactMatch(typed: string, target: string): boolean {
  return typed.trim().toLowerCase() === target.trim().toLowerCase()
}

function normalizeWord(word: string): string {
  return word.toLowerCase().replace(/^[.,!?;:«»"'()]+|[.,!?;:«»"'()]+$/g, '')
}

/** Parole del testo originale che non compaiono, uguali, nella risposta digitata (per gli errori ricorrenti). */
export function diffWords(typed: string, target: string): string[] {
  const typedWords = new Set(
    typed
      .split(/\s+/)
      .filter(Boolean)
      .map(normalizeWord),
  )
  return target
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !typedWords.has(normalizeWord(word)))
}
