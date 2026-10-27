import type { VocabularyEntry } from '../types/content'
import type { CEFRLevel } from '../types/models'

export interface QuizItem {
  lemma: string
  exampleL2: string
  correctTranslationIt: string
  options: string[]
  band: number
}

export interface QuizAnswer {
  item: QuizItem
  chosen: string
}

const BAND_COUNT = 4
const ITEMS_PER_BAND = 4
const OPTIONS_PER_ITEM = 4
const PASS_THRESHOLD = 0.75

/** Livello stimabile da un test basato sulle ~2000 parole più frequenti: non si va oltre il B1. */
const LEVEL_BY_PASSED_BANDS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B1']

function shuffle<T>(items: T[], rng: () => number): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[result[i], result[j]] = [result[j] as T, result[i] as T]
  }
  return result
}

function sample<T>(items: T[], count: number, rng: () => number): T[] {
  return shuffle(items, rng).slice(0, Math.min(count, items.length))
}

/** Divide il vocabolario (ordinato per rango di frequenza) in bande di difficoltà crescente. */
export function splitIntoBands(entries: VocabularyEntry[]): VocabularyEntry[][] {
  const sorted = [...entries].sort((a, b) => a.rank - b.rank)
  const bandSize = Math.ceil(sorted.length / BAND_COUNT)
  const bands: VocabularyEntry[][] = []
  for (let i = 0; i < BAND_COUNT; i++) {
    bands.push(sorted.slice(i * bandSize, (i + 1) * bandSize))
  }
  return bands
}

export function bandCount(): number {
  return BAND_COUNT
}

/**
 * Costruisce un breve quiz a scelta multipla per una banda: frase in L2, quattro traduzioni
 * italiane plausibili (una corretta, le altre prese da altre voci del vocabolario).
 */
export function buildQuizForBand(
  band: VocabularyEntry[],
  allEntries: VocabularyEntry[],
  bandIndex: number,
  rng: () => number = Math.random,
): QuizItem[] {
  const picks = sample(band, ITEMS_PER_BAND, rng)

  return picks.map((entry) => {
    const distractorPool = allEntries.filter((other) => other.lemma !== entry.lemma)
    const distractors = sample(distractorPool, OPTIONS_PER_ITEM - 1, rng).map(
      (other) => other.translationIt,
    )
    const options = shuffle([entry.translationIt, ...distractors], rng)

    return {
      lemma: entry.lemma,
      exampleL2: entry.exampleL2,
      correctTranslationIt: entry.translationIt,
      options,
      band: bandIndex,
    }
  })
}

export function scoreAnswers(answers: QuizAnswer[]): number {
  if (answers.length === 0) return 0
  const correct = answers.filter((answer) => answer.chosen === answer.item.correctTranslationIt)
  return correct.length / answers.length
}

export interface LevelResult {
  level: CEFRLevel
  knownLemmas: Set<string>
}

/**
 * Stima il livello dalle bande superate in sequenza (test adattivo: ci si ferma alla prima
 * banda non superata) e segna come "note" le parole delle bande superate, tranne quelle
 * su cui l'utente ha effettivamente sbagliato durante il test.
 */
export function computeLevel(
  bandScores: number[],
  bands: VocabularyEntry[][],
  answers: QuizAnswer[],
): LevelResult {
  let passedBands = 0
  for (const score of bandScores) {
    if (score < PASS_THRESHOLD) break
    passedBands++
  }

  const level =
    passedBands === 0
      ? 'A1'
      : LEVEL_BY_PASSED_BANDS[Math.min(passedBands - 1, LEVEL_BY_PASSED_BANDS.length - 1)]

  const knownLemmas = new Set<string>()
  for (let i = 0; i < passedBands; i++) {
    for (const entry of bands[i] ?? []) knownLemmas.add(entry.lemma)
  }
  for (const answer of answers) {
    if (answer.chosen !== answer.item.correctTranslationIt) {
      knownLemmas.delete(answer.item.lemma)
    }
  }

  return { level: level ?? 'A1', knownLemmas }
}
