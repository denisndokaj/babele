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
]
