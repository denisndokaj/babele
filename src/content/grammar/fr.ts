import type { GrammarUnitContent } from '../../types/grammarContent'

export const FR_UNITS: GrammarUnitContent[] = [
  {
    id: 'fr-articoli',
    language: 'fr',
    cefrLevel: 'A1',
    nodeId: 'articoli',
    title: 'Articoli e genere dei sostantivi',
    noticingExamples: [
      { l2: 'Le chat dort.', it: 'Il gatto dorme.' },
      { l2: 'La maison est grande.', it: 'La casa è grande.' },
      { l2: 'Les enfants jouent.', it: 'I bambini giocano.' },
      { l2: 'Un chien aboie.', it: 'Un cane abbaia.' },
      { l2: 'Une pomme rouge.', it: 'Una mela rossa.' },
    ],
    contrastiveExplanation:
      'Come l\'italiano, il francese ha due generi (maschile e femminile) ma spesso non coincidono ' +
      'con quelli italiani per la stessa parola: "la mer" (il mare) è femminile in francese ma maschile ' +
      'in italiano; "le printemps" (la primavera) è maschile in francese ma femminile in italiano. ' +
      'Il genere va quindi imparato parola per parola, non dedotto dalla traduzione. Al plurale, "les" ' +
      'non distingue il genere (a differenza di "i/le" in italiano). Davanti a vocale, "le" e "la" si ' +
      'accorciano in "l\'" (l\'ami, l\'école).',
    exercises: [
      {
        id: 'ex1',
        payload: { type: 'multiple-choice', question: "Qual è l'articolo corretto per \"maison\" (casa)?", options: ['le', 'la', 'les', 'un'], correctIndex: 1 },
      },
      {
        id: 'ex2',
        payload: { type: 'multiple-choice', question: 'Come si dice "il gatto"?', options: ['le chat', 'la chat', 'les chat', 'une chat'], correctIndex: 0 },
      },
      { id: 'ex3', payload: { type: 'cloze', sentence: '___ voiture est rouge.', answer: 'La' } },
      { id: 'ex4', payload: { type: 'cloze', sentence: "J'ai ___ chien.", answer: 'un' } },
      { id: 'ex5', payload: { type: 'translation-it-l2', promptIt: 'il libro', answerL2: 'le livre' } },
      { id: 'ex6', payload: { type: 'translation-it-l2', promptIt: 'una mela', answerL2: 'une pomme' } },
      { id: 'ex7', payload: { type: 'translation-it-l2', promptIt: 'i bambini', answerL2: 'les enfants' } },
      {
        id: 'ex8',
        explanation: 'In francese "mer" è femminile, anche se in italiano "mare" è maschile.',
        payload: { type: 'multiple-choice', question: 'Come si dice "il mare"?', options: ['le mer', 'la mer', 'un mer', 'une mer'], correctIndex: 1 },
      },
      {
        id: 'ex9',
        explanation: 'In francese "printemps" è maschile, anche se in italiano "primavera" è femminile.',
        payload: { type: 'multiple-choice', question: 'Come si dice "la primavera"?', options: ['la printemps', 'le printemps', 'les printemps', 'un printemps'], correctIndex: 1 },
      },
      { id: 'ex10', payload: { type: 'cloze', sentence: '___ ami arrive.', answer: "L'" } },
      { id: 'ex11', payload: { type: 'reorder', words: ['chat', 'le', 'dort'], answer: ['le', 'chat', 'dort'] } },
      { id: 'ex12', payload: { type: 'reorder', words: ['pomme', 'une', 'rouge'], answer: ['une', 'pomme', 'rouge'] } },
      { id: 'ex13', payload: { type: 'cloze', sentence: 'Les ___ jouent dans le jardin.', answer: 'enfants' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'la chiave', answerL2: 'la clé' } },
      { id: 'ex15', payload: { type: 'translation-it-l2', promptIt: 'un cane', answerL2: 'un chien' } },
    ],
    keySentences: [
      { l2: 'Le chat dort.', it: 'Il gatto dorme.' },
      { l2: 'La maison est grande.', it: 'La casa è grande.' },
      { l2: 'Les enfants jouent dans le jardin.', it: 'I bambini giocano nel giardino.' },
      { l2: 'La mer est calme.', it: 'Il mare è calmo.' },
    ],
  },
  {
    id: 'fr-pronomi-soggetto',
    language: 'fr',
    cefrLevel: 'A1',
    nodeId: 'pronomi-soggetto',
    title: 'Pronomi soggetto e presente dei verbi in -er',
    noticingExamples: [
      { l2: 'Je parle français.', it: 'Io parlo francese.' },
      { l2: 'Tu parles bien.', it: 'Tu parli bene.' },
      { l2: 'Il parle anglais.', it: 'Lui parla inglese.' },
      { l2: 'Nous parlons ensemble.', it: 'Noi parliamo insieme.' },
      { l2: 'Ils parlent vite.', it: 'Loro parlano in fretta.' },
    ],
    contrastiveExplanation:
      "In italiano il pronome soggetto si omette quasi sempre, perché la desinenza del verbo basta a " +
      'capire chi parla ("parlo" = io, senza bisogno di "io"). In francese il pronome è quasi sempre ' +
      'obbligatorio: "parle" da solo non significa nulla di preciso, serve "je parle". Occhio anche alla ' +
      'pronuncia: la desinenza "-ent" della terza persona plurale (ils parlent) è muta, si pronuncia come ' +
      'il singolare.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Come si dice "io parlo"?', options: ['je parle', 'tu parle', 'je parles', 'il parle'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Qual è il pronome per "noi"?', options: ['vous', 'nous', 'ils', 'elles'], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'conjugation', infinitive: 'parler', pronoun: 'tu', answer: 'parles' } },
      { id: 'ex4', payload: { type: 'conjugation', infinitive: 'parler', pronoun: 'nous', answer: 'parlons' } },
      { id: 'ex5', payload: { type: 'conjugation', infinitive: 'habiter', pronoun: 'il', answer: 'habite' } },
      { id: 'ex6', payload: { type: 'conjugation', infinitive: 'habiter', pronoun: 'elles', answer: 'habitent' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: '___ parlez espagnol ?', answer: 'Vous' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Elle ___ à Paris.', answer: 'habite' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'tu parli bene', answerL2: 'tu parles bien' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'noi abitiamo a Roma', answerL2: 'nous habitons à Rome' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'loro parlano francese', answerL2: 'ils parlent français', alternateAnswers: ['elles parlent français'] } },
      { id: 'ex12', payload: { type: 'reorder', words: ['parle', 'je', 'français'], answer: ['je', 'parle', 'français'] } },
      { id: 'ex13', payload: { type: 'reorder', words: ['habitent', 'à', 'ils', 'Paris'], answer: ['ils', 'habitent', 'à', 'Paris'] } },
      {
        id: 'ex14',
        payload: {
          type: 'multiple-choice',
          question: 'Perché in francese si deve sempre scrivere "je", "tu", "il"...?',
          options: ['perché è più elegante', 'perché il verbo da solo non indica chi parla', 'per tradizione, ma è facoltativo'],
          correctIndex: 1,
        },
      },
      { id: 'ex15', payload: { type: 'cloze', sentence: 'Nous ___ italien.', answer: 'parlons' } },
    ],
    keySentences: [
      { l2: 'Je parle français.', it: 'Io parlo francese.' },
      { l2: 'Nous habitons à Rome.', it: 'Noi abitiamo a Roma.' },
      { l2: 'Ils parlent vite.', it: 'Loro parlano in fretta.' },
      { l2: 'Tu parles bien.', it: 'Tu parli bene.' },
    ],
  },
  {
    id: 'fr-essere-avere',
    language: 'fr',
    cefrLevel: 'A1',
    nodeId: 'essere-avere',
    title: 'Être et avoir',
    noticingExamples: [
      { l2: 'Je suis italien.', it: 'Sono italiano.' },
      { l2: "J'ai vingt ans.", it: 'Ho vent\'anni.' },
      { l2: 'Il a faim.', it: 'Ha fame.' },
      { l2: 'Nous sommes amis.', it: 'Siamo amici.' },
      { l2: 'Il y a un problème.', it: "C'è un problema." },
    ],
    contrastiveExplanation:
      'Molte espressioni con "avoir" corrispondono esattamente a quelle italiane con "avere" (avoir faim/ ' +
      'avere fame, avoir raison/avere ragione, avoir ... ans/avere ... anni): qui le due lingue si aiutano a ' +
      'vicenda. C\'è però un\'eccezione importante: per dire "c\'è/ci sono" il francese usa sempre "il y a" ' +
      '(costruito su avoir), mentre l\'italiano usa "esserci" (costruito su essere) — è una delle poche ' +
      'costruzioni impersonali dove le due lingue divergono davvero.',
    exercises: [
      { id: 'ex1', payload: { type: 'conjugation', infinitive: 'être', pronoun: 'je', answer: 'suis' } },
      { id: 'ex2', payload: { type: 'conjugation', infinitive: 'être', pronoun: 'nous', answer: 'sommes' } },
      { id: 'ex3', payload: { type: 'conjugation', infinitive: 'avoir', pronoun: 'tu', answer: 'as' } },
      { id: 'ex4', payload: { type: 'conjugation', infinitive: 'avoir', pronoun: 'ils', answer: 'ont' } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: 'Come si dice "ho vent\'anni"?', options: ['je suis vingt ans', "j'ai vingt ans", "j'ai vingt", 'je suis vingt'], correctIndex: 1 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: '"Il y a" corrisponde a:', options: ['lui ha', "c'è / ci sono", 'lui è'], correctIndex: 1 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Nous ___ contents.', answer: 'sommes' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Elles ___ faim.', answer: 'ont' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'sono italiano', answerL2: 'je suis italien' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'abbiamo ragione', answerL2: 'nous avons raison' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: "c'è un problema", answerL2: 'il y a un problème' } },
      { id: 'ex12', payload: { type: 'reorder', words: ['ans', "j'ai", 'vingt'], answer: ["j'ai", 'vingt', 'ans'] } },
      { id: 'ex13', payload: { type: 'reorder', words: ['sommes', 'amis', 'nous'], answer: ['nous', 'sommes', 'amis'] } },
      { id: 'ex14', payload: { type: 'multiple-choice', question: '"Avoir faim" significa:', options: ['essere affamato / avere fame', 'avere un amico', 'essere stanco'], correctIndex: 0 } },
      { id: 'ex15', payload: { type: 'cloze', sentence: 'Tu ___ fatigué ?', answer: 'es' } },
    ],
    keySentences: [
      { l2: 'Je suis italien.', it: 'Sono italiano.' },
      { l2: "J'ai vingt ans.", it: 'Ho vent\'anni.' },
      { l2: 'Il y a un problème.', it: "C'è un problema." },
      { l2: 'Elle a faim.', it: 'Ha fame.' },
    ],
  },
  {
    id: 'fr-negazione',
    language: 'fr',
    cefrLevel: 'A1',
    nodeId: 'negazione',
    title: 'La negazione',
    noticingExamples: [
      { l2: 'Je ne parle pas français.', it: 'Non parlo francese.' },
      { l2: "Il n'aime pas le café.", it: 'Non gli piace il caffè.' },
      { l2: 'Nous ne sommes pas fatigués.', it: 'Non siamo stanchi.' },
      { l2: "Elle n'a pas faim.", it: 'Non ha fame.' },
    ],
    contrastiveExplanation:
      'In italiano basta "non" prima del verbo. In francese la negazione è "a due pezzi": "ne" prima del ' +
      'verbo e "pas" dopo, racchiudendolo. L\'errore più comune per un italofono è dimenticare uno dei due ' +
      'pezzi (di solito "ne", perché nel parlato informale i francesi stessi tendono a ometterlo). Davanti a ' +
      'una vocale, "ne" si accorcia in "n\'" (il n\'aime pas).',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Dove si mettono "ne" e "pas"?', options: ['prima e dopo il verbo', 'solo prima del verbo', 'solo dopo il verbo'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Come si dice "non parlo"?', options: ['je parle ne pas', 'je ne parle pas', 'ne je parle pas', 'je pas parle ne'], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'cloze', sentence: "Il n'aime ___ le café.", answer: 'pas' } },
      { id: 'ex4', payload: { type: 'cloze', sentence: 'Je ___ parle pas anglais.', answer: 'ne' } },
      { id: 'ex5', payload: { type: 'cloze', sentence: "Elle n'___ pas faim.", answer: 'a' } },
      { id: 'ex6', payload: { type: 'translation-it-l2', promptIt: 'non siamo stanchi', answerL2: 'nous ne sommes pas fatigués' } },
      { id: 'ex7', payload: { type: 'translation-it-l2', promptIt: 'non ha fame', answerL2: "elle n'a pas faim" } },
      { id: 'ex8', payload: { type: 'translation-it-l2', promptIt: 'non parlo francese', answerL2: 'je ne parle pas français' } },
      { id: 'ex9', payload: { type: 'reorder', words: ['ne', 'pas', 'parle', 'je', 'français'], answer: ['je', 'ne', 'parle', 'pas', 'français'] } },
      { id: 'ex10', payload: { type: 'reorder', words: ['il', "n'aime", 'pas', 'le', 'café'], answer: ['il', "n'aime", 'pas', 'le', 'café'] } },
      { id: 'ex11', payload: { type: 'multiple-choice', question: 'Perché si scrive "n\'aime" e non "ne aime"?', options: ["per elisione davanti a vocale (come l'/la)", 'è un errore comune ma accettato', 'sono due forme equivalenti'], correctIndex: 0 } },
      { id: 'ex12', payload: { type: 'cloze', sentence: 'Nous ne sommes ___ fatigués.', answer: 'pas' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'non gli piace il caffè', answerL2: "il n'aime pas le café" } },
      { id: 'ex14', payload: { type: 'multiple-choice', question: 'Qual è la negazione corretta di "j\'ai faim"?', options: ["je n'ai pas faim", 'je ne ai pas faim', "j'ai ne pas faim"], correctIndex: 0 } },
      { id: 'ex15', payload: { type: 'cloze', sentence: 'Vous ne parlez ___ italien.', answer: 'pas' } },
    ],
    keySentences: [
      { l2: 'Je ne parle pas français.', it: 'Non parlo francese.' },
      { l2: "Il n'aime pas le café.", it: 'Non gli piace il caffè.' },
      { l2: 'Nous ne sommes pas fatigués.', it: 'Non siamo stanchi.' },
      { l2: "Elle n'a pas faim.", it: 'Non ha fame.' },
    ],
  },
  {
    id: 'fr-plurale',
    language: 'fr',
    cefrLevel: 'A1',
    nodeId: 'plurale',
    title: 'Il plurale dei sostantivi',
    noticingExamples: [
      { l2: 'Le livre → les livres.', it: 'Il libro → i libri.' },
      { l2: 'La maison → les maisons.', it: 'La casa → le case.' },
      { l2: 'Le journal → les journaux.', it: 'Il giornale → i giornali.' },
      { l2: 'Le cheval → les chevaux.', it: 'Il cavallo → i cavalli.' },
    ],
    contrastiveExplanation:
      'In italiano il plurale si sente sempre, nella desinenza finale (libro/libri). In francese la "-s" del ' +
      'plurale è quasi sempre muta: "livre" e "livres" si pronunciano uguali. Il plurale si riconosce quindi ' +
      'soprattutto dall\'articolo ("les"), non dalla parola. Eccezione da notare: le parole che finiscono in ' +
      '"-al" (journal, cheval) fanno il plurale in "-aux" (journaux, chevaux), un po\' come in italiano "-ale" ' +
      'non cambia ma qui la trasformazione è più vistosa.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Come si scrive il plurale di "livre"?', options: ['livre', 'livres', 'livers'], correctIndex: 1 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Il plurale di "livre" si pronuncia diversamente dal singolare?', options: ['sì', "no, la 's' è muta"], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'cloze', sentence: 'Les ___ sont sur la table.', answer: 'livres' } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: 'Il plurale di "journal" è:', options: ['journals', 'journaux', 'journales'], correctIndex: 1 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: 'Il plurale di "cheval" è:', options: ['chevals', 'chevaux', 'chevales'], correctIndex: 1 } },
      { id: 'ex6', payload: { type: 'translation-it-l2', promptIt: 'i libri', answerL2: 'les livres' } },
      { id: 'ex7', payload: { type: 'translation-it-l2', promptIt: 'le case', answerL2: 'les maisons' } },
      { id: 'ex8', payload: { type: 'translation-it-l2', promptIt: 'i cavalli', answerL2: 'les chevaux' } },
      { id: 'ex9', payload: { type: 'reorder', words: ['maisons', 'les', 'grandes', 'sont'], answer: ['les', 'maisons', 'sont', 'grandes'] } },
      { id: 'ex10', payload: { type: 'cloze', sentence: 'Les enfants jouent avec les ___.', answer: 'chevaux' } },
      { id: 'ex11', payload: { type: 'multiple-choice', question: 'Come si capisce che "les livres" è plurale, se la "s" non si sente?', options: ['dall\'articolo "les"', 'dal verbo', 'non si capisce affatto'], correctIndex: 0 } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'i giornali', answerL2: 'les journaux' } },
      { id: 'ex13', payload: { type: 'cloze', sentence: 'Les ___ sont belles.', answer: 'maisons' } },
      { id: 'ex14', payload: { type: 'multiple-choice', question: "Qual è l'eccezione per le parole che finiscono in \"-al\"?", options: ['restano uguali al plurale', 'diventano "-aux"', 'diventano "-als"'], correctIndex: 1 } },
      { id: 'ex15', payload: { type: 'translation-it-l2', promptIt: 'i cani', answerL2: 'les chiens' } },
    ],
    keySentences: [
      { l2: 'Les livres sont sur la table.', it: 'I libri sono sul tavolo.' },
      { l2: 'Les maisons sont grandes.', it: 'Le case sono grandi.' },
      { l2: 'Les journaux sont intéressants.', it: 'I giornali sono interessanti.' },
      { l2: 'Les chevaux courent vite.', it: 'I cavalli corrono veloci.' },
    ],
  },
  {
    id: 'fr-possessivi',
    language: 'fr',
    cefrLevel: 'A1',
    nodeId: 'possessivi',
    title: 'I possessivi',
    noticingExamples: [
      { l2: "C'est mon livre.", it: 'È il mio libro.' },
      { l2: "C'est ma maison.", it: 'È la mia casa.' },
      { l2: "C'est mon amie.", it: 'È la mia amica.' },
      { l2: 'Ce sont mes amis.', it: 'Sono i miei amici.' },
    ],
    contrastiveExplanation:
      "Come in italiano, il possessivo francese si accorda con l'oggetto posseduto, non con chi parla: " +
      '"mon" (maschile), "ma" (femminile), "mes" (plurale). C\'è però un\'eccezione fonetica senza equivalente ' +
      'in italiano: davanti a una parola femminile che inizia per vocale, si usa "mon" anche se è femminile ' +
      '("mon amie", non "ma amie"), solo per evitare due vocali di seguito.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Come si dice "il mio libro"?', options: ['ma livre', 'mon livre', 'mes livre'], correctIndex: 1 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Come si dice "la mia casa"?', options: ['mon maison', 'ma maison', 'mes maison'], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: 'Come si dice "la mia amica" (amie)?', options: ['ma amie', 'mon amie', 'mes amie'], correctIndex: 1 } },
      { id: 'ex4', payload: { type: 'cloze', sentence: "C'est ___ livre.", answer: 'mon' } },
      { id: 'ex5', payload: { type: 'cloze', sentence: "C'est ___ maison.", answer: 'ma' } },
      { id: 'ex6', payload: { type: 'cloze', sentence: 'Ce sont ___ amis.', answer: 'mes' } },
      { id: 'ex7', payload: { type: 'translation-it-l2', promptIt: 'il mio libro', answerL2: 'mon livre' } },
      { id: 'ex8', payload: { type: 'translation-it-l2', promptIt: 'la mia casa', answerL2: 'ma maison' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'i miei amici', answerL2: 'mes amis' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'la mia amica', answerL2: 'mon amie' } },
      { id: 'ex11', payload: { type: 'reorder', words: ['mon', "c'est", 'livre'], answer: ["c'est", 'mon', 'livre'] } },
      { id: 'ex12', payload: { type: 'multiple-choice', question: 'Perché si dice "mon amie" e non "ma amie"?', options: ['perché "amie" è maschile', 'per evitare due vocali di seguito', 'è un errore comune ma tollerato'], correctIndex: 1 } },
      { id: 'ex13', payload: { type: 'cloze', sentence: 'Ce sont ___ chats.', answer: 'mes' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'i miei libri', answerL2: 'mes livres' } },
      { id: 'ex15', payload: { type: 'multiple-choice', question: 'Il possessivo francese si accorda con:', options: ['la persona che parla', 'il genere di chi possiede', "il genere dell'oggetto posseduto"], correctIndex: 2 } },
    ],
    keySentences: [
      { l2: "C'est mon livre.", it: 'È il mio libro.' },
      { l2: "C'est ma maison.", it: 'È la mia casa.' },
      { l2: "C'est mon amie.", it: 'È la mia amica.' },
      { l2: 'Ce sont mes amis.', it: 'Sono i miei amici.' },
    ],
  },
]
