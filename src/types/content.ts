import type { LanguageCode } from './models'

/**
 * Voce prodotta dalla pipeline dati (`/scripts/pipeline`) e salvata in
 * `/public/data/<lingua>/vocabulary.json`. È distinta da `Card` (il modello
 * usato da Dexie): l'onboarding la trasforma in `Card` al momento del seed.
 */
export interface VocabularyEntry {
  language: LanguageCode
  lemma: string
  rank: number
  exampleL2: string
  translationIt: string
  source: {
    tatoebaSentenceIdL2: number
    tatoebaSentenceIdIt: number
    contributorL2?: string
  }
}

export interface CreditSource {
  name: string
  homepage: string
  license: string
  licenseUrl?: string
  note: string
}

export interface CreditsManifest {
  generatedAt: string
  sources: CreditSource[]
}
