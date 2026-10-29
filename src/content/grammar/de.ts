import type { GrammarUnitContent } from '../../types/grammarContent'

export const DE_UNITS: GrammarUnitContent[] = [
  {
    id: 'de-articoli',
    language: 'de',
    cefrLevel: 'A1',
    nodeId: 'articoli',
    title: 'Articoli e genere dei sostantivi',
    noticingExamples: [
      { l2: 'Der Mann schläft.', it: "L'uomo dorme." },
      { l2: 'Die Frau arbeitet.', it: 'La donna lavora.' },
      { l2: 'Das Kind spielt.', it: 'Il bambino gioca.' },
      { l2: 'Die Kinder spielen im Garten.', it: 'I bambini giocano nel giardino.' },
      { l2: 'Ein Hund bellt.', it: 'Un cane abbaia.' },
      { l2: 'Eine Katze schläft.', it: 'Una gatta dorme.' },
    ],
    contrastiveExplanation:
      "Il tedesco ha un terzo genere, il neutro (das), che l'italiano non ha. Il genere non è quasi mai " +
      'intuibile e sorprende spesso: "das Mädchen" (la ragazza) è NEUTRO, nonostante indichi una persona ' +
      'femminile — va imparato parola per parola, non dedotto dal significato. Al plurale, tutti i generi ' +
      'usano lo stesso articolo "die". Per l\'indefinito, "ein" vale sia per il maschile che per il neutro ' +
      '(ein Mann, ein Kind), mentre il femminile ha la propria forma "eine".',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Qual è l'articolo per \"Mann\" (uomo)?", options: ['der', 'die', 'das'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Qual è l'articolo per \"Frau\" (donna)?", options: ['der', 'die', 'das'], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Qual è l'articolo per \"Kind\" (bambino)?", options: ['der', 'die', 'das'], correctIndex: 2 } },
      {
        id: 'ex4',
        payload: {
          type: 'multiple-choice',
          question: '"Das Mädchen" (la ragazza) ha l\'articolo "das" perché:',
          options: ['è un errore ortografico comune', 'il genere grammaticale non coincide sempre con il sesso della persona', 'Mädchen è una parola plurale'],
          correctIndex: 1,
        },
      },
      { id: 'ex5', payload: { type: 'cloze', sentence: '___ Kinder spielen im Garten.', answer: 'Die' } },
      { id: 'ex6', payload: { type: 'cloze', sentence: '___ Hund bellt.', answer: 'Ein' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: '___ Katze schläft.', answer: 'Eine' } },
      { id: 'ex8', payload: { type: 'translation-it-l2', promptIt: "l'uomo", answerL2: 'der Mann' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'la donna', answerL2: 'die Frau' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'il bambino', answerL2: 'das Kind' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'un cane', answerL2: 'ein Hund' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'una gatta', answerL2: 'eine Katze' } },
      { id: 'ex13', payload: { type: 'reorder', words: ['schläft', 'der', 'Mann'], answer: ['der', 'Mann', 'schläft'] } },
      { id: 'ex14', payload: { type: 'reorder', words: ['spielt', 'Kind', 'das'], answer: ['das', 'Kind', 'spielt'] } },
      { id: 'ex15', payload: { type: 'multiple-choice', question: 'Al plurale, quale articolo si usa per TUTTI i generi?', options: ['der', 'die', 'das'], correctIndex: 1 } },
    ],
    keySentences: [
      { l2: 'Der Mann schläft.', it: "L'uomo dorme." },
      { l2: 'Die Frau arbeitet.', it: 'La donna lavora.' },
      { l2: 'Das Kind spielt.', it: 'Il bambino gioca.' },
      { l2: 'Das Mädchen lacht.', it: 'La ragazza ride.' },
    ],
  },
  {
    id: 'de-pronomi-soggetto',
    language: 'de',
    cefrLevel: 'A1',
    nodeId: 'pronomi-soggetto',
    title: 'Pronomi soggetto e presente dei verbi',
    noticingExamples: [
      { l2: 'Ich spreche Deutsch.', it: 'Io parlo tedesco.' },
      { l2: 'Du sprichst gut.', it: 'Tu parli bene.' },
      { l2: 'Er spricht Englisch.', it: 'Lui parla inglese.' },
      { l2: 'Wir spielen zusammen.', it: 'Noi giochiamo insieme.' },
      { l2: 'Sie spielen schnell.', it: 'Loro giocano velocemente.' },
    ],
    contrastiveExplanation:
      'Come in francese, il pronome soggetto in tedesco è quasi sempre obbligatorio, a differenza ' +
      "dell'italiano. Un'insidia ortografica tutta tedesca: \"sie\" minuscolo significa \"lei\" o \"loro\", " +
      'mentre "Sie" con la maiuscola è la forma di cortesia per "Lei" — la maiuscola da sola cambia il ' +
      'significato. Attenzione anche ad alcuni verbi come "sprechen", che cambiano vocale interna alla 2ª e ' +
      '3ª persona singolare (du sprichst, er spricht): un fenomeno senza equivalente regolare in italiano.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Come si dice "io parlo"?', options: ['ich spreche', 'du spreche', 'ich sprichst', 'er spreche'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Qual è il pronome per "noi"?', options: ['ihr', 'wir', 'sie', 'du'], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: '"Sie" con la maiuscola significa:', options: ['loro', 'Lei (forma di cortesia)', 'tu'], correctIndex: 1 } },
      { id: 'ex4', payload: { type: 'conjugation', infinitive: 'spielen', pronoun: 'du', answer: 'spielst' } },
      { id: 'ex5', payload: { type: 'conjugation', infinitive: 'spielen', pronoun: 'wir', answer: 'spielen' } },
      { id: 'ex6', payload: { type: 'conjugation', infinitive: 'sprechen', pronoun: 'du', answer: 'sprichst' } },
      { id: 'ex7', payload: { type: 'conjugation', infinitive: 'sprechen', pronoun: 'er', answer: 'spricht' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: '___ spielen zusammen.', answer: 'Wir' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Er ___ Englisch.', answer: 'spricht' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'tu parli bene', answerL2: 'du sprichst gut' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'noi giochiamo insieme', answerL2: 'wir spielen zusammen' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'loro parlano tedesco', answerL2: 'sie sprechen Deutsch' } },
      { id: 'ex13', payload: { type: 'reorder', words: ['spreche', 'ich', 'Deutsch'], answer: ['ich', 'spreche', 'Deutsch'] } },
      { id: 'ex14', payload: { type: 'reorder', words: ['spielen', 'wir', 'zusammen'], answer: ['wir', 'spielen', 'zusammen'] } },
      {
        id: 'ex15',
        payload: {
          type: 'multiple-choice',
          question: 'Perché "du sprichst" ha una vocale diversa da "sprechen"?',
          options: ['è un errore', 'alcuni verbi cambiano vocale alla 2ª/3ª persona singolare', 'è il congiuntivo'],
          correctIndex: 1,
        },
      },
    ],
    keySentences: [
      { l2: 'Ich spreche Deutsch.', it: 'Io parlo tedesco.' },
      { l2: 'Du sprichst gut.', it: 'Tu parli bene.' },
      { l2: 'Wir spielen zusammen.', it: 'Noi giochiamo insieme.' },
      { l2: 'Er spricht Englisch.', it: 'Lui parla inglese.' },
    ],
  },
  {
    id: 'de-essere-avere',
    language: 'de',
    cefrLevel: 'A1',
    nodeId: 'essere-avere',
    title: 'Sein und haben',
    noticingExamples: [
      { l2: 'Ich bin Italiener.', it: 'Sono italiano.' },
      { l2: 'Ich bin zwanzig Jahre alt.', it: 'Ho vent\'anni.' },
      { l2: 'Er hat Hunger.', it: 'Ha fame.' },
      { l2: 'Wir sind Freunde.', it: 'Siamo amici.' },
      { l2: 'Es gibt ein Problem.', it: "C'è un problema." },
    ],
    contrastiveExplanation:
      'Attenzione a una vera trappola: per dire l\'età, italiano, francese e spagnolo usano tutti "avere" ' +
      '(ho/j\'ai/tengo ... anni), ma il tedesco usa "essere" ("ich bin zwanzig Jahre alt", letteralmente ' +
      '"sono vecchio di vent\'anni"). È uno degli errori più tipici per un italofono. Anche "c\'è/ci sono" ' +
      'si dice con un verbo apposito, "es gibt" (da "geben", dare): un\'altra soluzione ancora, diversa sia ' +
      'dall\'italiano "esserci" sia dal francese "il y a". Le espressioni con "haben" come "Hunger haben" ' +
      '(avere fame) invece coincidono con l\'italiano.',
    exercises: [
      { id: 'ex1', payload: { type: 'conjugation', infinitive: 'sein', pronoun: 'ich', answer: 'bin' } },
      { id: 'ex2', payload: { type: 'conjugation', infinitive: 'sein', pronoun: 'wir', answer: 'sind' } },
      { id: 'ex3', payload: { type: 'conjugation', infinitive: 'haben', pronoun: 'du', answer: 'hast' } },
      { id: 'ex4', payload: { type: 'conjugation', infinitive: 'haben', pronoun: 'er', answer: 'hat' } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: 'Come si dice "ho vent\'anni"?', options: ['ich habe zwanzig Jahre', 'ich bin zwanzig Jahre alt', 'ich habe zwanzig Jahre alt'], correctIndex: 1 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: '"Es gibt" corrisponde a:', options: ['lui dà', "c'è / ci sono", 'lui ha'], correctIndex: 1 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Wir ___ Freunde.', answer: 'sind' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Er ___ Hunger.', answer: 'hat' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'sono italiano', answerL2: 'ich bin Italiener' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: "ho vent'anni", answerL2: 'ich bin zwanzig Jahre alt' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: "c'è un problema", answerL2: 'es gibt ein Problem' } },
      { id: 'ex12', payload: { type: 'reorder', words: ['Jahre', 'bin', 'ich', 'alt', 'zwanzig'], answer: ['ich', 'bin', 'zwanzig', 'Jahre', 'alt'] } },
      { id: 'ex13', payload: { type: 'reorder', words: ['sind', 'wir', 'Freunde'], answer: ['wir', 'sind', 'Freunde'] } },
      { id: 'ex14', payload: { type: 'multiple-choice', question: "Per dire l'età in tedesco si usa:", options: ['haben, come in italiano', 'sein, a differenza dell\'italiano'], correctIndex: 1 } },
      { id: 'ex15', payload: { type: 'cloze', sentence: 'Du ___ müde?', answer: 'bist' } },
    ],
    keySentences: [
      { l2: 'Ich bin Italiener.', it: 'Sono italiano.' },
      { l2: 'Ich bin zwanzig Jahre alt.', it: 'Ho vent\'anni.' },
      { l2: 'Es gibt ein Problem.', it: "C'è un problema." },
      { l2: 'Er hat Hunger.', it: 'Ha fame.' },
    ],
  },
  {
    id: 'de-negazione',
    language: 'de',
    cefrLevel: 'A1',
    nodeId: 'negazione',
    title: 'La negazione: nicht e kein',
    noticingExamples: [
      { l2: 'Ich spreche kein Französisch.', it: 'Non parlo francese.' },
      { l2: 'Ich habe keine Zeit.', it: 'Non ho tempo.' },
      { l2: 'Das ist nicht richtig.', it: 'Non è corretto.' },
      { l2: 'Ich verstehe nicht.', it: 'Non capisco.' },
    ],
    contrastiveExplanation:
      'L\'italiano usa sempre "non". Il tedesco ha invece due parole diverse secondo cosa si nega: "kein/ ' +
      'keine" per negare un sostantivo (prende il posto dell\'articolo indefinito: keine Zeit, kein ' +
      'Französisch), e "nicht" per negare un verbo, un aggettivo o il resto della frase. Questa distinzione ' +
      'per categoria grammaticale non ha equivalente in italiano e va imparata come una categoria nuova.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Quale parola nega un sostantivo (es. "nessun tempo")?', options: ['nicht', 'kein / keine', 'nein'], correctIndex: 1 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Come si dice "non parlo francese"?', options: ['ich spreche nicht kein Französisch', 'ich spreche kein Französisch', 'ich kein spreche Französisch'], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'cloze', sentence: 'Ich habe ___ Zeit.', answer: 'keine' } },
      { id: 'ex4', payload: { type: 'cloze', sentence: 'Das ist ___ richtig.', answer: 'nicht' } },
      { id: 'ex5', payload: { type: 'cloze', sentence: 'Ich verstehe ___.', answer: 'nicht' } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: 'Perché si usa "keine" e non "nicht" con "Zeit"?', options: ['"Zeit" è plurale', 'si nega un sostantivo (femminile)', "è un'eccezione isolata"], correctIndex: 1 } },
      { id: 'ex7', payload: { type: 'translation-it-l2', promptIt: 'non ho tempo', answerL2: 'ich habe keine Zeit' } },
      { id: 'ex8', payload: { type: 'translation-it-l2', promptIt: 'non è corretto', answerL2: 'das ist nicht richtig' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'non capisco', answerL2: 'ich verstehe nicht' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'non parlo francese', answerL2: 'ich spreche kein Französisch' } },
      { id: 'ex11', payload: { type: 'reorder', words: ['Zeit', 'ich', 'keine', 'habe'], answer: ['ich', 'habe', 'keine', 'Zeit'] } },
      { id: 'ex12', payload: { type: 'reorder', words: ['nicht', 'richtig', 'das', 'ist'], answer: ['das', 'ist', 'nicht', 'richtig'] } },
      { id: 'ex13', payload: { type: 'multiple-choice', question: '"Nicht" si usa per negare:', options: ['sempre un sostantivo', 'verbi, aggettivi o la frase intera', 'solo i nomi propri'], correctIndex: 1 } },
      { id: 'ex14', payload: { type: 'cloze', sentence: 'Er hat ___ Auto.', answer: 'kein' } },
      {
        id: 'ex15',
        payload: {
          type: 'multiple-choice',
          question: 'Qual è la differenza principale tra italiano e tedesco nella negazione?',
          options: ['il tedesco usa due parole diverse (nicht/kein) secondo cosa si nega', 'non cʼè differenza', 'il tedesco nega due volte sempre'],
          correctIndex: 0,
        },
      },
    ],
    keySentences: [
      { l2: 'Ich spreche kein Französisch.', it: 'Non parlo francese.' },
      { l2: 'Ich habe keine Zeit.', it: 'Non ho tempo.' },
      { l2: 'Das ist nicht richtig.', it: 'Non è corretto.' },
      { l2: 'Ich verstehe nicht.', it: 'Non capisco.' },
    ],
  },
  {
    id: 'de-plurale',
    language: 'de',
    cefrLevel: 'A1',
    nodeId: 'plurale',
    title: 'Il plurale dei sostantivi',
    noticingExamples: [
      { l2: 'Das Buch → die Bücher.', it: 'Il libro → i libri.' },
      { l2: 'Die Frau → die Frauen.', it: 'La donna → le donne.' },
      { l2: 'Der Hund → die Hunde.', it: 'Il cane → i cani.' },
      { l2: 'Das Auto → die Autos.', it: "L'auto → le auto." },
    ],
    contrastiveExplanation:
      "A differenza dell'italiano, che ha una regola semplice (-o/-a → -i/-e), il tedesco non ha una regola " +
      'unica di plurale: ogni sostantivo ha il proprio, spesso con un cambio della vocale interna (Umlaut: ' +
      'Buch → Bücher) che non si può prevedere. Il plurale va quindi imparato insieme alla parola, come una ' +
      'mini-eccezione a parte. L\'unica costante è che, al plurale, l\'articolo è sempre "die", qualunque ' +
      'fosse il genere al singolare.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Il plurale di "Buch" è:', options: ['Buche', 'Bücher', 'Buchs'], correctIndex: 1 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Il plurale di "Frau" è:', options: ['Fraus', 'Frauen', 'Fraue'], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: 'Il plurale di "Hund" è:', options: ['Hunds', 'Hunden', 'Hunde'], correctIndex: 2 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: 'Qual è l\'articolo plurale, indipendentemente dal genere singolare?', options: ['der', 'die', 'das'], correctIndex: 1 } },
      { id: 'ex5', payload: { type: 'cloze', sentence: 'Die ___ stehen auf dem Tisch.', answer: 'Bücher' } },
      { id: 'ex6', payload: { type: 'cloze', sentence: 'Die ___ bellen.', answer: 'Hunde' } },
      { id: 'ex7', payload: { type: 'translation-it-l2', promptIt: 'i libri', answerL2: 'die Bücher' } },
      { id: 'ex8', payload: { type: 'translation-it-l2', promptIt: 'le donne', answerL2: 'die Frauen' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'i cani', answerL2: 'die Hunde' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'le auto', answerL2: 'die Autos' } },
      { id: 'ex11', payload: { type: 'reorder', words: ['Bücher', 'die', 'Tisch', 'auf', 'dem', 'stehen'], answer: ['die', 'Bücher', 'stehen', 'auf', 'dem', 'Tisch'] } },
      { id: 'ex12', payload: { type: 'multiple-choice', question: 'Che cosa cambia spesso nel plurale tedesco oltre alla desinenza?', options: ['niente', 'la vocale interna (Umlaut)', 'il genere'], correctIndex: 1 } },
      { id: 'ex13', payload: { type: 'cloze', sentence: 'Die ___ arbeiten.', answer: 'Frauen' } },
      { id: 'ex14', payload: { type: 'multiple-choice', question: "Esiste una regola unica per il plurale in tedesco, come in italiano?", options: ['sì', 'no, ogni parola ha il proprio plurale'], correctIndex: 1 } },
      { id: 'ex15', payload: { type: 'translation-it-l2', promptIt: 'le automobili', answerL2: 'die Autos' } },
    ],
    keySentences: [
      { l2: 'Die Bücher stehen auf dem Tisch.', it: 'I libri sono sul tavolo.' },
      { l2: 'Die Frauen arbeiten.', it: 'Le donne lavorano.' },
      { l2: 'Die Hunde bellen.', it: 'I cani abbaiano.' },
      { l2: 'Die Autos sind neu.', it: 'Le auto sono nuove.' },
    ],
  },
  {
    id: 'de-possessivi',
    language: 'de',
    cefrLevel: 'A1',
    nodeId: 'possessivi',
    title: 'I possessivi',
    noticingExamples: [
      { l2: 'Das ist mein Buch.', it: 'È il mio libro.' },
      { l2: 'Das ist meine Mutter.', it: 'È mia madre.' },
      { l2: 'Das ist mein Auto.', it: 'È la mia auto.' },
      { l2: 'Das sind meine Freunde.', it: 'Sono i miei amici.' },
    ],
    contrastiveExplanation:
      'Il possessivo tedesco "mein/meine" si comporta come l\'articolo indefinito "ein/eine" (stessa ' +
      'famiglia di desinenze): resta "mein" con sostantivi maschili e neutri, diventa "meine" con i ' +
      'femminili e con tutti i plurali. La differenza più importante rispetto all\'italiano è che in tedesco ' +
      'il possessivo SOSTITUISCE l\'articolo (si dice "mein Buch", non "das mein Buch"), mentre in italiano ' +
      "l'articolo resta sempre, insieme al possessivo (\"il mio libro\").",
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: 'Come si dice "il mio libro" (Buch, neutro)?', options: ['meine Buch', 'mein Buch', 'meinen Buch'], correctIndex: 1 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: 'Come si dice "mia madre" (Mutter, femminile)?', options: ['mein Mutter', 'meine Mutter', 'meinen Mutter'], correctIndex: 1 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: 'Come si dice "i miei amici" (plurale)?', options: ['mein Freunde', 'meine Freunde', 'meinen Freunde'], correctIndex: 1 } },
      { id: 'ex4', payload: { type: 'cloze', sentence: 'Das ist ___ Buch.', answer: 'mein' } },
      { id: 'ex5', payload: { type: 'cloze', sentence: 'Das ist ___ Mutter.', answer: 'meine' } },
      { id: 'ex6', payload: { type: 'cloze', sentence: 'Das sind ___ Freunde.', answer: 'meine' } },
      { id: 'ex7', payload: { type: 'translation-it-l2', promptIt: 'il mio libro', answerL2: 'mein Buch' } },
      { id: 'ex8', payload: { type: 'translation-it-l2', promptIt: 'mia madre', answerL2: 'meine Mutter' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'i miei amici', answerL2: 'meine Freunde' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'la mia auto', answerL2: 'mein Auto' } },
      { id: 'ex11', payload: { type: 'reorder', words: ['Buch', 'das', 'mein', 'ist'], answer: ['das', 'ist', 'mein', 'Buch'] } },
      { id: 'ex12', payload: { type: 'multiple-choice', question: 'In tedesco il possessivo "mein/meine":', options: ["si aggiunge all'articolo", "sostituisce l'articolo", 'si usa solo al plurale'], correctIndex: 1 } },
      { id: 'ex13', payload: { type: 'cloze', sentence: 'Das ist ___ Auto.', answer: 'mein' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'i miei libri', answerL2: 'meine Bücher' } },
      { id: 'ex15', payload: { type: 'multiple-choice', question: "A quale altra parola si comporta in modo simile \"mein/meine\"?", options: ["all'articolo definito der/die/das", "all'articolo indefinito ein/eine", "a nessun'altra"], correctIndex: 1 } },
    ],
    keySentences: [
      { l2: 'Das ist mein Buch.', it: 'È il mio libro.' },
      { l2: 'Das ist meine Mutter.', it: 'È mia madre.' },
      { l2: 'Das sind meine Freunde.', it: 'Sono i miei amici.' },
      { l2: 'Das ist mein Auto.', it: 'È la mia auto.' },
    ],
  },
  {
    id: 'de-perfekt',
    language: 'de',
    cefrLevel: 'A2',
    nodeId: 'passato-composto',
    title: 'Il passato (Perfekt)',
    noticingExamples: [
      { l2: 'Ich habe ein Buch gelesen.', it: 'Ho letto un libro.' },
      { l2: 'Sie ist nach Hause gegangen.', it: 'È andata a casa.' },
      { l2: 'Wir haben Deutsch gelernt.', it: 'Abbiamo imparato il tedesco.' },
      { l2: 'Er ist früh aufgestanden.', it: 'Si è svegliato presto.' },
      { l2: 'Hast du das gesehen?', it: 'Hai visto questo?' },
    ],
    contrastiveExplanation:
      "Come l'italiano, il tedesco forma il Perfekt con un ausiliare (haben = avere, o sein = essere) " +
      '+ il participio passato (Partizip II). Anche qui, come in italiano, i verbi di movimento o ' +
      'cambiamento di stato (gehen, kommen, fahren, aufstehen, werden, bleiben...) usano sein, gli ' +
      'altri usano haben — stessa logica di fondo di "sono andato" vs "ho mangiato". La differenza ' +
      'più importante da notare è la POSIZIONE: in tedesco l\'ausiliare resta in seconda posizione ' +
      'nella frase, ma il participio passato va sempre all\'ULTIMO posto ("Ich habe GESTERN ein Buch ' +
      'GELESEN" = lett. "io ho ieri un libro letto"), mentre in italiano participio e ausiliare ' +
      'restano sempre vicini. Il Partizip II si forma di solito con ge- + radice + -t per i verbi ' +
      'regolari (gemacht, gespielt) o ge- + radice (cambiata) + -en per i verbi irregolari (gegangen, ' +
      'gesehen); i verbi con prefisso inseparabile (be-, ver-, er-...) non prendono ge- (verstanden); ' +
      'i verbi separabili mettono ge- tra prefisso e radice (aufgestanden).',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Participio passato di 'machen' (fare):", options: ['gemacht', 'gemachen', 'machte', 'gemach'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Participio passato di 'gehen' (andare):", options: ['gegangen', 'geganen', 'gegeht', 'gegehen'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Participio passato di 'sehen' (vedere):", options: ['gesehen', 'geseht', 'gesehte'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Quale verbo usa 'sein' come ausiliare?", options: ['gehen', 'machen', 'lesen'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "Participio passato di 'verstehen' (capire, prefisso inseparabile):", options: ['verstanden', 'geverstanden', 'verstandet'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'cloze', sentence: 'Ich ___ ein Buch gelesen.', answer: 'habe' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Sie ___ nach Hause gegangen.', answer: 'ist' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Wir haben Deutsch ___.', answer: 'gelernt' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: '___ du das gesehen?', answer: 'Hast' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'ho letto un libro', answerL2: 'Ich habe ein Buch gelesen.' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'è andata a casa', answerL2: 'Sie ist nach Hause gegangen.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'abbiamo imparato il tedesco', answerL2: 'Wir haben Deutsch gelernt.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'hai visto questo?', answerL2: 'Hast du das gesehen?' } },
      { id: 'ex14', payload: { type: 'reorder', words: ['habe', 'ich', 'gelesen', 'ein', 'Buch'], answer: ['ich', 'habe', 'ein', 'Buch', 'gelesen'] } },
      { id: 'ex15', payload: { type: 'reorder', words: ['ist', 'sie', 'gegangen', 'nach', 'Hause'], answer: ['sie', 'ist', 'nach', 'Hause', 'gegangen'] } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: 'Nel Perfekt tedesco, il participio passato si trova:', options: ['sempre alla fine della frase', "subito dopo l'ausiliare", "all'inizio della frase"], correctIndex: 0 } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: "Il participio passato di un verbo con prefisso separabile (es. aufstehen) mette 'ge-':", options: ['tra prefisso e radice (aufgestanden)', 'prima del prefisso (geaufstanden)', 'non lo prende affatto'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Ich habe ein Buch gelesen.', it: 'Ho letto un libro.' },
      { l2: 'Sie ist nach Hause gegangen.', it: 'È andata a casa.' },
      { l2: 'Wir haben Deutsch gelernt.', it: 'Abbiamo imparato il tedesco.' },
      { l2: 'Er ist früh aufgestanden.', it: 'Si è svegliato presto.' },
    ],
  },
  {
    id: 'de-futur-1',
    language: 'de',
    cefrLevel: 'A2',
    nodeId: 'futuro',
    title: 'Il futuro (Futur I)',
    noticingExamples: [
      { l2: 'Ich werde morgen arbeiten.', it: 'Domani lavorerò.' },
      { l2: 'Du wirst das verstehen.', it: 'Capirai questo.' },
      { l2: 'Wir werden nach Berlin fahren.', it: 'Andremo a Berlino.' },
      { l2: 'Sie wird bald ankommen.', it: 'Arriverà presto.' },
      { l2: 'Sie werden das Haus kaufen.', it: 'Compreranno la casa.' },
    ],
    contrastiveExplanation:
      "Il futuro tedesco (Futur I) si forma con l'ausiliare 'werden' coniugato secondo la persona, " +
      "più l'infinito del verbo principale, che va sempre alla FINE della frase — stessa logica del " +
      "Perfekt, dove l'elemento verbale non coniugato finisce in fondo. È una struttura diversa " +
      "dall'italiano, che ha un'unica forma sintetica per il futuro (parlerò), non un ausiliare + " +
      "infinito. Da notare: nel parlato quotidiano tedesco, per il futuro vicino o già programmato si " +
      "usa spessissimo semplicemente il presente con un'indicazione di tempo ('Ich arbeite morgen' = " +
      "lavoro domani, nel senso di 'lavorerò domani'), un po' come a volte avviene in italiano " +
      "('domani lavoro'). Il Futur I con 'werden' è più frequente per previsioni, promesse o ipotesi " +
      'sul futuro.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Futuro di 'arbeiten', io:", options: ['ich werde arbeiten', 'ich arbeite werden', 'ich werde arbeite'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Coniugazione di 'werden', tu:", options: ['du wirst', 'du werdest', 'du werden'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Coniugazione di 'werden', lui/lei:", options: ['er wird', 'er werdet', 'er werden'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Coniugazione di 'werden', noi:", options: ['wir werden', 'wir werdet', 'wir wird'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "Nel Futur I, l'infinito del verbo principale va:", options: ['alla fine della frase', 'subito dopo werden', "all'inizio della frase"], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'cloze', sentence: 'Ich ___ morgen arbeiten.', answer: 'werde' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Du ___ das verstehen.', answer: 'wirst' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Wir werden nach Berlin ___.', answer: 'fahren' } },
      { id: 'ex9', payload: { type: 'translation-it-l2', promptIt: 'domani lavorerò', answerL2: 'Ich werde morgen arbeiten.' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'capirai questo', answerL2: 'Du wirst das verstehen.' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'arriverà presto', answerL2: 'Sie wird bald ankommen.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'compreranno la casa', answerL2: 'Sie werden das Haus kaufen.' } },
      { id: 'ex13', payload: { type: 'reorder', words: ['werde', 'ich', 'arbeiten', 'morgen'], answer: ['ich', 'werde', 'morgen', 'arbeiten'] } },
      { id: 'ex14', payload: { type: 'reorder', words: ['wirst', 'du', 'verstehen', 'das'], answer: ['du', 'wirst', 'das', 'verstehen'] } },
      { id: 'ex15', payload: { type: 'multiple-choice', question: "A differenza dell'italiano, il futuro tedesco è formato da:", options: ['un ausiliare (werden) + infinito', 'una sola parola con desinenza propria', "il presente con un avverbio obbligatorio"], correctIndex: 0 } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: 'Nel parlato quotidiano, per un futuro vicino i tedeschi spesso usano:', options: ["il presente con un'indicazione di tempo", 'sempre e solo il Futur I', 'il Perfekt'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Ich werde morgen arbeiten.', it: 'Domani lavorerò.' },
      { l2: 'Du wirst das verstehen.', it: 'Capirai questo.' },
      { l2: 'Wir werden nach Berlin fahren.', it: 'Andremo a Berlino.' },
      { l2: 'Sie wird bald ankommen.', it: 'Arriverà presto.' },
    ],
  },
  {
    id: 'de-komparativ',
    language: 'de',
    cefrLevel: 'A2',
    nodeId: 'comparativi',
    title: 'Komparativ und Superlativ',
    noticingExamples: [
      { l2: 'Er ist größer als ich.', it: 'Lui è più alto di me.' },
      { l2: 'Das Buch ist interessanter als der Film.', it: 'Il libro è più interessante del film.' },
      { l2: 'Sie ist die schnellste Läuferin.', it: 'Lei è la corridora più veloce.' },
      { l2: 'Das ist das beste Restaurant.', it: 'Questo è il migliore ristorante.' },
      { l2: 'Er spricht am besten Deutsch.', it: 'Lui parla il tedesco meglio di tutti.' },
    ],
    contrastiveExplanation:
      "A differenza dell'italiano, che forma il comparativo con una parola separata ('più' + " +
      "aggettivo), il tedesco attacca direttamente la desinenza -er all'aggettivo (groß→größer), un " +
      "po' come l'inglese 'big→bigger'. Il secondo termine di paragone si introduce con 'als' " +
      "(corrispondente a 'di/che' italiano): 'größer als ich' = 'più grande di me'. Il superlativo si " +
      "forma con 'am' + aggettivo + '-sten' quando è usato come avverbio o predicato ('am besten' = " +
      "nel modo migliore), oppure con l'articolo + aggettivo + '-ste(n)' quando precede un sostantivo " +
      "('die schnellste Läuferin'). Come in italiano (buono→migliore), alcuni aggettivi tedeschi " +
      'molto comuni hanno comparativi e superlativi irregolari: gut→besser→best-, groß→größer→größt-, ' +
      "viel→mehr→meist-. Molti aggettivi brevi prendono anche l'Umlaut nel comparativo/superlativo: " +
      'alt→älter, jung→jünger.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Comparativo di 'groß' (grande):", options: ['größer', 'grosser', 'großer', 'größter'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Comparativo irregolare di 'gut' (buono):", options: ['besser', 'guter', 'gutter'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Come si dice 'più grande di me'?", options: ['größer als ich', 'größer von mir', 'mehr groß als ich'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Superlativo predicativo di 'gut':", options: ['am besten', 'am gutsten', 'das beste'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "Quale aggettivo prende l'Umlaut al comparativo?", options: ['alt → älter', 'gut → besser', 'viel → mehr'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'cloze', sentence: 'Er ist größer ___ ich.', answer: 'als' } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Das ist das ___ Restaurant.', answer: 'beste' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Er spricht am ___ Deutsch.', answer: 'besten' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Sie ist die ___ Läuferin.', answer: 'schnellste' } },
      { id: 'ex10', payload: { type: 'translation-it-l2', promptIt: 'più interessante del film', answerL2: 'interessanter als der Film' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'il migliore ristorante', answerL2: 'das beste Restaurant' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'lui è più alto di me', answerL2: 'Er ist größer als ich.' } },
      { id: 'ex13', payload: { type: 'reorder', words: ['als', 'ist', 'größer', 'er', 'ich'], answer: ['er', 'ist', 'größer', 'als', 'ich'] } },
      { id: 'ex14', payload: { type: 'reorder', words: ['das', 'Restaurant', 'beste', 'ist', 'das'], answer: ['das', 'ist', 'das', 'beste', 'Restaurant'] } },
      { id: 'ex15', payload: { type: 'multiple-choice', question: 'A differenza dell\'italiano, il comparativo tedesco si forma:', options: ["attaccando -er direttamente all'aggettivo, senza una parola separata per 'più'", 'con una parola separata come in italiano', "solo con l'ausiliare werden"], correctIndex: 0 } },
      { id: 'ex16', payload: { type: 'multiple-choice', question: "'als' in un paragone corrisponde all'italiano:", options: ['di / che', 'come', 'e'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Er ist größer als ich.', it: 'Lui è più alto di me.' },
      { l2: 'Das Buch ist interessanter als der Film.', it: 'Il libro è più interessante del film.' },
      { l2: 'Das ist das beste Restaurant.', it: 'Questo è il migliore ristorante.' },
      { l2: 'Er spricht am besten Deutsch.', it: 'Lui parla il tedesco meglio di tutti.' },
    ],
  },
  {
    id: 'de-pronomen-akk-dat',
    language: 'de',
    cefrLevel: 'A2',
    nodeId: 'pronomi-complemento',
    title: 'Pronomi complemento (Akkusativ/Dativ)',
    noticingExamples: [
      { l2: 'Ich sehe ihn.', it: 'Lo vedo.' },
      { l2: 'Ich kenne sie.', it: 'La conosco.' },
      { l2: 'Ich helfe ihm.', it: 'Lo aiuto.' },
      { l2: 'Sie dankt mir.', it: 'Lei mi ringrazia.' },
      { l2: 'Er gibt mir das Buch.', it: 'Lui mi dà il libro.' },
    ],
    contrastiveExplanation:
      'A differenza di italiano, francese e spagnolo, dove il pronome complemento si appoggia ' +
      "direttamente prima del verbo (lo vedo, gli parlo), in tedesco il pronome occupa semplicemente " +
      'il suo posto normale nella frase, come farebbe un sostantivo, senza "attaccarsi" al verbo. I ' +
      'pronomi all\'Akkusativ (complemento diretto) sono mich, dich, ihn, sie, es, uns, euch, sie; ' +
      "quelli al Dativ (complemento indiretto) sono mir, dir, ihm, ihr, ihm, uns, euch, ihnen. La " +
      'difficoltà più grande per un italiano non è la posizione, ma capire QUALE caso richiede un ' +
      'determinato verbo: alcuni verbi che in italiano sembrano "diretti" in tedesco richiedono il ' +
      'dativo, come "helfen" (aiutare: ich helfe IHM, lett. "io aiuto A LUI") o "danken" (ringraziare: ' +
      'ich danke IHR, "io ringrazio A LEI") — il caso va quindi imparato verbo per verbo, non dedotto ' +
      'dal significato italiano.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "'Lo vedo' (ihn = lui, Akkusativ):", options: ['Ich sehe ihn.', 'Ich sehe ihm.', 'Ich sehe er.'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "'La conosco':", options: ['Ich kenne sie.', 'Ich kenne ihr.', 'Ich kenne sie ihm.'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Il verbo 'helfen' (aiutare) richiede:", options: ['il Dativ', "l'Akkusativ", 'il Nominativ'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "Come si dice 'lo aiuto' (helfen)?", options: ['Ich helfe ihm.', 'Ich helfe ihn.', 'Ich helfe er.'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "Pronome Akkusativ di 'io' (mi):", options: ['mich', 'mir', 'ich'], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "Pronome Dativ di 'io' (a me):", options: ['mir', 'mich', 'ich'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Ich sehe ___.', answer: 'ihn' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Ich helfe ___.', answer: 'ihm' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Sie dankt ___.', answer: 'mir' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: 'Er gibt ___ das Buch.', answer: 'mir' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'lo vedo', answerL2: 'Ich sehe ihn.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'la conosco', answerL2: 'Ich kenne sie.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'lei mi ringrazia', answerL2: 'Sie dankt mir.' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'lui mi dà il libro', answerL2: 'Er gibt mir das Buch.' } },
      { id: 'ex15', payload: { type: 'reorder', words: ['sehe', 'ich', 'ihn'], answer: ['ich', 'sehe', 'ihn'] } },
      { id: 'ex16', payload: { type: 'reorder', words: ['dankt', 'mir', 'sie'], answer: ['sie', 'dankt', 'mir'] } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: 'A differenza dell\'italiano, il pronome complemento tedesco:', options: ['non si attacca al verbo, occupa il suo normale posto nella frase', 'si attacca sempre prima del verbo', 'si attacca sempre dopo il verbo'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Ich sehe ihn.', it: 'Lo vedo.' },
      { l2: 'Ich kenne sie.', it: 'La conosco.' },
      { l2: 'Sie dankt mir.', it: 'Lei mi ringrazia.' },
      { l2: 'Er gibt mir das Buch.', it: 'Lui mi dà il libro.' },
    ],
  },
  {
    id: 'de-modalverben',
    language: 'de',
    cefrLevel: 'A2',
    nodeId: 'modalverben-tedeschi',
    title: 'I verbi modali (können, müssen, wollen...)',
    noticingExamples: [
      { l2: 'Ich kann gut schwimmen.', it: 'So nuotare bene.' },
      { l2: 'Du musst jetzt gehen.', it: 'Devi andare ora.' },
      { l2: 'Wir wollen nach Italien reisen.', it: 'Vogliamo viaggiare in Italia.' },
      { l2: 'Ihr dürft hier parken.', it: 'Potete parcheggiare qui.' },
      { l2: 'Ich möchte einen Kaffee.', it: 'Vorrei un caffè.' },
    ],
    contrastiveExplanation:
      'I verbi modali tedeschi (können=potere/sapere, müssen=dovere, wollen=volere, dürfen=potere/' +
      'avere il permesso, sollen=dovere/essere opportuno, mögen/möchten=piacere/vorrei) sono ' +
      'irregolari e cambiano vocale al singolare (ich kann, du kannst; ich muss, du musst...). Come ' +
      "in italiano, si accompagnano a un infinito, ma la posizione è diversa: in italiano l'infinito " +
      'segue subito il modale (posso nuotare), in tedesco il modale resta in seconda posizione ' +
      "mentre l'infinito va sempre all'ULTIMA posizione, anche se c'è molto altro in mezzo ('Ich kann " +
      "HEUTE LEIDER NICHT kommen' = lett. 'io posso oggi purtroppo non venire') — la stessa struttura " +
      "a 'parentesi verbale' già vista nel Perfekt e nel Futur. Da notare: 'können' si usa sia per la " +
      "capacità fisica/imparata ('so nuotare') sia, colloquialmente, per il permesso, mentre 'dürfen' " +
      "è il permesso più formale/normativo ('è permesso'); l'italiano usa 'potere' per entrambi i " +
      'casi, senza questa distinzione.',
    exercises: [
      { id: 'ex1', payload: { type: 'multiple-choice', question: "Coniugazione di 'können', io:", options: ['ich kann', 'ich kanne', 'ich könne'], correctIndex: 0 } },
      { id: 'ex2', payload: { type: 'multiple-choice', question: "Coniugazione di 'müssen', tu:", options: ['du musst', 'du müsst', 'du muss'], correctIndex: 0 } },
      { id: 'ex3', payload: { type: 'multiple-choice', question: "Coniugazione di 'wollen', noi:", options: ['wir wollen', 'wir wollt', 'wir will'], correctIndex: 0 } },
      { id: 'ex4', payload: { type: 'multiple-choice', question: "'Vorrei un caffè':", options: ['Ich möchte einen Kaffee.', 'Ich will einen Kaffee.', 'Ich kann einen Kaffee.'], correctIndex: 0 } },
      { id: 'ex5', payload: { type: 'multiple-choice', question: "Nella frase con un modale, l'infinito del verbo principale va:", options: ['sempre alla fine della frase', 'subito dopo il modale', "all'inizio della frase"], correctIndex: 0 } },
      { id: 'ex6', payload: { type: 'multiple-choice', question: "Qual è la differenza tra 'können' e 'dürfen'?", options: ['können=capacità, dürfen=permesso', 'sono sinonimi perfetti', 'dürfen è più informale'], correctIndex: 0 } },
      { id: 'ex7', payload: { type: 'cloze', sentence: 'Ich ___ gut schwimmen.', answer: 'kann' } },
      { id: 'ex8', payload: { type: 'cloze', sentence: 'Du ___ jetzt gehen.', answer: 'musst' } },
      { id: 'ex9', payload: { type: 'cloze', sentence: 'Wir ___ nach Italien reisen.', answer: 'wollen' } },
      { id: 'ex10', payload: { type: 'cloze', sentence: 'Ihr ___ hier parken.', answer: 'dürft' } },
      { id: 'ex11', payload: { type: 'translation-it-l2', promptIt: 'so nuotare bene', answerL2: 'Ich kann gut schwimmen.' } },
      { id: 'ex12', payload: { type: 'translation-it-l2', promptIt: 'devi andare ora', answerL2: 'Du musst jetzt gehen.' } },
      { id: 'ex13', payload: { type: 'translation-it-l2', promptIt: 'vogliamo viaggiare in Italia', answerL2: 'Wir wollen nach Italien reisen.' } },
      { id: 'ex14', payload: { type: 'translation-it-l2', promptIt: 'vorrei un caffè', answerL2: 'Ich möchte einen Kaffee.' } },
      { id: 'ex15', payload: { type: 'reorder', words: ['kann', 'ich', 'schwimmen', 'gut'], answer: ['ich', 'kann', 'gut', 'schwimmen'] } },
      { id: 'ex16', payload: { type: 'reorder', words: ['musst', 'du', 'gehen', 'jetzt'], answer: ['du', 'musst', 'jetzt', 'gehen'] } },
      { id: 'ex17', payload: { type: 'multiple-choice', question: 'A differenza dell\'italiano, con un verbo modale tedesco:', options: ["l'infinito si allontana dal modale e va in fondo alla frase", "l'infinito segue sempre subito il modale, come in italiano", 'non serve l\'infinito'], correctIndex: 0 } },
    ],
    keySentences: [
      { l2: 'Ich kann gut schwimmen.', it: 'So nuotare bene.' },
      { l2: 'Du musst jetzt gehen.', it: 'Devi andare ora.' },
      { l2: 'Wir wollen nach Italien reisen.', it: 'Vogliamo viaggiare in Italia.' },
      { l2: 'Ich möchte einen Kaffee.', it: 'Vorrei un caffè.' },
    ],
  },
]
