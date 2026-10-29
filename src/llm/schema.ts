export interface LlmErrorItem {
  original: string
  correction: string
  explanationIt: string
}

export interface JournalCorrection {
  correctedText: string
  errors: LlmErrorItem[]
}

export interface ConversationSummary {
  summaryIt: string
  errors: LlmErrorItem[]
}

/**
 * I modelli spesso avvolgono il JSON richiesto in un blocco ```json ... ``` o con testo
 * introduttivo: questa funzione estrae il primo oggetto JSON plausibile dal testo grezzo.
 */
function extractJsonObject(raw: string): string | null {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = fenced?.[1] ?? raw
  const start = candidate.indexOf('{')
  const end = candidate.lastIndexOf('}')
  if (start === -1 || end === -1 || end < start) return null
  return candidate.slice(start, end + 1)
}

function isErrorItem(value: unknown): value is LlmErrorItem {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return typeof v.original === 'string' && typeof v.correction === 'string' && typeof v.explanationIt === 'string'
}

function parseErrorList(value: unknown): LlmErrorItem[] | null {
  if (!Array.isArray(value)) return null
  return value.every(isErrorItem) ? value : null
}

/** Interpreta la risposta del modello alla correzione del diario; `null` se non è nel formato atteso. */
export function parseJournalCorrection(raw: string): JournalCorrection | null {
  const jsonText = extractJsonObject(raw)
  if (!jsonText) return null
  try {
    const parsed = JSON.parse(jsonText) as Record<string, unknown>
    const errors = parseErrorList(parsed.errors)
    if (typeof parsed.correctedText !== 'string' || !errors) return null
    return { correctedText: parsed.correctedText, errors }
  } catch {
    return null
  }
}

/** Interpreta il riepilogo di fine conversazione; `null` se non è nel formato atteso. */
export function parseConversationSummary(raw: string): ConversationSummary | null {
  const jsonText = extractJsonObject(raw)
  if (!jsonText) return null
  try {
    const parsed = JSON.parse(jsonText) as Record<string, unknown>
    const errors = parseErrorList(parsed.errors)
    if (typeof parsed.summaryIt !== 'string' || !errors) return null
    return { summaryIt: parsed.summaryIt, errors }
  } catch {
    return null
  }
}
