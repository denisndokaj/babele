/** Fallback senza chiave API: apre una traduzione esterna in una nuova scheda (§6.7 SPEC). */
export function externalTranslateUrl(text: string, targetLang = 'it'): string {
  return `https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encodeURIComponent(text)}&op=translate`
}
