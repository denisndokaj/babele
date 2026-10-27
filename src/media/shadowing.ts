export function isRecordingSupported(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    typeof navigator.mediaDevices?.getUserMedia === 'function' &&
    typeof MediaRecorder !== 'undefined'
  )
}

export interface ActiveRecording {
  stop: () => void
}

/** Registra dal microfono e restituisce un URL locale (blob) alla fine, per il confronto con l'originale. */
export async function recordAudio(onStop: (blobUrl: string) => void): Promise<ActiveRecording> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const recorder = new MediaRecorder(stream)
  const chunks: Blob[] = []

  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) chunks.push(event.data)
  }
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })
    onStop(URL.createObjectURL(blob))
    for (const track of stream.getTracks()) track.stop()
  }

  recorder.start()
  return { stop: () => recorder.stop() }
}
