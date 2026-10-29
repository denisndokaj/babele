import { describe, expect, it } from 'vitest'
import {
  buildConversationSummaryPrompt,
  buildConversationSystemPrompt,
  buildJournalSystemPrompt,
  CONVERSATION_SCENARIOS,
} from './prompts'

describe('CONVERSATION_SCENARIOS', () => {
  it('copre esattamente i quattro scenari richiesti da §6.10 SPEC', () => {
    expect(CONVERSATION_SCENARIOS.map((s) => s.id).sort()).toEqual(['bar', 'colloquio', 'filosofia', 'stazione'])
  })
})

describe('buildJournalSystemPrompt', () => {
  it('nomina la lingua e chiede un formato JSON', () => {
    const prompt = buildJournalSystemPrompt('fr')
    expect(prompt).toContain('Francese')
    expect(prompt).toContain('correctedText')
    expect(prompt).toContain('errors')
  })
})

describe('buildConversationSystemPrompt', () => {
  it('include lo scenario, il livello e le parole in apprendimento', () => {
    const prompt = buildConversationSystemPrompt({
      language: 'de',
      scenario: 'bar',
      level: 'A2',
      inProgressWords: ['Tisch', 'Wasser'],
    })
    expect(prompt).toContain('Tedesco')
    expect(prompt).toContain('A2')
    expect(prompt).toContain('Tisch')
    expect(prompt).toContain('Wasser')
  })

  it('funziona anche senza livello stimato o parole in apprendimento', () => {
    const prompt = buildConversationSystemPrompt({ language: 'es', scenario: 'colloquio', inProgressWords: [] })
    expect(prompt).toContain('Spagnolo')
    expect(prompt).not.toContain('undefined')
  })
})

describe('buildConversationSummaryPrompt', () => {
  it('chiede un riepilogo in formato JSON', () => {
    const prompt = buildConversationSummaryPrompt('fr')
    expect(prompt).toContain('summaryIt')
    expect(prompt).toContain('errors')
  })
})
