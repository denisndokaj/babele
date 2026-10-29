import { useEffect, useState } from 'react'
import { LANGUAGE_CODES, LANGUAGES } from '../languages'
import {
  getStreakSettings,
  saveStreakSettings,
  type StreakSettings,
} from '../settings/settings'
import { lastNDays } from '../stats/heatmap'
import { computeLanguageStats, type LanguageStats } from '../stats/languageStats'
import { computeStreak } from '../stats/streak'

const HEATMAP_DAYS = 70
const WEEKDAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']

function formatHours(minutes: number): string {
  return (minutes / 60).toFixed(1)
}

function formatPercent(value: number | null): string {
  return value === null ? '—' : `${Math.round(value * 100)}%`
}

export function Statistiche() {
  const [stats, setStats] = useState<LanguageStats[] | null>(null)
  const [streakSettings, setStreakSettings] = useState<StreakSettings | null>(null)

  useEffect(() => {
    void Promise.all(LANGUAGE_CODES.map((code) => computeLanguageStats(code))).then(setStats)
    void getStreakSettings().then(setStreakSettings)
  }, [])

  async function toggleRestDay(weekday: number) {
    const current = streakSettings ?? { restWeekdays: [] }
    const next = current.restWeekdays.includes(weekday)
      ? { restWeekdays: current.restWeekdays.filter((d) => d !== weekday) }
      : { restWeekdays: [...current.restWeekdays, weekday] }
    setStreakSettings(next)
    await saveStreakSettings(next)
  }

  const allActiveDates = new Set<string>()
  if (stats) {
    for (const s of stats) for (const d of s.activeDates) allActiveDates.add(d)
  }
  const streak = streakSettings ? computeStreak(allActiveDates, streakSettings.restWeekdays) : null

  return (
    <section>
      <h1 className="text-2xl font-bold">Statistiche</h1>
      <p className="mt-2 max-w-prose text-slate-600 dark:text-slate-300">
        Una fotografia di dove sei, lingua per lingua. Nessuna classifica, nessun avviso di
        giorni persi: solo quello che hai fatto davvero.
      </p>

      {streakSettings && (
        <div className="mt-4 max-w-prose rounded border border-slate-200 p-4 dark:border-slate-700">
          <p className="text-lg">
            <span className="font-semibold">{streak}</span>{' '}
            {streak === 1 ? 'giorno di fila' : 'giorni di fila'} (lingue combinate)
          </p>
          <p className="mt-2 text-sm text-slate-500">Giorni di riposo (non interrompono la serie):</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {WEEKDAY_LABELS.map((label, weekday) => (
              <button
                key={weekday}
                type="button"
                onClick={() => void toggleRestDay(weekday)}
                aria-pressed={streakSettings.restWeekdays.includes(weekday)}
                className={`rounded px-3 py-1 text-sm ${
                  streakSettings.restWeekdays.includes(weekday)
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'border border-slate-400 dark:border-slate-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {!stats ? (
        <p className="mt-6 text-sm text-slate-500">Calcolo in corso…</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <LanguageStatsCard key={s.language} stats={s} />
          ))}
        </div>
      )}
    </section>
  )
}

function LanguageStatsCard({ stats }: { stats: LanguageStats }) {
  const meta = LANGUAGES[stats.language]
  const days = lastNDays(HEATMAP_DAYS)

  return (
    <div className="rounded border border-slate-200 p-4 dark:border-slate-700">
      <h2 className="text-lg font-semibold" style={{ color: meta.color }}>
        {meta.flag} {meta.name}
      </h2>
      <dl className="mt-2 space-y-1 text-sm">
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">Parole note</dt>
          <dd>{stats.wordsKnown}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">In apprendimento</dt>
          <dd>{stats.wordsLearning}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">Ritenzione stimata</dt>
          <dd>{formatPercent(stats.retention)}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">Livello stimato</dt>
          <dd>{stats.estimatedLevel}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">Ore di input</dt>
          <dd>{formatHours(stats.minutesInput)}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">Ore di output</dt>
          <dd>{formatHours(stats.minutesOutput)}</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-slate-500">Ultimi {HEATMAP_DAYS} giorni</p>
      <div className="mt-1 grid grid-cols-10 gap-1" role="img" aria-label={`Giornate attive in ${meta.name} negli ultimi ${HEATMAP_DAYS} giorni`}>
        {days.map((day) => (
          <span
            key={day}
            title={day}
            className="h-3 w-3 rounded-sm"
            style={{
              backgroundColor: stats.activeDates.has(day) ? meta.color : undefined,
            }}
            data-active={stats.activeDates.has(day)}
          />
        ))}
      </div>
    </div>
  )
}
