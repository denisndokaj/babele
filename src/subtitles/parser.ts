export interface SubtitleCue {
  index: number
  startMs: number
  endMs: number
  text: string
}

function parseTimestamp(raw: string): number {
  const match = raw.trim().match(/^(?:(\d+):)?(\d{2}):(\d{2})[.,](\d{1,3})$/)
  if (!match) throw new Error(`Timestamp non valido: "${raw}"`)
  const hours = match[1] ? Number(match[1]) : 0
  const minutes = Number(match[2])
  const seconds = Number(match[3])
  const millis = Number((match[4] as string).padEnd(3, '0'))
  return ((hours * 60 + minutes) * 60 + seconds) * 1000 + millis
}

function stripTags(text: string): string {
  return text.replace(/<[^>]+>/g, '').trim()
}

function splitBlocks(content: string): string[] {
  return content
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
}

/** Parser per il formato SubRip (.srt): indice numerico, timestamp con virgola, testo. */
export function parseSrt(content: string): SubtitleCue[] {
  const cues: SubtitleCue[] = []

  for (const block of splitBlocks(content)) {
    const lines = block.split('\n')
    let lineIndex = 0
    let index = cues.length + 1

    if (/^\d+$/.test((lines[0] ?? '').trim())) {
      index = Number(lines[0])
      lineIndex = 1
    }

    const timeLine = lines[lineIndex] ?? ''
    const match = timeLine.match(/([\d:.,]+)\s*-->\s*([\d:.,]+)/)
    if (!match) continue

    const text = stripTags(lines.slice(lineIndex + 1).join('\n'))
    if (!text) continue

    cues.push({
      index,
      startMs: parseTimestamp(match[1] as string),
      endMs: parseTimestamp(match[2] as string),
      text,
    })
  }

  return cues
}

/** Parser per WebVTT (.vtt): intestazione "WEBVTT", identificatore di cue opzionale, timestamp con punto. */
export function parseVtt(content: string): SubtitleCue[] {
  const withoutHeader = content.replace(/\r/g, '').replace(/^﻿?WEBVTT[^\n]*\n?/, '')
  const cues: SubtitleCue[] = []
  let autoIndex = 1

  for (const block of splitBlocks(withoutHeader)) {
    const lines = block.split('\n')
    let lineIndex = 0

    if (lines[0] && !lines[0].includes('-->')) {
      lineIndex = 1
    }

    const timeLine = lines[lineIndex] ?? ''
    const match = timeLine.match(/([\d:.,]+)\s*-->\s*([\d:.,]+)/)
    if (!match) continue

    const text = stripTags(lines.slice(lineIndex + 1).join('\n'))
    if (!text) continue

    cues.push({
      index: autoIndex++,
      startMs: parseTimestamp(match[1] as string),
      endMs: parseTimestamp(match[2] as string),
      text,
    })
  }

  return cues
}

/** Riconosce il formato dal contenuto/estensione e chiama il parser giusto. */
export function parseSubtitles(content: string, filename: string): SubtitleCue[] {
  const isVtt = filename.toLowerCase().endsWith('.vtt') || content.trimStart().startsWith('WEBVTT')
  return isVtt ? parseVtt(content) : parseSrt(content)
}

export function findCueAt(cues: SubtitleCue[], timeMs: number): SubtitleCue | undefined {
  return cues.find((cue) => timeMs >= cue.startMs && timeMs < cue.endMs)
}
