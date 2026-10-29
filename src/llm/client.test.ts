import { afterEach, describe, expect, it, vi } from 'vitest'
import { callClaude, LlmError } from './client'

function mockFetchOnce(response: Partial<Response> & { json?: () => Promise<unknown> }) {
  const fetchMock = vi.fn().mockResolvedValue(response as Response)
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('callClaude', () => {
  it('invia gli header richiesti per l\'accesso diretto dal browser', async () => {
    const fetchMock = mockFetchOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ content: [{ type: 'text', text: 'Bonjour !' }] }),
    })

    const text = await callClaude('sk-test', { system: 'sistema', messages: [{ role: 'user', content: 'Salut' }] })

    expect(text).toBe('Bonjour !')
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.anthropic.com/v1/messages')
    const headers = init.headers as Record<string, string>
    expect(headers['x-api-key']).toBe('sk-test')
    expect(headers['anthropic-dangerous-direct-browser-access']).toBe('true')
    expect(headers['anthropic-version']).toBeTruthy()
    const body = JSON.parse(init.body as string)
    expect(body.system).toBe('sistema')
    expect(body.messages).toEqual([{ role: 'user', content: 'Salut' }])
  })

  it('lancia un LlmError con messaggio chiaro su 401', async () => {
    mockFetchOnce({ ok: false, status: 401 })
    await expect(callClaude('sk-bad', { system: 's', messages: [] })).rejects.toThrow(LlmError)
  })

  it('lancia un LlmError su 429', async () => {
    mockFetchOnce({ ok: false, status: 429 })
    await expect(callClaude('sk', { system: 's', messages: [] })).rejects.toThrow(/limite/i)
  })

  it('lancia un LlmError se il fetch fallisce (rete assente)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('network error')))
    await expect(callClaude('sk', { system: 's', messages: [] })).rejects.toThrow(LlmError)
  })

  it('lancia un LlmError se la risposta non contiene testo', async () => {
    mockFetchOnce({ ok: true, status: 200, json: () => Promise.resolve({ content: [] }) })
    await expect(callClaude('sk', { system: 's', messages: [] })).rejects.toThrow(LlmError)
  })
})
