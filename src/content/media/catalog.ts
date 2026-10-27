import type { CEFRLevel, LanguageCode } from '../../types/models'

export interface CatalogEntry {
  title: string
  language: LanguageCode
  levels: CEFRLevel[]
  url: string
  description: string
}

/**
 * Canali YouTube gratuiti e legali, verificati uno per uno (HTTP 200) prima di essere
 * inseriti qui — nessun URL inventato (§0/§8 SPEC). Solo schede con link alla piattaforma
 * ufficiale: nessun contenuto scaricato o ospitato da Babele.
 *
 * Film e podcast non sono ancora inclusi: la disponibilità su una piattaforma di streaming
 * cambia troppo spesso per poterla verificare una volta e considerarla stabile — vanno
 * aggiunti con una pipeline che li riverifichi periodicamente, non a mano in una singola sessione.
 */
export const MEDIA_CATALOG: CatalogEntry[] = [
  {
    title: 'Easy French',
    language: 'fr',
    levels: ['A1', 'A2', 'B1', 'B2'],
    url: 'https://www.youtube.com/@easyfrench',
    description: 'Interviste di strada con sottotitoli doppi (francese + italiano/altra lingua): ottimo per abituare l\'orecchio al parlato autentico.',
  },
  {
    title: 'Français avec Pierre',
    language: 'fr',
    levels: ['A1', 'A2', 'B1'],
    url: 'https://www.youtube.com/@Francaisavecpierre',
    description: 'Lezioni di grammatica e vocabolario spiegate in francese semplice, con molta attenzione alla pronuncia.',
  },
  {
    title: 'Learn French with Alexa',
    language: 'fr',
    levels: ['A1', 'A2', 'B1', 'B2'],
    url: 'https://www.youtube.com/@learnfrenchwithalexa',
    description: 'Corso strutturato per livelli, con lezioni dedicate a grammatica, vocabolario ed espressioni idiomatiche.',
  },
  {
    title: 'Easy German',
    language: 'de',
    levels: ['A1', 'A2', 'B1', 'B2'],
    url: 'https://www.youtube.com/@EasyGerman',
    description: 'Interviste di strada con sottotitoli doppi (tedesco + italiano/altra lingua).',
  },
  {
    title: 'Deutsch lernen mit der DW (Nicos Weg)',
    language: 'de',
    levels: ['A1', 'A2', 'B1'],
    url: 'https://www.youtube.com/@dwlearngerman',
    description: 'Corso ufficiale di Deutsche Welle, organizzato per livello CEFR, con la serie "Nicos Weg".',
  },
  {
    title: 'Easy Spanish',
    language: 'es',
    levels: ['A1', 'A2', 'B1', 'B2'],
    url: 'https://www.youtube.com/@EasySpanish',
    description: 'Interviste di strada con sottotitoli doppi (spagnolo + italiano/altra lingua).',
  },
  {
    title: 'Dreaming Spanish',
    language: 'es',
    levels: ['A1', 'A2', 'B1', 'B2'],
    url: 'https://www.youtube.com/@dreamingspanish',
    description: 'Video pensati apposta per il metodo dell\'input comprensibile: parlato naturale, niente sottotitoli, graduato per livello — la stessa filosofia didattica di Babele.',
  },
  {
    title: 'Butterfly Spanish',
    language: 'es',
    levels: ['A1', 'A2'],
    url: 'https://www.youtube.com/@Butterflyspanish',
    description: 'Spagnolo per principianti con spiegazioni chiare e ritmo lento, pensato per chi parte da zero.',
  },
]
