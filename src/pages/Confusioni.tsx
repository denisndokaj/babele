import { useRef, useState } from 'react'
import { addContrastCards } from '../confusion/addContrastCards'
import { evaluateConfusionAnswer } from '../confusion/match'
import { CONFUSION_PAIRS, type ConfusionWord } from '../content/confusion/pairs'
import { incrementConfusionMistake } from '../settings/settings'

const INTERFERENCE_THRESHOLD = 2

function labelFor(word: ConfusionWord): string {
  if (word.language === 'it') return 'italiano'
  return { fr: 'francese', de: 'tedesco', es: 'spagnolo' }[word.language]
}

interface QuizStep {
  pairIndex: number
  side: 'A' | 'B'
}

function buildQuizPlan(): QuizStep[] {
  return CONFUSION_PAIRS.map((_, pairIndex) => ({
    pairIndex,
    side: Math.random() < 0.5 ? 'A' : ('B' as const),
  }))
}

export function Confusioni() {
  const [mode, setMode] = useState<'elenco' | 'esercizio'>('elenco')
  const [plan] = useState<QuizStep[]>(buildQuizPlan)
  const [stepIndex, setStepIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'interference' | 'wrong' | null>(null)
  const [repeatedInterference, setRepeatedInterference] = useState(false)
  const [score, setScore] = useState(0)
  const [addedMessage, setAddedMessage] = useState<string | null>(null)
  const submittingRef = useRef(false)

  const step = plan[stepIndex]
  const pair = step ? CONFUSION_PAIRS[step.pairIndex] : undefined
  const target = step && pair ? (step.side === 'A' ? pair.wordA : pair.wordB) : undefined
  const isFinished = stepIndex >= plan.length

  async function handleAddContrast(pairId: string) {
    const target = CONFUSION_PAIRS.find((p) => p.id === pairId)
    if (!target) return
    const added = await addContrastCards(target)
    setAddedMessage(
      added > 0
        ? `Coppia di contrasto aggiunta all'SRS (${added} ${added === 1 ? 'carta' : 'carte'}).`
        : 'Questa coppia è già nel tuo mazzo.',
    )
  }

  async function submitAnswer() {
    if (submittingRef.current || feedback !== null || !pair || !step) return
    submittingRef.current = true
    try {
      const evaluation = evaluateConfusionAnswer(answer, pair, step.side)
      setFeedback(evaluation)
      if (evaluation === 'correct') setScore((s) => s + 1)
      if (evaluation === 'interference') {
        const count = await incrementConfusionMistake(pair.id)
        setRepeatedInterference(count >= INTERFERENCE_THRESHOLD)
      } else {
        setRepeatedInterference(false)
      }
    } finally {
      submittingRef.current = false
    }
  }

  function goToNext() {
    setFeedback(null)
    setAnswer('')
    setRepeatedInterference(false)
    setStepIndex((i) => i + 1)
  }

  if (mode === 'esercizio') {
    if (isFinished) {
      return (
        <section className="max-w-prose">
          <h1 className="text-2xl font-bold">Esercizio completato</h1>
          <p className="mt-4">
            Risposte corrette: {score} su {plan.length}.
          </p>
          <button
            type="button"
            onClick={() => setMode('elenco')}
            className="mt-4 rounded bg-slate-900 px-4 py-2 text-white dark:bg-slate-100 dark:text-slate-900"
          >
            Torna all'elenco
          </button>
        </section>
      )
    }

    if (!pair || !target || !step) return null

    return (
      <section className="max-w-prose">
        <button type="button" onClick={() => setMode('elenco')} className="text-sm underline">
          ← Torna all'elenco
        </button>
        <h1 className="mt-4 text-2xl font-bold">Confusioni — esercizio</h1>
        <p className="mt-2 text-sm text-slate-500">
          Domanda {stepIndex + 1} di {plan.length}
        </p>

        <p className="mt-4 text-lg">
          Cosa significa <strong>«{target.word}»</strong> in {labelFor(target)}?
        </p>
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            void submitAnswer()
          }}
        >
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={feedback !== null}
            aria-label="Il tuo significato in italiano"
            className="flex-1 rounded border border-slate-400 bg-transparent px-3 py-2 dark:border-slate-600"
            autoFocus
          />
          <button
            type="submit"
            disabled={feedback !== null || !answer.trim()}
            className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
          >
            Verifica
          </button>
        </form>

        {feedback && (
          <div role="status" aria-live="polite" className="mt-4">
            {feedback === 'correct' && <p className="text-green-700 dark:text-green-400">Corretto!</p>}
            {feedback === 'wrong' && (
              <p className="text-red-700 dark:text-red-400">
                Non corretto. «{target.word}» significa: {target.meaningIt}.
              </p>
            )}
            {feedback === 'interference' && (
              <div className="text-amber-700 dark:text-amber-400">
                <p>
                  Hai risposto con il significato di un'altra parola: «{target.word}» significa{' '}
                  <strong>{target.meaningIt}</strong>, non quello che stai pensando.
                </p>
                {repeatedInterference && (
                  <div className="mt-2 rounded border border-amber-400 p-3">
                    <p>Hai confuso questa coppia più di una volta: vuoi aggiungerla come carta di contrasto all'SRS?</p>
                    <button
                      type="button"
                      onClick={() => void handleAddContrast(pair.id)}
                      className="mt-2 rounded bg-amber-600 px-3 py-1 text-white"
                    >
                      Aggiungi la coppia di contrasto
                    </button>
                  </div>
                )}
              </div>
            )}
            {addedMessage && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{addedMessage}</p>}
            <button
              type="button"
              onClick={goToNext}
              className="mt-3 rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
            >
              {stepIndex + 1 < plan.length ? 'Avanti' : 'Vedi il risultato'}
            </button>
          </div>
        )}
      </section>
    )
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Confusioni</h1>
      <p className="mt-2 max-w-prose text-slate-600 dark:text-slate-300">
        Falsi amici e interferenze reali tra italiano, francese, tedesco e spagnolo. Se durante
        l'esercizio confondi una coppia più di una volta, te lo segnalo e ti propongo di
        aggiungerla all'SRS come carta di contrasto.
      </p>

      <button
        type="button"
        onClick={() => setMode('esercizio')}
        className="mt-4 rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
      >
        Fai l'esercizio di discriminazione
      </button>

      <ul className="mt-6 space-y-3">
        {CONFUSION_PAIRS.map((pair) => (
          <li key={pair.id} className="rounded border border-slate-200 p-4 dark:border-slate-700">
            <p>
              <strong>{pair.wordA.word}</strong> ({labelFor(pair.wordA)}) = {pair.wordA.meaningIt}
              {' · '}
              <strong>{pair.wordB.word}</strong> ({labelFor(pair.wordB)}) = {pair.wordB.meaningIt}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{pair.note}</p>
            <button
              type="button"
              onClick={() => void handleAddContrast(pair.id)}
              className="mt-2 text-sm underline hover:text-slate-900 dark:hover:text-white"
            >
              Aggiungi come carta di contrasto
            </button>
          </li>
        ))}
      </ul>
      {addedMessage && (
        <p role="status" aria-live="polite" className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          {addedMessage}
        </p>
      )}
    </section>
  )
}
