import type { LanguageCode } from '../types/models'
import type { VocabularyEntry } from '../types/content'

const cache = new Map<LanguageCode, Promise<VocabularyEntry[]>>()

/** Carica `/data/<lingua>/vocabulary.json`, prodotto da `npm run data:build` (§7 SPEC). */
export function loadVocabulary(language: LanguageCode): Promise<VocabularyEntry[]> {
  const cached = cache.get(language)
  if (cached) return cached

  const promise = fetch(`${import.meta.env.BASE_URL}data/${language}/vocabulary.json`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`Vocabolario non disponibile per "${language}" (HTTP ${response.status})`)
      }
      return response.json() as Promise<VocabularyEntry[]>
    },
  )

  cache.set(language, promise)
  return promise
}
