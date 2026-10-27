import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { LANGUAGE_CODES } from '../../src/languages'
import type { VocabularyEntry } from '../../src/types/content'
import { buildVocabulary } from './build-vocabulary'
import { buildCredits } from './build-credits'

const PUBLIC_DATA_DIR = join(import.meta.dirname, '..', '..', 'public', 'data')

async function main() {
  const allEntries: VocabularyEntry[] = []

  for (const language of LANGUAGE_CODES) {
    const entries = await buildVocabulary(language)
    allEntries.push(...entries)

    const outDir = join(PUBLIC_DATA_DIR, language)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(join(outDir, 'vocabulary.json'), JSON.stringify(entries, null, 2))
  }

  const credits = buildCredits(allEntries)
  writeFileSync(join(PUBLIC_DATA_DIR, 'credits.json'), JSON.stringify(credits, null, 2))

  console.log('\nPipeline completata.')
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
