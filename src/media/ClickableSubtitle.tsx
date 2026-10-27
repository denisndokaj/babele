interface ClickableSubtitleProps {
  text: string
  onWordClick: (word: string) => void
}

const WORD_SPLIT_RE = /([\p{L}\p{N}]+'?[\p{L}\p{N}]*)/gu

/** Sottotitolo con ogni parola cliccabile, per aggiungerla rapidamente all'SRS. */
export function ClickableSubtitle({ text, onWordClick }: ClickableSubtitleProps) {
  const parts = text.split(WORD_SPLIT_RE)

  return (
    <p className="text-lg leading-relaxed">
      {parts.map((part, i) =>
        /^[\p{L}\p{N}]/u.test(part) ? (
          <button
            key={i}
            type="button"
            onClick={() => onWordClick(part)}
            className="rounded px-0.5 hover:bg-yellow-200 hover:underline dark:hover:bg-yellow-900"
          >
            {part}
          </button>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  )
}
