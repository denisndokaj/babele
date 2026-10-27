import type { LanguageCode } from '../types/models'

const BCP47_BY_LANGUAGE: Record<LanguageCode, string> = {
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
}

interface SpeechRecognitionResultLike {
  [index: number]: { transcript: string }
}

interface SpeechRecognitionEventLike {
  results: { [index: number]: SpeechRecognitionResultLike }
}

interface SpeechRecognitionLike extends EventTarget {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: ((event: unknown) => void) | null
  onend: (() => void) | null
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike
    webkitSpeechRecognition?: new () => SpeechRecognitionLike
  }
}

function getRecognitionConstructor(): (new () => SpeechRecognitionLike) | undefined {
  if (typeof window === 'undefined') return undefined
  return window.SpeechRecognition ?? window.webkitSpeechRecognition
}

export function isRecognitionSupported(): boolean {
  return getRecognitionConstructor() !== undefined
}

/**
 * Ascolta una singola frase e restituisce la trascrizione (§6.9 SPEC). Si risolve con `null`
 * se il riconoscimento fallisce o non produce risultati, mai con un errore non gestito.
 */
export function recognizeSpeech(language: LanguageCode): Promise<string | null> {
  const Ctor = getRecognitionConstructor()
  if (!Ctor) return Promise.resolve(null)

  return new Promise((resolve) => {
    const recognizer = new Ctor()
    recognizer.lang = BCP47_BY_LANGUAGE[language]
    recognizer.interimResults = false
    recognizer.maxAlternatives = 1

    recognizer.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? null
      resolve(transcript)
    }
    recognizer.onerror = () => resolve(null)
    recognizer.onend = () => resolve(null)

    recognizer.start()
  })
}
