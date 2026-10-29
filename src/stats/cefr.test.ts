import { describe, expect, it } from 'vitest'
import { estimateCefrLevel } from './cefr'

describe('estimateCefrLevel', () => {
  it('restituisce A1 per pochissime parole', () => {
    expect(estimateCefrLevel(0)).toBe('A1')
    expect(estimateCefrLevel(100)).toBe('A1')
  })

  it('sale di livello alle soglie previste', () => {
    expect(estimateCefrLevel(250)).toBe('A2')
    expect(estimateCefrLevel(600)).toBe('B1')
    expect(estimateCefrLevel(1200)).toBe('B2')
  })

  it('satura a B2 anche con moltissime parole, perché il vocabolario disponibile non copre C1/C2', () => {
    expect(estimateCefrLevel(100_000)).toBe('B2')
  })
})
