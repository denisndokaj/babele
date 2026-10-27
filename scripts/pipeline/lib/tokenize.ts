/**
 * Tokenizzatore compatibile con lo schema di hermitdave/FrequencyWords, che tronca
 * le elisioni francesi come token a sé stanti (`c'est` → `c'`, `est`).
 */
export function tokenize(text: string): string[] {
  const matches = text.toLowerCase().matchAll(/[\p{L}\p{N}]+'|[\p{L}\p{N}]+/gu)
  return Array.from(matches, (m) => m[0])
}

// Punteggiatura di fine frase (.!?) seguita solo da eventuali spazi/virgolette/parentesi di chiusura.
const INTERNAL_PUNCTUATION_RE = /[.!?](?![\s'"»”)]*$)/

/** Scarta frasi troppo corte/lunghe o composte da più frasi (rumore didattico). */
export function isGoodExampleSentence(text: string, maxLength: number): boolean {
  if (text.length < 8 || text.length > maxLength) return false
  if (INTERNAL_PUNCTUATION_RE.test(text)) return false
  return true
}
