import type { LanguageCode } from '../../types/models'

export interface ConfusionWord {
  language: LanguageCode | 'it'
  word: string
  meaningIt: string
  /** Forme in minuscolo che contano come riconoscimento di questo significato in una risposta libera. */
  keywords: string[]
  exampleL2?: string
  exampleIt?: string
}

export interface ConfusionPair {
  id: string
  wordA: ConfusionWord
  wordB: ConfusionWord
  note: string
}

/**
 * Falsi amici e interferenze reali tra italiano, francese, tedesco e spagnolo (§6.12 SPEC),
 * scritti a mano: non esiste un dataset aperto di questo tipo specifico di confusione.
 */
export const CONFUSION_PAIRS: ConfusionPair[] = [
  {
    id: 'salir-salire',
    wordA: { language: 'es', word: 'salir', meaningIt: 'uscire', keywords: ['uscire', 'esce'], exampleL2: 'Voy a salir esta noche.', exampleIt: 'Esco questa sera.' },
    wordB: { language: 'it', word: 'salire', meaningIt: 'andare su, muoversi verso l\'alto', keywords: ['salire', 'andare su', 'sale'] },
    note: "Il caso citato dalla specifica stessa del progetto: \"salir\" spagnolo non significa \"salire\" in italiano, ma \"uscire\".",
  },
  {
    id: 'embarazada-imbarazzata',
    wordA: { language: 'es', word: 'embarazada', meaningIt: 'incinta', keywords: ['incinta', 'gravida'], exampleL2: 'Mi hermana está embarazada.', exampleIt: 'Mia sorella è incinta.' },
    wordB: { language: 'it', word: 'imbarazzata', meaningIt: 'a disagio, in difficoltà', keywords: ['disagio', 'difficoltà', 'imbarazzo', 'embarrassed'] },
    note: 'Uno dei falsi amici più citati in assoluto: "embarazada" non ha nulla a che fare con l\'imbarazzo.',
  },
  {
    id: 'attendre-atender',
    wordA: { language: 'fr', word: 'attendre', meaningIt: 'aspettare', keywords: ['aspettare', 'attendere'], exampleL2: "J'attends le bus.", exampleIt: 'Aspetto l\'autobus.' },
    wordB: { language: 'es', word: 'atender', meaningIt: 'assistere, prestare attenzione, occuparsi di', keywords: ['assistere', 'occuparsi', 'attenzione', 'servire'], exampleL2: 'La recepcionista atiende a los clientes.', exampleIt: 'La receptionist si occupa dei clienti.' },
    note: "Due lingue diverse dall'italiano che si confondono fra loro: il francese \"attendre\" e lo spagnolo \"atender\" si assomigliano ma non significano la stessa cosa (in spagnolo \"aspettare\" è \"esperar\").",
  },
  {
    id: 'vaso-vaso',
    wordA: { language: 'es', word: 'vaso', meaningIt: 'bicchiere', keywords: ['bicchiere'], exampleL2: 'Un vaso de agua, por favor.', exampleIt: 'Un bicchiere d\'acqua, per favore.' },
    wordB: { language: 'it', word: 'vaso', meaningIt: 'contenitore per fiori o piante', keywords: ['fiori', 'piante', 'contenitore'] },
    note: 'Stessa parola, significato completamente diverso: per il contenitore da fiori lo spagnolo usa "jarrón" o "florero".',
  },
  {
    id: 'burro-burro',
    wordA: { language: 'es', word: 'burro', meaningIt: 'asino', keywords: ['asino', 'somaro'], exampleL2: 'El burro lleva la carga.', exampleIt: "L'asino porta il carico." },
    wordB: { language: 'it', word: 'burro', meaningIt: 'il grasso alimentare ricavato dalla panna', keywords: ['panna', 'grasso', 'butter', 'alimentare'] },
    note: 'Il burro da mangiare, in spagnolo, si chiama "mantequilla".',
  },
  {
    id: 'contestar-contestare',
    wordA: { language: 'es', word: 'contestar', meaningIt: 'rispondere', keywords: ['rispondere', 'risponde'], exampleL2: 'Voy a contestar tu pregunta.', exampleIt: 'Risponderò alla tua domanda.' },
    wordB: { language: 'it', word: 'contestare', meaningIt: 'protestare, mettere in discussione', keywords: ['protestare', 'discussione', 'opporsi'] },
    note: 'In spagnolo "contestar" è un atto neutro (rispondere); in italiano "contestare" è un atto di opposizione.',
  },
  {
    id: 'subir-subire',
    wordA: { language: 'es', word: 'subir', meaningIt: 'salire, andare su', keywords: ['salire', 'andare su', 'sale'], exampleL2: 'Vamos a subir la montaña.', exampleIt: 'Saliamo sulla montagna.' },
    wordB: { language: 'it', word: 'subire', meaningIt: 'sopportare, patire qualcosa contro la propria volontà', keywords: ['sopportare', 'patire', 'subisce'] },
    note: 'Lo specchio del primo caso: qui è lo spagnolo che "sale", mentre l\'italiano "subisce".',
  },
  {
    id: 'topo-topo',
    wordA: { language: 'es', word: 'topo', meaningIt: 'talpa', keywords: ['talpa'], exampleL2: 'El topo vive bajo tierra.', exampleIt: 'La talpa vive sotto terra.' },
    wordB: { language: 'it', word: 'topo', meaningIt: 'piccolo roditore (mouse)', keywords: ['roditore', 'mouse', 'topolino'] },
    note: 'Due animali completamente diversi dietro la stessa parola.',
  },
  {
    id: 'guardar-guardare',
    wordA: { language: 'es', word: 'guardar', meaningIt: 'conservare, tenere, mettere via', keywords: ['conservare', 'tenere', 'mettere via', 'custodire'], exampleL2: 'Voy a guardar este documento.', exampleIt: 'Conserverò questo documento.' },
    wordB: { language: 'it', word: 'guardare', meaningIt: 'osservare con lo sguardo', keywords: ['osservare', 'sguardo', 'vedere'] },
    note: 'Per "guardare" con gli occhi, lo spagnolo usa "mirar".',
  },
  {
    id: 'largo-largo',
    wordA: { language: 'es', word: 'largo', meaningIt: 'lungo (riferito alla lunghezza)', keywords: ['lungo', 'lunghezza'], exampleL2: 'Es un viaje muy largo.', exampleIt: 'È un viaggio molto lungo.' },
    wordB: { language: 'it', word: 'largo', meaningIt: 'ampio, di grande estensione trasversale (wide)', keywords: ['ampio', 'wide', 'largo', 'esteso'] },
    note: 'Per "largo" nel senso italiano, lo spagnolo usa "ancho".',
  },
  {
    id: 'gymnasium-gimnasio',
    wordA: { language: 'de', word: 'Gymnasium', meaningIt: 'un tipo di scuola secondaria (liceo)', keywords: ['liceo', 'scuola', 'secondaria'], exampleL2: 'Sie geht aufs Gymnasium.', exampleIt: 'Lei frequenta il liceo.' },
    wordB: { language: 'es', word: 'gimnasio', meaningIt: 'palestra, luogo per fare sport', keywords: ['palestra', 'sport', 'fitness'], exampleL2: 'Voy al gimnasio todos los días.', exampleIt: 'Vado in palestra ogni giorno.' },
    note: 'Il tedesco "Gymnasium" non è una palestra (in tedesco: "Fitnessstudio"): uno dei falsi amici più insegnati nei primi corsi.',
  },
  {
    id: 'rente-renta',
    wordA: { language: 'de', word: 'Rente', meaningIt: "pensione (l'assegno che si riceve dopo il lavoro)", keywords: ['pensione', 'assegno'], exampleL2: 'Meine Oma bekommt eine Rente.', exampleIt: 'Mia nonna riceve una pensione.' },
    wordB: { language: 'es', word: 'renta', meaningIt: 'reddito, rendita (es. da un investimento o da un affitto)', keywords: ['reddito', 'rendita', 'affitto', 'investimento'], exampleL2: 'Vive de la renta de sus propiedades.', exampleIt: 'Vive della rendita delle sue proprietà.' },
    note: "Il tedesco \"Rente\" riguarda la pensione da lavoro; lo spagnolo \"renta\" riguarda un reddito da capitale o da affitto — concetti vicini ma non coincidenti.",
  },
]
