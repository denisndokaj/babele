import type { LanguageCode } from '../../types/models'

export interface SoundGuideEntry {
  id: string
  language: LanguageCode
  title: string
  explanation: string
  example: { word: string; meaningIt: string }
}

/** Guida ai suoni difficili per un italofono (§6.9 SPEC), scritta a mano. */
export const SOUND_GUIDE: SoundGuideEntry[] = [
  {
    id: 'fr-nasal-vowels',
    language: 'fr',
    title: 'Le vocali nasali (on, an, in, un)',
    explanation:
      "Suoni che non esistono in italiano: l'aria passa anche dal naso mentre si pronuncia la vocale. Sono quattro timbri distinti da non confondere tra loro.",
    example: { word: 'bon', meaningIt: 'buono' },
  },
  {
    id: 'fr-u-vs-ou',
    language: 'fr',
    title: '"u" contro "ou"',
    explanation:
      'La "u" francese (come in "rue") è una vocale anteriore arrotondata che non esiste in italiano, molto simile alla "ü" tedesca. "Ou" invece si pronuncia come la normale "u" italiana. Sono la coppia più confusa da un italofono.',
    example: { word: 'rue', meaningIt: 'strada' },
  },
  {
    id: 'fr-uvular-r',
    language: 'fr',
    title: 'La "r" uvulare',
    explanation:
      'Si pronuncia in gola, non con la punta della lingua come la "r" italiana: è più vicina a un raschio che a una vibrazione.',
    example: { word: 'rouge', meaningIt: 'rosso' },
  },
  {
    id: 'fr-silent-e',
    language: 'fr',
    title: 'La "e" muta finale',
    explanation: 'Molte parole finiscono con una "e" scritta ma non pronunciata.',
    example: { word: 'porte', meaningIt: 'porta' },
  },
  {
    id: 'de-u-umlaut',
    language: 'de',
    title: '"ü" e "ö"',
    explanation:
      'Vocali arrotondate anteriori assenti in italiano (la stessa famiglia della "u" francese): per "ü" si pronuncia una "i" con le labbra arrotondate come per dire "u"; per "ö" una "e" con le labbra arrotondate come per dire "o".',
    example: { word: 'müde', meaningIt: 'stanco' },
  },
  {
    id: 'de-ich-ach-laut',
    language: 'de',
    title: 'Ich-Laut e Ach-Laut',
    explanation:
      'Due suoni "ch" diversi secondo la vocale che precede: dopo i, e, ü, ö o una consonante si sente l\'Ich-Laut (dolce, come in "ich", io); dopo a, o, u si sente l\'Ach-Laut (più gutturale, come in "Buch", libro).',
    example: { word: 'ich', meaningIt: 'io' },
  },
  {
    id: 'de-vowel-length',
    language: 'de',
    title: 'Vocali lunghe e brevi',
    explanation:
      'La stessa vocale, lunga o breve, può cambiare completamente il significato della parola: non è una differenza di accento ma di durata.',
    example: { word: 'Bahn', meaningIt: 'treno, binario (vocale lunga)' },
  },
  {
    id: 'de-final-devoicing',
    language: 'de',
    title: 'Consonanti finali sorde',
    explanation: 'Le consonanti b, d, g in fondo a una parola si pronunciano come p, t, k.',
    example: { word: 'Hund', meaningIt: 'cane (si legge come "Hunt")' },
  },
  {
    id: 'es-j-g',
    language: 'es',
    title: '"j" e "g" davanti a e/i',
    explanation:
      'Un suono gutturale aspirato, assente in italiano: si pronuncia in gola, un po\' come una "h" molto forte.',
    example: { word: 'jamón', meaningIt: 'prosciutto' },
  },
  {
    id: 'es-r-rr',
    language: 'es',
    title: '"r" semplice contro "rr"',
    explanation:
      'La "r" singola è una vibrante breve (un solo colpo di lingua); la "rr" doppia è una vibrante multipla (più colpi). Non è una sfumatura: cambia il significato della parola.',
    example: { word: 'perro', meaningIt: 'cane (rr vibrante multipla)' },
  },
  {
    id: 'es-intervocalic-d',
    language: 'es',
    title: '"d" tra vocali',
    explanation: 'Si pronuncia molto debole, quasi sparisce nel parlato informale.',
    example: { word: 'cansado', meaningIt: 'stanco' },
  },
  {
    id: 'es-ll-y',
    language: 'es',
    title: '"ll" e "y"',
    explanation:
      'In gran parte dello spagnolo moderno si pronunciano come la "j" italiana di "jeans" (fenomeno chiamato yeísmo).',
    example: { word: 'calle', meaningIt: 'strada' },
  },
]
