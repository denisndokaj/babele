import { useMemo, useRef, useState } from 'react'
import { checkAnswer } from './checkAnswer'
import type { GrammarExercise } from '../types/grammarContent'

interface ExerciseRunnerProps {
  exercises: GrammarExercise[]
  onFinish: (score: number, total: number) => void
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j] as T, result[i] as T]
  }
  return result
}

export function ExerciseRunner({ exercises, onFinish }: ExerciseRunnerProps) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [textInput, setTextInput] = useState('')
  const [reorderChoice, setReorderChoice] = useState<number[]>([])
  const submittingRef = useRef(false)

  const exercise = exercises[index]

  const shuffledWords = useMemo(() => {
    if (exercise?.payload.type !== 'reorder') return []
    return shuffle(exercise.payload.words)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise?.id])

  if (!exercise) return null
  const payload = exercise.payload

  function advance(correct: boolean) {
    const nextScore = score + (correct ? 1 : 0)
    setScore(nextScore)
    setFeedback(correct ? 'correct' : 'incorrect')
  }

  function goToNext() {
    setFeedback(null)
    setTextInput('')
    setReorderChoice([])
    if (index + 1 < exercises.length) {
      setIndex(index + 1)
    } else {
      onFinish(score, exercises.length)
    }
  }

  function submit(response: string | string[]) {
    if (submittingRef.current || feedback !== null) return
    submittingRef.current = true
    advance(checkAnswer(payload, response))
    submittingRef.current = false
  }

  return (
    <div className="max-w-prose">
      <p className="text-sm text-slate-500">
        Esercizio {index + 1} di {exercises.length} · punteggio {score}/{index + (feedback ? 1 : 0)}
      </p>

      {payload.type === 'multiple-choice' && (
        <div className="mt-4">
          <p className="text-lg">{payload.question}</p>
          <div className="mt-3 grid gap-2">
            {payload.options.map((option) => (
              <button
                key={option}
                type="button"
                disabled={feedback !== null}
                onClick={() => submit(option)}
                className="rounded border border-slate-300 px-4 py-2 text-left hover:bg-slate-100 disabled:opacity-60 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {payload.type === 'cloze' && (
        <div className="mt-4">
          <p className="text-lg">{payload.sentence}</p>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              submit(textInput)
            }}
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={feedback !== null}
              aria-label="La tua risposta"
              className="flex-1 rounded border border-slate-400 bg-transparent px-3 py-2 dark:border-slate-600"
              autoFocus
            />
            <button
              type="submit"
              disabled={feedback !== null || !textInput.trim()}
              className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
            >
              Verifica
            </button>
          </form>
        </div>
      )}

      {payload.type === 'translation-it-l2' && (
        <div className="mt-4">
          <p className="text-lg">Traduci: «{payload.promptIt}»</p>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              submit(textInput)
            }}
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={feedback !== null}
              aria-label="La tua traduzione"
              className="flex-1 rounded border border-slate-400 bg-transparent px-3 py-2 dark:border-slate-600"
              autoFocus
            />
            <button
              type="submit"
              disabled={feedback !== null || !textInput.trim()}
              className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
            >
              Verifica
            </button>
          </form>
        </div>
      )}

      {payload.type === 'conjugation' && (
        <div className="mt-4">
          <p className="text-lg">
            {payload.infinitive} — {payload.pronoun}
          </p>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              submit(textInput)
            }}
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={feedback !== null}
              aria-label="La forma verbale"
              className="flex-1 rounded border border-slate-400 bg-transparent px-3 py-2 dark:border-slate-600"
              autoFocus
            />
            <button
              type="submit"
              disabled={feedback !== null || !textInput.trim()}
              className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
            >
              Verifica
            </button>
          </form>
        </div>
      )}

      {payload.type === 'reorder' && (
        <div className="mt-4">
          <p className="text-sm text-slate-500">Rimetti le parole nell'ordine giusto:</p>
          <div className="mt-2 min-h-12 rounded border border-dashed border-slate-400 p-2 dark:border-slate-600">
            {reorderChoice.length === 0 && <span className="text-slate-400">(clicca le parole qui sotto)</span>}
            {reorderChoice.map((wordIndex, position) => (
              <button
                key={position}
                type="button"
                disabled={feedback !== null}
                onClick={() => setReorderChoice((current) => current.filter((_, i) => i !== position))}
                className="mr-2 mb-2 inline-block rounded bg-slate-200 px-3 py-1 dark:bg-slate-700"
              >
                {shuffledWords[wordIndex]}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {shuffledWords.map((word, wordIndex) => (
              <button
                key={wordIndex}
                type="button"
                disabled={feedback !== null || reorderChoice.includes(wordIndex)}
                onClick={() => setReorderChoice((current) => [...current, wordIndex])}
                className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                {word}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={feedback !== null || reorderChoice.length !== shuffledWords.length}
            onClick={() => submit(reorderChoice.map((wordIndex) => shuffledWords[wordIndex] as string))}
            className="mt-3 rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
          >
            Verifica
          </button>
        </div>
      )}

      {feedback && (
        <div role="status" aria-live="polite" className="mt-4">
          <p className={feedback === 'correct' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
            {feedback === 'correct' ? 'Corretto!' : 'Non corretto.'}
            {exercise.explanation ? ` ${exercise.explanation}` : ''}
          </p>
          <button
            type="button"
            onClick={goToNext}
            className="mt-2 rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            {index + 1 < exercises.length ? 'Avanti' : 'Vedi il risultato'}
          </button>
        </div>
      )}
    </div>
  )
}
