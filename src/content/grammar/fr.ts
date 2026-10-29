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
  {
    id: 'fr-passato-composto',
    language: 'fr',
    cefrLevel: 'A2',
    nodeId: 'passato-composto',
    title: 'Il passato (passé composé)',
    noticingExamples: [
      { l2: "J'ai mangé une pomme.", it: 'Ho mangiato una mela.' },
      { l2: 'Elle est partie tôt.', it: 'È partita presto.' },
      { l2: 'Nous avons fini le travail.', it: 'Abbiamo finito il lavoro.' },
      { l2: 'Ils sont allés au cinéma.', it: 'Sono andati al cinema.' },
      { l2: 'Tu as vu ce film ?', it: 'Hai visto questo film?' },
    ],
    contrastiveExplanation:
      'Il francese forma il passato composto come l\'italiano: con avoir (avere) o être (essere) + ' +
      'participio passato. Come in italiano, i verbi di movimento o cambiamento di stato (aller, ' +
      'partir, arriver, venir, sortir, rester, devenir, tomber, naître, mourir...) prendono être, e ' +
      'il participio si accorda in genere e numero con il soggetto, esattamente come in italiano ' +
      '(elle est partie = "lei è partita"). Attenzione però: la lista dei verbi che prendono être in ' +
      'francese non coincide sempre con quella italiana — per esempio "déménager" (traslocare) prende ' +
      'avoir in francese, mentre "trasferirsi" in italiano usa essere, perché è riflessivo. Il ' +
      'participio passato regolare si forma così: verbi in -er → -é (parlé), in -ir → -i (fini), in ' +
      '-re → -u (vendu); molti verbi comuni hanno un participio irregolare da imparare a memoria ' +
      '(avoir→eu, être→été, faire→fait, voir→vu, prendre→pris).',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Qual è il participio passato di 'parler'?", options: ['parlé', 'parli', 'parlu', 'parlait'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Qual è il participio passato di 'finir'?", options: ['fini', 'finé', 'finu', 'finis'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Qual è il participio passato di 'vendre'?", options: ['vendu', 'vendi', 'vendé', 'vend'], correctIndex: 0 } },
      {
        id: 'ex4',
        explanation: "'faire' ha un participio passato irregolare: fait.",
        payload: { type: 'multiple-choice', question: "Qual è il participio passato di 'faire'?", options: ['fait', 'faisé', 'fai', 'fasu'], correctIndex: 0 },
      },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "Qual è il participio passato di 'voir'?", options: ['vu', 'voyé', 'vuis', 'vois'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "Qual è il participio passato di 'prendre'?", options: ['pris', 'prendu', 'preni', 'prendé'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: "J'___ mangé une pomme.", answer: 'ai' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Elle ___ partie tôt.', answer: 'est' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Nous ___ fini le travail.', answer: 'avons' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: 'Ils ___ allés au cinéma.', answer: 'sont' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'ho mangiato', answerL2: "j'ai mangé" } },
      {
        id: 'ex12',
        explanation: "Con être, il participio si accorda al plurale maschile con una -s.",
        payload: { type: 'translation-it-l2', promptIt: 'sono partiti', answerL2: 'ils sont partis' },
      },
      {
        id: 'ex13',
        explanation: "Con être, il participio si accorda al femminile con una -e.",
        payload: { type: 'translation-it-l2', promptIt: 'è partita', answerL2: 'elle est partie' },
      },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'abbiamo finito', answerL2: 'nous avons fini' } },
      { id: 'ex15', payload: { type: 'reorder', words: ['ai', "j'", 'mangé', 'une', 'pomme'], answer: ["j'", 'ai', 'mangé', 'une', 'pomme'] } },
      { id: 'ex16', payload: { type: 'reorder', words: ['est', 'elle', 'partie', 'tôt'], answer: ['elle', 'est', 'partie', 'tôt'] } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: "Con l'ausiliare être, il participio passato si accorda:", options: ['in genere e numero con il soggetto', 'sempre al maschile singolare', 'solo al plurale'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: "J'ai mangé une pomme.", it: 'Ho mangiato una mela.' },
      { l2: 'Elle est partie tôt.', it: 'È partita presto.' },
      { l2: 'Nous avons fini le travail.', it: 'Abbiamo finito il lavoro.' },
      { l2: 'Ils sont allés au cinéma.', it: 'Sono andati al cinema.' },
    ],
  },
  {
    id: 'fr-futur-simple',
    language: 'fr',
    cefrLevel: 'A2',
    nodeId: 'futuro',
    title: 'Il futuro semplice',
    noticingExamples: [
      { l2: 'Je parlerai demain.', it: 'Parlerò domani.' },
      { l2: 'Tu seras content.', it: 'Sarai contento.' },
      { l2: 'Nous irons à Paris.', it: 'Andremo a Parigi.' },
      { l2: 'Ils auront le temps.', it: 'Avranno tempo.' },
      { l2: 'Elle fera ses devoirs.', it: 'Farà i compiti.' },
    ],
    contrastiveExplanation:
      "Come l'italiano, il francese forma il futuro semplice a partire dall'infinito, con desinenze " +
      'proprie (-ai, -as, -a, -ons, -ez, -ont) nella stessa logica di quelle italiane (-ò, -ai, -à...), ' +
      'anche se diverse nella forma. Per i verbi in -er e -ir si aggiungono le desinenze direttamente ' +
      "all'infinito (parler→parlerai, finir→finirai); per i verbi in -re si toglie la -e finale " +
      '(vendre→vendrai). Come in italiano, alcuni verbi molto comuni hanno una radice irregolare da ' +
      'imparare a memoria: être→ser- (je serai), avoir→aur- (j\'aurai), aller→ir- (j\'irai), ' +
      'faire→fer- (je ferai) — esattamente come l\'italiano ha essere→sar-, avere→avr-. La struttura ' +
      'è quindi la stessa; cambiano solo le forme specifiche.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Futuro di 'parler', io:", options: ['je parlerai', 'je parlai', 'je parlerais', 'je parle'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Futuro di 'finir', tu:", options: ['tu finiras', 'tu finis', 'tu finirais', 'tu finissais'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Futuro di 'vendre', noi:", options: ['nous vendrons', 'nous vendons', 'nous venderons', 'nous vendrions'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Futuro di 'être', io:", options: ['je serai', 'je suis', 'je serais', 'je sera'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "Futuro di 'avoir', tu:", options: ['tu auras', 'tu as', 'tu aurais', 'tu avais'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "Futuro di 'aller', loro:", options: ['ils iront', 'ils vont', 'ils allèrent', 'ils iraient'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'multiple-choice', question: "Futuro di 'faire', lei:", options: ['elle fera', 'elle fait', 'elle ferait', 'elle faisait'], correctIndex: 0 } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Je ___ demain.', answer: 'parlerai' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Nous ___ à Paris.', answer: 'irons' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: 'Ils ___ le temps.', answer: 'auront' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'sarai contento', answerL2: 'tu seras content' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'farà i compiti', answerL2: 'elle fera ses devoirs' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'parlerò domani', answerL2: 'je parlerai demain' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'andremo a Parigi', answerL2: 'nous irons à Paris' } },
      { id: 'ex15', payload: { type: 'reorder', words: ['demain', 'je', 'parlerai'], answer: ['je', 'parlerai', 'demain'] } },
      { id: 'ex16', payload: { type: 'reorder', words: ['seras', 'tu', 'content'], answer: ['tu', 'seras', 'content'] } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: 'Il futuro francese si forma, come l\'italiano, a partire:', options: ["dall'infinito", 'dal participio passato', 'dal presente'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Je parlerai demain.', it: 'Parlerò domani.' },
      { l2: 'Tu seras content.', it: 'Sarai contento.' },
      { l2: 'Nous irons à Paris.', it: 'Andremo a Parigi.' },
      { l2: 'Ils auront le temps.', it: 'Avranno tempo.' },
    ],
  },
  {
    id: 'fr-comparatifs',
    language: 'fr',
    cefrLevel: 'A2',
    nodeId: 'comparativi',
    title: 'Comparativi e superlativi',
    noticingExamples: [
      { l2: 'Marie est plus grande que Paul.', it: 'Marie è più alta di Paul.' },
      { l2: "Ce livre est moins cher que l'autre.", it: "Questo libro è meno caro dell'altro." },
      { l2: 'Elle est aussi intelligente que lui.', it: 'Lei è intelligente quanto lui.' },
      { l2: 'C\'est la plus grande maison du quartier.', it: 'È la casa più grande del quartiere.' },
      { l2: "Ce gâteau est meilleur que l'autre.", it: "Questa torta è migliore dell'altra." },
    ],
    contrastiveExplanation:
      "Il comparativo francese usa sempre 'que' per introdurre il secondo termine di paragone (plus " +
      "grand que, moins cher que), senza la distinzione italiana tra 'di' (con un nome: più alto di " +
      "Paul) e 'che' (con un aggettivo o un'altra frase) — in francese è sempre 'que', il che " +
      "semplifica le cose. Per l'uguaglianza si usa 'aussi...que' (aussi grand que = tanto alto " +
      'quanto/come). Il superlativo relativo si forma con l\'articolo determinativo + plus/moins + ' +
      "aggettivo (le plus grand, la plus belle), e l'articolo si accorda in genere e numero con il " +
      "nome, proprio come in italiano (il più grande, la più grande). Come in italiano, l'aggettivo " +
      "'bon' (buono) ha un comparativo irregolare: 'meilleur' (migliore), non 'plus bon'.",
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Come si dice 'più alto di Paul'?", options: ['plus grand que Paul', 'plus grand de Paul', 'plus grand comme Paul'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Come si dice 'tanto intelligente quanto lui'?", options: ['aussi intelligent que lui', 'aussi intelligent comme lui', 'plus intelligent que lui'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Comparativo irregolare di 'bon':", options: ['meilleur', 'plus bon', 'bonnier'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "'la plus grande maison' si accorda con:", options: ['il genere e numero del nome', 'il soggetto della frase', 'il verbo'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'cloze', sentence: 'Marie est ___ grande que Paul.', answer: 'plus' } },
      { id: 'ex6', payload: { type: 'cloze', sentence: "Ce livre est ___ cher que l'autre.", answer: 'moins' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'C\'est la ___ grande maison du quartier.', answer: 'plus' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: "Ce gâteau est ___ que l'autre.", answer: 'meilleur' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'più caro di Paul', answerL2: 'plus cher que Paul' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: "meno caro dell'altro", answerL2: "moins cher que l'autre" } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'la casa più grande', answerL2: 'la plus grande maison' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: "migliore dell'altra", answerL2: "meilleure que l'autre" } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'tanto grande quanto Paul', answerL2: 'aussi grand que Paul' } },
      { id: 'ex14', payload: { type: 'reorder', words: ['que', 'est', 'grande', 'Marie', 'plus', 'Paul'], answer: ['Marie', 'est', 'plus', 'grande', 'que', 'Paul'] } },
      { id: 'ex15', payload: { type: 'reorder', words: ['intelligente', 'aussi', 'elle', 'que', 'lui', 'est'], answer: ['elle', 'est', 'aussi', 'intelligente', 'que', 'lui'] } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: "Qual è il superlativo relativo di 'grand' (plurale, maschile)?", options: ['les plus grands', 'le plus grand', 'la plus grande'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Marie est plus grande que Paul.', it: 'Marie è più alta di Paul.' },
      { l2: "Ce livre est moins cher que l'autre.", it: "Questo libro è meno caro dell'altro." },
      { l2: "C'est la plus grande maison du quartier.", it: 'È la casa più grande del quartiere.' },
      { l2: "Ce gâteau est meilleur que l'autre.", it: "Questa torta è migliore dell'altra." },
    ],
  },
  {
    id: 'fr-pronoms-complement',
    language: 'fr',
    cefrLevel: 'A2',
    nodeId: 'pronomi-complemento',
    title: 'Pronomi complemento (COD/COI)',
    noticingExamples: [
      { l2: 'Je le vois.', it: 'Lo vedo.' },
      { l2: 'Elle la connaît.', it: 'Lei la conosce.' },
      { l2: 'Je lui parle.', it: 'Gli parlo. / Le parlo.' },
      { l2: 'Nous leur écrivons.', it: 'Scriviamo loro. / Gli scriviamo.' },
      { l2: 'Tu me comprends ?', it: 'Mi capisci?' },
    ],
    contrastiveExplanation:
      "Come l'italiano, il francese pone i pronomi complemento (diretto e indiretto) prima del verbo " +
      "coniugato: 'je le vois' = 'lo vedo', stessa posizione. I pronomi complemento diretto (COD) " +
      'sono me, te, le/la, nous, vous, les — paralleli a mi, ti, lo/la, ci, vi, li/le in italiano. ' +
      'Quelli indiretti (COI) sono me, te, lui, nous, vous, leur — paralleli a mi, ti, gli/le, ci, vi, ' +
      "gli/loro. La differenza principale riguarda la 3ª persona plurale indiretta: l'italiano " +
      "formale mette 'loro' DOPO il verbo (scrivo loro), mentre il francese mette 'leur' SEMPRE prima, " +
      "come tutti gli altri pronomi (nous leur écrivons). Con un infinito, il pronome si attacca " +
      "prima dell'infinito, non del verbo principale: 'je veux le voir' (voglio vederlo — qui invece " +
      "l'italiano lo attacca DOPO l'infinito).",
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Come si dice 'lo vedo' (COD)?", options: ['je le vois', 'je lui vois', 'je la vois'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Come si dice 'gli parlo' (COI maschile)?", options: ['je lui parle', 'je le parle', 'je la parle'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: 'Pronome COI di 3ª plurale:', options: ['leur', 'les', 'lui'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: 'Pronome COD femminile singolare:', options: ['la', 'le', 'lui'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "'Je veux le voir' significa:", options: ['voglio vederlo', 'voglio vedergli', 'lui vuole vedermi'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'cloze', sentence: 'Je ___ vois.', answer: 'le' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Elle ___ connaît.', answer: 'la' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Je ___ parle.', answer: 'lui' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Nous ___ écrivons.', answer: 'leur' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: 'Tu ___ comprends ?', answer: 'me' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'lo vedo', answerL2: 'je le vois' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'le scrivo (a lei)', answerL2: 'je lui écris' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'ci capisce', answerL2: 'il nous comprend' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'scriviamo loro', answerL2: 'nous leur écrivons' } },
      { id: 'ex15', payload: { type: 'reorder', words: ['vois', 'je', 'le'], answer: ['je', 'le', 'vois'] } },
      { id: 'ex16', payload: { type: 'reorder', words: ['parle', 'lui', 'je'], answer: ['je', 'lui', 'parle'] } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: "A differenza dell'italiano formale, il francese 'leur' (a loro) si posiziona:", options: ['sempre prima del verbo, come gli altri pronomi', 'sempre dopo il verbo', "solo con l'infinito"], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Je le vois.', it: 'Lo vedo.' },
      { l2: 'Elle la connaît.', it: 'Lei la conosce.' },
      { l2: 'Je lui parle.', it: 'Gli parlo. / Le parlo.' },
      { l2: 'Nous leur écrivons.', it: 'Scriviamo loro. / Gli scriviamo.' },
    ],
  },
  {
    id: 'fr-partitif',
    language: 'fr',
    cefrLevel: 'A2',
    nodeId: 'partitivo-francese',
    title: 'Il partitivo (du, de la, des)',
    noticingExamples: [
      { l2: 'Je mange du pain.', it: 'Mangio il pane. / Mangio pane.' },
      { l2: 'Elle boit de la bière.', it: 'Lei beve la birra. / Lei beve birra.' },
      { l2: 'Nous avons des amis.', it: 'Abbiamo degli amici. / Abbiamo amici.' },
      { l2: 'Il ne mange pas de viande.', it: 'Non mangia carne.' },
      { l2: "Tu veux de l'eau ?", it: "Vuoi dell'acqua? / Vuoi acqua?" },
    ],
    contrastiveExplanation:
      "In francese, quando si parla di una quantità non specificata di qualcosa (non numerabile, come " +
      "'pane' o 'acqua', o un plurale indeterminato come 'amici'), è OBBLIGATORIO usare l'articolo " +
      'partitivo: du (maschile singolare), de la (femminile singolare), de l\' (davanti a vocale), ' +
      "des (plurale). L'italiano ha un partitivo simile (del pane, della birra, degli amici), ma può " +
      "anche omettere l'articolo del tutto (mangio pane, senza articolo) — il francese non può: 'Je " +
      "mange pain' è scorretto, serve sempre 'Je mange du pain'. Un'altra differenza importante: " +
      "nelle frasi negative, du/de la/des diventano semplicemente 'de' (o 'd'' davanti a vocale): 'Il " +
      "mange du pain' → 'Il ne mange pas de pain' (non 'pas du pain').",
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Come si dice 'mangio il pane' (quantità non specificata)?", options: ['Je mange du pain.', 'Je mange le pain.', 'Je mange un pain.'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Articolo partitivo femminile singolare:', options: ['de la', 'du', 'des'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: 'Articolo partitivo davanti a vocale:', options: ["de l'", 'de la', 'du'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: 'Articolo partitivo plurale:', options: ['des', 'de', 'du'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "Nella negazione, 'du pain' diventa:", options: ['de pain', 'du pain', 'un pain'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'cloze', sentence: 'Je mange ___ pain.', answer: 'du' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Elle boit ___ bière.', answer: 'de la' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Nous avons ___ amis.', answer: 'des' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Tu veux ___ eau ?', answer: "de l'" } },
      { id: 'ex10', payload: { type: 'cloze', sentence: 'Il ne mange pas ___ viande.', answer: 'de' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: "beviamo dell'acqua", answerL2: "nous buvons de l'eau" } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'ho degli amici', answerL2: "j'ai des amis" } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'non mangio carne', answerL2: 'je ne mange pas de viande' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'lei beve birra', answerL2: 'elle boit de la bière' } },
      { id: 'ex15', payload: { type: 'reorder', words: ['mange', 'je', 'pain', 'du'], answer: ['je', 'mange', 'du', 'pain'] } },
      { id: 'ex16', payload: { type: 'reorder', words: ['pas', 'il', 'mange', 'de', 'ne', 'viande'], answer: ['il', 'ne', 'mange', 'pas', 'de', 'viande'] } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: "A differenza dell'italiano, in francese il partitivo:", options: ['è sempre obbligatorio, non si può omettere', 'si può sempre omettere', 'esiste solo al plurale'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Je mange du pain.', it: 'Mangio il pane. / Mangio pane.' },
      { l2: 'Elle boit de la bière.', it: 'Lei beve la birra. / Lei beve birra.' },
      { l2: 'Nous avons des amis.', it: 'Abbiamo degli amici. / Abbiamo amici.' },
      { l2: 'Il ne mange pas de viande.', it: 'Non mangia carne.' },
    ],
  },
  {
    id: 'fr-conditionnel',
    language: 'fr',
    cefrLevel: 'B1',
    nodeId: 'condizionale',
    title: 'Le conditionnel présent',
    noticingExamples: [
      { l2: 'Je voudrais un café.', it: 'Vorrei un caffè.' },
      { l2: "Si j'avais de l'argent, j'achèterais une voiture.", it: 'Se avessi dei soldi, comprerei una macchina.' },
      { l2: 'Tu devrais partir.', it: 'Dovresti partire.' },
      { l2: 'Elle serait contente.', it: 'Sarebbe contenta.' },
      { l2: 'Nous pourrions venir demain.', it: 'Potremmo venire domani.' },
    ],
    contrastiveExplanation:
      'Come l\'italiano, il francese forma il condizionale presente a partire dalla stessa radice ' +
      'del futuro (le stesse irregolarità: être→ser-, avoir→aur-, aller→ir-, faire→fer-), ma con ' +
      'desinenze diverse (-ais, -ais, -ait, -ions, -iez, -aient) che assomigliano a quelle ' +
      'dell\'imperfetto, non del futuro: "je parlerais" (parlerei) è "parler-" (radice del futuro) + ' +
      '"-ais" (desinenza dell\'imperfetto). L\'uso principale — richieste gentili (je voudrais), ' +
      'consigli (tu devrais), ipotesi (si j\'avais...) — è molto simile all\'italiano. Una differenza ' +
      'importante riguarda le frasi ipotetiche con "se/si": l\'italiano usa il congiuntivo imperfetto ' +
      'nella proposizione con "se" (se avessi) e il condizionale nella principale, mentre il francese ' +
      'usa l\'IMPERFETTO DELL\'INDICATIVO dopo "si" (si j\'avais, non un congiuntivo) e il condizionale ' +
      'nella principale.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Condizionale di 'vouloir', io:", options: ['je voudrais', 'je veux', 'je voulais', 'je voudrai'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Condizionale di 'être', lei:", options: ['elle serait', 'elle est', 'elle était', 'elle sera'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Condizionale di 'pouvoir', noi:", options: ['nous pourrions', 'nous pouvons', 'nous pourrons', 'nous pouvions'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Condizionale di 'devoir', tu:", options: ['tu devrais', 'tu dois', 'tu devras', 'tu devais'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "Nella proposizione con 'si' (se), il francese usa:", options: ["l'imperfetto dell'indicativo", 'il congiuntivo', 'il condizionale'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'cloze', sentence: 'Je ___ un café.', answer: 'voudrais' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: "Si j'avais de l'argent, j'___ une voiture.", answer: 'achèterais' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Tu ___ partir.', answer: 'devrais' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Elle ___ contente.', answer: 'serait' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'vorrei un caffè', answerL2: 'Je voudrais un café.' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'dovresti partire', answerL2: 'Tu devrais partir.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'sarebbe contenta', answerL2: 'Elle serait contente.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'potremmo venire domani', answerL2: 'Nous pourrions venir demain.' } },
      { id: 'ex14', payload: { type: 'reorder', words: ['un', 'voudrais', 'je', 'café'], answer: ['je', 'voudrais', 'un', 'café'] } },
      { id: 'ex15', payload: { type: 'reorder', words: ['devrais', 'tu', 'partir'], answer: ['tu', 'devrais', 'partir'] } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: 'Il condizionale francese si forma con:', options: ["radice del futuro + desinenze dell'imperfetto", 'radice del presente + desinenze proprie', 'ausiliare + participio'], correctIndex: 0 } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: "'Si j'avais de l'argent' significa:", options: ['se avessi dei soldi', 'se ho dei soldi', 'se avrò dei soldi'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Je voudrais un café.', it: 'Vorrei un caffè.' },
      { l2: "Si j'avais de l'argent, j'achèterais une voiture.", it: 'Se avessi dei soldi, comprerei una macchina.' },
      { l2: 'Tu devrais partir.', it: 'Dovresti partire.' },
      { l2: 'Nous pourrions venir demain.', it: 'Potremmo venire domani.' },
    ],
  },
  {
    id: 'fr-subjonctif',
    language: 'fr',
    cefrLevel: 'B1',
    nodeId: 'congiuntivo',
    title: 'Le subjonctif présent',
    noticingExamples: [
      { l2: 'Il faut que tu partes.', it: 'Bisogna che tu parta.' },
      { l2: 'Je veux que tu viennes.', it: 'Voglio che tu venga.' },
      { l2: 'Je suis content que tu sois là.', it: 'Sono contento che tu sia qui.' },
      { l2: "Bien qu'il soit tard, je reste.", it: 'Anche se è tardi, resto.' },
      { l2: 'Je pense qu\'il vient.', it: 'Penso che venga.' },
    ],
    contrastiveExplanation:
      'Il subjonctif francese si forma, per la maggior parte dei verbi, dalla radice della 3ª ' +
      'persona plurale del presente indicativo + desinenze proprie (-e, -es, -e, -ions, -iez, -ent): ' +
      'parler → ils parlent → que je parle. Alcuni verbi comuni sono irregolari: être→que je sois, ' +
      'avoir→que j\'aie, faire→que je fasse, aller→que j\'aille, pouvoir→que je puisse. La vera ' +
      'trappola per un italiano non è la forma, ma l\'USO: il francese usa il subjonctif dopo ' +
      'espressioni di necessità, volontà, emozione, dubbio (il faut que, je veux que, je suis ' +
      'content que, bien que), ESATTAMENTE come l\'italiano usa il congiuntivo in questi casi. Ma ' +
      'dopo verbi di opinione come "penser que" o "croire que" in forma affermativa, il francese usa ' +
      'l\'INDICATIVO ("je pense qu\'il vient"), mentre l\'italiano usa quasi sempre il congiuntivo ' +
      '("penso che venga") — questo è l\'errore più comune per un italofono che impara il francese, ' +
      'nella direzione opposta a quella abituale: qui è il francese a essere "più semplice".',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Subjonctif di 'parler', io:", options: ['que je parle', 'que je parles', 'que je parlerai', 'que je parlais'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Subjonctif irregolare di 'être', io:", options: ['que je sois', 'que je suis', 'que je serai'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Subjonctif irregolare di 'avoir', io:", options: ["que j'aie", "que j'ai", "que j'aurai"], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Subjonctif irregolare di 'faire', io:", options: ['que je fasse', 'que je fais', 'que je ferai'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "'Je pense qu'il vient' usa:", options: ["l'indicativo", 'il subjonctif', 'il condizionale'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "'Il faut que tu partes' usa:", options: ['il subjonctif', "l'indicativo", 'il condizionale'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Il faut que tu ___.', answer: 'partes' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Je veux que tu ___.', answer: 'viennes' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Je suis content que tu ___ là.', answer: 'sois' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: "Bien qu'il ___ tard, je reste.", answer: 'soit' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'bisogna che tu parta', answerL2: 'Il faut que tu partes.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'voglio che tu venga', answerL2: 'Je veux que tu viennes.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'sono contento che tu sia qui', answerL2: 'Je suis content que tu sois là.' } },
      { id: 'ex14', payload: { type: 'reorder', words: ['que', 'il', 'partes', 'faut', 'tu'], answer: ['il', 'faut', 'que', 'tu', 'partes'] } },
      { id: 'ex15', payload: { type: 'reorder', words: ['veux', 'que', 'je', 'viennes', 'tu'], answer: ['je', 'veux', 'que', 'tu', 'viennes'] } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: "A differenza dell'italiano, dopo 'je pense que' (affermativo) il francese usa:", options: ["l'indicativo, non il subjonctif", 'sempre il subjonctif', 'il condizionale'], correctIndex: 0 } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: 'Il subjonctif si forma di solito dalla radice:', options: ['della 3ª plurale del presente indicativo', 'del participio passato', "dell'infinito"], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Il faut que tu partes.', it: 'Bisogna che tu parta.' },
      { l2: 'Je veux que tu viennes.', it: 'Voglio che tu venga.' },
      { l2: 'Je suis content que tu sois là.', it: 'Sono contento che tu sia qui.' },
      { l2: "Je pense qu'il vient.", it: 'Penso che venga.' },
    ],
  },
  {
    id: 'fr-pronoms-relatifs',
    language: 'fr',
    cefrLevel: 'B2',
    nodeId: 'pronomi-relativi-francesi',
    title: 'Les pronoms relatifs (qui, que, dont, où)',
    noticingExamples: [
      { l2: 'La femme qui parle est ma sœur.', it: 'La donna che parla è mia sorella.' },
      { l2: 'Le livre que je lis est intéressant.', it: 'Il libro che leggo è interessante.' },
      { l2: 'C\'est le livre dont je parle.', it: 'È il libro di cui parlo.' },
      { l2: "La maison où j'habite est grande.", it: 'La casa dove abito è grande.' },
      { l2: 'Le jour où je suis né...', it: 'Il giorno in cui sono nato...' },
    ],
    contrastiveExplanation:
      'L\'italiano usa "che" sia per il soggetto (la donna CHE parla) sia per l\'oggetto (il libro ' +
      'CHE leggo) della proposizione relativa, senza distinguerli. Il francese invece distingue ' +
      'sempre: "qui" quando il pronome relativo è il SOGGETTO della frase relativa, "que" quando è ' +
      'l\'OGGETTO diretto. La vera difficoltà è "dont": sostituisce un complemento introdotto da "de" ' +
      '(parler DE quelque chose → la chose DONT on parle) e corrisponde, secondo il contesto, a "di ' +
      'cui", "del quale" o "la cui" — un solo pronome francese per diverse costruzioni italiane, ' +
      'perché "dont" porta in sé sia il significato di "di" sia quello del pronome relativo. "Où" ' +
      'infine si usa non solo per il luogo fisico (la maison où j\'habite) ma anche per il tempo (le ' +
      'jour où je suis né = il giorno IN CUI sono nato) — un uso più ampio di "dove" in italiano.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'La donna CHE parla (soggetto):', options: ['La femme qui parle.', 'La femme que parle.', 'La femme dont parle.'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Il libro CHE leggo (oggetto):', options: ['Le livre que je lis.', 'Le livre qui je lis.', 'Le livre dont je lis.'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "'dont' sostituisce un complemento introdotto da:", options: ["'de'", "'à'", 'niente, è un soggetto'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "'C'est le livre dont je parle' significa:", options: ['è il libro di cui parlo', 'è il libro che parlo', 'è il libro dove parlo'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "'Le jour où je suis né' significa:", options: ['il giorno in cui sono nato', 'il giorno dove sono nato', 'il giorno che sono nato'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "'qui' si usa quando il pronome relativo è:", options: ['il soggetto della relativa', "l'oggetto diretto", "introdotto da 'de'"], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'La femme ___ parle est ma sœur.', answer: 'qui' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Le livre ___ je lis est intéressant.', answer: 'que' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'C\'est le livre ___ je parle.', answer: 'dont' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: "La maison ___ j'habite est grande.", answer: 'où' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'la donna che parla', answerL2: 'la femme qui parle' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'il libro che leggo', answerL2: 'le livre que je lis' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'il libro di cui parlo', answerL2: 'le livre dont je parle' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'la casa dove abito', answerL2: "la maison où j'habite" } },
      { id: 'ex15', payload: { type: 'reorder', words: ['qui', 'la', 'parle', 'femme'], answer: ['la', 'femme', 'qui', 'parle'] } },
      { id: 'ex16', payload: { type: 'reorder', words: ['je', 'que', 'lis', 'livre', 'le'], answer: ['le', 'livre', 'que', 'je', 'lis'] } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: 'A differenza dell\'italiano, il francese distingue sempre:', options: ["'qui' (soggetto) da 'que' (oggetto)", 'maschile e femminile nel pronome relativo', 'singolare e plurale nel pronome relativo'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'La femme qui parle est ma sœur.', it: 'La donna che parla è mia sorella.' },
      { l2: 'Le livre que je lis est intéressant.', it: 'Il libro che leggo è interessante.' },
      { l2: "C'est le livre dont je parle.", it: 'È il libro di cui parlo.' },
      { l2: "La maison où j'habite est grande.", it: 'La casa dove abito è grande.' },
    ],
  },
  {
    id: 'fr-discours-indirect',
    language: 'fr',
    cefrLevel: 'B2',
    nodeId: 'discorso-indiretto-francese',
    title: 'Le discours indirect',
    noticingExamples: [
      { l2: "Il a dit qu'il était fatigué.", it: 'Ha detto che era stanco.' },
      { l2: "Elle a dit qu'elle viendrait le lendemain.", it: 'Ha detto che sarebbe venuta il giorno dopo.' },
      { l2: "Il a demandé où j'allais.", it: 'Ha chiesto dove andassi.' },
      { l2: "Elle a dit qu'elle avait fini.", it: 'Ha detto che aveva finito.' },
      { l2: "Il m'a dit qu'il m'aiderait.", it: 'Mi ha detto che mi avrebbe aiutato.' },
    ],
    contrastiveExplanation:
      'Come l\'italiano, il francese richiede uno spostamento dei tempi verbali (concordance des ' +
      'temps) quando si riporta un discorso al passato: il presente del discorso diretto diventa ' +
      'imperfetto ("je suis" → qu\'il était), il futuro diventa condizionale ("je viendrai" → ' +
      'qu\'elle viendrait), il passato composto diventa trapassato ("j\'ai fini" → qu\'elle avait ' +
      'fini) — esattamente la stessa logica di spostamento dell\'italiano (presente→imperfetto, ' +
      'futuro→condizionale passato). Cambiano invece, come in italiano, le espressioni di tempo ' +
      'legate al momento dell\'enunciazione: "aujourd\'hui" (oggi) diventa "ce jour-là" (quel ' +
      'giorno), "demain" (domani) diventa "le lendemain" (il giorno dopo), "hier" (ieri) diventa "la ' +
      'veille" (il giorno prima) — il parallelo con l\'italiano regge bene su questo punto.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Discorso diretto 'je suis fatigué' al passato diventa:", options: ["qu'il était fatigué", "qu'il est fatigué", "qu'il sera fatigué"], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Discorso diretto 'je viendrai demain' al passato diventa:", options: ["qu'elle viendrait le lendemain", "qu'elle vient demain", "qu'elle venait demain"], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Discorso diretto 'j'ai fini' al passato diventa:", options: ["qu'elle avait fini", "qu'elle a fini", "qu'elle finissait"], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "'aujourd'hui' nel discorso indiretto al passato diventa:", options: ['ce jour-là', 'demain', 'hier'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "'demain' nel discorso indiretto al passato diventa:", options: ['le lendemain', "aujourd'hui", 'la veille'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: 'Il presente del discorso diretto, riportato al passato, diventa:', options: ["l'imperfetto", 'il futuro', 'il condizionale'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: "Il a dit qu'il ___ fatigué.", answer: 'était' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: "Elle a dit qu'elle ___ le lendemain.", answer: 'viendrait' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: "Elle a dit qu'elle ___ fini.", answer: 'avait' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'ha detto che era stanco', answerL2: "Il a dit qu'il était fatigué." } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'ha detto che sarebbe venuta il giorno dopo', answerL2: "Elle a dit qu'elle viendrait le lendemain." } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'ha detto che aveva finito', answerL2: "Elle a dit qu'elle avait fini." } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'mi ha detto che mi avrebbe aiutato', answerL2: "Il m'a dit qu'il m'aiderait." } },
      { id: 'ex14', payload: { type: 'reorder', words: ['dit', 'il', 'fatigué', "qu'il", 'a', 'était'], answer: ['il', 'a', 'dit', "qu'il", 'était', 'fatigué'] } },
      { id: 'ex15', payload: { type: 'reorder', words: ['demandé', 'il', 'allais', 'a', 'où', "j'"], answer: ['il', 'a', 'demandé', 'où', "j'", 'allais'] } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: 'Il futuro del discorso diretto, riportato al passato, diventa:', options: ['il condizionale', "l'imperfetto", 'resta futuro'], correctIndex: 0 } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: "Rispetto all'italiano, lo spostamento dei tempi nel discorso indiretto francese è:", options: ['molto simile, stessa logica di fondo', 'completamente diverso', 'assente in francese'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: "Il a dit qu'il était fatigué.", it: 'Ha detto che era stanco.' },
      { l2: "Elle a dit qu'elle viendrait le lendemain.", it: 'Ha detto che sarebbe venuta il giorno dopo.' },
      { l2: "Elle a dit qu'elle avait fini.", it: 'Ha detto che aveva finito.' },
      { l2: "Il m'a dit qu'il m'aiderait.", it: 'Mi ha detto che mi avrebbe aiutato.' },
    ],
  },
  {
    id: 'fr-subjonctif-passe',
    language: 'fr',
    cefrLevel: 'C1',
    nodeId: 'subjonctif-passe-francese',
    title: 'Le subjonctif passé et la concordance des temps',
    noticingExamples: [
      { l2: "Je suis content qu'il soit venu.", it: 'Sono contento che sia venuto.' },
      { l2: "Il doute qu'elle ait fini.", it: 'Dubita che abbia finito.' },
      { l2: "Bien qu'il ait beaucoup travaillé, il a échoué.", it: 'Anche se ha lavorato molto, ha fallito.' },
      { l2: "C'est le meilleur film que j'aie vu.", it: 'È il miglior film che abbia visto.' },
      { l2: "Je regrette qu'elle soit partie.", it: 'Mi dispiace che sia partita.' },
    ],
    contrastiveExplanation:
      'Il subjonctif passé si forma con avoir o être al subjonctif présent + participio passato: ' +
      '"qu\'il SOIT venu", "qu\'elle AIT fini". Si usa, negli stessi contesti del subjonctif ' +
      'présent (dubbio, emozione, necessità...), quando l\'azione della subordinata è avvenuta ' +
      'PRIMA del momento della principale: "je suis content qu\'il soit venu HIER" (congiuntivo ' +
      'passato, azione anteriore) contro "je suis content qu\'il vienne DEMAIN" (congiuntivo ' +
      'presente, azione simultanea/futura) — esattamente la stessa logica dell\'italiano "congiuntivo ' +
      'passato" (sia venuto) vs "congiuntivo presente" (venga). Una nota da C1: il francese ' +
      'letterario avrebbe anche un imperfetto e un trapassato del subjonctif (qu\'il FÛT venu), ma ' +
      'queste forme sono praticamente scomparse dal parlato e dalla scrittura corrente, sostituite ' +
      'dal subjonctif présent/passé anche in contesti dove la "concordance des temps" classica le ' +
      'richiederebbe — qui il francese moderno è più semplice dell\'italiano, che mantiene vivo il ' +
      'congiuntivo imperfetto/trapassato (se fossi venuto...).',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Subjonctif passé di 'venir', lui:", options: ["qu'il soit venu", "qu'il vienne", "qu'il venait"], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Subjonctif passé di 'finir', lei:", options: ["qu'elle ait fini", "qu'elle finisse", "qu'elle a fini"], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "'Je suis content qu'il soit venu HIER' usa il subjonctif passé perché l'azione è:", options: ['anteriore al momento della principale', 'simultanea alla principale', 'futura rispetto alla principale'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "'Je suis content qu'il vienne DEMAIN' usa il subjonctif présent perché l'azione è:", options: ['simultanea/futura rispetto alla principale', 'anteriore alla principale', 'già conclusa'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "L'imperfetto/trapassato del subjonctif nel francese moderno sono:", options: ['praticamente scomparsi dal parlato, sostituiti da présent/passé', 'ancora usatissimi nel parlato', 'obbligatori in ogni frase formale'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "'C'est le meilleur film que j'aie vu' usa il subjonctif perché:", options: ['è un superlativo relativo, contesto classico del subjonctif', 'è una semplice affermazione', 'è il discorso indiretto'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: "Je suis content qu'il ___ venu.", answer: 'soit' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: "Il doute qu'elle ___ fini.", answer: 'ait' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: "Bien qu'il ___ beaucoup travaillé, il a échoué.", answer: 'ait' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: "Je regrette qu'elle ___ partie.", answer: 'soit' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'sono contento che sia venuto', answerL2: "Je suis content qu'il soit venu." } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'dubita che abbia finito', answerL2: "Il doute qu'elle ait fini." } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'mi dispiace che sia partita', answerL2: "Je regrette qu'elle soit partie." } },
      { id: 'ex14', payload: { type: 'reorder', words: ['content', 'je', 'venu', 'soit', 'suis', "qu'il"], answer: ['je', 'suis', 'content', "qu'il", 'soit', 'venu'] } },
      { id: 'ex15', payload: { type: 'reorder', words: ['doute', 'il', 'fini', 'ait', "qu'elle"], answer: ['il', 'doute', "qu'elle", 'ait', 'fini'] } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: "Rispetto all'italiano, sulla distinzione tra congiuntivo presente e passato il francese è:", options: ['molto simile, stessa logica di anteriorità', 'completamente diverso', 'assente in francese'], correctIndex: 0 } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: 'Il subjonctif passé si forma con:', options: ['avoir/être al subjonctif présent + participio passato', "avoir/être all'indicativo + participio passato", 'werden + infinito'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: "Je suis content qu'il soit venu.", it: 'Sono contento che sia venuto.' },
      { l2: "Il doute qu'elle ait fini.", it: 'Dubita che abbia finito.' },
      { l2: "C'est le meilleur film que j'aie vu.", it: 'È il miglior film che abbia visto.' },
      { l2: "Je regrette qu'elle soit partie.", it: 'Mi dispiace che sia partita.' },
    ],
  },
  {
    id: 'fr-temps-litteraires',
    language: 'fr',
    cefrLevel: 'C1',
    nodeId: 'temps-litteraires-francesi',
    title: 'Les temps littéraires (le passé simple)',
    noticingExamples: [
      { l2: "Il entra dans la pièce et s'assit.", it: 'Entrò nella stanza e si sedette.' },
      { l2: 'Elle fut très heureuse.', it: 'Fu molto felice.' },
      { l2: 'Ils vinrent nous voir.', it: 'Vennero a trovarci.' },
      { l2: 'Le roi mourut sans héritier.', it: 'Il re morì senza eredi.' },
      { l2: 'Nous eûmes beaucoup de chance.', it: 'Avemmo molta fortuna.' },
    ],
    contrastiveExplanation:
      'Il passé simple è un tempo ESCLUSIVAMENTE scritto: si trova in romanzi, fiabe, libri di ' +
      'storia, ma NESSUN francese lo usa mai parlando — nel parlato si usa sempre il passé composé ' +
      'anche per narrare eventi del passato lontano. L\'equivalente funzionale più vicino in italiano ' +
      'è il passato remoto, che però in alcune regioni italiane resta vivo anche nel parlato ' +
      'quotidiano — il francese ha quindi una separazione più netta e assoluta tra scritto (passé ' +
      'simple) e parlato (passé composé) di quanto non avvenga in italiano. A C1 l\'obiettivo è il ' +
      'RICONOSCIMENTO per la lettura, non la produzione attiva: riconoscere forme come "il entra" (è ' +
      'entrato/entrò), "elle fut" (fu, da être), "ils vinrent" (vennero, da venir), "il mourut" ' +
      '(morì, da mourir) quando si legge un testo letterario, sapendo che corrispondono a un passé ' +
      'composé nel parlato.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "'Il entra dans la pièce' (passé simple) corrisponde, nel parlato, a:", options: ['Il est entré dans la pièce.', 'Il entre dans la pièce.', 'Il entrerait dans la pièce.'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Il passé simple si usa:', options: ['solo nello scritto letterario/narrativo, mai nel parlato', 'sia nello scritto sia nel parlato', 'solo nel parlato formale'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Passé simple di 'être', lei:", options: ['elle fut', 'elle est', 'elle était'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Passé simple di 'avoir', noi:", options: ['nous eûmes', 'nous avons eu', 'nous avions'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "Passé simple di 'venir', loro:", options: ['ils vinrent', 'ils sont venus', 'ils venaient'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "L'equivalente funzionale più vicino in italiano è:", options: ['il passato remoto', 'il passato prossimo', "l'imperfetto"], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'multiple-choice', question: "A C1, l'obiettivo sul passé simple è:", options: ['riconoscerlo in lettura, non produrlo attivamente', 'saperlo usare parlando', 'ignorarlo completamente'], correctIndex: 0 } },
      { id: 'ex8', payload: { type: 'cloze', sentence: "Il ___ dans la pièce et s'assit.", answer: 'entra' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Elle ___ très heureuse.', answer: 'fut' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: 'Le roi ___ sans héritier.', answer: 'mourut' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'entrò nella stanza', answerL2: 'Il entra dans la pièce.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'fu molto felice', answerL2: 'Elle fut très heureuse.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'vennero a trovarci', answerL2: 'Ils vinrent nous voir.' } },
      { id: 'ex14', payload: { type: 'reorder', words: ['pièce', 'il', 'la', 'dans', 'entra'], answer: ['il', 'entra', 'dans', 'la', 'pièce'] } },
      { id: 'ex15', payload: { type: 'reorder', words: ['heureuse', 'elle', 'très', 'fut'], answer: ['elle', 'fut', 'très', 'heureuse'] } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: "A differenza dell'italiano, la separazione scritto/parlato per il passato narrativo in francese è:", options: ['più netta e assoluta (passé simple mai parlato, da nessuno)', 'meno netta che in italiano', 'inesistente'], correctIndex: 0 } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: "'Nous eûmes beaucoup de chance' significa:", options: ['avemmo molta fortuna', 'abbiamo molta fortuna', 'avremo molta fortuna'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: "Il entra dans la pièce et s'assit.", it: 'Entrò nella stanza e si sedette.' },
      { l2: 'Elle fut très heureuse.', it: 'Fu molto felice.' },
      { l2: 'Ils vinrent nous voir.', it: 'Vennero a trovarci.' },
      { l2: 'Le roi mourut sans héritier.', it: 'Il re morì senza eredi.' },
    ],
  },
]
