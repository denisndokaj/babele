import { describe, expect, it } from 'vitest'
import { checkAnswer } from './checkAnswer'
import type { GrammarExercisePayload } from '../types/grammarContent'

describe('checkAnswer', () => {
  it('multiple-choice: confronta con il testo dell\'opzione corretta', () => {
    const payload: GrammarExercisePayload = { type: 'multiple-choice', question: 'q', options: ['a', 'b', 'c'], correctIndex: 1 }
    expect(checkAnswer(payload, 'b')).toBe(true)
    expect(checkAnswer(payload, 'a')).toBe(false)
  })

  it('cloze: ignora maiuscole/minuscole e spazi ai margini', () => {
    const payload: GrammarExercisePayload = { type: 'cloze', sentence: '___ x', answer: 'Mon' }
    expect(checkAnswer(payload, ' mon ')).toBe(true)
    expect(checkAnswer(payload, 'ma')).toBe(false)
  })

  it('translation-it-l2: accetta anche le risposte alternative', () => {
    const payload: GrammarExercisePayload = {
      type: 'translation-it-l2',
      promptIt: 'loro parlano',
      answerL2: 'ils parlent',
      alternateAnswers: ['elles parlent'],
    }
    expect(checkAnswer(payload, 'ils parlent')).toBe(true)
    expect(checkAnswer(payload, 'Elles Parlent')).toBe(true)
    expect(checkAnswer(payload, 'nous parlons')).toBe(false)
  })

  it('reorder: confronta la sequenza esatta, non solo gli elementi', () => {
    const payload: GrammarExercisePayload = { type: 'reorder', words: ['le', 'chat', 'dort'], answer: ['le', 'chat', 'dort'] }
    expect(checkAnswer(payload, ['le', 'chat', 'dort'])).toBe(true)
    expect(checkAnswer(payload, ['chat', 'le', 'dort'])).toBe(false)
  })

  it('conjugation: confronta la forma verbale', () => {
    const payload: GrammarExercisePayload = { type: 'conjugation', infinitive: 'parler', pronoun: 'tu', answer: 'parles' }
    expect(checkAnswer(payload, 'parles')).toBe(true)
    expect(checkAnswer(payload, 'parle')).toBe(false)
  })

  it('rifiuta un tipo di risposta non coerente con il payload (es. array per una cloze)', () => {
    const payload: GrammarExercisePayload = { type: 'cloze', sentence: '___ x', answer: 'mon' }
    expect(checkAnswer(payload, ['mon'])).toBe(false)
  })
})
