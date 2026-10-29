const API_URL = 'https://api.anthropic.com/v1/messages'

/**
 * Versione dell'API Messages da inviare in `anthropic-version` (doc. ufficiale verificata
 * in Fase 6: https://platform.claude.com/docs/en/api/versioning, valore raccomandato attuale).
 */
const ANTHROPIC_VERSION = '2026-10-21'

/**
 * Modello consigliato per diario e conversazione: buon compromesso qualità/costo per una
 * chiave personale a consumo (verificato in Fase 6 sulla documentazione corrente dei modelli).
 */
export const DEFAULT_MODEL = 'claude-sonnet-5-5'

export interface LlmMessage {
  role: 'user' | 'assistant'
  content: string
}

/**
 * Errore con messaggio in italiano pensato per essere mostrato direttamente all'utente
 * (diversamente da `speech/recognition.ts`, qui l'utente ha scritto qualcosa e aspetta un
 * esito: un fallimento silenzioso sarebbe peggio di un messaggio chiaro).
 */
export class LlmError extends Error {}

interface MessagesResponse {
  content?: { type: string; text?: string }[]
}

/**
 * Chiama l'API Messages di Anthropic direttamente dal browser (§6.10/§2 SPEC). Richiede
 * l'header `anthropic-dangerous-direct-browser-access`, che la documentazione ufficiale
 * della SDK TypeScript descrive come "dangerous" perché espone la chiave nel codice client:
 * accettabile qui perché la chiave è quella personale dell'utente, inserita e salvata solo
 * sul suo dispositivo, mai condivisa né committata.
 */
export async function callClaude(
  apiKey: string,
  params: { system: string; messages: LlmMessage[]; maxTokens?: number; model?: string },
): Promise<string> {
  let response: Response
  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: params.model ?? DEFAULT_MODEL,
        max_tokens: params.maxTokens ?? 1024,
        system: params.system,
        messages: params.messages,
      }),
    })
  } catch {
    throw new LlmError('Impossibile contattare l\'API Anthropic: controlla la connessione.')
  }

  if (!response.ok) {
    if (response.status === 401) throw new LlmError('Chiave API non valida o scaduta.')
    if (response.status === 429) throw new LlmError('Limite di richieste raggiunto: riprova più tardi.')
    throw new LlmError(`Errore dell'API Anthropic (${response.status}).`)
  }

  let data: MessagesResponse
  try {
    data = (await response.json()) as MessagesResponse
  } catch {
    throw new LlmError('Risposta dell\'API non interpretabile.')
  }

  const text = data.content?.find((block) => block.type === 'text')?.text
  if (!text) {
    throw new LlmError('Risposta dell\'API priva di testo.')
  }
  return text
}
