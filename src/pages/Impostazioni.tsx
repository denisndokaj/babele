import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { downloadBackup, importBackup } from '../db/backup'
import { LANGUAGES } from '../languages'
import {
  clearApiKey,
  getApiKey,
  getOnboardingProfile,
  getSessionSettings,
  saveSessionSettings,
  setApiKey,
  type OnboardingProfile,
  type SessionSettings,
} from '../settings/settings'

export function Impostazioni() {
  const [message, setMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<OnboardingProfile | null>(null)
  const [sessionSettings, setSessionSettings] = useState<SessionSettings | null>(null)
  const [apiKey, setApiKeyState] = useState('')
  const [apiKeySaved, setApiKeySaved] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const savingKeyRef = useRef(false)

  useEffect(() => {
    void getOnboardingProfile().then((p) => setProfile(p ?? null))
    void getSessionSettings().then(setSessionSettings)
    void getApiKey().then((key) => {
      setApiKeySaved(!!key)
      setApiKeyState(key ?? '')
    })
  }, [])

  async function handleSaveApiKey() {
    if (savingKeyRef.current || !apiKey.trim()) return
    savingKeyRef.current = true
    try {
      await setApiKey(apiKey.trim())
      setApiKeySaved(true)
      setMessage('Chiave API salvata in locale su questo dispositivo.')
    } finally {
      savingKeyRef.current = false
    }
  }

  async function handleClearApiKey() {
    await clearApiKey()
    setApiKeyState('')
    setApiKeySaved(false)
    setMessage('Chiave API rimossa da questo dispositivo.')
  }

  async function updateSessionSettings(next: SessionSettings) {
    setSessionSettings(next)
    await saveSessionSettings(next)
  }

  async function handleExport() {
    try {
      await downloadBackup()
      setMessage('Backup esportato.')
    } catch {
      setMessage('Esportazione del backup non riuscita.')
    }
  }

  async function handleImportChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      await importBackup(file)
      setMessage('Backup importato. I dati sono stati sostituiti con quelli del file.')
    } catch {
      setMessage('Importazione non riuscita: il file non è un backup valido di Babele.')
    } finally {
      event.target.value = ''
    }
  }

  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-bold">Impostazioni</h1>

      <div>
        <h2 className="text-lg font-semibold">Backup dati</h2>
        <p className="mt-1 max-w-prose text-slate-600 dark:text-slate-300">
          Tutti i tuoi dati restano nel browser. Esporta un file JSON per avere una copia di
          sicurezza, oppure importane uno per ripristinare i dati su questo dispositivo.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            Esporta backup (JSON)
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded border border-slate-400 px-4 py-2 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
          >
            Importa backup
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            aria-label="Seleziona file di backup da importare"
            onChange={handleImportChange}
          />
        </div>
        <p role="status" aria-live="polite" className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {message}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Lingue attive</h2>
        {profile?.completed ? (
          <>
            <ul className="mt-2 space-y-1">
              {profile.activeLanguages.map((code) => (
                <li key={code}>
                  <span style={{ color: LANGUAGES[code].color }}>{LANGUAGES[code].flag}</span>{' '}
                  {LANGUAGES[code].name}
                  {code === profile.priorityLanguage ? ' (prioritaria)' : ''} — livello stimato{' '}
                  {profile.levels[code] ?? '—'}
                </li>
              ))}
            </ul>
            <Link to="/onboarding" className="mt-2 inline-block underline hover:text-slate-900 dark:hover:text-white">
              Rifai il test di livello →
            </Link>
          </>
        ) : (
          <p className="mt-1 max-w-prose text-slate-600 dark:text-slate-300">
            Non hai ancora completato l'onboarding.{' '}
            <Link to="/onboarding" className="underline">
              Comincia da qui
            </Link>
            .
          </p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold">Budget della sessione</h2>
        <p className="mt-1 max-w-prose text-slate-600 dark:text-slate-300">
          Quanto tempo vuoi dedicare ogni giorno e quante parole nuove al massimo per lingua.
        </p>
        {sessionSettings && (
          <div className="mt-3 flex flex-wrap gap-6">
            <label className="flex items-center gap-2">
              <span>Minuti al giorno</span>
              <select
                value={sessionSettings.dailyBudgetMinutes}
                onChange={(e) =>
                  updateSessionSettings({
                    ...sessionSettings,
                    dailyBudgetMinutes: Number(e.target.value),
                  })
                }
                className="rounded border border-slate-400 bg-transparent px-2 py-1 dark:border-slate-600"
              >
                {[10, 20, 40, 60].map((minutes) => (
                  <option key={minutes} value={minutes}>
                    {minutes}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2">
              <span>Nuove carte al giorno (per lingua)</span>
              <input
                type="number"
                min={0}
                max={50}
                value={sessionSettings.dailyNewCardLimit}
                onChange={(e) =>
                  updateSessionSettings({
                    ...sessionSettings,
                    dailyNewCardLimit: Number(e.target.value),
                  })
                }
                className="w-20 rounded border border-slate-400 bg-transparent px-2 py-1 dark:border-slate-600"
              />
            </label>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold">Chiave API Anthropic</h2>
        <p className="mt-1 max-w-prose text-slate-600 dark:text-slate-300">
          Facoltativa: abilita la correzione del diario in <Link to="/scrivi" className="underline">Scrivi</Link> e
          il tutor di conversazione in <Link to="/conversa" className="underline">Conversa</Link>. Resta salvata
          solo in IndexedDB su questo dispositivo, mai nel codice o nel repository. Puoi crearne una
          sulla{' '}
          <a href="https://platform.claude.com/settings/keys" target="_blank" rel="noreferrer" className="underline">
            Console Anthropic
          </a>
          .
        </p>
        <div className="mt-3 flex max-w-prose flex-wrap items-center gap-2">
          <input
            type={showApiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKeyState(e.target.value)}
            placeholder="sk-ant-..."
            aria-label="Chiave API Anthropic"
            autoComplete="off"
            className="min-w-0 max-w-full flex-1 rounded border border-slate-400 bg-transparent px-2 py-1 dark:border-slate-600"
          />
          <button
            type="button"
            onClick={() => setShowApiKey((v) => !v)}
            className="rounded border border-slate-400 px-3 py-1 text-sm dark:border-slate-600"
          >
            {showApiKey ? 'Nascondi' : 'Mostra'}
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void handleSaveApiKey()}
            disabled={!apiKey.trim()}
            className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
          >
            Salva chiave
          </button>
          {apiKeySaved && (
            <button
              type="button"
              onClick={() => void handleClearApiKey()}
              className="rounded border border-slate-400 px-4 py-2 dark:border-slate-600"
            >
              Rimuovi chiave
            </button>
          )}
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {apiKeySaved ? '✓ Una chiave è salvata su questo dispositivo.' : 'Nessuna chiave salvata: le funzioni che la richiedono restano disattivate.'}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Sincronizzazione</h2>
        <p className="mt-1 max-w-prose text-slate-600 dark:text-slate-300">
          La sincronizzazione tra dispositivi avverrà tramite un Gist privato con un token
          inserito da te, salvato solo in locale e mai committato.
        </p>
        <p className="mt-2 inline-block rounded bg-slate-200 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          In arrivo nella Fase 7
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Fonti dei contenuti</h2>
        <p className="mt-1 max-w-prose text-slate-600 dark:text-slate-300">
          Il lessico iniziale viene da fonti aperte, con le relative licenze.
        </p>
        <Link to="/crediti" className="mt-2 inline-block underline hover:text-slate-900 dark:hover:text-white">
          Vedi crediti e licenze →
        </Link>
      </div>
    </section>
  )
}
