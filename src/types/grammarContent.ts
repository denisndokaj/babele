import type { CEFRLevel, LanguageCode } from './models'

export type GrammarExerciseType = 'multiple-choice' | 'cloze' | 'translation-it-l2' | 'reorder' | 'conjugation'

export interface MultipleChoicePayload {
  question: string
  options: string[]
  correctIndex: number
}

export interface ClozePayload {
  /** Frase con `___` al posto della parola da inserire. */
  sentence: string
  answer: string
}

export interface TranslationPayload {
  promptIt: string
  answerL2: string
  /** Altre forme accettabili (es. varianti con/senza elisione). */
  alternateAnswers?: string[]
}

export interface ReorderPayload {
  words: string[]
  answer: string[]
}

export interface ConjugationPayload {
  infinitive: string
  pronoun: string
  answer: string
}

export type GrammarExercisePayload =
  | ({ type: 'multiple-choice' } & MultipleChoicePayload)
  | ({ type: 'cloze' } & ClozePayload)
  | ({ type: 'translation-it-l2' } & TranslationPayload)
  | ({ type: 'reorder' } & ReorderPayload)
  | ({ type: 'conjugation' } & ConjugationPayload)

export interface GrammarExercise {
  id: string
  explanation?: string
  payload: GrammarExercisePayload
}

export interface NoticingExample {
  l2: string
  it: string
}

export interface KeySentence {
  l2: string
  it: string
}

export interface GrammarUnitContent {
  id: string
  language: LanguageCode
  cefrLevel: CEFRLevel
  nodeId: string
  title: string
  noticingExamples: NoticingExample[]
  contrastiveExplanation: string
  exercises: GrammarExercise[]
  keySentences: KeySentence[]
}

export interface UpcomingUnit {
  nodeId: string
  title: string
  cefrLevel: CEFRLevel
}
