import { db } from '../db/db'
import { buildJournalSystemPrompt, buildJournalUserMessage } from '../content/llm/prompts'
import type { Card, LanguageCode } from '../types/models'
import { callClaude, LlmError } from './client'
import { parseJournalCorrection, type LlmErrorItem } from './schema'

export { LlmError }

/** Corregge una frase/testo del diario tramite l'API Anthropic (§6.10 SPEC). */
export async function correctJournalEntry(
  apiKey: string,
  language: LanguageCode,
  text: string,
): Promise<{ correctedText: string; errors: LlmErrorItem[] }> {
  const raw = await callClaude(apiKey, {
    system: buildJournalSystemPrompt(language),
    messages: [{ role: 'user', content: buildJournalUserMessage(text) }],
  })
  const parsed = parseJournalCorrection(raw)
  if (!parsed) {
    throw new LlmError('Non sono riuscito a interpretare la correzione: riprova.')
  }
  return parsed
}

/** Trasforma gli errori segnalati dal modello in carte di produzione da ripassare. */
export function errorsToCards(language: LanguageCode, errors: LlmErrorItem[], tag = 'diario'): Omit<Card, 'id'>[] {
  return errors.map((error) => ({
    language,
    lemma: error.correction,
    form: error.correction,
    exampleL2: error.correction,
    translationIt: error.explanationIt,
    tags: [tag],
    exerciseTypes: ['production'],
    createdAt: Date.now(),
  }))
}

export async function saveErrorCards(language: LanguageCode, errors: LlmErrorItem[], tag = 'diario'): Promise<number> {
  const cards = errorsToCards(language, errors, tag)
  if (cards.length === 0) return 0
  await db.cards.bulkAdd(cards)
  return cards.length
}
