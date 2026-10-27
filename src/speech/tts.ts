import type { LanguageCode } from '../types/models'

const BCP47_BY_LANGUAGE: Record<LanguageCode, string> = {
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/** Legge un testo con la Web Speech API (§6.9 SPEC); non fa nulla se il browser non la supporta. */
export function speak(text: string, language: LanguageCode): void {
  if (!isSpeechSupported()) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = BCP47_BY_LANGUAGE[language]
  window.speechSynthesis.speak(utterance)
}
