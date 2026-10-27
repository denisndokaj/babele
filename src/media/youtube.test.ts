import { describe, expect, it } from 'vitest'
import { extractVideoId } from './youtube'

describe('extractVideoId', () => {
  it('accetta un id già pulito', () => {
    expect(extractVideoId('dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
  })

  it('estrae l\'id da un URL youtube.com/watch', () => {
    expect(extractVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
  })

  it('estrae l\'id da un URL youtube.com/watch con parametri aggiuntivi', () => {
    expect(extractVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s')).toBe('dQw4w9WgXcQ')
  })

  it('estrae l\'id da un URL youtu.be', () => {
    expect(extractVideoId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
  })

  it('estrae l\'id da un URL di embed', () => {
    expect(extractVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
  })

  it('restituisce null per un input non valido', () => {
    expect(extractVideoId('non è un link')).toBeNull()
    expect(extractVideoId('https://example.com/video')).toBeNull()
  })
})
