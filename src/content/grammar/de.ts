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
]
