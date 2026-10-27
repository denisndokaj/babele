import type { LanguageCode, LanguageMeta } from './types/models'

/**
 * Identità visive fisse per lingua (§3.8 SPEC): colore e font d'accento
 * restano costanti in tutto il sito per aiutare a distinguere le lingue
 * e contenere l'interferenza tra loro.
 */
export const LANGUAGES: Record<LanguageCode, LanguageMeta> = {
  fr: {
    code: 'fr',
    name: 'Francese',
    flag: '🇫🇷',
    color: '#2563eb',
    accentFontClass: 'font-accent-fr',
  },
  de: {
    code: 'de',
    name: 'Tedesco',
    flag: '🇩🇪',
    color: '#b91c1c',
    accentFontClass: 'font-accent-de',
  },
  es: {
    code: 'es',
    name: 'Spagnolo',
    flag: '🇪🇸',
    color: '#d97706',
    accentFontClass: 'font-accent-es',
  },
}

export const LANGUAGE_CODES: LanguageCode[] = ['fr', 'de', 'es']

export function getLanguage(code: LanguageCode): LanguageMeta {
  return LANGUAGES[code]
}
