import { describe, expect, it } from 'vitest'
import { findCueAt, parseSrt, parseSubtitles, parseVtt } from './parser'

const SRT_SAMPLE = `1
00:00:01,000 --> 00:00:04,500
Bonjour, comment ça va ?

2
00:00:05,000 --> 00:00:07,250
<i>Ça va bien, merci.</i>

3
00:01:02,100 --> 01:01:05,000
Dernière ligne.
`

const VTT_SAMPLE = `WEBVTT

00:00:01.000 --> 00:00:04.500
Hallo, wie geht's?

00:00:05.000 --> 00:00:07.250
Gut, danke.
`

describe('parseSrt', () => {
  it('estrae indice, timestamp in millisecondi e testo', () => {
    const cues = parseSrt(SRT_SAMPLE)
    expect(cues).toHaveLength(3)
    expect(cues[0]).toEqual({ index: 1, startMs: 1000, endMs: 4500, text: 'Bonjour, comment ça va ?' })
  })

  it('rimuove i tag HTML dal testo', () => {
    const cues = parseSrt(SRT_SAMPLE)
    expect(cues[1]?.text).toBe('Ça va bien, merci.')
  })

  it('gestisce ore a due cifre nel timestamp', () => {
    const cues = parseSrt(SRT_SAMPLE)
    expect(cues[2]?.startMs).toBe(62100)
    expect(cues[2]?.endMs).toBe(((1 * 60 + 1) * 60 + 5) * 1000)
  })

  it('ignora righe vuote o blocchi malformati', () => {
    expect(parseSrt('non è un sottotitolo\n\n')).toEqual([])
  })
})

describe('parseVtt', () => {
  it('estrae i cue ignorando l\'intestazione WEBVTT', () => {
    const cues = parseVtt(VTT_SAMPLE)
    expect(cues).toHaveLength(2)
    expect(cues[0]).toEqual({ index: 1, startMs: 1000, endMs: 4500, text: "Hallo, wie geht's?" })
  })
})

describe('parseSubtitles', () => {
  it('sceglie il parser SRT per estensione .srt', () => {
    expect(parseSubtitles(SRT_SAMPLE, 'episodio.srt')).toHaveLength(3)
  })

  it('sceglie il parser VTT per estensione .vtt', () => {
    expect(parseSubtitles(VTT_SAMPLE, 'episodio.vtt')).toHaveLength(2)
  })

  it("riconosce il formato VTT dal contenuto anche con estensione sbagliata", () => {
    expect(parseSubtitles(VTT_SAMPLE, 'episodio.srt')).toHaveLength(2)
  })
})

describe('findCueAt', () => {
  it('trova la battuta attiva in un istante dato', () => {
    const cues = parseSrt(SRT_SAMPLE)
    expect(findCueAt(cues, 2000)?.text).toBe('Bonjour, comment ça va ?')
    expect(findCueAt(cues, 6000)?.text).toBe('Ça va bien, merci.')
  })

  it('restituisce undefined fuori da ogni intervallo', () => {
    const cues = parseSrt(SRT_SAMPLE)
    expect(findCueAt(cues, 4600)).toBeUndefined()
  })
})
