import { useEffect, useRef } from 'react'
import type { LanguageCode } from '../types/models'
import { recordActivityMinutes, type ActivityKind } from './dailyStats'

const TICK_MS = 1000
const FLUSH_INTERVAL_MS = 20_000

/**
 * Misura il tempo passato su una pagina di input (ascolto/lettura) o output (scrittura/
 * produzione orale) e lo registra in `dailyStats` (§6.13 SPEC). Conta solo mentre la
 * scheda è visibile (`document.visibilityState`), con un flush periodico (oltre a quello
 * allo smontaggio) perché su mobile il browser può terminare la pagina senza eseguire la
 * pulizia degli effect.
 */
export function useActivityTimer(language: LanguageCode, kind: ActivityKind): void {
  const accumulatedMsRef = useRef(0)
  const lastTickRef = useRef<number | null>(null)

  useEffect(() => {
    lastTickRef.current = Date.now()

    function tick() {
      const now = Date.now()
      if (lastTickRef.current !== null && document.visibilityState === 'visible') {
        accumulatedMsRef.current += now - lastTickRef.current
      }
      lastTickRef.current = now
    }

    function flush() {
      tick()
      const minutes = accumulatedMsRef.current / 60_000
      accumulatedMsRef.current = 0
      if (minutes > 0) void recordActivityMinutes(language, kind, minutes)
    }

    const tickTimer = setInterval(tick, TICK_MS)
    const flushTimer = setInterval(flush, FLUSH_INTERVAL_MS)
    document.addEventListener('visibilitychange', tick)
    window.addEventListener('pagehide', flush)

    return () => {
      clearInterval(tickTimer)
      clearInterval(flushTimer)
      document.removeEventListener('visibilitychange', tick)
      window.removeEventListener('pagehide', flush)
      flush()
    }
  }, [language, kind])
}
