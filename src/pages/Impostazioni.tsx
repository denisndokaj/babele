import { useRef, useState } from 'react'
import { downloadBackup, importBackup } from '../db/backup'

export function Impostazioni() {
  const [message, setMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
        <h2 className="text-lg font-semibold">Lingue attive e budget minuti</h2>
        <p className="mt-1 max-w-prose text-slate-600 dark:text-slate-300">
          La scelta delle lingue attive, della lingua prioritaria e del budget giornaliero
          arriverà con l'onboarding e il piano del giorno.
        </p>
        <p className="mt-2 inline-block rounded bg-slate-200 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          In arrivo nella Fase 1
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Chiave API e sincronizzazione</h2>
        <p className="mt-1 max-w-prose text-slate-600 dark:text-slate-300">
          La chiave API Anthropic (facoltativa) sarà salvata solo in IndexedDB, mai nel codice.
          La sincronizzazione tra dispositivi avverrà tramite un Gist privato con un token
          inserito da te.
        </p>
        <p className="mt-2 inline-block rounded bg-slate-200 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          In arrivo nelle Fasi 6 e 7
        </p>
      </div>
    </section>
  )
}
