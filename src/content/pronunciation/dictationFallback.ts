import type { LanguageCode } from '../../types/models'

export interface DictationSentence {
  language: LanguageCode
  text: string
}

/** Frasi di riserva per il dettato quando non ci sono ancora carte salvate per la lingua. */
export const DICTATION_FALLBACK: DictationSentence[] = [
  { language: 'fr', text: 'Le chat dort sur le canapé.' },
  { language: 'fr', text: "J'aime beaucoup ce livre." },
  { language: 'fr', text: 'Nous parlons français ensemble.' },
  { language: 'de', text: 'Der Hund läuft im Garten.' },
  { language: 'de', text: 'Ich lerne jeden Tag Deutsch.' },
  { language: 'de', text: 'Wir sprechen über das Wetter.' },
  { language: 'es', text: 'El gato duerme en la silla.' },
  { language: 'es', text: 'Me gusta mucho este libro.' },
  { language: 'es', text: 'Hablamos español todos los días.' },
]
