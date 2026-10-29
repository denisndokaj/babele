import { afterEach, describe, expect, it, vi } from 'vitest'
import { BACKUP_GIST_FILENAME, GistError, pullBackupFromGist, pushBackupToGist } from './gist'

function mockFetchOnce(response: Partial<Response> & { json?: () => Promise<unknown> }) {
  const fetchMock = vi.fn().mockResolvedValue(response as Response)
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('pushBackupToGist', () => {
  it('crea un gist privato (POST) quando non c\'è un id', async () => {
    const fetchMock = mockFetchOnce({ ok: true, status: 201, json: () => Promise.resolve({ id: 'abc123', files: {} }) })
    const id = await pushBackupToGist('tok', null, '{"a":1}')
    expect(id).toBe('abc123')
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.github.com/gists')
    expect(init.method).toBe('POST')
    const headers = init.headers as Record<string, string>
    expect(headers.authorization).toBe('Bearer tok')
    const body = JSON.parse(init.body as string)
    expect(body.public).toBe(false)
    expect(body.files[BACKUP_GIST_FILENAME].content).toBe('{"a":1}')
  })

  it('aggiorna un gist esistente (PATCH) quando c\'è un id', async () => {
    const fetchMock = mockFetchOnce({ ok: true, status: 200, json: () => Promise.resolve({ id: 'abc123', files: {} }) })
    const id = await pushBackupToGist('tok', 'abc123', '{"a":2}')
    expect(id).toBe('abc123')
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.github.com/gists/abc123')
    expect(init.method).toBe('PATCH')
  })

  it('lancia un GistError su 401', async () => {
    mockFetchOnce({ ok: false, status: 401 })
    await expect(pushBackupToGist('bad', null, '{}')).rejects.toThrow(GistError)
  })
})

describe('pullBackupFromGist', () => {
  it('restituisce il contenuto del file di backup', async () => {
    mockFetchOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ id: 'abc123', files: { [BACKUP_GIST_FILENAME]: { content: '{"ok":true}' } } }),
    })
    const content = await pullBackupFromGist('tok', 'abc123')
    expect(content).toBe('{"ok":true}')
  })

  it('lancia un GistError se il gist non contiene un backup di Babele', async () => {
    mockFetchOnce({ ok: true, status: 200, json: () => Promise.resolve({ id: 'abc123', files: {} }) })
    await expect(pullBackupFromGist('tok', 'abc123')).rejects.toThrow(/non contiene/)
  })

  it('scarica dal raw_url se il contenuto è troncato', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          id: 'abc123',
          files: { [BACKUP_GIST_FILENAME]: { truncated: true, raw_url: 'https://gist.githubusercontent.com/raw/abc' } },
        }),
      } as Response)
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('{"grande":true}') } as Response)
    vi.stubGlobal('fetch', fetchMock)

    const content = await pullBackupFromGist('tok', 'abc123')
    expect(content).toBe('{"grande":true}')
    const secondCall = fetchMock.mock.calls[1] as [string, RequestInit?]
    expect(secondCall[0]).toBe('https://gist.githubusercontent.com/raw/abc')
  })

  it('lancia un GistError su 404', async () => {
    mockFetchOnce({ ok: false, status: 404 })
    await expect(pullBackupFromGist('tok', 'missing')).rejects.toThrow(/non trovato/)
  })
})
