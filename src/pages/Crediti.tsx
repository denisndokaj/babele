import { useEffect, useState } from 'react'
import type { CreditsManifest } from '../types/content'

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; manifest: CreditsManifest }

export function Crediti() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    fetch(`${import.meta.env.BASE_URL}data/credits.json`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json() as Promise<CreditsManifest>
      })
      .then((manifest) => {
        if (!cancelled) setState({ status: 'ready', manifest })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section>
      <h1 className="text-2xl font-bold">Crediti e licenze</h1>
      <p className="mt-2 max-w-prose text-slate-600 dark:text-slate-300">
        Il lessico iniziale e le frasi d'esempio di Babele vengono da fonti aperte. Questa pagina
        è generata automaticamente dalla pipeline dati (<code>/scripts/pipeline</code>) a partire
        dalle fonti effettivamente usate.
      </p>

      {state.status === 'loading' && <p className="mt-6 text-slate-500">Caricamento…</p>}

      {state.status === 'error' && (
        <p className="mt-6 text-slate-500">
          Elenco delle fonti non disponibile: la pipeline dati non è ancora stata eseguita in
          questo ambiente (<code>npm run data:build</code>).
        </p>
      )}

      {state.status === 'ready' && (
        <div className="mt-6 space-y-6">
          <p className="text-sm text-slate-500">
            Generato il {new Date(state.manifest.generatedAt).toLocaleDateString('it-IT')}
          </p>
          <ul className="space-y-6">
            {state.manifest.sources.map((source) => (
              <li
                key={source.name}
                className="rounded border border-slate-200 p-4 dark:border-slate-700"
              >
                <h2 className="text-lg font-semibold">{source.name}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{source.note}</p>
                <p className="mt-2 text-sm">
                  <span className="font-medium">Licenza:</span>{' '}
                  {source.licenseUrl ? (
                    <a
                      href={source.licenseUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-slate-900 dark:hover:text-white"
                    >
                      {source.license}
                    </a>
                  ) : (
                    source.license
                  )}
                </p>
                <p className="text-sm">
                  <a
                    href={source.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-slate-900 dark:hover:text-white"
                  >
                    {source.homepage}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
