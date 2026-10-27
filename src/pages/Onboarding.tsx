import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LANGUAGE_CODES, LANGUAGES } from '../languages'
import type { LanguageCode, CEFRLevel } from '../types/models'
import type { VocabularyEntry } from '../types/content'
import { loadVocabulary } from '../content/vocabulary'
import {
  bandCount,
  buildQuizForBand,
  computeLevel,
  scoreAnswers,
  splitIntoBands,
  type QuizAnswer,
  type QuizItem,
} from '../onboarding/levelTest'
import { seedCardsForLanguage } from '../onboarding/seed'
import { saveOnboardingProfile } from '../settings/settings'

interface QuizState {
  languageIndex: number
  bands: VocabularyEntry[][]
  allEntries: VocabularyEntry[]
  bandIndex: number
  items: QuizItem[]
  itemIndex: number
  bandScoresSoFar: number[]
  answersSoFar: QuizAnswer[]
}

type Step =
  | { phase: 'select-languages' }
  | { phase: 'loading' }
  | { phase: 'quiz'; quiz: QuizState }
  | { phase: 'seeding' }
  | { phase: 'done' }
  | { phase: 'error'; message: string }

interface LanguageResult {
  level: CEFRLevel
  knownCount: number
  cardsCreated: number
}

async function startLanguageQuiz(languageIndex: number, language: LanguageCode): Promise<Step> {
  const allEntries = await loadVocabulary(language)
  const bands = splitIntoBands(allEntries)
  const items = buildQuizForBand(bands[0] ?? [], allEntries, 0)
  return {
    phase: 'quiz',
    quiz: {
      languageIndex,
      bands,
      allEntries,
      bandIndex: 0,
      items,
      itemIndex: 0,
      bandScoresSoFar: [],
      answersSoFar: [],
    },
  }
}

export function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>({ phase: 'select-languages' })
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageCode[]>([])
  const [priorityLanguage, setPriorityLanguage] = useState<LanguageCode | null>(null)
  const [results, setResults] = useState<Partial<Record<LanguageCode, LanguageResult>>>({})
  const answeringRef = useRef(false)

  function toggleLanguage(code: LanguageCode) {
    setSelectedLanguages((current) => {
      const next = current.includes(code)
        ? current.filter((c) => c !== code)
        : [...current, code]
      if (!next.includes(priorityLanguage as LanguageCode)) {
        setPriorityLanguage(next[0] ?? null)
      }
      return next
    })
  }

  async function beginQuizzes() {
    if (selectedLanguages.length === 0 || !priorityLanguage) return
    setStep({ phase: 'loading' })
    try {
      const next = await startLanguageQuiz(0, selectedLanguages[0] as LanguageCode)
      setStep(next)
    } catch {
      setStep({
        phase: 'error',
        message:
          'Non riesco a caricare il vocabolario. Verifica di aver eseguito "npm run data:build".',
      })
    }
  }

  async function finishLanguage(quiz: QuizState, lastBandAnswers: QuizAnswer[]) {
    if (!priorityLanguage) return
    const language = selectedLanguages[quiz.languageIndex] as LanguageCode
    const allAnswers = [...quiz.answersSoFar, ...lastBandAnswers]
    const lastScore = scoreAnswers(lastBandAnswers)
    const bandScores = [...quiz.bandScoresSoFar, lastScore]
    const { level, knownLemmas } = computeLevel(bandScores, quiz.bands, allAnswers)

    const cardsCreated = await seedCardsForLanguage(language, quiz.allEntries, knownLemmas)
    setResults((current) => ({
      ...current,
      [language]: { level, knownCount: knownLemmas.size, cardsCreated },
    }))

    const nextLanguageIndex = quiz.languageIndex + 1
    if (nextLanguageIndex < selectedLanguages.length) {
      setStep({ phase: 'loading' })
      try {
        const next = await startLanguageQuiz(
          nextLanguageIndex,
          selectedLanguages[nextLanguageIndex] as LanguageCode,
        )
        setStep(next)
      } catch {
        setStep({
          phase: 'error',
          message:
            'Non riesco a caricare il vocabolario. Verifica di aver eseguito "npm run data:build".',
        })
      }
      return
    }

    setStep({ phase: 'seeding' })
    await saveOnboardingProfile({
      completed: true,
      activeLanguages: selectedLanguages,
      priorityLanguage,
      levels: Object.fromEntries(
        Object.entries({ ...results, [language]: { level, knownCount: 0, cardsCreated: 0 } }).map(
          ([lang, r]) => [lang, r.level],
        ),
      ) as Partial<Record<LanguageCode, CEFRLevel>>,
    })
    setStep({ phase: 'done' })
  }

  async function answerItem(quiz: QuizState, chosen: string) {
    // Protegge da doppi click/tasti: senza questo lock una risposta può essere elaborata
    // due volte in sovrapposizione (visto in test), duplicando il seeding delle carte.
    if (answeringRef.current) return
    answeringRef.current = true
    try {
      await answerItemUnguarded(quiz, chosen)
    } finally {
      answeringRef.current = false
    }
  }

  async function answerItemUnguarded(quiz: QuizState, chosen: string) {
    const item = quiz.items[quiz.itemIndex]
    if (!item) return
    const answered = [...quiz.answersSoFar]
    const bandAnswers =
      quiz.itemIndex === 0 ? [] : answered.slice(answered.length - quiz.itemIndex)
    const thisBandAnswers = [...bandAnswers, { item, chosen }]

    if (quiz.itemIndex + 1 < quiz.items.length) {
      setStep({
        phase: 'quiz',
        quiz: {
          ...quiz,
          itemIndex: quiz.itemIndex + 1,
          answersSoFar: [...quiz.answersSoFar, { item, chosen }],
        },
      })
      return
    }

    const bandScore = scoreAnswers(thisBandAnswers)
    const nextBandIndex = quiz.bandIndex + 1
    const isLastBand = nextBandIndex >= bandCount()

    if (bandScore < 0.75 || isLastBand) {
      await finishLanguage(quiz, thisBandAnswers)
      return
    }

    const nextItems = buildQuizForBand(quiz.bands[nextBandIndex] ?? [], quiz.allEntries, nextBandIndex)
    setStep({
      phase: 'quiz',
      quiz: {
        ...quiz,
        bandIndex: nextBandIndex,
        items: nextItems,
        itemIndex: 0,
        bandScoresSoFar: [...quiz.bandScoresSoFar, bandScore],
        answersSoFar: [...quiz.answersSoFar, { item, chosen }],
      },
    })
  }

  if (step.phase === 'select-languages') {
    return (
      <section className="max-w-prose">
        <h1 className="text-2xl font-bold">Benvenuto in Babele</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Scegli le lingue su cui vuoi lavorare e quale seguire come prioritaria: prenderà circa
          metà del tempo di ogni sessione.
        </p>

        <fieldset className="mt-6 space-y-3">
          <legend className="font-medium">Lingue attive</legend>
          {LANGUAGE_CODES.map((code) => (
            <label key={code} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedLanguages.includes(code)}
                onChange={() => toggleLanguage(code)}
              />
              <span>
                {LANGUAGES[code].flag} {LANGUAGES[code].name}
              </span>
            </label>
          ))}
        </fieldset>

        {selectedLanguages.length > 0 && (
          <fieldset className="mt-6 space-y-3">
            <legend className="font-medium">Lingua prioritaria</legend>
            {selectedLanguages.map((code) => (
              <label key={code} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  checked={priorityLanguage === code}
                  onChange={() => setPriorityLanguage(code)}
                />
                <span>
                  {LANGUAGES[code].flag} {LANGUAGES[code].name}
                </span>
              </label>
            ))}
          </fieldset>
        )}

        <button
          type="button"
          disabled={selectedLanguages.length === 0 || !priorityLanguage}
          onClick={beginQuizzes}
          className="mt-8 rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
        >
          Inizia il test di livello
        </button>
      </section>
    )
  }

  if (step.phase === 'loading' || step.phase === 'seeding') {
    return <p className="text-slate-500">Caricamento…</p>
  }

  if (step.phase === 'error') {
    return <p className="text-red-600 dark:text-red-400">{step.message}</p>
  }

  if (step.phase === 'quiz') {
    const { quiz } = step
    const language = selectedLanguages[quiz.languageIndex] as LanguageCode
    const item = quiz.items[quiz.itemIndex]
    if (!item) return null

    return (
      <section className="max-w-prose">
        <p className={`font-medium ${LANGUAGES[language].accentFontClass}`} style={{ color: LANGUAGES[language].color }}>
          {LANGUAGES[language].flag} {LANGUAGES[language].name} — banda {quiz.bandIndex + 1} di{' '}
          {bandCount()}
        </p>
        <h1 className="mt-2 text-xl font-bold">Qual è la traduzione di questa frase?</h1>
        <p className="mt-4 text-lg">{item.exampleL2}</p>

        <div className="mt-6 grid gap-3">
          {item.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => answerItem(quiz, option)}
              className="rounded border border-slate-300 px-4 py-2 text-left hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
            >
              {option}
            </button>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-prose">
      <h1 className="text-2xl font-bold">Pronto a cominciare</h1>
      <ul className="mt-4 space-y-2">
        {selectedLanguages.map((code) => {
          const result = results[code]
          return (
            <li key={code}>
              <span className={LANGUAGES[code].accentFontClass} style={{ color: LANGUAGES[code].color }}>
                {LANGUAGES[code].flag} {LANGUAGES[code].name}
              </span>
              : livello stimato {result?.level ?? '—'}, {result?.knownCount ?? 0} parole già note,{' '}
              {result?.cardsCreated ?? 0} carte pronte per iniziare.
            </li>
          )
        })}
      </ul>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-8 rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
      >
        Vai alla Home
      </button>
    </section>
  )
}
