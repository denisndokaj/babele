export interface ComparativeRow {
  label: string
  it: string
  fr: string
  de: string
  es: string
}

export interface ComparativeTable {
  nodeId: string
  title: string
  note?: string
  rows: ComparativeRow[]
}

export const COMPARATIVE_TABLES: ComparativeTable[] = [
  {
    nodeId: 'articoli',
    title: 'Articoli',
    note:
      'Il tedesco ha un terzo genere, il neutro (das), assente in italiano, francese e spagnolo: ' +
      'non c\'è modo di "indovinarlo" dalla traduzione italiana, va imparato parola per parola.',
    rows: [
      { label: 'Definito maschile singolare', it: 'il', fr: 'le', de: 'der', es: 'el' },
      { label: 'Definito femminile singolare', it: 'la', fr: 'la', de: 'die', es: 'la' },
      { label: 'Definito neutro singolare', it: '—', fr: '—', de: 'das', es: '—' },
      { label: 'Definito plurale', it: 'i / le', fr: 'les', de: 'die', es: 'los / las' },
      { label: 'Indefinito maschile', it: 'un / uno', fr: 'un', de: 'ein', es: 'un' },
      { label: 'Indefinito femminile', it: 'una / un\'', fr: 'une', de: 'eine', es: 'una' },
    ],
  },
  {
    nodeId: 'pronomi-soggetto',
    title: 'Pronomi soggetto',
    note:
      'In italiano e spagnolo il pronome soggetto si omette spesso, perché la desinenza del verbo ' +
      'basta a capire chi fa l\'azione. In francese e tedesco è quasi sempre obbligatorio.',
    rows: [
      { label: '1ª sing.', it: 'io (spesso omesso)', fr: 'je', de: 'ich', es: 'yo (spesso omesso)' },
      { label: '2ª sing.', it: 'tu (spesso omesso)', fr: 'tu', de: 'du', es: 'tú (spesso omesso)' },
      { label: '3ª sing. m/f', it: 'lui / lei', fr: 'il / elle', de: 'er / sie / es', es: 'él / ella' },
      { label: '1ª plur.', it: 'noi', fr: 'nous', de: 'wir', es: 'nosotros / nosotras' },
      { label: '2ª plur.', it: 'voi', fr: 'vous', de: 'ihr', es: 'vosotros / vosotras' },
      { label: '3ª plur.', it: 'loro', fr: 'ils / elles', de: 'sie', es: 'ellos / ellas' },
    ],
  },
  {
    nodeId: 'essere-avere',
    title: 'Essere e avere (presente)',
    rows: [
      { label: 'Essere — io', it: 'sono', fr: 'je suis', de: 'ich bin', es: 'soy' },
      { label: 'Essere — tu', it: 'sei', fr: 'tu es', de: 'du bist', es: 'eres' },
      { label: 'Essere — lui/lei', it: 'è', fr: 'il/elle est', de: 'er/sie/es ist', es: 'es' },
      { label: 'Essere — noi', it: 'siamo', fr: 'nous sommes', de: 'wir sind', es: 'somos' },
      { label: 'Avere — io', it: 'ho', fr: "j'ai", de: 'ich habe', es: 'tengo' },
      { label: 'Avere — tu', it: 'hai', fr: 'tu as', de: 'du hast', es: 'tienes' },
      { label: 'Avere — lui/lei', it: 'ha', fr: 'il/elle a', de: 'er/sie/es hat', es: 'tiene' },
      { label: 'Avere — noi', it: 'abbiamo', fr: 'nous avons', de: 'wir haben', es: 'tenemos' },
    ],
  },
  {
    nodeId: 'negazione',
    title: 'Negazione',
    note:
      'Il francese è l\'unica delle tre lingue con una negazione "a due pezzi" (ne...pas) che racchiude ' +
      'il verbo: è la fonte più comune di errori di posizione per un italofono.',
    rows: [
      { label: 'Struttura', it: 'non + verbo', fr: 'ne + verbo + pas', de: 'verbo + nicht', es: 'no + verbo' },
      {
        label: 'Esempio ("non parlo francese")',
        it: 'non parlo francese',
        fr: 'je ne parle pas français',
        de: 'ich spreche nicht Französisch',
        es: 'no hablo francés',
      },
    ],
  },
  {
    nodeId: 'plurale',
    title: 'Plurale dei sostantivi',
    note:
      'Il tedesco non ha una regola unica di plurale (spesso cambia anche la vocale interna, ' +
      'Umlaut): ogni sostantivo va imparato con il proprio plurale, come una mini-eccezione.',
    rows: [
      { label: 'Regola di base', it: '-o/-a → -i/-e', fr: '+ -s (muta)', de: 'irregolare (spesso Umlaut)', es: '+ -s / -es' },
      { label: 'Esempio', it: 'libro → libri', fr: 'livre → livres', de: 'Buch → Bücher', es: 'libro → libros' },
    ],
  },
  {
    nodeId: 'possessivi',
    title: 'Possessivi (1ª persona singolare)',
    note:
      'In francese "mon" si usa anche davanti a un sostantivo femminile che inizia per vocale ' +
      '(mon amie, non "ma amie"): è un\'eccezione fonetica, non di genere.',
    rows: [
      { label: 'Con sostantivo maschile', it: 'il mio', fr: 'mon', de: 'mein', es: 'mi' },
      { label: 'Con sostantivo femminile', it: 'la mia', fr: 'ma', de: 'meine', es: 'mi' },
      { label: 'Con sostantivo plurale', it: 'i miei / le mie', fr: 'mes', de: 'meine', es: 'mis' },
    ],
  },
  {
    nodeId: 'passato-composto',
    title: 'Il passato composto',
    note:
      'Lo spagnolo è l\'unica delle tre lingue a usare un solo ausiliare (haber) per qualunque ' +
      'verbo; il tedesco mette il participio in fondo alla frase, non subito dopo l\'ausiliare.',
    rows: [
      { label: 'Ausiliare', it: 'essere / avere (secondo il verbo)', fr: 'être / avoir (secondo il verbo)', de: 'sein / haben (secondo il verbo)', es: 'haber (sempre, per ogni verbo)' },
      { label: 'Esempio ("sono andato")', it: 'sono andato', fr: 'je suis allé', de: 'ich bin gegangen', es: 'he ido' },
      { label: 'Posizione del participio', it: "subito dopo l'ausiliare", fr: "subito dopo l'ausiliare", de: 'in fondo alla frase', es: "subito dopo l'ausiliare" },
    ],
  },
  {
    nodeId: 'futuro',
    title: 'Il futuro semplice',
    note: 'Il tedesco è l\'unica delle tre lingue a formare il futuro con un ausiliare (werden) + infinito, non con una desinenza propria.',
    rows: [
      { label: 'Si forma con', it: 'infinito + desinenza propria', fr: 'infinito + desinenza propria', de: 'werden + infinito (in fondo alla frase)', es: 'infinito + desinenza propria' },
      { label: 'Esempio ("parlerò")', it: 'parlerò', fr: 'je parlerai', de: 'ich werde sprechen', es: 'hablaré' },
      { label: 'Regolarità delle desinenze', it: 'variano secondo la conjugazione', fr: 'variano secondo la conjugazione', de: "un'unica forma (werden) per tutti i verbi", es: 'identiche per tutte le conjugazioni' },
    ],
  },
  {
    nodeId: 'comparativi',
    title: 'Comparativi',
    note: 'Il tedesco attacca -er direttamente all\'aggettivo, senza una parola separata per "più".',
    rows: [
      { label: 'Comparativo di maggioranza', it: 'più ... di/che', fr: 'plus ... que', de: 'aggettivo + -er ... als', es: 'más ... que' },
      { label: 'Comparativo di uguaglianza', it: 'tanto ... quanto', fr: 'aussi ... que', de: 'so ... wie', es: 'tan ... como' },
      { label: 'Comparativo irregolare di "buono"', it: 'migliore', fr: 'meilleur', de: 'besser', es: 'mejor' },
    ],
  },
  {
    nodeId: 'pronomi-complemento',
    title: 'Pronomi complemento',
    note: 'Il tedesco non "attacca" il pronome al verbo: occupa il suo normale posto nella frase.',
    rows: [
      { label: 'Diretto, 3ª sing. m/f', it: 'lo / la', fr: 'le / la', de: 'ihn / sie (Akkusativ)', es: 'lo / la' },
      { label: 'Indiretto, 3ª sing. m/f', it: 'gli / le', fr: 'lui / lui', de: 'ihm / ihr (Dativ)', es: 'le / le' },
      { label: 'Posizione rispetto al verbo', it: 'prima del verbo coniugato', fr: 'prima del verbo coniugato', de: 'posto normale nella frase (non si attacca)', es: 'prima del verbo coniugato' },
    ],
  },
]
