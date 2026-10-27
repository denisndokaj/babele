import { describe, expect, it } from 'vitest'
import { COMPARATIVE_TABLES, getUnitsForLanguage } from './index'
import { LANGUAGE_CODES } from '../../languages'
import type { GrammarUnitContent } from '../../types/grammarContent'

const MIN_EXERCISES = 15

function sortedWords(words: string[]): string[] {
  return [...words].map((w) => w.toLowerCase()).sort()
}

describe('unità grammaticali A1', () => {
  for (const language of LANGUAGE_CODES) {
    const units = getUnitsForLanguage(language)

    it(`${language}: esistono le 6 unità A1 previste`, () => {
      expect(units).toHaveLength(6)
      expect(units.every((u) => u.cefrLevel === 'A1')).toBe(true)
    })

    describe.each(units.map((u) => [u.id, u] as const))('%s', (_id, unit: GrammarUnitContent) => {
      it(`ha almeno ${MIN_EXERCISES} esercizi`, () => {
        expect(unit.exercises.length).toBeGreaterThanOrEqual(MIN_EXERCISES)
      })

      it('ha esempi di noticing e frasi chiave', () => {
        expect(unit.noticingExamples.length).toBeGreaterThan(0)
        expect(unit.keySentences.length).toBeGreaterThan(0)
      })

      it('ha id di esercizio unici', () => {
        const ids = unit.exercises.map((ex) => ex.id)
        expect(new Set(ids).size).toBe(ids.length)
      })

      it('ogni scelta multipla ha un indice corretto valido tra opzioni non vuote', () => {
        for (const exercise of unit.exercises) {
          if (exercise.payload.type !== 'multiple-choice') continue
          const { options, correctIndex } = exercise.payload
          expect(options.length).toBeGreaterThanOrEqual(2)
          expect(correctIndex).toBeGreaterThanOrEqual(0)
          expect(correctIndex).toBeLessThan(options.length)
        }
      })

      it('ogni riordino ha una risposta che è una permutazione delle parole date', () => {
        for (const exercise of unit.exercises) {
          if (exercise.payload.type !== 'reorder') continue
          const { words, answer } = exercise.payload
          expect(sortedWords(answer)).toEqual(sortedWords(words))
        }
      })

      it('ogni cloze ha esattamente un segnaposto "___"', () => {
        for (const exercise of unit.exercises) {
          if (exercise.payload.type !== 'cloze') continue
          const matches = exercise.payload.sentence.match(/___/g)
          expect(matches).toHaveLength(1)
        }
      })
    })
  }
})

describe('tabelle comparative', () => {
  it('coprono i nodi principali con righe non vuote per tutte le lingue', () => {
    expect(COMPARATIVE_TABLES.length).toBeGreaterThan(0)
    for (const table of COMPARATIVE_TABLES) {
      expect(table.rows.length).toBeGreaterThan(0)
      for (const row of table.rows) {
        expect(row.it).toBeTruthy()
        expect(row.fr).toBeTruthy()
        expect(row.de).toBeTruthy()
        expect(row.es).toBeTruthy()
      }
    }
  })
})
