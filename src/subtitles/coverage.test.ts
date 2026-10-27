import { describe, expect, it } from 'vitest'
import { classifyCoverage, estimateCoverage, tokenizeWords } from './coverage'
import type { SubtitleCue } from './parser'

function cue(text: string): SubtitleCue {
  return { index: 1, startMs: 0, endMs: 1000, text }
}

describe('tokenizeWords', () => {
  it('normalizza in minuscolo e ignora la punteggiatura', () => {
    expect(tokenizeWords('Bonjour, ça va ?')).toEqual(['bonjour', 'ça', 'va'])
  })
})

describe('estimateCoverage', () => {
  it('calcola la percentuale di parole già note', () => {
    const cues = [cue('le chat dort')]
    const known = new Set(['le', 'chat'])
    expect(estimateCoverage(cues, known)).toBeCloseTo(2 / 3)
  })

  it('restituisce 0 se non ci sono parole', () => {
    expect(estimateCoverage([], new Set())).toBe(0)
  })

  it('restituisce 1 se tutte le parole sono note', () => {
    const cues = [cue('le chat')]
    expect(estimateCoverage(cues, new Set(['le', 'chat']))).toBe(1)
  })
})

describe('classifyCoverage', () => {
  it('classifica sotto il 95% come troppo difficile', () => {
    expect(classifyCoverage(0.8)).toBe('troppo-difficile')
  })

  it('classifica tra 95% e 98% come giusto', () => {
    expect(classifyCoverage(0.95)).toBe('giusto')
    expect(classifyCoverage(0.97)).toBe('giusto')
    expect(classifyCoverage(0.98)).toBe('giusto')
  })

  it('classifica sopra il 98% come troppo facile', () => {
    expect(classifyCoverage(0.99)).toBe('troppo-facile')
    expect(classifyCoverage(1)).toBe('troppo-facile')
  })
})
