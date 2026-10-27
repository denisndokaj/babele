export interface TatoebaSentence {
  id: number
  text: string
  username?: string
}

/** `{id}_sentences.tsv`: id \t lang \t text. `_detailed` aggiunge \t username \t date \t date. */
export function parseSentences(raw: string): Map<number, TatoebaSentence> {
  const sentences = new Map<number, TatoebaSentence>()

  for (const line of raw.split('\n')) {
    if (!line) continue
    const columns = line.split('\t')
    const id = Number(columns[0])
    const text = columns[2]
    if (Number.isNaN(id) || !text) continue

    const username = columns[3]
    sentences.set(id, {
      id,
      text,
      username: username && username !== '\\N' ? username : undefined,
    })
  }

  return sentences
}

/** `{langA}-{langB}_links.tsv`: id in langA \t id in langB (una riga per coppia tradotta). */
export function parseLinks(raw: string): Array<[number, number]> {
  const links: Array<[number, number]> = []

  for (const line of raw.split('\n')) {
    if (!line) continue
    const [a, b] = line.split('\t')
    const idA = Number(a)
    const idB = Number(b)
    if (Number.isNaN(idA) || Number.isNaN(idB)) continue
    links.push([idA, idB])
  }

  return links
}
