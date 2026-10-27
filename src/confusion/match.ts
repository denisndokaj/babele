import type { ConfusionPair } from '../content/confusion/pairs'

export type AnswerEvaluation = 'correct' | 'interference' | 'wrong'

/**
 * Valuta una risposta libera su "cosa significa [parola]": 'interference' quando la risposta
 * corrisponde al significato dell'altra parola della coppia — il segnale di confusione che
 * la specifica chiede di rilevare (§6.12 SPEC).
 */
export function evaluateConfusionAnswer(
  answer: string,
  pair: ConfusionPair,
  askedSide: 'A' | 'B',
): AnswerEvaluation {
  const target = askedSide === 'A' ? pair.wordA : pair.wordB
  const other = askedSide === 'A' ? pair.wordB : pair.wordA
  const normalized = answer.trim().toLowerCase()
  if (!normalized) return 'wrong'

  if (target.keywords.some((keyword) => normalized.includes(keyword))) return 'correct'
  if (other.keywords.some((keyword) => normalized.includes(keyword))) return 'interference'
  return 'wrong'
}
