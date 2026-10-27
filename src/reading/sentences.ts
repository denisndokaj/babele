/**
 * Divide un testo incollato in unità leggibili (una per traduzione/TTS): prima per riga
 * (utile per poesie, dove spesso non c'è punteggiatura di fine riga), poi per frase
 * all'interno di ogni riga che contiene più frasi (utile per la prosa).
 */
export function splitIntoChunks(text: string): string[] {
  const lines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)

  const chunks: string[] = []
  for (const line of lines) {
    const sentences = line
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean)
    chunks.push(...(sentences.length > 1 ? sentences : [line]))
  }

  return chunks
}
