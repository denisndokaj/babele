import type { LanguageCode } from '../types/models'

const BCP47_BY_LANGUAGE: Record<LanguageCode, string> = {
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/** Voci disponibili per una lingua (confronto sul prefisso, es. "fr" per "fr-FR"/"fr-CA"...). */
export function getVoicesForLanguage(language: LanguageCode): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return []
  const prefix = BCP47_BY_LANGUAGE[language].split('-')[0]?.toLowerCase()
  return window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith(prefix ?? ''))
}

/** Le voci si caricano in modo asincrono in alcuni browser: notifica quando sono pronte. */
export function onVoicesChanged(callback: () => void): () => void {
  if (!isSpeechSupported()) return () => {}
  window.speechSynthesis.addEventListener('voiceschanged', callback)
  return () => window.speechSynthesis.removeEventListener('voiceschanged', callback)
}

/** Legge un testo con la Web Speech API (§6.9 SPEC); non fa nulla se il browser non la supporta. */
export function speak(text: string, language: LanguageCode, voiceURI?: string): void {
  if (!isSpeechSupported()) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = BCP47_BY_LANGUAGE[language]

  if (voiceURI) {
    const voice = window.speechSynthesis.getVoices().find((v) => v.voiceURI === voiceURI)
    if (voice) utterance.voice = voice
  }

  window.speechSynthesis.speak(utterance)
}
