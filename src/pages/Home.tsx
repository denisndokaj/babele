import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LANGUAGES } from '../languages'
import { buildSessionPlan, type SessionPlan } from '../session/planner'
import { getOnboardingProfile, getSessionSettings, type OnboardingProfile } from '../settings/settings'

const BLOCK_LABEL = {
  srs: 'Revisione',
  'new-cards': 'Nuove carte',
} as const

type LoadState =
  | { status: 'loading' }
  | { status: 'needs-onboarding' }
  | { status: 'ready'; profile: OnboardingProfile; plan: SessionPlan }

export function Home() {
  const navigate = useNavigate()
  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    async function load() {
      const profile = await getOnboardingProfile()
      if (!profile?.completed) {
        if (!cancelled) setState({ status: 'needs-onboarding' })
        return
      }
      const settings = await getSessionSettings()
      const plan = await buildSessionPlan(profile.activeLanguages, profile.priorityLanguage, settings)
      if (!cancelled) setState({ status: 'ready', profile, plan })
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  if (state.status === 'loading') {
    return <p className="text-slate-500">Caricamento…</p>
  }

  if (state.status === 'needs-onboarding') {
    return (
      <section className="max-w-prose">
        <h1 className="text-2xl font-bold">Benvenuto in Babele</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Prima di iniziare, scegli le lingue su cui lavorare e fai un breve test di livello.
        </p>
        <Link
          to="/onboarding"
          className="mt-6 inline-block rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
        >
          Comincia
        </Link>
      </section>
    )
  }

  const { plan } = state
  const hasContent = plan.blocks.length > 0

  return (
    <section className="max-w-prose">
      <h1 className="text-2xl font-bold">Piano del giorno</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Budget di oggi: {plan.budgetMinutes} minuti (~{plan.totalEstimatedMinutes} previsti).
      </p>

      {!hasContent && (
        <p className="mt-6 text-slate-600 dark:text-slate-300">
          Nessuna revisione o nuova carta in programma ora. Torna più tardi, oppure vai al{' '}
          <Link to="/vocabolario" className="underline">
            Vocabolario
          </Link>{' '}
          per sfogliare le carte.
        </p>
      )}

      {hasContent && (
        <>
          <ul className="mt-6 space-y-2">
            {plan.blocks.map((block, i) => {
              const language = LANGUAGES[block.language]
              return (
                <li key={i} className="flex items-center gap-2">
                  <span style={{ color: language.color }}>{language.flag}</span>
                  <span>
                    {BLOCK_LABEL[block.kind]} · {language.name} · {block.cardIds.length} carte (~
                    {Math.round(block.estimatedMinutes)} min)
                  </span>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            onClick={() => navigate('/vocabolario', { state: { blocks: plan.blocks } })}
            className="mt-8 rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            Inizia la sessione
          </button>
        </>
      )}

      <p className="mt-8 text-sm text-slate-500">
        Grammatica, input (ascolto/lettura) e produzione guidata arriveranno dalle Fasi 2–4: il
        piano di oggi include solo le revisioni e le nuove carte di vocabolario.
      </p>
    </section>
  )
}
