const WORD_SPLIT_RE = /([\p{L}\p{N}]+'?[\p{L}\p{N}]*)/gu

export interface GeneratedCloze {
  displayText: string
  answers: string[]
}

function shuffle<T>(items: T[], rng: () => number): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[result[i], result[j]] = [result[j] as T, result[i] as T]
  }
  return result
}

/** Genera un cloze sulle parole del testo già note (§6.6 SPEC: "le parole del mio livello"). */
export function generateCloze(
  text: string,
  knownLemmas: Set<string>,
  maxBlanks = 8,
  rng: () => number = Math.random,
): GeneratedCloze {
  const parts = text.split(WORD_SPLIT_RE)

  const candidateIndices = parts
    .map((part, i) => ({ part, i }))
    .filter(({ part }) => /^[\p{L}\p{N}]/u.test(part) && knownLemmas.has(part.toLowerCase()))
    .map(({ i }) => i)

  const chosen = shuffle(candidateIndices, rng)
    .slice(0, Math.min(maxBlanks, candidateIndices.length))
    .sort((a, b) => a - b)
  const chosenSet = new Set(chosen)

  const displayText = parts.map((part, i) => (chosenSet.has(i) ? '___' : part)).join('')
  const answers = chosen.map((i) => parts[i] as string)

  return { displayText, answers }
}

export function checkClozeAnswers(given: string[], answers: string[]): boolean[] {
  return answers.map((answer, i) => (given[i] ?? '').trim().toLowerCase() === answer.toLowerCase())
}
