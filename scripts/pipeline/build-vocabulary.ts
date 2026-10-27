import type { LanguageCode } from '../../src/types/models'
import type { VocabularyEntry } from '../../src/types/content'
import { downloadAndDecompress, downloadText } from './lib/download'
import { parseFrequencyList } from './lib/frequency'
import { parseLinks, parseSentences, type TatoebaSentence } from './lib/tatoeba'
import { isGoodExampleSentence, tokenize } from './lib/tokenize'
import { FREQUENCY_WORDS, ISO3, ITALIAN_ISO3, TATOEBA } from './sources'

const WORD_LIMIT = 2000
const MAX_SENTENCE_LENGTH = 90

/** Indice token → prima frase (nell'ordine dei link) che lo contiene e supera il filtro di qualità. */
function buildTokenIndex(
  links: Array<[number, number]>,
  italianSentences: Map<number, TatoebaSentence>,
  targetSentences: Map<number, TatoebaSentence>,
): Map<string, { it: TatoebaSentence; l2: TatoebaSentence }> {
  const index = new Map<string, { it: TatoebaSentence; l2: TatoebaSentence }>()

  for (const [itaId, l2Id] of links) {
    const l2Sentence = targetSentences.get(l2Id)
    const itSentence = italianSentences.get(itaId)
    if (!l2Sentence || !itSentence) continue
    if (!isGoodExampleSentence(l2Sentence.text, MAX_SENTENCE_LENGTH)) continue
    if (!isGoodExampleSentence(itSentence.text, MAX_SENTENCE_LENGTH)) continue

    for (const token of tokenize(l2Sentence.text)) {
      if (!index.has(token)) {
        index.set(token, { it: itSentence, l2: l2Sentence })
      }
    }
  }

  return index
}

export async function buildVocabulary(language: LanguageCode): Promise<VocabularyEntry[]> {
  const iso3 = ISO3[language]
  console.log(`[${language}] liste di frequenza`)
  const frequencyRaw = await downloadText(FREQUENCY_WORDS.urlFor(language))
  const frequency = parseFrequencyList(frequencyRaw, WORD_LIMIT)

  console.log(`[${language}] frasi Tatoeba`)
  const [targetSentencesRaw, italianSentencesRaw, linksRaw] = await Promise.all([
    downloadAndDecompress(TATOEBA.sentencesDetailedUrlFor(iso3)),
    downloadAndDecompress(TATOEBA.sentencesUrlFor(ITALIAN_ISO3)),
    downloadAndDecompress(TATOEBA.linksUrlFor(ITALIAN_ISO3, iso3)),
  ])

  const targetSentences = parseSentences(targetSentencesRaw)
  const italianSentences = parseSentences(italianSentencesRaw)
  const links = parseLinks(linksRaw)

  console.log(`[${language}] indicizzazione di ${links.length} coppie di frasi`)
  const tokenIndex = buildTokenIndex(links, italianSentences, targetSentences)

  const entries: VocabularyEntry[] = []
  for (const { word, rank } of frequency) {
    const match = tokenIndex.get(word)
    if (!match) continue

    entries.push({
      language,
      lemma: word,
      rank,
      exampleL2: match.l2.text,
      translationIt: match.it.text,
      source: {
        tatoebaSentenceIdL2: match.l2.id,
        tatoebaSentenceIdIt: match.it.id,
        contributorL2: match.l2.username,
      },
    })
  }

  console.log(
    `[${language}] ${entries.length}/${frequency.length} parole con una frase d'esempio reale`,
  )
  return entries
}
