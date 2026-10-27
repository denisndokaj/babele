import type { LanguageCode } from '../../types/models'

export interface PhilosophyExcerpt {
  id: string
  language: LanguageCode
  author: string
  work: string
  year: string
  text: string
  sourceUrl: string
  sourceLicense: string
  note?: string
}

/**
 * Estratti verificati su Wikisource (testo controllato parola per parola prima di essere
 * incluso qui) e di pubblico dominio: tutti gli autori sono morti da oltre 70 anni.
 * La trascrizione specifica di Wikisource è sotto licenza CC BY-SA 4.0.
 */
export const PHILOSOPHY_EXCERPTS: PhilosophyExcerpt[] = [
  {
    id: 'descartes-discours',
    language: 'fr',
    author: 'René Descartes',
    work: 'Discours de la méthode — Prima parte',
    year: '1637 (edizione Cousin, 1824)',
    text: "Le bon sens est la chose du monde la mieux partagée ; car chacun pense en être si bien pourvu, que ceux même qui sont les plus difficiles à contenter en toute autre chose n'ont point coutume d'en désirer plus qu'ils en ont. En quoi il n'est pas vraisemblable que tous se trompent : mais plutôt cela témoigne que la puissance de bien juger et distinguer le vrai d'avec le faux, qui est proprement ce qu'on nomme le bon sens ou la raison, est naturellement égale en tous les hommes ; et ainsi que la diversité de nos opinions ne vient pas de ce que les uns sont plus raisonnables que les autres, mais seulement de ce que nous conduisons nos pensées par diverses voies, et ne considérons pas les mêmes choses. Car ce n'est pas assez d'avoir l'esprit bon, mais le principal est de l'appliquer bien. Les plus grandes âmes sont capables des plus grands vices aussi bien que des plus grandes vertus ; et ceux qui ne marchent que fort lentement peuvent avancer beaucoup davantage, s'ils suivent toujours le droit chemin, que ne font ceux qui courent et qui s'en éloignent.",
    sourceUrl: 'https://fr.wikisource.org/wiki/Discours_de_la_m%C3%A9thode_(%C3%A9d._Cousin)/Premi%C3%A8re_partie',
    sourceLicense: 'Testo di pubblico dominio (Descartes, m. 1650) · trascrizione Wikisource CC BY-SA 4.0',
  },
  {
    id: 'kant-aufklarung',
    language: 'de',
    author: 'Immanuel Kant',
    work: 'Beantwortung der Frage: Was ist Aufklärung?',
    year: '1784',
    text: 'Aufklärung ist der Ausgang des Menschen aus seiner selbst verschuldeten Unmündigkeit. Unmündigkeit ist das Unvermögen, sich seines Verstandes ohne Leitung eines anderen zu bedienen. Selbstverschuldet ist diese Unmündigkeit, wenn die Ursache derselben nicht am Mangel des Verstandes, sondern der Entschließung und des Muthes liegt, sich seiner ohne Leitung eines andern zu bedienen. Sapere aude! Habe Muth dich deines eigenen Verstandes zu bedienen! ist also der Wahlspruch der Aufklärung.',
    sourceUrl: 'https://de.wikisource.org/wiki/Beantwortung_der_Frage:_Was_ist_Aufkl%C3%A4rung%3F',
    sourceLicense: 'Testo di pubblico dominio (Kant, m. 1804) · trascrizione Wikisource CC BY-SA 4.0',
    note: 'Ortografia originale del Settecento (es. "Muth" per l\'odierno "Mut").',
  },
  {
    id: 'unamuno-la-palabra',
    language: 'es',
    author: 'Miguel de Unamuno',
    work: '«La palabra», da Rosario de sonetos líricos',
    year: '1911',
    text: 'Llave del ser, fué en un principio el verbo\npor el que se hizo todo cuanto muda\ny el verbo es la cadena con que anuda\nDios los dispersos granos de su acervo.\n\nPor él el hombre deja de ser siervo,\nse vale de él en la batalla ruda\ny en él la apaga cuando su alma suda\ncomo en la fuente tras de acoso el ciervo.\n\nSea de Dios santificado el nombre\nque es Dios también, pues fué con la palabra\ncomo creara el mundo en un principio.\n\nCon la palabra, como Dios, el hombre\nsu realidad de ideas forja y labra:\nnunca la profanéis á huero ripio.',
    sourceUrl: 'https://es.wikisource.org/wiki/La_palabra_(Unamuno)',
    sourceLicense: 'Testo di pubblico dominio (Unamuno, m. 1936) · trascrizione Wikisource CC BY-SA 4.0',
    note: "Ortografia originale dell'epoca (es. \"fué\" accentato, oggi \"fue\").",
  },
]
