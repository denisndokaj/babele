import { describe, expect, it } from 'vitest'
import type { VocabularyEntry } from '../types/content'
import {
  bandCount,
  buildQuizForBand,
  computeLevel,
  scoreAnswers,
  splitIntoBands,
  type QuizAnswer,
} from './levelTest'

function makeEntries(count: number): VocabularyEntry[] {
  return Array.from({ length: count }, (_, i) => ({
    language: 'fr',
    lemma: `mot${i}`,
    rank: i + 1,
    exampleL2: `Phrase ${i}.`,
    translationIt: `Frase ${i}.`,
    source: { tatoebaSentenceIdL2: i, tatoebaSentenceIdIt: i },
  }))
}

describe('splitIntoBands', () => {
  it('divide il vocabolario in bande di difficoltà crescente ordinate per rango', () => {
    const entries = makeEntries(8)
    const bands = splitIntoBands(entries)
    expect(bands).toHaveLength(bandCount())
    expect(bands[0]?.map((e) => e.rank)).toEqual([1, 2])
    expect(bands[3]?.map((e) => e.rank)).toEqual([7, 8])
  })
})

describe('buildQuizForBand', () => {
  it('genera una domanda per voce con la traduzione corretta tra le opzioni', () => {
    const entries = makeEntries(20)
    const bands = splitIntoBands(entries)
    const quiz = buildQuizForBand(bands[0] as VocabularyEntry[], entries, 0, () => 0.42)

    expect(quiz).toHaveLength(4)
    for (const item of quiz) {
      expect(item.options).toContain(item.correctTranslationIt)
      expect(new Set(item.options).size).toBe(item.options.length)
    }
  })
})

describe('scoreAnswers', () => {
  it('calcola la percentuale di risposte corrette', () => {
    const item = {
      lemma: 'chat',
      exampleL2: 'x',
      correctTranslationIt: 'gatto',
      options: ['gatto', 'cane'],
      band: 0,
    }
    const answers: QuizAnswer[] = [
      { item, chosen: 'gatto' },
      { item, chosen: 'cane' },
    ]
    expect(scoreAnswers(answers)).toBe(0.5)
  })

  it('restituisce 0 senza risposte', () => {
    expect(scoreAnswers([])).toBe(0)
  })
})

describe('computeLevel', () => {
  const entries = makeEntries(8)
  const bands = splitIntoBands(entries) // 2 voci per banda

  it('assegna A1 se la prima banda non è superata', () => {
    const result = computeLevel([0.5], bands, [])
    expect(result.level).toBe('A1')
    expect(result.knownLemmas.size).toBe(0)
  })

  it('sale di livello con le bande superate in sequenza', () => {
    const result = computeLevel([1, 1, 0.5], bands, [])
    expect(result.level).toBe('A2')
    expect(result.knownLemmas).toEqual(new Set(['mot0', 'mot1', 'mot2', 'mot3']))
  })

  it('non va oltre il B1 anche se tutte le bande sono superate', () => {
    const result = computeLevel([1, 1, 1, 1], bands, [])
    expect(result.level).toBe('B1')
  })

  it('esclude dalle parole note quelle sbagliate durante il test', () => {
    const band0 = bands[0] as VocabularyEntry[]
    const wrongItem = {
      lemma: band0[0]?.lemma as string,
      exampleL2: 'x',
      correctTranslationIt: band0[0]?.translationIt as string,
      options: [],
      band: 0,
    }
    const result = computeLevel([1], bands, [{ item: wrongItem, chosen: 'risposta sbagliata' }])
    expect(result.knownLemmas.has(band0[0]?.lemma as string)).toBe(false)
    expect(result.knownLemmas.has(band0[1]?.lemma as string)).toBe(true)
  })
})
