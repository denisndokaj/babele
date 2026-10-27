import { classifyWord, type WordStatus, type WordStatusIndex } from './wordStatus'

interface ClickableChunkProps {
  text: string
  statusIndex: WordStatusIndex
  onWordClick: (word: string) => void
}

const WORD_SPLIT_RE = /([\p{L}\p{N}]+'?[\p{L}\p{N}]*)/gu

const STATUS_CLASS: Record<WordStatus, string> = {
  nuova: 'hover:bg-yellow-200 dark:hover:bg-yellow-900',
  'in-apprendimento':
    'text-amber-700 dark:text-amber-400 hover:bg-yellow-200 dark:hover:bg-yellow-900',
  nota: 'text-green-700 dark:text-green-400 hover:bg-yellow-200 dark:hover:bg-yellow-900',
}

/** Testo con ogni parola cliccabile e colorata secondo lo stato (nuova/in apprendimento/nota). */
export function ClickableChunk({ text, statusIndex, onWordClick }: ClickableChunkProps) {
  const parts = text.split(WORD_SPLIT_RE)

  return (
    <span>
      {parts.map((part, i) => {
        if (!/^[\p{L}\p{N}]/u.test(part)) return <span key={i}>{part}</span>
        const status = classifyWord(part, statusIndex)
        return (
          <button
            key={i}
            type="button"
            onClick={() => onWordClick(part)}
            className={`rounded px-0.5 ${STATUS_CLASS[status]}`}
          >
            {part}
          </button>
        )
      })}
    </span>
  )
}
