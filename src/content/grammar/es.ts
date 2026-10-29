import type { GrammarUnitContent } from '../../types/grammarContent'

export const ES_UNITS: GrammarUnitContent[] = [
  {
    id: 'es-articoli',
    language: 'es',
    cefrLevel: 'A1',
    nodeId: 'articoli',
    title: 'Articoli e genere dei sostantivi',
    noticingExamples: [
      { l2: 'El gato duerme.', it: 'Il gatto dorme.' },
      { l2: 'La casa es grande.', it: 'La casa è grande.' },
      { l2: 'Los niños juegan.', it: 'I bambini giocano.' },
      { l2: 'Un perro ladra.', it: 'Un cane abbaia.' },
      { l2: 'Una manzana roja.', it: 'Una mela rossa.' },
    ],
    contrastiveExplanation:
      'Spagnolo e italiano sono entrambe lingue romanze e condividono spesso lo stesso genere per la ' +
      'stessa parola, ma non sempre: "la leche" (il latte) è femminile in spagnolo ma maschile in italiano; ' +
      '"la nariz" (il naso) è femminile in spagnolo ma maschile in italiano. Il plurale si forma in modo ' +
      'regolare con "los" (maschile) e "las" (femminile): a differenza del tedesco, il genere resta visibile ' +
      "anche al plurale.",
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Qual è l'articolo per \"casa\"?", options: ['el', 'la', 'los'], correctIndex: 1 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Come si dice "il gatto"?', options: ['el gato', 'la gato', 'los gato'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'cloze', sentence: '___ niños juegan.', answer: 'Los' } },
      { id: 'ex4', payload: { type: 'cloze', sentence: 'Tengo ___ perro.', answer: 'un' } },
      { id: 'ex5', payload: { type: 'translation-it-l2', promptIt: 'il libro', answerL2: 'el libro' } },
      { id: 'ex6', payload: { type: 'translation-it-l2', promptIt: 'una mela', answerL2: 'una manzana' } },
      { id: 'ex7', payload: { type: 'translation-it-l2', promptIt: 'i bambini', answerL2: 'los niños' } },
      {
        id: 'ex8',
        explanation: 'In spagnolo "leche" è femminile, anche se in italiano "latte" è maschile.',
        payload: { type: 'multiple-choice', question: 'Come si dice "il latte"?', options: ['el leche', 'la leche', 'un leche'], correctIndex: 1 },
      },
      {
        id: 'ex9',
        explanation: 'In spagnolo "nariz" è femminile, anche se in italiano "naso" è maschile.',
        payload: { type: 'multiple-choice', question: 'Come si dice "il naso"?', options: ['el nariz', 'la nariz', 'un nariz'], correctIndex: 1 },
      },
      { id: 'ex10', payload: { type: 'cloze', sentence: '___ casa es grande.', answer: 'La' } },
      { id: 'ex11', payload: { type: 'reorder', words: ['duerme', 'el', 'gato'], answer: ['el', 'gato', 'duerme'] } },
      { id: 'ex12', payload: { type: 'reorder', words: ['roja', 'una', 'manzana'], answer: ['una', 'manzana', 'roja'] } },
      { id: 'ex13', payload: { type: 'cloze', sentence: 'Los ___ juegan.', answer: 'niños' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'una gatta', answerL2: 'una gata' } },
      { id: 'ex15', payload: { type: 'translation-it-l2', promptIt: 'un cane', answerL2: 'un perro' } },
    ],
    keySentences: [
      { l2: 'El gato duerme.', it: 'Il gatto dorme.' },
      { l2: 'La casa es grande.', it: 'La casa è grande.' },
      { l2: 'Los niños juegan.', it: 'I bambini giocano.' },
      { l2: 'La leche está fría.', it: 'Il latte è freddo.' },
    ],
  },
  {
    id: 'es-pronomi-soggetto',
    language: 'es',
    cefrLevel: 'A1',
    nodeId: 'pronomi-soggetto',
    title: 'Pronomi soggetto e presente dei verbi in -ar',
    noticingExamples: [
      { l2: 'Hablo español.', it: 'Parlo spagnolo.' },
      { l2: 'Hablas bien.', it: 'Parli bene.' },
      { l2: 'Habla inglés.', it: 'Parla inglese.' },
      { l2: 'Hablamos juntos.', it: 'Parliamo insieme.' },
      { l2: 'Hablan rápido.', it: 'Parlano velocemente.' },
    ],
    contrastiveExplanation:
      'Lo spagnolo, come l\'italiano, omette quasi sempre il pronome soggetto perché la desinenza del ' +
      'verbo indica già chi parla: qui le due lingue si comportano allo stesso modo. Questo le rende più ' +
      '"comode" rispetto al francese o al tedesco, dove il pronome è obbligatorio — ma proprio per questo, ' +
      'se si studiano più lingue insieme, è facile confondersi e aggiungere un pronome di troppo in spagnolo ' +
      'per abitudine presa dal francese o dal tedesco.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Come si dice "io parlo"?', options: ['hablo', 'hablas', 'habla', 'hablamos'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Qual è la forma per "noi parliamo"?', options: ['hablan', 'hablamos', 'habláis', 'hablas'], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'conjugation', infinitive: 'hablar', pronoun: 'tú', answer: 'hablas' } },
      { id: 'ex4', payload: { type: 'conjugation', infinitive: 'hablar', pronoun: 'nosotros', answer: 'hablamos' } },
      { id: 'ex5', payload: { type: 'conjugation', infinitive: 'estudiar', pronoun: 'él', answer: 'estudia' } },
      { id: 'ex6', payload: { type: 'conjugation', infinitive: 'estudiar', pronoun: 'ellos', answer: 'estudian' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Tú ___ bien.', answer: 'hablas' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Ella ___ mucho.', answer: 'estudia' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'tu parli bene', answerL2: 'hablas bien' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'noi parliamo insieme', answerL2: 'hablamos juntos' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'loro parlano spagnolo', answerL2: 'hablan español' } },
      { id: 'ex12', payload: { type: 'reorder', words: ['español', 'hablo'], answer: ['hablo', 'español'] } },
      { id: 'ex13', payload: { type: 'reorder', words: ['juntos', 'hablamos'], answer: ['hablamos', 'juntos'] } },
      {
        id: 'ex14',
        payload: {
          type: 'multiple-choice',
          question: 'Perché in spagnolo si può omettere "yo", "tú"...?',
          options: ['per eleganza', 'perché la desinenza del verbo indica già la persona', 'è obbligatorio scriverlo sempre, come in francese'],
          correctIndex: 1,
        },
      },
      { id: 'ex15', payload: { type: 'cloze', sentence: 'Nosotros ___ italiano.', answer: 'hablamos' } },
    ],
    keySentences: [
      { l2: 'Hablo español.', it: 'Parlo spagnolo.' },
      { l2: 'Hablamos juntos.', it: 'Parliamo insieme.' },
      { l2: 'Ella estudia mucho.', it: 'Lei studia molto.' },
      { l2: 'Hablan rápido.', it: 'Parlano velocemente.' },
    ],
  },
  {
    id: 'es-essere-avere',
    language: 'es',
    cefrLevel: 'A1',
    nodeId: 'essere-avere',
    title: 'Ser, estar y tener',
    noticingExamples: [
      { l2: 'Soy italiano.', it: 'Sono italiano.' },
      { l2: 'Estoy cansado.', it: 'Sono stanco.' },
      { l2: 'Tengo veinte años.', it: 'Ho vent\'anni.' },
      { l2: 'Hay un problema.', it: "C'è un problema." },
    ],
    contrastiveExplanation:
      'Il punto più delicato dello spagnolo per un italofono: esistono DUE verbi per "essere". "Ser" per ' +
      'caratteristiche permanenti (identità, nazionalità, professione: "soy italiano"), "estar" per stati ' +
      'temporanei o posizione ("estoy cansado" = sono stanco ora, non per sempre). L\'italiano ha un solo ' +
      'verbo "essere" per entrambi i casi, quindi questa distinzione va costruita da zero. Per l\'età si usa ' +
      '"tener" (come l\'italiano "avere"); per "c\'è/ci sono" si usa "hay" (dal verbo "haber"), una forma a parte.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Quale verbo si usa per caratteristiche permanenti (es. nazionalità)?', options: ['ser', 'estar'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Quale verbo si usa per stati temporanei (es. stanchezza)?', options: ['ser', 'estar'], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: 'Come si dice "sono stanco" (adesso, temporaneo)?', options: ['soy cansado', 'estoy cansado'], correctIndex: 1 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: 'Come si dice "sono italiano" (caratteristica permanente)?', options: ['soy italiano', 'estoy italiano'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'conjugation', infinitive: 'tener', pronoun: 'yo', answer: 'tengo' } },
      { id: 'ex6', payload: { type: 'conjugation', infinitive: 'estar', pronoun: 'tú', answer: 'estás' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: '___ veinte años.', answer: 'Tengo' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: '___ un problema.', answer: 'Hay' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: "ho vent'anni", answerL2: 'tengo veinte años' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: "c'è un problema", answerL2: 'hay un problema' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'sono stanco', answerL2: 'estoy cansado' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'sono italiano', answerL2: 'soy italiano' } },
      { id: 'ex13', payload: { type: 'reorder', words: ['años', 'tengo', 'veinte'], answer: ['tengo', 'veinte', 'años'] } },
      { id: 'ex14', payload: { type: 'multiple-choice', question: '"Hay" deriva dal verbo:', options: ['ser', 'estar', 'haber'], correctIndex: 2 } },
      {
        id: 'ex15',
        payload: {
          type: 'multiple-choice',
          question: "Perché lo spagnolo ha due verbi per \"essere\" e l'italiano uno solo?",
          options: ['per distinguere stati permanenti (ser) da temporanei (estar)', 'sono sinonimi intercambiabili', 'è un errore storico mai corretto'],
          correctIndex: 0,
        },
      },
    ],
    keySentences: [
      { l2: 'Soy italiano.', it: 'Sono italiano.' },
      { l2: 'Estoy cansado.', it: 'Sono stanco.' },
      { l2: 'Tengo veinte años.', it: 'Ho vent\'anni.' },
      { l2: 'Hay un problema.', it: "C'è un problema." },
    ],
  },
  {
    id: 'es-negazione',
    language: 'es',
    cefrLevel: 'A1',
    nodeId: 'negazione',
    title: 'La negazione',
    noticingExamples: [
      { l2: 'No hablo francés.', it: 'Non parlo francese.' },
      { l2: 'No tengo tiempo.', it: 'Non ho tempo.' },
      { l2: 'Esto no es correcto.', it: 'Questo non è corretto.' },
      { l2: 'No entiendo.', it: 'Non capisco.' },
    ],
    contrastiveExplanation:
      'Buone notizie: la negazione spagnola funziona esattamente come quella italiana, "no" prima del ' +
      'verbo, senza bisogno di una seconda parola — diversamente dal francese "ne...pas" o dal tedesco ' +
      '"nicht/kein". L\'unica accortezza, se si studiano più lingue insieme, è non lasciarsi contagiare dalle ' +
      'altre: in spagnolo basta sempre "no".',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Come si dice "non parlo francese"?', options: ['no hablo francés', 'hablo no francés', 'no francés hablo'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Dove si mette "no"?', options: ['prima del verbo', 'dopo il verbo', 'non si usa mai'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'cloze', sentence: '___ tengo tiempo.', answer: 'No' } },
      { id: 'ex4', payload: { type: 'cloze', sentence: 'Esto ___ es correcto.', answer: 'no' } },
      { id: 'ex5', payload: { type: 'cloze', sentence: '___ entiendo.', answer: 'No' } },
      { id: 'ex6', payload: { type: 'translation-it-l2', promptIt: 'non ho tempo', answerL2: 'no tengo tiempo' } },
      { id: 'ex7', payload: { type: 'translation-it-l2', promptIt: 'questo non è corretto', answerL2: 'esto no es correcto' } },
      { id: 'ex8', payload: { type: 'translation-it-l2', promptIt: 'non capisco', answerL2: 'no entiendo' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'non parlo francese', answerL2: 'no hablo francés' } },
      { id: 'ex10', payload: { type: 'reorder', words: ['francés', 'no', 'hablo'], answer: ['no', 'hablo', 'francés'] } },
      { id: 'ex11', payload: { type: 'reorder', words: ['tiempo', 'no', 'tengo'], answer: ['no', 'tengo', 'tiempo'] } },
      { id: 'ex12', payload: { type: 'multiple-choice', question: 'A differenza del francese, la negazione spagnola:', options: ['richiede due parole', "usa una sola parola, 'no'", 'va sempre dopo il verbo'], correctIndex: 1 } },
      { id: 'ex13', payload: { type: 'multiple-choice', question: 'A differenza del tedesco, la negazione spagnola:', options: ['distingue nomi e verbi con parole diverse', "usa sempre 'no', qualunque cosa si neghi"], correctIndex: 1 } },
      { id: 'ex14', payload: { type: 'cloze', sentence: 'Ella no ___ inglés.', answer: 'habla' } },
      { id: 'ex15', payload: { type: 'translation-it-l2', promptIt: 'non siamo stanchi', answerL2: 'no estamos cansados' } },
    ],
    keySentences: [
      { l2: 'No hablo francés.', it: 'Non parlo francese.' },
      { l2: 'No tengo tiempo.', it: 'Non ho tempo.' },
      { l2: 'Esto no es correcto.', it: 'Questo non è corretto.' },
      { l2: 'No entiendo.', it: 'Non capisco.' },
    ],
  },
  {
    id: 'es-plurale',
    language: 'es',
    cefrLevel: 'A1',
    nodeId: 'plurale',
    title: 'Il plurale dei sostantivi',
    noticingExamples: [
      { l2: 'El libro → los libros.', it: 'Il libro → i libri.' },
      { l2: 'La casa → las casas.', it: 'La casa → le case.' },
      { l2: 'La ciudad → las ciudades.', it: 'La città → le città.' },
      { l2: 'El papel → los papeles.', it: 'Il foglio → i fogli.' },
    ],
    contrastiveExplanation:
      'La regola spagnola è regolare: le parole che finiscono in vocale aggiungono solo "-s" (libro → ' +
      'libros), quelle che finiscono in consonante aggiungono "-es" (papel → papeles). Attenzione a un punto ' +
      'di interferenza: le parole italiane che finiscono in "-tà" sono invariabili al plurale (la città → le ' +
      'città), mentre il loro equivalente spagnolo in "-dad" cambia regolarmente (la ciudad → las ciudades) — ' +
      'occhio a non lasciarle invariate per abitudine italiana.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Il plurale di "libro" è:', options: ['libros', 'libroes', 'libres'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Il plurale di "papel" (finisce in consonante) è:', options: ['papels', 'papeles', 'papellos'], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: 'Il plurale di "ciudad" è:', options: ['ciudads', 'ciudades', 'ciudaded'], correctIndex: 1 } },
      { id: 'ex4', payload: { type: 'cloze', sentence: 'Los ___ están en la mesa.', answer: 'libros' } },
      { id: 'ex5', payload: { type: 'cloze', sentence: 'Las ___ son grandes.', answer: 'ciudades' } },
      { id: 'ex6', payload: { type: 'translation-it-l2', promptIt: 'i libri', answerL2: 'los libros' } },
      { id: 'ex7', payload: { type: 'translation-it-l2', promptIt: 'le case', answerL2: 'las casas' } },
      { id: 'ex8', payload: { type: 'translation-it-l2', promptIt: 'le città', answerL2: 'las ciudades' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'i fogli', answerL2: 'los papeles' } },
      { id: 'ex10', payload: { type: 'reorder', words: ['mesa', 'están', 'libros', 'los', 'en', 'la'], answer: ['los', 'libros', 'están', 'en', 'la', 'mesa'] } },
      { id: 'ex11', payload: { type: 'multiple-choice', question: 'In italiano, "la città" al plurale:', options: ['diventa "le cittadi"', 'resta invariato, "le città"', 'diventa "le citade"'], correctIndex: 1 } },
      { id: 'ex12', payload: { type: 'multiple-choice', question: 'In spagnolo, "la ciudad" al plurale:', options: ['resta invariato', 'diventa "las ciudades"', 'diventa "las ciudads"'], correctIndex: 1 } },
      { id: 'ex13', payload: { type: 'cloze', sentence: 'Las ___ son blancas.', answer: 'casas' } },
      { id: 'ex14', payload: { type: 'multiple-choice', question: 'Qual è la regola generale spagnola per il plurale?', options: ['vocale finale + s, consonante finale + es', 'sempre solo + s', 'sempre solo + es'], correctIndex: 0 } },
      { id: 'ex15', payload: { type: 'translation-it-l2', promptIt: 'le case bianche', answerL2: 'las casas blancas' } },
    ],
    keySentences: [
      { l2: 'Los libros están en la mesa.', it: 'I libri sono sul tavolo.' },
      { l2: 'Las ciudades son grandes.', it: 'Le città sono grandi.' },
      { l2: 'Las casas son blancas.', it: 'Le case sono bianche.' },
      { l2: 'Los papeles están aquí.', it: 'I fogli sono qui.' },
    ],
  },
  {
    id: 'es-possessivi',
    language: 'es',
    cefrLevel: 'A1',
    nodeId: 'possessivi',
    title: 'I possessivi',
    noticingExamples: [
      { l2: 'Es mi libro.', it: 'È il mio libro.' },
      { l2: 'Es mi casa.', it: 'È la mia casa.' },
      { l2: 'Son mis amigos.', it: 'Sono i miei amici.' },
    ],
    contrastiveExplanation:
      'A differenza dell\'italiano ("il mio" / "la mia", che cambia con il genere dell\'oggetto posseduto), ' +
      'il possessivo spagnolo "mi" è invariabile per genere: si usa "mi" sia con sostantivi maschili che ' +
      'femminili, e cambia solo al plurale ("mis"). È uno dei pochi punti in cui lo spagnolo è più semplice ' +
      'dell\'italiano — ma può confondere: non c\'è un "mía" femminile da cercare, come invece ci si ' +
      'aspetterebbe venendo dall\'italiano o dal francese.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Come si dice "il mio libro"?', options: ['mi libro', 'mis libro', 'mía libro'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Come si dice "la mia casa"?', options: ['mía casa', 'mi casa', 'mis casa'], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: 'Come si dice "i miei amici"?', options: ['mi amigos', 'mis amigos', 'mío amigos'], correctIndex: 1 } },
      { id: 'ex4', payload: { type: 'cloze', sentence: 'Es ___ libro.', answer: 'mi' } },
      { id: 'ex5', payload: { type: 'cloze', sentence: 'Es ___ casa.', answer: 'mi' } },
      { id: 'ex6', payload: { type: 'cloze', sentence: 'Son ___ amigos.', answer: 'mis' } },
      { id: 'ex7', payload: { type: 'translation-it-l2', promptIt: 'il mio libro', answerL2: 'mi libro' } },
      { id: 'ex8', payload: { type: 'translation-it-l2', promptIt: 'la mia casa', answerL2: 'mi casa' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'i miei amici', answerL2: 'mis amigos' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'le mie case', answerL2: 'mis casas' } },
      { id: 'ex11', payload: { type: 'reorder', words: ['libro', 'es', 'mi'], answer: ['es', 'mi', 'libro'] } },
      { id: 'ex12', payload: { type: 'multiple-choice', question: 'Il possessivo spagnolo "mi" cambia con il genere del sostantivo?', options: ['sì, come in italiano', "no, resta sempre 'mi' al singolare"], correctIndex: 1 } },
      { id: 'ex13', payload: { type: 'cloze', sentence: 'Son ___ libros.', answer: 'mis' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'i miei libri', answerL2: 'mis libros' } },
      { id: 'ex15', payload: { type: 'multiple-choice', question: 'Su cosa è più semplice lo spagnolo rispetto all\'italiano, per i possessivi?', options: ['non cambia con il genere del sostantivo', 'non cambia tra singolare e plurale', 'non cambia con la persona che parla'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Es mi libro.', it: 'È il mio libro.' },
      { l2: 'Es mi casa.', it: 'È la mia casa.' },
      { l2: 'Son mis amigos.', it: 'Sono i miei amici.' },
      { l2: 'Son mis libros.', it: 'Sono i miei libri.' },
    ],
  },
  {
    id: 'es-preterito-perfecto',
    language: 'es',
    cefrLevel: 'A2',
    nodeId: 'passato-composto',
    title: 'Il passato (pretérito perfecto compuesto)',
    noticingExamples: [
      { l2: 'He comido una manzana.', it: 'Ho mangiato una mela.' },
      { l2: 'Ella ha salido temprano.', it: 'È uscita presto.' },
      { l2: 'Hemos terminado el trabajo.', it: 'Abbiamo finito il lavoro.' },
      { l2: 'Han ido al cine.', it: 'Sono andati al cinema.' },
      { l2: '¿Has visto esta película?', it: 'Hai visto questo film?' },
    ],
    contrastiveExplanation:
      'A differenza dell\'italiano (e del francese), che distinguono "essere" e "avere" come ausiliari ' +
      'del passato a seconda del tipo di verbo, lo spagnolo usa SEMPRE e SOLO "haber" come ausiliare, ' +
      'per qualunque verbo, anche quelli di movimento che in italiano richiedono "essere": "è andata" ' +
      'si dice "ha ido" (non "es ida"), "sono uscito" si dice "he salido" (non "soy salido"). Questa è ' +
      'probabilmente la differenza più importante da interiorizzare, perché l\'istinto di un ' +
      'italofono è cercare un equivalente di "essere". Il participio passato si forma regolarmente ' +
      'con -ado per i verbi in -ar (hablado) e -ido per quelli in -er/-ir (comido, vivido); alcuni ' +
      'verbi comuni hanno un participio irregolare da imparare a memoria: hacer→hecho, decir→dicho, ' +
      'ver→visto, poner→puesto, escribir→escrito, abrir→abierto, volver→vuelto, morir→muerto. Nota ' +
      'd\'uso: in molte varietà di spagnolo latinoamericano, per un passato recente si preferisce ' +
      'spesso il pretérito indefinido (comí) al perfecto compuesto (he comido), mentre in Spagna il ' +
      'perfecto compuesto è molto comune — qui ci concentriamo sulla forma, corretta ovunque.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Participio passato di 'hablar':", options: ['hablado', 'hablido', 'hablo', 'hablando'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Participio passato di 'comer':", options: ['comido', 'comado', 'come', 'comiendo'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Participio passato di 'hacer':", options: ['hecho', 'hacido', 'hacado', 'haciendo'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Participio passato di 'ver':", options: ['visto', 'veido', 'vido', 'viendo'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "Qual è l'ausiliare del pretérito perfecto, per QUALSIASI verbo?", options: ['haber, sempre', 'ser, con i verbi di movimento', 'estar, con gli stati'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "Come si dice 'è uscita' (lei)?", options: ['Ha salido.', 'Es salida.', 'Está salida.'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'multiple-choice', question: "Come si dice 'sono andati' (loro)?", options: ['Han ido.', 'Son idos.', 'Están idos.'], correctIndex: 0 } },
      { id: 'ex8', payload: { type: 'cloze', sentence: '___ comido una manzana.', answer: 'He' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Ella ___ salido temprano.', answer: 'ha' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: '___ terminado el trabajo.', answer: 'Hemos' } },
      { id: 'ex11', payload: { type: 'cloze', sentence: '¿___ visto esta película?', answer: 'Has' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'ho mangiato una mela', answerL2: 'He comido una manzana.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'è uscita presto', answerL2: 'Ha salido temprano.' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'abbiamo finito il lavoro', answerL2: 'Hemos terminado el trabajo.' } },
      { id: 'ex15', payload: { type: 'translation-it-l2', promptIt: 'sono andati al cinema', answerL2: 'Han ido al cine.' } },
      { id: 'ex16', payload: { type: 'reorder', words: ['comido', 'he', 'una', 'manzana'], answer: ['he', 'comido', 'una', 'manzana'] } },
      { id: 'ex17', payload: { type: 'reorder', words: ['salido', 'ha', 'temprano', 'ella'], answer: ['ella', 'ha', 'salido', 'temprano'] } },
    ],
    keySentences: [
      { l2: 'He comido una manzana.', it: 'Ho mangiato una mela.' },
      { l2: 'Ella ha salido temprano.', it: 'È uscita presto.' },
      { l2: 'Hemos terminado el trabajo.', it: 'Abbiamo finito il lavoro.' },
      { l2: 'Han ido al cine.', it: 'Sono andati al cinema.' },
    ],
  },
  {
    id: 'es-futuro-simple',
    language: 'es',
    cefrLevel: 'A2',
    nodeId: 'futuro',
    title: 'Il futuro semplice',
    noticingExamples: [
      { l2: 'Hablaré contigo mañana.', it: 'Parlerò con te domani.' },
      { l2: 'Comerás en casa.', it: 'Mangerai a casa.' },
      { l2: 'Viviremos en Madrid.', it: 'Vivremo a Madrid.' },
      { l2: 'Tendré tiempo.', it: 'Avrò tempo.' },
      { l2: 'Haremos un viaje.', it: 'Faremo un viaggio.' },
    ],
    contrastiveExplanation:
      'Il futuro semplice spagnolo è più regolare di quello italiano: le stesse desinenze (-é, -ás, ' +
      '-á, -emos, -éis, -án) si attaccano DIRETTAMENTE all\'infinito intero, senza alcuna modifica, ' +
      'per TUTTI i verbi, che siano in -ar, -er o -ir (hablar→hablaré, comer→comeré, vivir→viviré) — ' +
      'l\'italiano invece ha desinenze diverse per le tre conjugazioni e cambia la vocale tematica dei ' +
      'verbi in -are (parlare→parlerò). Solo una decina di verbi molto comuni hanno una radice ' +
      'irregolare (ma le desinenze restano regolari): decir→dir-, hacer→har-, poder→podr-, ' +
      'poner→pondr-, querer→querr-, saber→sabr-, salir→saldr-, tener→tendr-, venir→vendr-. Quindi ' +
      '"tener" al futuro, io, è "tendré" (non "teneré").',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Futuro di 'hablar', io:", options: ['hablaré', 'hablo', 'hablaba', 'hablara'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Futuro di 'comer', tu:", options: ['comerás', 'comes', 'comías'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Futuro di 'vivir', noi:", options: ['viviremos', 'vivimos', 'vivíamos'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Futuro irregolare di 'tener', io:", options: ['tendré', 'teneré', 'tenré'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "Futuro irregolare di 'hacer', noi:", options: ['haremos', 'haceremos', 'hacimos'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: 'Le desinenze del futuro spagnolo cambiano in base alla conjugazione (-ar/-er/-ir)?', options: ['no, sono sempre le stesse', 'sì, come in italiano', 'solo per i verbi in -ir'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: '___ contigo mañana.', answer: 'Hablaré' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Comerás en ___.', answer: 'casa' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: '___ en Madrid.', answer: 'Viviremos' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: '___ tiempo.', answer: 'Tendré' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'parlerò con te domani', answerL2: 'Hablaré contigo mañana.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'mangerai a casa', answerL2: 'Comerás en casa.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'avrò tempo', answerL2: 'Tendré tiempo.' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'faremo un viaggio', answerL2: 'Haremos un viaje.' } },
      { id: 'ex15', payload: { type: 'reorder', words: ['contigo', 'hablaré', 'mañana'], answer: ['hablaré', 'contigo', 'mañana'] } },
      { id: 'ex16', payload: { type: 'reorder', words: ['tiempo', 'tendré'], answer: ['tendré', 'tiempo'] } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: "A differenza dell'italiano, il futuro spagnolo:", options: ["usa le stesse desinenze per tutte le conjugazioni, sull'infinito intero", 'cambia desinenza secondo la conjugazione', 'si forma con un ausiliare + infinito'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Hablaré contigo mañana.', it: 'Parlerò con te domani.' },
      { l2: 'Viviremos en Madrid.', it: 'Vivremo a Madrid.' },
      { l2: 'Tendré tiempo.', it: 'Avrò tempo.' },
      { l2: 'Haremos un viaje.', it: 'Faremo un viaggio.' },
    ],
  },
  {
    id: 'es-comparativos',
    language: 'es',
    cefrLevel: 'A2',
    nodeId: 'comparativi',
    title: 'Comparativos y superlativos',
    noticingExamples: [
      { l2: 'Juan es más alto que Pedro.', it: 'Juan è più alto di Pedro.' },
      { l2: 'Este libro es menos caro que el otro.', it: "Questo libro è meno caro dell'altro." },
      { l2: 'Ella es tan inteligente como él.', it: 'Lei è intelligente quanto lui.' },
      { l2: 'Es la casa más grande del barrio.', it: 'È la casa più grande del quartiere.' },
      { l2: 'Este pastel es mejor que el otro.', it: "Questa torta è migliore dell'altra." },
    ],
    contrastiveExplanation:
      'Come il francese (e più semplicemente dell\'italiano), lo spagnolo usa sempre "que" per ' +
      'introdurre il secondo termine di paragone (más alto que, menos caro que), senza la ' +
      'distinzione italiana tra "di" e "che". Per l\'uguaglianza si usa "tan...como" (tan alto como = ' +
      'tanto alto quanto/come). Il superlativo relativo si forma con l\'articolo + más/menos + ' +
      'aggettivo (el más alto, la más cara), e per indicare il gruppo di paragone si usa "de" (la más ' +
      'grande DE la clase = la più grande DELLA classe). Come l\'italiano (buono→migliore), "bueno" ha ' +
      'un comparativo irregolare: "mejor" (non "más bueno"); allo stesso modo "malo"→"peor" (non "más ' +
      'malo").',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Come si dice 'più alto di Pedro'?", options: ['más alto que Pedro', 'más alto de Pedro', 'más alto como Pedro'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Come si dice 'tanto intelligente quanto lui'?", options: ['tan inteligente como él', 'tan inteligente que él', 'más inteligente como él'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Comparativo irregolare di 'bueno':", options: ['mejor', 'más bueno', 'buenor'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Comparativo irregolare di 'malo':", options: ['peor', 'más malo', 'malor'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: 'Per indicare il gruppo di paragone nel superlativo si usa:', options: ['de', 'que', 'como'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'cloze', sentence: 'Juan es ___ alto que Pedro.', answer: 'más' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Este libro es ___ caro que el otro.', answer: 'menos' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Es la casa ___ grande del barrio.', answer: 'más' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Este pastel es ___ que el otro.', answer: 'mejor' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'più caro di Pedro', answerL2: 'más caro que Pedro' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: "meno caro dell'altro", answerL2: 'menos caro que el otro' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'la casa più grande', answerL2: 'la casa más grande' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: "migliore dell'altra", answerL2: 'mejor que la otra' } },
      { id: 'ex14', payload: { type: 'reorder', words: ['que', 'es', 'alto', 'Juan', 'más', 'Pedro'], answer: ['Juan', 'es', 'más', 'alto', 'que', 'Pedro'] } },
      { id: 'ex15', payload: { type: 'reorder', words: ['inteligente', 'tan', 'ella', 'como', 'él', 'es'], answer: ['ella', 'es', 'tan', 'inteligente', 'como', 'él'] } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: "Qual è il superlativo relativo di 'grande' (plurale)?", options: ['los más grandes', 'el más grande', 'la más grande'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Juan es más alto que Pedro.', it: 'Juan è più alto di Pedro.' },
      { l2: 'Ella es tan inteligente como él.', it: 'Lei è intelligente quanto lui.' },
      { l2: 'Es la casa más grande del barrio.', it: 'È la casa più grande del quartiere.' },
      { l2: 'Este pastel es mejor que el otro.', it: "Questa torta è migliore dell'altra." },
    ],
  },
  {
    id: 'es-pronombres-objeto',
    language: 'es',
    cefrLevel: 'A2',
    nodeId: 'pronomi-complemento',
    title: 'Pronombres de objeto (CD/CI)',
    noticingExamples: [
      { l2: 'Lo veo.', it: 'Lo vedo.' },
      { l2: 'La conozco.', it: 'La conosco.' },
      { l2: 'Le hablo.', it: 'Gli parlo. / Le parlo.' },
      { l2: 'Nos escriben.', it: 'Ci scrivono.' },
      { l2: '¿Me entiendes?', it: 'Mi capisci?' },
    ],
    contrastiveExplanation:
      'Come l\'italiano, lo spagnolo pone il pronome complemento prima del verbo coniugato (lo veo = ' +
      'lo vedo), con la stessa logica. I pronomi complemento diretto (CD) sono me, te, lo/la, nos, ' +
      'os, los/las — quasi identici all\'italiano mi, ti, lo/la, ci, vi, li/le. La differenza più ' +
      'importante riguarda il complemento indiretto (CI): lo spagnolo usa "le" per la 3ª persona ' +
      'singolare SIA maschile che femminile (le hablo = gli parlo O le parlo, a seconda del ' +
      'contesto), mentre l\'italiano distingue "gli" (a lui) da "le" (a lei) — in spagnolo questa ' +
      'distinzione di genere non esiste al complemento indiretto. Con un infinito, un gerundio o un ' +
      'imperativo affermativo, il pronome spagnolo si attacca DOPO, formando una sola parola (quiero ' +
      'verLO = voglio vederLO, ¡dímeLO! = dimmeLO!) — qui l\'italiano si comporta in modo molto ' +
      'simile, quindi è un punto facile.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "'Lo vedo' (a él):", options: ['Lo veo.', 'Le veo.', 'Lo veo a él le.'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "'La conosco' (a ella):", options: ['La conozco.', 'Le conozco.', 'Lo conozco.'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "'Gli parlo' / 'Le parlo' (CI, a lui o a lei) si dicono entrambe con:", options: ['Le hablo.', 'Lo hablo. / La hablo.', 'Les hablo.'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Al CI spagnolo, 'le' distingue il genere (a lui/a lei) come in italiano?", options: ["no, 'le' serve per entrambi", 'sì, esattamente come in italiano', 'solo al plurale'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "'Voglio vederlo':", options: ['Quiero verlo.', 'Quiero vero.', 'Quiero verso.'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'cloze', sentence: '___ veo.', answer: 'Lo' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: '___ conozco.', answer: 'La' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: '___ hablo.', answer: 'Le' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Nos ___.', answer: 'escriben' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: '¿___ entiendes?', answer: 'Me' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'lo vedo', answerL2: 'Lo veo.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'la conosco', answerL2: 'La conozco.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'ci scrivono', answerL2: 'Nos escriben.' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'gli parlo', answerL2: 'Le hablo.' } },
      { id: 'ex15', payload: { type: 'reorder', words: ['veo', 'lo'], answer: ['lo', 'veo'] } },
      { id: 'ex16', payload: { type: 'reorder', words: ['hablo', 'le'], answer: ['le', 'hablo'] } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: "A differenza dell'italiano, il pronome indiretto spagnolo 'le':", options: ["non distingue il genere di chi riceve l'azione", 'distingue sempre maschile e femminile', 'si usa solo al plurale'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Lo veo.', it: 'Lo vedo.' },
      { l2: 'La conozco.', it: 'La conosco.' },
      { l2: 'Nos escriben.', it: 'Ci scrivono.' },
      { l2: '¿Me entiendes?', it: 'Mi capisci?' },
    ],
  },
  {
    id: 'es-ser-estar',
    language: 'es',
    cefrLevel: 'A2',
    nodeId: 'ser-estar-spagnolo',
    title: 'Ser vs Estar',
    noticingExamples: [
      { l2: 'Soy italiano.', it: 'Sono italiano.' },
      { l2: 'Estoy cansado.', it: 'Sono stanco.' },
      { l2: 'Madrid está en España.', it: 'Madrid è in Spagna.' },
      { l2: 'Son las tres.', it: 'Sono le tre.' },
      { l2: 'Está lloviendo.', it: 'Sta piovendo.' },
    ],
    contrastiveExplanation:
      'L\'italiano ha un solo verbo, "essere", per tutto ciò che in spagnolo si divide tra "ser" e ' +
      '"estar" — questa è probabilmente LA differenza più nota e insidiosa tra le due lingue. "Ser" ' +
      'si usa per l\'identità permanente o essenziale: nazionalità, professione, caratteristiche di ' +
      'base, relazioni, ora/data (soy italiano, es médico, es alto, son las tres). "Estar" si usa per ' +
      'stati temporanei, posizione nello spazio, emozioni del momento, e per formare il progressivo ' +
      '(estoy cansado, está en Madrid, está lloviendo, estoy comiendo). Alcuni aggettivi cambiano ' +
      'addirittura significato secondo il verbo usato: "ser aburrido" significa "essere una persona ' +
      'noiosa" (caratteristica), mentre "estar aburrido" significa "essere annoiato in questo ' +
      'momento" (stato); "ser listo" significa "essere intelligente", mentre "estar listo" significa ' +
      '"essere pronto". Non c\'è una regola meccanica al 100%, ma un buon criterio di partenza è: ser ' +
      '= cosa sei per natura, estar = come sei/dove sei in questo momento.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "'Sono italiano' (nazionalità, permanente):", options: ['Soy italiano.', 'Estoy italiano.', 'Soy estar italiano.'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "'Sono stanco' (stato temporaneo):", options: ['Estoy cansado.', 'Soy cansado.', 'Estoy ser cansado.'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "'Madrid è in Spagna' (posizione):", options: ['Madrid está en España.', 'Madrid es en España.', 'Madrid son en España.'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "'Sono le tre' (ora):", options: ['Son las tres.', 'Están las tres.', 'Es las tres.'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "'Sta piovendo' (azione in corso):", options: ['Está lloviendo.', 'Es lloviendo.', 'Son lloviendo.'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "'Ser aburrido' significa:", options: ['essere una persona noiosa (caratteristica)', 'essere annoiato in questo momento', 'essere pronto'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'multiple-choice', question: "'Estar listo' significa:", options: ['essere pronto', 'essere intelligente', 'essere stanco'], correctIndex: 0 } },
      { id: 'ex8', payload: { type: 'cloze', sentence: '___ italiano.', answer: 'Soy' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: '___ cansado.', answer: 'Estoy' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: 'Madrid ___ en España.', answer: 'está' } },
      { id: 'ex11', payload: { type: 'cloze', sentence: '___ las tres.', answer: 'Son' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'sono stanco', answerL2: 'Estoy cansado.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'sono italiano', answerL2: 'Soy italiano.' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'è in Spagna', answerL2: 'Está en España.' } },
      { id: 'ex15', payload: { type: 'reorder', words: ['italiano', 'soy'], answer: ['soy', 'italiano'] } },
      { id: 'ex16', payload: { type: 'reorder', words: ['cansado', 'estoy'], answer: ['estoy', 'cansado'] } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: 'Qual è il criterio di partenza più utile per scegliere tra ser/estar?', options: ['ser = cosa sei per natura, estar = come sei/dove sei ora', 'sono intercambiabili', 'ser si usa solo al plurale'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Soy italiano.', it: 'Sono italiano.' },
      { l2: 'Estoy cansado.', it: 'Sono stanco.' },
      { l2: 'Madrid está en España.', it: 'Madrid è in Spagna.' },
      { l2: 'Está lloviendo.', it: 'Sta piovendo.' },
    ],
  },
  {
    id: 'es-condicional',
    language: 'es',
    cefrLevel: 'B1',
    nodeId: 'condizionale',
    title: 'El condicional simple',
    noticingExamples: [
      { l2: 'Querría un café.', it: 'Vorrei un caffè.' },
      { l2: 'Si tuviera dinero, compraría un coche.', it: 'Se avessi dei soldi, comprerei una macchina.' },
      { l2: 'Deberías salir.', it: 'Dovresti uscire.' },
      { l2: 'Sería feliz.', it: 'Sarebbe felice.' },
      { l2: 'Podríamos venir mañana.', it: 'Potremmo venire domani.' },
    ],
    contrastiveExplanation:
      'Il condicional semplice spagnolo è regolare come il futuro: le stesse desinenze (-ía, -ías, ' +
      '-ía, -íamos, -íais, -ían) si attaccano all\'infinito intero, per TUTTI i verbi — e usa le ' +
      'STESSE radici irregolari del futuro (tener→tendría, poder→podría, hacer→haría, decir→diría, ' +
      'poner→pondría, querer→querría, saber→sabría, salir→saldría, venir→vendría): se conosci il ' +
      'futuro irregolare di un verbo, conosci già anche il condicional. Nelle frasi ipotetiche con ' +
      '"si" (se), lo spagnolo usa il CONGIUNTIVO IMPERFETTO dopo "si" (si tuviera, non "si tendría") ' +
      'e il condicional nella principale — qui lo spagnolo si comporta come l\'italiano (se avessi, ' +
      'congiuntivo + condizionale), a differenza del francese che usa l\'imperfetto indicativo dopo ' +
      '"si".',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Condicional di 'querer', io:", options: ['querría', 'quiero', 'querré', 'quería'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Condicional di 'tener', io:", options: ['tendría', 'tenería', 'tendré'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Condicional di 'poder', noi:", options: ['podríamos', 'podemos', 'podremos'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Condicional di 'ser', lei:", options: ['sería', 'es', 'será'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: 'Le desinenze del condicional spagnolo cambiano in base alla conjugazione?', options: ['no, sono sempre le stesse', 'sì, come in italiano'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: 'Nella frase con "si" (se), lo spagnolo usa nella proposizione con "si":', options: ["il congiuntivo imperfetto, come l'italiano", 'l\'indicativo, come il francese', 'il condicional'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: '___ un café.', answer: 'Querría' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Si tuviera dinero, ___ un coche.', answer: 'compraría' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: '___ salir.', answer: 'Deberías' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: '___ feliz.', answer: 'Sería' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'vorrei un caffè', answerL2: 'Querría un café.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'dovresti uscire', answerL2: 'Deberías salir.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'sarebbe felice', answerL2: 'Sería feliz.' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'potremmo venire domani', answerL2: 'Podríamos venir mañana.' } },
      { id: 'ex15', payload: { type: 'reorder', words: ['un', 'querría', 'café'], answer: ['querría', 'un', 'café'] } },
      { id: 'ex16', payload: { type: 'reorder', words: ['salir', 'deberías'], answer: ['deberías', 'salir'] } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: 'Il condicional spagnolo usa le stesse radici irregolari:', options: ['del futuro', 'del presente', 'del subjuntivo'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Querría un café.', it: 'Vorrei un caffè.' },
      { l2: 'Si tuviera dinero, compraría un coche.', it: 'Se avessi dei soldi, comprerei una macchina.' },
      { l2: 'Deberías salir.', it: 'Dovresti uscire.' },
      { l2: 'Podríamos venir mañana.', it: 'Potremmo venire domani.' },
    ],
  },
  {
    id: 'es-subjuntivo',
    language: 'es',
    cefrLevel: 'B1',
    nodeId: 'congiuntivo',
    title: 'El presente de subjuntivo',
    noticingExamples: [
      { l2: 'Quiero que vengas.', it: 'Voglio che tu venga.' },
      { l2: 'Es importante que estudies.', it: 'È importante che tu studi.' },
      { l2: 'Me alegro de que estés aquí.', it: 'Sono felice che tu sia qui.' },
      { l2: 'Creo que viene.', it: 'Penso che venga.' },
      { l2: 'No creo que venga.', it: 'Non penso che venga.' },
    ],
    contrastiveExplanation:
      'Il subjuntivo spagnolo si forma scambiando le desinenze: per i verbi in -ar, le vocali ' +
      'diventano -e (hablar→hable); per i verbi in -er/-ir, diventano -a (comer→coma, vivir→viva). ' +
      'Il suo uso con verbi/espressioni di desiderio, necessità, emozione (querer que, es importante ' +
      'que, me alegro de que...) è molto simile all\'italiano: qui l\'intuizione di un italofono ' +
      'funziona bene, a differenza del francese. C\'è però una differenza sottile con i verbi di ' +
      'opinione come "creer" e "pensar": in forma AFFERMATIVA questi verbi prendono l\'INDICATIVO ' +
      'perché esprimono una certezza del parlante ("creo que viene" = penso che viene, con ' +
      'certezza), mentre diventano subjuntivo solo se negati o se esprimono dubbio ("no creo que ' +
      'venga"). L\'italiano invece usa il congiuntivo con "credere che" anche in forma affermativa ' +
      '("credo che venga") — su questo punto specifico lo spagnolo si comporta più come il francese ' +
      'che come l\'italiano.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Subjuntivo di 'hablar', io:", options: ['hable', 'hablo', 'hablaré'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Subjuntivo di 'comer', tu:", options: ['comas', 'comes', 'comerás'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Subjuntivo di 'vivir', lui:", options: ['viva', 'vive', 'vivirá'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "'Creo que viene' (affermativo, certezza) usa:", options: ["l'indicativo", 'il subjuntivo', 'il condicional'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "'No creo que venga' (negato, dubbio) usa:", options: ['il subjuntivo', "l'indicativo", 'il condicional'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "'Quiero que vengas' usa:", options: ['il subjuntivo, perché esprime un desiderio', "l'indicativo", 'il condicional'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Quiero que ___.', answer: 'vengas' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Es importante que ___.', answer: 'estudies' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Me alegro de que ___ aquí.', answer: 'estés' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: 'No creo que ___.', answer: 'venga' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'voglio che tu venga', answerL2: 'Quiero que vengas.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'è importante che tu studi', answerL2: 'Es importante que estudies.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'sono felice che tu sia qui', answerL2: 'Me alegro de que estés aquí.' } },
      { id: 'ex14', payload: { type: 'reorder', words: ['que', 'quiero', 'vengas'], answer: ['quiero', 'que', 'vengas'] } },
      { id: 'ex15', payload: { type: 'reorder', words: ['que', 'creo', 'no', 'venga'], answer: ['no', 'creo', 'que', 'venga'] } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: "A differenza dell'italiano, con 'creer'/'pensar' in forma affermativa lo spagnolo usa:", options: ["l'indicativo, non il subjuntivo", 'sempre il subjuntivo', 'il condicional'], correctIndex: 0 } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: "L'uso del subjuntivo con verbi di desiderio/necessità/emozione è, rispetto all'italiano:", options: ['molto simile', 'completamente diverso', 'inesistente in spagnolo'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Quiero que vengas.', it: 'Voglio che tu venga.' },
      { l2: 'Es importante que estudies.', it: 'È importante che tu studi.' },
      { l2: 'Creo que viene.', it: 'Penso che venga.' },
      { l2: 'No creo que venga.', it: 'Non penso che venga.' },
    ],
  },
  {
    id: 'es-por-para',
    language: 'es',
    cefrLevel: 'B2',
    nodeId: 'por-para-spagnolo',
    title: 'Por vs Para',
    noticingExamples: [
      { l2: 'Gracias por tu ayuda.', it: 'Grazie per il tuo aiuto.' },
      { l2: 'Esto es para ti.', it: 'Questo è per te.' },
      { l2: 'Camino por la calle.', it: 'Cammino per la strada.' },
      { l2: 'Necesito esto para el lunes.', it: 'Mi serve questo per lunedì.' },
      { l2: 'Lo hice por amor.', it: "L'ho fatto per amore." },
    ],
    contrastiveExplanation:
      'L\'italiano usa "per" per moltissimi significati diversi che lo spagnolo distingue nettamente ' +
      'tra "por" e "para" — esattamente come con ser/estar, un\'unica parola italiana si divide in ' +
      'due parole spagnole con una logica diversa. "Por" guarda all\'indietro: la CAUSA o il MOTIVO ' +
      'di qualcosa (gracias POR tu ayuda = grazie per causa del tuo aiuto), il mezzo (por correo = ' +
      'per posta), il movimento ATTRAVERSO un luogo (por la calle), una durata approssimativa (por ' +
      'la mañana). "Para" guarda avanti: lo SCOPO o l\'OBIETTIVO (esto es para aprender = questo è ' +
      'per imparare), il DESTINATARIO (esto es para ti), una SCADENZA o destinazione nel tempo (para ' +
      'el lunes = per lunedì, entro lunedì). Un buon criterio di partenza: "por" = a causa di/' +
      'attraverso (guarda al passato/motivo), "para" = per ottenere/verso (guarda al futuro/scopo).',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "'Grazie per il tuo aiuto' (causa):", options: ['Gracias por tu ayuda.', 'Gracias para tu ayuda.', 'Gracias de tu ayuda.'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "'Questo è per te' (destinatario):", options: ['Esto es para ti.', 'Esto es por ti.', 'Esto es a ti.'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "'Cammino per la strada' (moto attraverso):", options: ['Camino por la calle.', 'Camino para la calle.', 'Camino en la calle.'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "'Mi serve questo per lunedì' (scadenza):", options: ['Necesito esto para el lunes.', 'Necesito esto por el lunes.', 'Necesito esto en el lunes.'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: 'Quale criterio distingue meglio por da para?', options: ["'por' = causa/attraverso (guarda al passato), 'para' = scopo/verso (guarda al futuro)", 'sono intercambiabili', 'por si usa solo con persone'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "'Lo hice por amor' significa:", options: ["l'ho fatto per amore (causa/motivo)", "l'ho fatto per l'amore (destinatario)", "l'ho fatto fino all'amore"], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Gracias ___ tu ayuda.', answer: 'por' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Esto es ___ ti.', answer: 'para' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Camino ___ la calle.', answer: 'por' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: 'Necesito esto ___ el lunes.', answer: 'para' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'grazie per il tuo aiuto', answerL2: 'Gracias por tu ayuda.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'questo è per te', answerL2: 'Esto es para ti.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'mi serve questo per lunedì', answerL2: 'Necesito esto para el lunes.' } },
      { id: 'ex14', payload: { type: 'reorder', words: ['por', 'gracias', 'ayuda', 'tu'], answer: ['gracias', 'por', 'tu', 'ayuda'] } },
      { id: 'ex15', payload: { type: 'reorder', words: ['es', 'esto', 'para', 'ti'], answer: ['esto', 'es', 'para', 'ti'] } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: "A differenza dell'italiano 'per', lo spagnolo:", options: ['distingue sempre causa/mezzo (por) da scopo/destinatario (para)', 'usa sempre e solo por', 'usa sempre e solo para'], correctIndex: 0 } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: 'Questa distinzione è concettualmente simile a quale altra coppia spagnola già vista?', options: ['ser vs estar', 'indicativo vs subjuntivo', 'futuro vs condicional'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Gracias por tu ayuda.', it: 'Grazie per il tuo aiuto.' },
      { l2: 'Esto es para ti.', it: 'Questo è per te.' },
      { l2: 'Camino por la calle.', it: 'Cammino per la strada.' },
      { l2: 'Necesito esto para el lunes.', it: 'Mi serve questo per lunedì.' },
    ],
  },
  {
    id: 'es-imperfecto-indefinido',
    language: 'es',
    cefrLevel: 'B2',
    nodeId: 'imperfecto-indefinido',
    title: 'Imperfecto vs Indefinido',
    noticingExamples: [
      { l2: 'Cuando era niño, vivía en Madrid.', it: 'Quando ero piccolo, vivevo a Madrid.' },
      { l2: 'Ayer fui al cine.', it: 'Ieri sono andato al cinema.' },
      { l2: 'Hacía sol cuando salí de casa.', it: 'Faceva sole quando sono uscito di casa.' },
      { l2: 'Todos los días caminaba al colegio.', it: 'Tutti i giorni camminavo verso la scuola.' },
      { l2: 'De repente, oí un ruido.', it: 'Improvvisamente, sentii un rumore.' },
    ],
    contrastiveExplanation:
      'Questa distinzione è, per un italiano, una delle più facili del B2, perché l\'italiano ha ' +
      'ESATTAMENTE la stessa logica aspettuale: il pretérito imperfecto spagnolo corrisponde ' +
      'all\'imperfetto italiano (descrizioni, abitudini, azioni in corso sullo sfondo: "vivía en ' +
      'Madrid" = "vivevo a Madrid"), il pretérito indefinido corrisponde al passato prossimo/remoto ' +
      'italiano (azioni puntuali, compiute, con un inizio e una fine chiari: "fui al cine" = "sono ' +
      'andato al cinema"). Il modello classico è: l\'imperfecto descrive lo SFONDO, l\'indefinido ' +
      'racconta l\'AZIONE PUNTUALE che accade in quello sfondo — "HACÍA sol [sfondo] cuando SALÍ de ' +
      'casa [azione]" (faceva sole quando sono uscito). A livello di forma, l\'indefinido ha molti ' +
      'verbi irregolari da imparare a memoria (fui, hice, dije, tuve, estuve, pude, puse, quise, ' +
      'vine), mentre l\'imperfecto è quasi sempre regolare (-aba per i verbi in -ar, -ía per -er/' +
      '-ir).',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "'Quando ero piccolo, vivevo a Madrid' (descrizione/abitudine):", options: ['Cuando era niño, vivía en Madrid.', 'Cuando fui niño, viví en Madrid.', 'Cuando era niño, viví en Madrid.'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "'Ieri sono andato al cinema' (azione puntuale):", options: ['Ayer fui al cine.', 'Ayer iba al cine.', 'Ayer era al cine.'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Indefinido di 'ser', io:", options: ['fui', 'era', 'seré'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Indefinido di 'hacer', io:", options: ['hice', 'hacía', 'haré'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "L'imperfecto si usa per:", options: ['descrizioni, abitudini, azioni sullo sfondo', 'azioni puntuali e compiute', 'il futuro'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "L'indefinido si usa per:", options: ['azioni puntuali, compiute, con inizio e fine chiari', 'descrizioni e abitudini', 'azioni abituali'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Cuando era niño, ___ en Madrid.', answer: 'vivía' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Ayer ___ al cine.', answer: 'fui' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: '___ sol cuando salí de casa.', answer: 'Hacía' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: 'De repente, ___ un ruido.', answer: 'oí' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'quando ero piccolo, vivevo a Madrid', answerL2: 'Cuando era niño, vivía en Madrid.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'ieri sono andato al cinema', answerL2: 'Ayer fui al cine.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'tutti i giorni camminavo verso la scuola', answerL2: 'Todos los días caminaba al colegio.' } },
      { id: 'ex14', payload: { type: 'reorder', words: ['niño', 'era', 'cuando', 'vivía', 'en', 'madrid'], answer: ['cuando', 'era', 'niño', 'vivía', 'en', 'madrid'] } },
      { id: 'ex15', payload: { type: 'reorder', words: ['fui', 'ayer', 'cine', 'al'], answer: ['ayer', 'fui', 'al', 'cine'] } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: "Rispetto all'italiano, la distinzione imperfecto/indefinido è:", options: ["molto simile all'imperfetto/passato prossimo italiano, uno dei punti più facili del B2", "completamente diversa dall'italiano", 'assente in spagnolo'], correctIndex: 0 } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: "Nel modello 'sfondo + azione puntuale', quale tempo descrive lo sfondo?", options: ['imperfecto', 'indefinido', 'futuro'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Cuando era niño, vivía en Madrid.', it: 'Quando ero piccolo, vivevo a Madrid.' },
      { l2: 'Ayer fui al cine.', it: 'Ieri sono andato al cinema.' },
      { l2: 'Hacía sol cuando salí de casa.', it: 'Faceva sole quando sono uscito di casa.' },
      { l2: 'De repente, oí un ruido.', it: 'Improvvisamente, sentii un rumore.' },
    ],
  },
]
