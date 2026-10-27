import { describe, expect, it } from 'vitest'
import { CONFUSION_PAIRS } from '../content/confusion/pairs'
import { evaluateConfusionAnswer } from './match'

const salirPair = CONFUSION_PAIRS.find((p) => p.id === 'salir-salire')
if (!salirPair) throw new Error('coppia di test non trovata')

describe('evaluateConfusionAnswer', () => {
  it('riconosce una risposta corretta', () => {
    expect(evaluateConfusionAnswer('uscire', salirPair, 'A')).toBe('correct')
    expect(evaluateConfusionAnswer('Vuol dire USCIRE di casa', salirPair, 'A')).toBe('correct')
  })

  it('rileva l\'interferenza quando la risposta è il significato dell\'altra lingua', () => {
    expect(evaluateConfusionAnswer('salire, andare su', salirPair, 'A')).toBe('interference')
  })

  it('segnala sbagliato per una risposta che non corrisponde a nessuno dei due', () => {
    expect(evaluateConfusionAnswer('mangiare', salirPair, 'A')).toBe('wrong')
  })

  it('segnala sbagliato per una risposta vuota', () => {
    expect(evaluateConfusionAnswer('   ', salirPair, 'A')).toBe('wrong')
  })

  it('funziona anche chiedendo il lato B della coppia', () => {
    expect(evaluateConfusionAnswer('andare su', salirPair, 'B')).toBe('correct')
    expect(evaluateConfusionAnswer('uscire', salirPair, 'B')).toBe('interference')
  })
})
