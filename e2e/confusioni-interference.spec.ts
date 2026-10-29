import { expect, test, type Page } from '@playwright/test'

const SALIR = { word: 'salir', interferingAnswer: 'salire' }
const SALIRE = { word: 'salire', interferingAnswer: 'uscire' }

/** Risponde alla prima domanda (sempre la coppia "salir"/"salire") con il significato dell'altra parola, per innescare un'interferenza. */
async function answerFirstQuestionWithInterference(page: Page): Promise<void> {
  await page.getByRole('button', { name: "Fai l'esercizio di discriminazione" }).click()
  const prompt = await page.locator('p', { hasText: 'Cosa significa' }).innerText()
  const askedSalir = prompt.includes(`«${SALIR.word}»`)
  const interferingAnswer = askedSalir ? SALIR.interferingAnswer : SALIRE.interferingAnswer

  await page.getByLabel('Il tuo significato in italiano').fill(interferingAnswer)
  await page.getByRole('button', { name: 'Verifica' }).click()
}

/**
 * §6.12 SPEC: il rilevamento delle interferenze ripetute persiste **tra sessioni** (vedi
 * `CLAUDE.md`), non all'interno di un singolo giro: la proposta di carta di contrasto deve
 * scattare solo alla seconda volta che la stessa coppia viene confusa, anche con un reload
 * reale di mezzo (non solo un cambio di stato in-memory).
 */
test('la stessa interferenza confusa in due sessioni propone la carta di contrasto solo la seconda volta', async ({ page }) => {
  await page.goto('/#/confusioni')

  await answerFirstQuestionWithInterference(page)
  await expect(page.getByText(/Hai risposto con il significato di un'altra parola/)).toBeVisible()
  await expect(page.getByText('Hai confuso questa coppia più di una volta')).not.toBeVisible()

  // Sessione successiva: un reload reale, non solo una nuova interazione sulla stessa pagina.
  await page.reload()
  await answerFirstQuestionWithInterference(page)
  await expect(page.getByText('Hai confuso questa coppia più di una volta')).toBeVisible()

  await page.getByRole('button', { name: 'Aggiungi la coppia di contrasto' }).click()
  await expect(page.getByText(/Coppia di contrasto aggiunta all'SRS/)).toBeVisible()
})
