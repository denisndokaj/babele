import { LANGUAGES } from '../../languages'
import type { CEFRLevel, LanguageCode } from '../../types/models'

/**
 * Prompt di sistema versionati per diario e tutor (§6.10 SPEC: "Il prompt di sistema del
 * tutor sta in un file versionato e modificabile"). Cambiare il testo dei prompt qui non
 * richiede modifiche alle pagine che li usano.
 */
export const JOURNAL_PROMPT_VERSION = 1
export const CONVERSATION_PROMPT_VERSION = 1

const JSON_INSTRUCTIONS = `Rispondi SOLO con un oggetto JSON valido, senza testo prima o dopo, nel formato:
{"correctedText": "...", "errors": [{"original": "...", "correction": "...", "explanationIt": "..."}]}
Se non ci sono errori, "errors" è un array vuoto e "correctedText" coincide con il testo originale.`

export function buildJournalSystemPrompt(language: LanguageCode): string {
  const name = LANGUAGES[language].name
  return `Sei un insegnante di ${name} per un italofono che tiene un diario quotidiano in ${name}.
Correggi il testo che l'utente scrive, mantenendone il senso e il registro.
Per ogni errore reale (non stilistico) indica: il frammento originale scorretto, la correzione, e una spiegazione breve IN ITALIANO del motivo (regola grammaticale o lessicale).
Non segnalare come errore una formulazione corretta solo perché diversa dalla tua.
${JSON_INSTRUCTIONS}`
}

export function buildJournalUserMessage(text: string): string {
  return text
}

export type ConversationScenario = 'bar' | 'stazione' | 'colloquio' | 'filosofia'

export interface ConversationScenarioMeta {
  id: ConversationScenario
  label: string
  description: string
  situationPrompt: string
}

export const CONVERSATION_SCENARIOS: ConversationScenarioMeta[] = [
  {
    id: 'bar',
    label: 'Al bar',
    description: 'Ordinare da bere o da mangiare, chiacchierare con il barista.',
    situationPrompt: 'Interpreti un barista o un cliente al bar in una conversazione informale su ordini, consigli del menù e piccola conversazione.',
  },
  {
    id: 'stazione',
    label: 'Alla stazione',
    description: 'Chiedere informazioni, comprare un biglietto, orientarsi.',
    situationPrompt: 'Interpreti un impiegato o un passante alla stazione ferroviaria: orari, biglietti, binari, indicazioni.',
  },
  {
    id: 'colloquio',
    label: 'Colloquio di lavoro',
    description: 'Presentarsi, parlare di esperienze e competenze.',
    situationPrompt: 'Interpreti un selezionatore che conduce un colloquio di lavoro semi-formale, con domande su esperienza, motivazione e competenze.',
  },
  {
    id: 'filosofia',
    label: 'Discussione filosofica',
    description: 'Argomentare una posizione, rispondere a obiezioni.',
    situationPrompt: 'Interpreti un interlocutore colto che discute amichevolmente un tema filosofico semplice (per esempio il senso della felicità, la libertà, la giustizia), ponendo domande e obiezioni moderate.',
  },
]

export function getConversationScenario(id: ConversationScenario): ConversationScenarioMeta {
  const scenario = CONVERSATION_SCENARIOS.find((s) => s.id === id)
  if (!scenario) throw new Error(`Scenario di conversazione sconosciuto: ${id}`)
  return scenario
}

export function buildConversationSystemPrompt(params: {
  language: LanguageCode
  scenario: ConversationScenario
  level?: CEFRLevel
  inProgressWords: string[]
}): string {
  const { language, scenario, level, inProgressWords } = params
  const name = LANGUAGES[language].name
  const meta = getConversationScenario(scenario)
  const levelLine = level
    ? `Il livello stimato dell'utente è ${level}: adatta lessico e strutture a quel livello, leggermente sopra per spingerlo a crescere ma senza scoraggiarlo.`
    : `Non conosciamo il livello dell'utente: parti da un livello semplice (A2) e adattati in base a come risponde.`
  const wordsLine = inProgressWords.length > 0
    ? `Quando è naturale, riutilizza alcune di queste parole che l'utente sta imparando: ${inProgressWords.join(', ')}.`
    : ''

  return `Sei un tutor di conversazione in ${name} per un italofono. ${meta.situationPrompt}
Scrivi SEMPRE e SOLO in ${name}, mai in italiano, anche se l'utente scrive in italiano (in quel caso correggilo gentilmente e continua in ${name}).
${levelLine}
${wordsLine}
Fai una domanda o proponi una battuta alla volta, mantieni risposte brevi (2-4 frasi), in stile colloquiale e naturale.
Non segnalare correzioni durante la conversazione: verranno chieste separatamente a fine sessione.`
}

const SUMMARY_JSON_INSTRUCTIONS = `Rispondi SOLO con un oggetto JSON valido, senza testo prima o dopo, nel formato:
{"summaryIt": "...", "errors": [{"original": "...", "correction": "...", "explanationIt": "..."}]}
"summaryIt" è un breve riepilogo in italiano dell'andamento della conversazione (2-4 frasi). "errors" elenca solo gli errori reali dell'utente nei suoi turni, non le tue battute; se non ci sono errori è un array vuoto.`

export function buildConversationSummaryPrompt(language: LanguageCode): string {
  const name = LANGUAGES[language].name
  return `Hai appena concluso una conversazione di pratica in ${name} con un italofono. Analizza SOLO i turni dell'utente (ruolo "user") nella cronologia fornita e prepara un riepilogo degli errori commessi.
${SUMMARY_JSON_INSTRUCTIONS}`
}
