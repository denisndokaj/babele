const GIST_API = 'https://api.github.com/gists'
const GITHUB_API_VERSION = '2026-03-10'
export const BACKUP_GIST_FILENAME = 'babele-backup.json'

/**
 * Errore con messaggio in italiano pensato per essere mostrato all'utente (stesso
 * principio di `LlmError` in `src/llm/client.ts`): qui l'utente ha premuto "sincronizza"
 * e aspetta un esito, un fallimento silenzioso sarebbe peggio di un messaggio chiaro.
 */
export class GistError extends Error {}

interface GistFile {
  content?: string
  truncated?: boolean
  raw_url?: string
}

interface GistResponse {
  id: string
  files: Record<string, GistFile | undefined>
}

/**
 * Chiama l'API dei Gist di GitHub (verificata in Fase 7: `docs.github.com/en/rest/gists/gists`
 * — `Authorization: Bearer <token>`, endpoint `POST/PATCH/GET /gists[/{id}]`). Serve un
 * token classico con lo scope "gist" (i fine-grained token non coprono i Gist).
 */
async function githubFetch(url: string, token: string, init?: RequestInit): Promise<GistResponse> {
  let response: Response
  try {
    response = await fetch(url, {
      ...init,
      headers: {
        authorization: `Bearer ${token}`,
        accept: 'application/vnd.github+json',
        'x-github-api-version': GITHUB_API_VERSION,
        ...(init?.headers ?? {}),
      },
    })
  } catch {
    throw new GistError('Impossibile contattare GitHub: controlla la connessione.')
  }

  if (!response.ok) {
    if (response.status === 401) throw new GistError('Token non valido o scaduto.')
    if (response.status === 404) throw new GistError('Gist non trovato: controlla l\'ID inserito.')
    if (response.status === 403) throw new GistError('Permesso negato: il token deve avere lo scope "gist".')
    throw new GistError(`Errore di GitHub (${response.status}).`)
  }

  try {
    return (await response.json()) as GistResponse
  } catch {
    throw new GistError('Risposta di GitHub non interpretabile.')
  }
}

/** Crea (se `gistId` è `null`) o aggiorna un Gist privato con il contenuto del backup. Restituisce l'ID del Gist. */
export async function pushBackupToGist(token: string, gistId: string | null, content: string): Promise<string> {
  const body = JSON.stringify(
    gistId
      ? { files: { [BACKUP_GIST_FILENAME]: { content } } }
      : { description: 'Backup dati Babele (privato)', public: false, files: { [BACKUP_GIST_FILENAME]: { content } } },
  )
  const data = await githubFetch(gistId ? `${GIST_API}/${gistId}` : GIST_API, token, {
    method: gistId ? 'PATCH' : 'POST',
    headers: { 'content-type': 'application/json' },
    body,
  })
  return data.id
}

/** Scarica il contenuto del backup da un Gist esistente. */
export async function pullBackupFromGist(token: string, gistId: string): Promise<string> {
  const data = await githubFetch(`${GIST_API}/${gistId}`, token, { method: 'GET' })
  const file = data.files[BACKUP_GIST_FILENAME]
  if (!file) {
    throw new GistError('Questo Gist non contiene un backup di Babele.')
  }
  if (file.truncated && file.raw_url) {
    let rawResponse: Response
    try {
      rawResponse = await fetch(file.raw_url)
    } catch {
      throw new GistError('Impossibile scaricare il contenuto completo del backup.')
    }
    if (!rawResponse.ok) throw new GistError('Impossibile scaricare il contenuto completo del backup.')
    return rawResponse.text()
  }
  if (typeof file.content !== 'string') {
    throw new GistError('Il backup nel Gist è vuoto o illeggibile.')
  }
  return file.content
}
