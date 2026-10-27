import type { CEFRLevel, LanguageCode } from '../../types/models'

export interface PlaylistEntry {
  title: string
  artist: string
  language: LanguageCode
  level: CEFRLevel
  reason: string
}

/** Canzoni reali ed esistenti, scelte per dizione chiara e vocabolario accessibile. Nessun testo incluso (§6.6 SPEC). */
export const PLAYLIST: PlaylistEntry[] = [
  {
    title: 'Dernière Danse',
    artist: 'Indila',
    language: 'fr',
    level: 'A2',
    reason: 'Dizione molto chiara e ritmo regolare: facile seguire il testo mentre si ascolta.',
  },
  {
    title: 'Je veux',
    artist: 'Zaz',
    language: 'fr',
    level: 'A2',
    reason: "Vocabolario quotidiano, articolazione netta, ritornello ripetuto più volte.",
  },
  {
    title: 'Papaoutai',
    artist: 'Stromae',
    language: 'fr',
    level: 'B1',
    reason: 'Tema universale (il rapporto col padre), ritornello martellante ottimo per la memorizzazione.',
  },
  {
    title: '99 Luftballons',
    artist: 'Nena',
    language: 'de',
    level: 'A2',
    reason: 'Classico intramontabile, frasi brevi e molto ripetute.',
  },
  {
    title: 'Auf uns',
    artist: 'Andreas Bourani',
    language: 'de',
    level: 'A2',
    reason: 'Inno semplice e molto diffuso in Germania, utile anche per la cultura pop.',
  },
  {
    title: 'Applaus, Applaus',
    artist: 'Sportfreunde Stiller',
    language: 'de',
    level: 'B1',
    reason: 'Testo più ricco, buon passo successivo dopo i brani più semplici.',
  },
  {
    title: 'Color Esperanza',
    artist: 'Diego Torres',
    language: 'es',
    level: 'A2',
    reason: 'Vocabolario motivazionale semplice e diretto, molto diffuso nelle scuole di spagnolo.',
  },
  {
    title: 'Despacito',
    artist: 'Luis Fonsi ft. Daddy Yankee',
    language: 'es',
    level: 'A2',
    reason: 'Estremamente diffusa: dizione chiara nel ritornello, facile da riconoscere a orecchio.',
  },
  {
    title: 'La Camisa Negra',
    artist: 'Juanes',
    language: 'es',
    level: 'B1',
    reason: "Gioco di parole sull'espressione idiomatica del titolo, buono spunto per il lessico figurato.",
  },
]
