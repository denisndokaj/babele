import type { LanguageCode } from '../../types/models'

export interface MinimalPair {
  id: string
  language: LanguageCode
  wordA: { word: string; meaningIt: string }
  wordB: { word: string; meaningIt: string }
  contrast: string
}

/** Coppie minime reali per gli esercizi di discriminazione (§6.8 SPEC), scritte a mano. */
export const MINIMAL_PAIRS: MinimalPair[] = [
  {
    id: 'fr-rue-roue',
    language: 'fr',
    wordA: { word: 'rue', meaningIt: 'strada' },
    wordB: { word: 'roue', meaningIt: 'ruota' },
    contrast: '"u" contro "ou"',
  },
  {
    id: 'fr-bon-banc',
    language: 'fr',
    wordA: { word: 'bon', meaningIt: 'buono' },
    wordB: { word: 'banc', meaningIt: 'panca' },
    contrast: 'nasale "on" contro nasale "an"',
  },
  {
    id: 'fr-vin-vent',
    language: 'fr',
    wordA: { word: 'vin', meaningIt: 'vino' },
    wordB: { word: 'vent', meaningIt: 'vento' },
    contrast: 'nasale "in" contro nasale "an/ent"',
  },
  {
    id: 'de-mutter-muetter',
    language: 'de',
    wordA: { word: 'Mutter', meaningIt: 'madre' },
    wordB: { word: 'Mütter', meaningIt: 'madri' },
    contrast: '"u" contro "ü"',
  },
  {
    id: 'de-ofen-offen',
    language: 'de',
    wordA: { word: 'Ofen', meaningIt: 'forno' },
    wordB: { word: 'offen', meaningIt: 'aperto' },
    contrast: '"o" lunga contro "o" breve',
  },
  {
    id: 'de-huete-huette',
    language: 'de',
    wordA: { word: 'Hüte', meaningIt: 'cappelli' },
    wordB: { word: 'Hütte', meaningIt: 'capanna' },
    contrast: '"ü" lunga contro "ü" breve',
  },
  {
    id: 'es-pero-perro',
    language: 'es',
    wordA: { word: 'pero', meaningIt: 'ma' },
    wordB: { word: 'perro', meaningIt: 'cane' },
    contrast: '"r" semplice contro "rr"',
  },
  {
    id: 'es-caro-carro',
    language: 'es',
    wordA: { word: 'caro', meaningIt: 'caro, costoso' },
    wordB: { word: 'carro', meaningIt: 'carro, automobile' },
    contrast: '"r" semplice contro "rr"',
  },
  {
    id: 'es-coser-cocer',
    language: 'es',
    wordA: { word: 'coser', meaningIt: 'cucire' },
    wordB: { word: 'cocer', meaningIt: 'cuocere' },
    contrast: '"s" contro "c" (davanti a e)',
  },
]
