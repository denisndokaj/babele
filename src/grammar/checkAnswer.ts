import type { GrammarExercisePayload } from '../types/grammarContent'

export type ExerciseResponse = string | string[]

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, i) => value === b[i])
}

/** Verifica una risposta contro il payload dell'esercizio, qualunque sia il tipo. */
export function checkAnswer(payload: GrammarExercisePayload, response: ExerciseResponse): boolean {
  switch (payload.type) {
    case 'multiple-choice':
      return typeof response === 'string' && payload.options[payload.correctIndex] === response
    case 'cloze':
      return typeof response === 'string' && normalize(response) === normalize(payload.answer)
    case 'translation-it-l2': {
      if (typeof response !== 'string') return false
      const candidates = [payload.answerL2, ...(payload.alternateAnswers ?? [])]
      return candidates.some((candidate) => normalize(candidate) === normalize(response))
    }
    case 'reorder':
      return Array.isArray(response) && arraysEqual(response.map(normalize), payload.answer.map(normalize))
    case 'conjugation':
      return typeof response === 'string' && normalize(response) === normalize(payload.answer)
  }
}
