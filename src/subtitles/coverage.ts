import type { SubtitleCue } from './parser'

export type CoverageLevel = 'troppo-facile' | 'giusto' | 'troppo-difficile'

/** Stesso schema di tokenizzazione della pipeline dati, per confrontarsi con i lemmi delle carte. */
export function tokenizeWords(text: string): string[] {
  const matches = text.toLowerCase().matchAll(/[\p{L}\p{N}]+'|[\p{L}\p{N}]+/gu)
  return Array.from(matches, (m) => m[0])
}

/** Percentuale di parole dei sottotitoli già note (presenti in `knownLemmas`). */
export function estimateCoverage(cues: SubtitleCue[], knownLemmas: Set<string>): number {
  const words = cues.flatMap((cue) => tokenizeWords(cue.text))
  if (words.length === 0) return 0
  const known = words.filter((word) => knownLemmas.has(word)).length
  return known / words.length
}

/** Obiettivo di comprehensible input: ~95–98% di copertura (§3.1 SPEC). */
export function classifyCoverage(coverage: number): CoverageLevel {
  if (coverage < 0.95) return 'troppo-difficile'
  if (coverage <= 0.98) return 'giusto'
  return 'troppo-facile'
}
