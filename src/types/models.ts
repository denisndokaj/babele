export type LanguageCode = 'fr' | 'de' | 'es'

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type Gender = 'm' | 'f' | 'n'

export type ExerciseType =
  | 'recognition'
  | 'production'
  | 'cloze'
  | 'listening'
  | 'gender'
  | 'multiple-choice'
  | 'translation-it-l2'
  | 'reorder'
  | 'dictation'
  | 'conjugation'

export interface LanguageMeta {
  code: LanguageCode
  name: string
  flag: string
  color: string
  accentFontClass: string
  cefrLevel?: CEFRLevel
}

export interface Card {
  id?: number
  language: LanguageCode
  lemma: string
  form: string
  pos: string
  gender?: Gender
  exampleL2: string
  translationIt: string
  ipa?: string
  audioUrl?: string
  tags: string[]
  cognate?: boolean
  falseFriend?: boolean
  source?: string
  exerciseTypes: ExerciseType[]
  createdAt: number
}

export interface ReviewLog {
  id?: number
  cardId: number
  due: number
  stability: number
  difficulty: number
  elapsedDays: number
  scheduledDays: number
  reps: number
  lapses: number
  state: number
  lastReview?: number
}

export interface GrammarUnit {
  id?: number
  language: LanguageCode
  cefrLevel: CEFRLevel
  title: string
  noticingExamples: string[]
  contrastiveExplanation: string
  exerciseIds: number[]
  relatedLanguages: LanguageCode[]
}

export interface Exercise {
  id?: number
  type: ExerciseType
  payload: unknown
  solution: unknown
  explanation?: string
  grammarUnitId?: number
}

export type MediaType = 'video' | 'film' | 'serie' | 'canzone' | 'podcast' | 'testo'
export type MediaStatus = 'da-vedere' | 'in-corso' | 'visto'

export interface MediaItem {
  id?: number
  type: MediaType
  language: LanguageCode
  level?: CEFRLevel
  url?: string
  subtitlesUrl?: string
  coverageEstimate?: number
  status: MediaStatus
}

export interface JournalEntry {
  id?: number
  language: LanguageCode
  text: string
  correctedText?: string
  createdAt: number
}

export interface ConversationMessage {
  role: 'user' | 'tutor'
  text: string
}

export interface Conversation {
  id?: number
  language: LanguageCode
  scenario: string
  messages: ConversationMessage[]
  createdAt: number
}

export interface SessionBlock {
  kind: 'srs' | 'new-cards' | 'grammar' | 'input' | 'output'
  language: LanguageCode
  minutes: number
  completed: boolean
}

export interface Session {
  id?: number
  date: string
  budgetMinutes: number
  blocks: SessionBlock[]
  completedAt?: number
}

export interface DailyStats {
  id?: number
  date: string
  language: LanguageCode
  wordsKnown: number
  wordsLearning: number
  minutesInput: number
  minutesOutput: number
}

export interface Settings {
  id?: number
  key: string
  value: unknown
}
