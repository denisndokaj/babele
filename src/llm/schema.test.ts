import { describe, expect, it } from 'vitest'
import { parseConversationSummary, parseJournalCorrection } from './schema'

describe('parseJournalCorrection', () => {
  it('interpreta un JSON pulito', () => {
    const raw = JSON.stringify({
      correctedText: 'Je mange une pomme.',
      errors: [{ original: 'Je manges', correction: 'Je mange', explanationIt: 'La prima persona singolare non prende la -s.' }],
    })
    expect(parseJournalCorrection(raw)).toEqual({
      correctedText: 'Je mange une pomme.',
      errors: [{ original: 'Je manges', correction: 'Je mange', explanationIt: 'La prima persona singolare non prende la -s.' }],
    })
  })

  it('estrae il JSON da un blocco ```json con testo introduttivo', () => {
    const raw = 'Ecco la correzione:\n```json\n{"correctedText": "ok", "errors": []}\n```\nFammi sapere se serve altro.'
    expect(parseJournalCorrection(raw)).toEqual({ correctedText: 'ok', errors: [] })
  })

  it('restituisce null se manca un campo richiesto', () => {
    expect(parseJournalCorrection('{"correctedText": "ok"}')).toBeNull()
  })

  it('restituisce null se un errore nella lista non ha i campi giusti', () => {
    const raw = JSON.stringify({ correctedText: 'ok', errors: [{ original: 'x' }] })
    expect(parseJournalCorrection(raw)).toBeNull()
  })

  it('restituisce null per testo senza alcun JSON', () => {
    expect(parseJournalCorrection('Mi dispiace, non posso aiutarti.')).toBeNull()
  })
})

describe('parseConversationSummary', () => {
  it('interpreta un riepilogo valido', () => {
    const raw = JSON.stringify({
      summaryIt: 'Hai fatto una piccola confusione con il genere di "Tisch".',
      errors: [{ original: 'die Tisch', correction: 'der Tisch', explanationIt: '"Tisch" è maschile.' }],
    })
    expect(parseConversationSummary(raw)?.summaryIt).toContain('Tisch')
  })

  it('restituisce null se manca summaryIt', () => {
    expect(parseConversationSummary('{"errors": []}')).toBeNull()
  })
})
