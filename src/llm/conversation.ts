import {
  buildConversationSummaryPrompt,
  buildConversationSystemPrompt,
  type ConversationScenario,
} from '../content/llm/prompts'
import type { CEFRLevel, ConversationMessage, LanguageCode } from '../types/models'
import { callClaude, LlmError, type LlmMessage } from './client'
import { parseConversationSummary, type ConversationSummary } from './schema'

export { LlmError }

function toLlmMessages(history: ConversationMessage[]): LlmMessage[] {
  return history.map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }))
}

/** Invia la cronologia al tutor e restituisce la sua prossima battuta (§6.10 SPEC). */
export async function sendConversationMessage(params: {
  apiKey: string
  language: LanguageCode
  scenario: ConversationScenario
  level?: CEFRLevel
  inProgressWords: string[]
  history: ConversationMessage[]
}): Promise<string> {
  const { apiKey, language, scenario, level, inProgressWords, history } = params
  return callClaude(apiKey, {
    system: buildConversationSystemPrompt({ language, scenario, level, inProgressWords }),
    messages: toLlmMessages(history),
  })
}

/** Chiede al modello un riepilogo degli errori a fine conversazione. */
export async function summarizeConversation(
  apiKey: string,
  language: LanguageCode,
  history: ConversationMessage[],
): Promise<ConversationSummary> {
  const raw = await callClaude(apiKey, {
    system: buildConversationSummaryPrompt(language),
    messages: toLlmMessages(history),
    maxTokens: 1024,
  })
  const parsed = parseConversationSummary(raw)
  if (!parsed) {
    throw new LlmError('Non sono riuscito a interpretare il riepilogo: riprova.')
  }
  return parsed
}
