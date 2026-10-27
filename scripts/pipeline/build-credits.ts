import type { VocabularyEntry } from '../../src/types/content'
import type { CreditsManifest } from '../../src/types/content'
import { FREQUENCY_WORDS, TATOEBA } from './sources'

export function buildCredits(allEntries: VocabularyEntry[]): CreditsManifest {
  const contributors = new Set<string>()
  for (const entry of allEntries) {
    if (entry.source.contributorL2) contributors.add(entry.source.contributorL2)
  }

  return {
    generatedAt: new Date().toISOString(),
    sources: [
      {
        name: FREQUENCY_WORDS.name,
        homepage: FREQUENCY_WORDS.homepage,
        license: `${FREQUENCY_WORDS.codeLicense} (codice) / ${FREQUENCY_WORDS.contentLicense} (contenuto)`,
        note: 'Liste di frequenza delle parole, derivate da OpenSubtitles, usate per scegliere il lessico iniziale per lingua.',
      },
      {
        name: TATOEBA.name,
        homepage: TATOEBA.homepage,
        license: TATOEBA.license,
        licenseUrl: TATOEBA.licenseUrl,
        note:
          `Frasi d'esempio e relative traduzioni in italiano. Ogni frase riporta, dove disponibile, ` +
          `il contributore originale e un link alla frase su Tatoeba. Frasi usate in questa build: ` +
          `contributi di ${contributors.size} autori diversi.`,
      },
    ],
  }
}
