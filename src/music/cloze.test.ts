import { describe, expect, it } from 'vitest'
import { checkClozeAnswers, generateCloze } from './cloze'

describe('generateCloze', () => {
  it('oscura solo le parole già note, fino al massimo richiesto', () => {
    const text = 'Le chat mange une pomme rouge dans le jardin.'
    const known = new Set(['le', 'chat', 'pomme'])
    const { displayText, answers } = generateCloze(text, known, 10, () => 0)

    expect(answers.every((a) => known.has(a.toLowerCase()))).toBe(true)
    expect(displayText).toContain('___')
    expect((displayText.match(/___/g) ?? []).length).toBe(answers.length)
  })

  it('rispetta il numero massimo di spazi vuoti', () => {
    const text = 'Le chat mange une pomme rouge dans le jardin le soir le matin.'
    const known = new Set(['le'])
    const { answers } = generateCloze(text, known, 2, () => 0.9)
    expect(answers.length).toBeLessThanOrEqual(2)
  })

  it('non oscura nulla se nessuna parola è nota', () => {
    const text = 'Le chat dort.'
    const { displayText, answers } = generateCloze(text, new Set())
    expect(answers).toHaveLength(0)
    expect(displayText).toBe(text)
  })

  it('ricostruisce il testo rimettendo le risposte al posto dei segnaposto', () => {
    const text = 'Le chat mange une pomme.'
    const known = new Set(['chat', 'pomme'])
    const { displayText, answers } = generateCloze(text, known, 10, () => 0.5)
    let i = 0
    const rebuilt = displayText.replace(/___/g, () => answers[i++] as string)
    expect(rebuilt).toBe(text)
  })
})

describe('checkClozeAnswers', () => {
  it('confronta ogni risposta ignorando maiuscole e spazi ai margini', () => {
    expect(checkClozeAnswers([' Chat ', 'pomme'], ['chat', 'pomme'])).toEqual([true, true])
  })

  it('segnala le risposte sbagliate una per una', () => {
    expect(checkClozeAnswers(['chien', 'pomme'], ['chat', 'pomme'])).toEqual([false, true])
  })

  it('gestisce risposte mancanti come sbagliate', () => {
    expect(checkClozeAnswers([], ['chat'])).toEqual([false])
  })
})
