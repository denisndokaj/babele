import type { LanguageCode } from '../../src/types/models'

/**
 * Manifest delle fonti esterne usate dalla pipeline dati (§7 SPEC).
 * Ogni URL qui è stato verificato manualmente (HTTP 200, formato ispezionato)
 * prima di essere inserito: non sono indirizzi inventati.
 */

export const ISO3: Record<LanguageCode, string> = {
  fr: 'fra',
  de: 'deu',
  es: 'spa',
}

export const ITALIAN_ISO3 = 'ita'

export const FREQUENCY_WORDS = {
  name: 'hermitdave/FrequencyWords',
  homepage: 'https://github.com/hermitdave/FrequencyWords',
  codeLicense: 'MIT',
  contentLicense: 'CC-BY-SA-4.0',
  urlFor: (lang: LanguageCode): string =>
    `https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/${lang}/${lang}_50k.txt`,
} as const

export const TATOEBA = {
  name: 'Tatoeba',
  homepage: 'https://tatoeba.org/',
  license: 'CC-BY-2.0-FR',
  licenseUrl: 'https://tatoeba.org/en/terms_of_use#section-6-2',
  sentencesDetailedUrlFor: (iso3: string): string =>
    `https://downloads.tatoeba.org/exports/per_language/${iso3}/${iso3}_sentences_detailed.tsv.bz2`,
  sentencesUrlFor: (iso3: string): string =>
    `https://downloads.tatoeba.org/exports/per_language/${iso3}/${iso3}_sentences.tsv.bz2`,
  linksUrlFor: (iso3A: string, iso3B: string): string =>
    `https://downloads.tatoeba.org/exports/per_language/${iso3A}/${iso3A}-${iso3B}_links.tsv.bz2`,
  sentenceUrl: (id: number): string => `https://tatoeba.org/en/sentences/show/${id}`,
} as const
