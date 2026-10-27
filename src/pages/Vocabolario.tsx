import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../db/db'
import { LANGUAGES } from '../languages'
import { speak } from '../speech/tts'
import { Rating, type Grade } from '../srs/fsrs'
import { submitReview } from '../srs/queue'
import type { SessionBlockPlan } from '../session/planner'
import type { Card } from '../types/models'

interface LocationState {
  blocks?: SessionBlockPlan[]
}

interface QueueItem {
  card: Card
  isNew: boolean
}

const RATING_BUTTONS: Array<{ grade: Grade; label: string; key: string }> = [
  { grade: Rating.Again, label: 'Di nuovo', key: '1' },
  { grade: Rating.Hard, label: 'Difficile', key: '2' },
  { grade: Rating.Good, label: 'Bene', key: '3' },
  { grade: Rating.Easy, label: 'Facile', key: '4' },
]

async function buildQueueFromBlocks(blocks: SessionBlockPlan[]): Promise<QueueItem[]> {
  const items: QueueItem[] = []
  for (const block of blocks) {
    for (const cardId of block.cardIds) {
      const card = await db.cards.get(cardId)
      if (card) items.push({ card, isNew: block.kind === 'new-cards' })
    }
  }
  return items
}

async function buildFreeQueue(): Promise<QueueItem[]> {
  const cards = await db.cards.toArray()
  const logs = await db.reviewLogs.toArray()
  const logByCardId = new Map(logs.map((log) => [log.cardId, log]))
  const now = Date.now()

  const items: QueueItem[] = []
  for (const card of cards) {
    const log = logByCardId.get(card.id)
    if (log && log.due <= now) items.push({ card, isNew: false })
  }
  return items
}

async function persistSession(blocks: SessionBlockPlan[]): Promise<void> {
  await db.sessions.add({
    date: new Date().toISOString().slice(0, 10),
    budgetMinutes: blocks.reduce((sum, b) => sum + b.estimatedMinutes, 0),
    blocks: blocks.map((block) => ({
      kind: block.kind,
      language: block.language,
      minutes: block.estimatedMinutes,
      completed: true,
      cardIds: block.cardIds,
    })),
    completedAt: Date.now(),
  })
}

export function Vocabolario() {
  const location = useLocation()
  const planBlocks = (location.state as LocationState | null)?.blocks

  const [queue, setQueue] = useState<QueueItem[] | null>(null)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const ratingRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    const load = planBlocks ? buildQueueFromBlocks(planBlocks) : buildFreeQueue()
    load.then((items) => {
      if (!cancelled) setQueue(items)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const current = queue?.[index]

  useEffect(() => {
    if (current) speak(current.card.exampleL2, current.card.language)
  }, [current])

  async function rate(grade: Grade) {
    if (!current || ratingRef.current) return
    ratingRef.current = true
    try {
      await submitReview(current.card.id, grade)
      setRevealed(false)
      setIndex((i) => i + 1)
    } finally {
      ratingRef.current = false
    }
  }

  const isFinished = useMemo(() => queue !== null && index >= queue.length, [queue, index])

  useEffect(() => {
    if (isFinished && planBlocks) {
      void persistSession(planBlocks)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!current || isFinished) return
      if (!revealed) {
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault()
          setRevealed(true)
        }
        return
      }
      const button = RATING_BUTTONS.find((b) => b.key === event.key)
      if (button) {
        event.preventDefault()
        void rate(button.grade)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, revealed, isFinished])

  if (queue === null) {
    return <p className="text-slate-500">Caricamento…</p>
  }

  if (queue.length === 0) {
    return (
      <section>
        <h1 className="text-2xl font-bold">Vocabolario</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Nessuna carta da rivedere al momento. Torna più tardi, o completa prima l'onboarding
          dalla Home se non l'hai ancora fatto.
        </p>
      </section>
    )
  }

  if (isFinished) {
    return (
      <section>
        <h1 className="text-2xl font-bold">Sessione completata</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Hai rivisto {queue.length} {queue.length === 1 ? 'carta' : 'carte'}. A presto!
        </p>
      </section>
    )
  }

  if (!current) return null
  const language = LANGUAGES[current.card.language]

  return (
    <section className="max-w-prose">
      <p
        className={`font-medium ${language.accentFontClass}`}
        style={{ color: language.color }}
      >
        {language.flag} {language.name} · carta {index + 1} di {queue.length}
        {current.isNew ? ' · nuova' : ''}
      </p>

      <p className="mt-6 text-xl">{current.card.exampleL2}</p>
      <button
        type="button"
        onClick={() => speak(current.card.exampleL2, current.card.language)}
        aria-label="Ripeti l'audio"
        className="mt-2 text-sm underline hover:text-slate-900 dark:hover:text-white"
      >
        🔊 Ripeti
      </button>

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="mt-6 block rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
        >
          Mostra risposta (Spazio)
        </button>
      ) : (
        <div role="status" aria-live="polite">
          <p className="mt-6 text-lg font-medium">{current.card.translationIt}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {RATING_BUTTONS.map((button) => (
              <button
                key={button.grade}
                type="button"
                onClick={() => rate(button.grade)}
                className="rounded border border-slate-300 px-3 py-2 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                {button.label}{' '}
                <span className="text-slate-400 dark:text-slate-500">({button.key})</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
