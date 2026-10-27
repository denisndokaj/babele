export interface GlossaryTerm {
  term: string
  origin: 'fr' | 'de' | 'es' | 'latino'
  definitionIt: string
  philosopher?: string
}

/** Lessico filosofico trilingue (§6.7 SPEC), scritto a mano: non esiste un dataset aperto di glosse filosofiche. */
export const PHILOSOPHY_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Dasein',
    origin: 'de',
    definitionIt:
      'Letteralmente "essere-ci": in Heidegger, il modo d\'essere proprio dell\'uomo, sempre già situato in un mondo e in un tempo. Resta di norma non tradotto anche in italiano, francese e spagnolo.',
    philosopher: 'Heidegger',
  },
  {
    term: 'Aufhebung',
    origin: 'de',
    definitionIt:
      'In Hegel, il movimento dialettico che insieme nega, conserva ed eleva a un livello superiore: un unico termine tedesco che racchiude tre significati che nessuna parola italiana, francese ("dépassement") o spagnola ("superación") rende per intero.',
    philosopher: 'Hegel',
  },
  {
    term: 'Vernunft / Verstand',
    origin: 'de',
    definitionIt:
      'In Kant, due facoltà distinte che l\'italiano chiama spesso entrambe "ragione": il Verstand ordina i dati sensibili in concetti, la Vernunft spinge oltre l\'esperienza, verso idee come l\'anima, il mondo, Dio.',
    philosopher: 'Kant',
  },
  {
    term: 'esprit',
    origin: 'fr',
    definitionIt:
      'In Descartes, la "res cogitans": la mente pensante, distinta dal corpo (res extensa). Non coincide esattamente né con l\'italiano "spirito" (più religioso), né con "mente" (più neutro).',
    philosopher: 'Descartes',
  },
  {
    term: 'conatus',
    origin: 'latino',
    definitionIt:
      'Termine latino usato identico in italiano, francese e spagnolo: in Spinoza, lo sforzo con cui ogni cosa persevera nel proprio essere.',
    philosopher: 'Spinoza',
  },
  {
    term: 'cogito',
    origin: 'latino',
    definitionIt:
      'Dal latino "cogito, ergo sum" (penso, dunque sono): in Descartes, la prima certezza indubitabile, punto di partenza di tutta la conoscenza.',
    philosopher: 'Descartes',
  },
  {
    term: 'Wille',
    origin: 'de',
    definitionIt:
      'In Schopenhauer, la Volontà: la forza cieca e irrazionale che sta alla base di ogni fenomeno, al di là delle sue manifestazioni particolari.',
    philosopher: 'Schopenhauer',
  },
  {
    term: 'Noumenon',
    origin: 'de',
    definitionIt:
      'In Kant, la cosa "in sé", così com\'è indipendentemente dal modo in cui la percepiamo — distinta dal "fenomeno", la cosa come ci appare attraverso spazio, tempo e categorie.',
    philosopher: 'Kant',
  },
  {
    term: 'raison',
    origin: 'fr',
    definitionIt:
      'La ragione: in Descartes coincide col "bon sens", distribuito ugualmente in tutti gli uomini; nell\'Illuminismo francese diventerà il criterio supremo di giudizio su ogni cosa.',
    philosopher: 'Descartes',
  },
  {
    term: 'sentimiento trágico',
    origin: 'es',
    definitionIt:
      "In Unamuno, la tensione irrisolvibile tra il bisogno vitale di immortalità e l'impossibilità per la ragione di garantirla: non una dottrina, ma un modo di vivere la contraddizione.",
    philosopher: 'Unamuno',
  },
]
