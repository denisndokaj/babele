import { useEffect, useRef, useState } from 'react'
import { ClickableSubtitle } from '../media/ClickableSubtitle'
import { addWordCard } from '../media/addWordCard'
import { getKnownLemmas } from '../media/knownLemmas'
import { isRecordingSupported, recordAudio, type ActiveRecording } from '../media/shadowing'
import { extractVideoId, loadYouTubeApi, type YouTubePlayer } from '../media/youtube'
import { classifyCoverage, estimateCoverage } from '../subtitles/coverage'
import { findCueAt, parseSubtitles, type SubtitleCue } from '../subtitles/parser'
import { MEDIA_CATALOG } from '../content/media/catalog'
import { LANGUAGE_CODES, LANGUAGES } from '../languages'
import { useActivityTimer } from '../stats/activityTimer'
import type { LanguageCode } from '../types/models'

type VideoSource = { kind: 'file'; url: string } | { kind: 'youtube'; videoId: string }

type SubtitleMode = 'l2' | 'it' | 'both' | 'off'

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25]

const COVERAGE_LABEL: Record<string, string> = {
  'troppo-facile': 'Troppo facile',
  giusto: 'Livello giusto',
  'troppo-difficile': 'Troppo difficile',
}

export function AscoltaGuarda() {
  const [language, setLanguage] = useState<LanguageCode>('fr')
  useActivityTimer(language, 'input')
  const [source, setSource] = useState<VideoSource | null>(null)
  const [cuesL2, setCuesL2] = useState<SubtitleCue[]>([])
  const [cuesIt, setCuesIt] = useState<SubtitleCue[]>([])
  const [subtitleMode, setSubtitleMode] = useState<SubtitleMode>('l2')
  const [intensive, setIntensive] = useState(false)
  const [rate, setRate] = useState(1)
  const [currentMs, setCurrentMs] = useState(0)
  const [knownLemmas, setKnownLemmas] = useState<Set<string>>(new Set())
  const [addedMessage, setAddedMessage] = useState<string | null>(null)
  const [youtubeInput, setYoutubeInput] = useState('')
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'ready'>('idle')
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const ytPlayerRef = useRef<YouTubePlayer | null>(null)
  const activeRecordingRef = useRef<ActiveRecording | null>(null)
  const lastAutoPausedCueRef = useRef<number | null>(null)

  useEffect(() => {
    void getKnownLemmas(language).then(setKnownLemmas)
  }, [language])

  useEffect(() => {
    if (source?.kind !== 'youtube') return
    let pollId: number | undefined

    void loadYouTubeApi().then(() => {
      if (!window.YT) return
      ytPlayerRef.current = new window.YT.Player('yt-player', {
        videoId: source.videoId,
        events: {
          onReady: () => {
            pollId = window.setInterval(() => {
              const player = ytPlayerRef.current
              if (player) setCurrentMs(player.getCurrentTime() * 1000)
            }, 200)
          },
        },
      })
    })

    return () => {
      if (pollId) window.clearInterval(pollId)
      ytPlayerRef.current?.destroy()
      ytPlayerRef.current = null
    }
  }, [source])

  const currentCueL2 = findCueAt(cuesL2, currentMs)
  const currentCueIt = findCueAt(cuesIt, currentMs)
  const coverage = cuesL2.length > 0 ? estimateCoverage(cuesL2, knownLemmas) : null

  useEffect(() => {
    if (!intensive || !currentCueL2) return
    if (currentMs < currentCueL2.endMs - 100) return
    if (lastAutoPausedCueRef.current === currentCueL2.index) return
    lastAutoPausedCueRef.current = currentCueL2.index
    if (source?.kind === 'file') videoRef.current?.pause()
    else ytPlayerRef.current?.pauseVideo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMs, intensive])

  function seekTo(ms: number) {
    if (source?.kind === 'file' && videoRef.current) {
      videoRef.current.currentTime = ms / 1000
    } else if (source?.kind === 'youtube') {
      ytPlayerRef.current?.seekTo(ms / 1000, true)
      setCurrentMs(ms)
    }
  }

  function changeRate(nextRate: number) {
    setRate(nextRate)
    if (source?.kind === 'file' && videoRef.current) videoRef.current.playbackRate = nextRate
    else ytPlayerRef.current?.setPlaybackRate(nextRate)
  }

  function goToAdjacentCue(direction: 1 | -1) {
    if (!currentCueL2 || cuesL2.length === 0) return
    const index = cuesL2.findIndex((c) => c.index === currentCueL2.index)
    const next = cuesL2[index + direction]
    if (next) seekTo(next.startMs)
  }

  function repeatCue() {
    if (currentCueL2) seekTo(currentCueL2.startMs)
  }

  async function handleVideoFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setSource({ kind: 'file', url: URL.createObjectURL(file) })
  }

  async function handleSubtitleFile(which: 'l2' | 'it', event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const cues = parseSubtitles(text, file.name)
    if (which === 'l2') setCuesL2(cues)
    else setCuesIt(cues)
  }

  function loadYoutube() {
    const videoId = extractVideoId(youtubeInput)
    if (!videoId) return
    setSource({ kind: 'youtube', videoId })
  }

  async function handleWordClick(word: string) {
    if (!currentCueL2) return
    const result = await addWordCard({
      language,
      word: word.toLowerCase(),
      sentenceL2: currentCueL2.text,
      sentenceIt: currentCueIt?.text,
      source: `${source?.kind === 'youtube' ? `youtube:${source.videoId}` : 'video-locale'}@${Math.round(currentCueL2.startMs / 1000)}s`,
    })
    setAddedMessage(
      result === 'added' ? `"${word}" aggiunta all'SRS.` : `"${word}" è già nel tuo mazzo.`,
    )
    setKnownLemmas((current) => new Set(current).add(word.toLowerCase()))
  }

  async function toggleRecording() {
    if (recordingState === 'recording') {
      activeRecordingRef.current?.stop()
      setRecordingState('ready')
      return
    }
    try {
      setRecordingState('recording')
      activeRecordingRef.current = await recordAudio((url) => setRecordingUrl(url))
    } catch {
      setRecordingState('idle')
      setAddedMessage('Microfono non disponibile: controlla i permessi del browser.')
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Ascolta & guarda</h1>

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <label className="flex items-center gap-2">
          <span className="text-sm">Lingua</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageCode)}
            className="rounded border border-slate-400 bg-transparent px-2 py-1 dark:border-slate-600"
          >
            {LANGUAGE_CODES.map((code) => (
              <option key={code} value={code}>
                {LANGUAGES[code].flag} {LANGUAGES[code].name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex w-full flex-wrap items-center gap-2 text-sm sm:w-auto">
          Video locale
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoFile}
            aria-label="Carica video locale"
            className="min-w-0 max-w-full"
          />
        </label>

        <div className="flex w-full flex-wrap items-center gap-2 text-sm sm:w-auto">
          <input
            type="text"
            value={youtubeInput}
            onChange={(e) => setYoutubeInput(e.target.value)}
            placeholder="Link o id YouTube"
            aria-label="Link o id YouTube"
            className="min-w-0 flex-1 rounded border border-slate-400 bg-transparent px-2 py-1 dark:border-slate-600 sm:flex-none"
          />
          <button type="button" onClick={loadYoutube} className="rounded border border-slate-400 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
            Carica
          </button>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-4 text-sm">
        <label className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          Sottotitoli L2
          <input
            type="file"
            accept=".srt,.vtt"
            onChange={(e) => handleSubtitleFile('l2', e)}
            aria-label="Carica sottotitoli nella lingua target"
            className="min-w-0 max-w-full"
          />
        </label>
        <label className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          Sottotitoli IT
          <input
            type="file"
            accept=".srt,.vtt"
            onChange={(e) => handleSubtitleFile('it', e)}
            aria-label="Carica sottotitoli in italiano"
            className="min-w-0 max-w-full"
          />
        </label>
      </div>

      {coverage !== null && (
        <p className="mt-2 text-sm">
          Copertura lessicale stimata: <strong>{Math.round(coverage * 100)}%</strong> —{' '}
          {COVERAGE_LABEL[classifyCoverage(coverage)]}
        </p>
      )}

      {source && (
        <div className="mt-4 max-w-2xl">
          {source.kind === 'file' ? (
            <video
              ref={videoRef}
              src={source.url}
              controls
              onTimeUpdate={(e) => setCurrentMs(e.currentTarget.currentTime * 1000)}
              className="w-full rounded bg-black"
            />
          ) : (
            <div id="yt-player" className="aspect-video w-full" />
          )}

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <button type="button" onClick={() => goToAdjacentCue(-1)} className="rounded border border-slate-400 px-2 py-1 dark:border-slate-600">
              ◀ Battuta
            </button>
            <button type="button" onClick={repeatCue} className="rounded border border-slate-400 px-2 py-1 dark:border-slate-600">
              ↻ Ripeti
            </button>
            <button type="button" onClick={() => goToAdjacentCue(1)} className="rounded border border-slate-400 px-2 py-1 dark:border-slate-600">
              Battuta ▶
            </button>

            {PLAYBACK_RATES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => changeRate(r)}
                className={`rounded border px-2 py-1 ${rate === r ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900' : 'border-slate-400 dark:border-slate-600'}`}
              >
                {r}×
              </button>
            ))}

            <label className="ml-2 flex items-center gap-1">
              <input type="checkbox" checked={intensive} onChange={(e) => setIntensive(e.target.checked)} />
              Modalità intensiva (pausa a fine battuta)
            </label>
          </div>

          <div className="mt-2 flex gap-2 text-sm" role="radiogroup" aria-label="Sottotitoli">
            {(['l2', 'it', 'both', 'off'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                role="radio"
                aria-checked={subtitleMode === mode}
                onClick={() => setSubtitleMode(mode)}
                className={`rounded px-2 py-1 ${subtitleMode === mode ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'border border-slate-400 dark:border-slate-600'}`}
              >
                {{ l2: 'L2', it: 'IT', both: 'Doppi', off: 'Spenti' }[mode]}
              </button>
            ))}
          </div>

          <div className="mt-3 min-h-16">
            {subtitleMode !== 'off' && currentCueL2 && (subtitleMode === 'l2' || subtitleMode === 'both') && (
              <ClickableSubtitle text={currentCueL2.text} onWordClick={handleWordClick} />
            )}
            {subtitleMode !== 'off' && currentCueIt && (subtitleMode === 'it' || subtitleMode === 'both') && (
              <p className="text-slate-500">{currentCueIt.text}</p>
            )}
          </div>
          {addedMessage && (
            <p role="status" aria-live="polite" className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {addedMessage}
            </p>
          )}

          <div className="mt-4 rounded border border-slate-200 p-3 dark:border-slate-700">
            <h2 className="font-semibold">Shadowing</h2>
            {isRecordingSupported() ? (
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className="rounded bg-slate-900 px-3 py-1 text-white dark:bg-slate-100 dark:text-slate-900"
                >
                  {recordingState === 'recording' ? 'Stop' : 'Registra la tua voce'}
                </button>
                {recordingUrl && (
                  <audio controls src={recordingUrl}>
                    <track kind="captions" />
                  </audio>
                )}
              </div>
            ) : (
              <p className="mt-1 text-sm text-slate-500">
                La registrazione non è supportata da questo browser.
              </p>
            )}
          </div>
        </div>
      )}

      <h2 className="mt-8 text-lg font-semibold">Catalogo iniziale</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Canali gratuiti e legali, verificati uno per uno. Si apre il video sulla piattaforma
        originale: Babele non scarica né ospita nulla.
      </p>
      <ul className="mt-3 space-y-2">
        {MEDIA_CATALOG.filter((entry) => entry.language === language).map((entry) => (
          <li key={entry.url} className="rounded border border-slate-200 p-3 dark:border-slate-700">
            <a href={entry.url} target="_blank" rel="noreferrer" className="font-medium underline">
              {entry.title}
            </a>
            <span className="ml-2 text-sm text-slate-500">{entry.levels.join('/')}</span>
            <p className="text-sm text-slate-600 dark:text-slate-300">{entry.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
