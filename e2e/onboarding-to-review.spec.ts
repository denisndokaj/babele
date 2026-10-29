import { expect, test } from '@playwright/test'

/**
 * Flusso principale end-to-end (§9 SPEC F7): onboarding → piano del giorno → revisione
 * SRS → sessione completata. Risponde alla prima opzione disponibile a ogni domanda del
 * test di livello: qui si verifica che il flusso funzioni, non la correttezza del test
 * (che ha già i suoi test unitari in `src/onboarding`).
 */
test('onboarding, piano del giorno e revisione di una carta', async ({ page }) => {
  await page.goto('/#/onboarding')

  await page.getByRole('checkbox').first().check()
  await page.getByRole('radio').first().check()
  await page.getByRole('button', { name: 'Inizia il test di livello' }).click()

  const doneHeading = page.getByRole('heading', { name: 'Pronto a cominciare' })
  for (let i = 0; i < 200 && !(await doneHeading.isVisible().catch(() => false)); i++) {
    try {
      await page.locator('section button').first().click({ timeout: 2000 })
    } catch {
      // Schermata di caricamento/seeding senza bottoni: aspetta e riprova.
    }
    await page.waitForTimeout(100)
  }
  await expect(doneHeading).toBeVisible()

  await page.getByRole('button', { name: 'Vai alla Home' }).click()
  await expect(page).toHaveURL(/#\/$/)

  // La Home mostra il piano del giorno con almeno un blocco (nuove carte, appena seminate).
  await page.getByRole('button', { name: 'Inizia la sessione' }).click()
  await expect(page).toHaveURL(/#\/vocabolario$/)

  // Rivede le carte della sessione con le scorciatoie da tastiera (Spazio poi "3" = Bene),
  // finché non arriva alla schermata di fine sessione.
  for (let i = 0; i < 50; i++) {
    const finished = page.getByRole('heading', { name: 'Sessione completata' })
    if (await finished.isVisible().catch(() => false)) break
    await page.keyboard.press(' ')
    await page.waitForTimeout(50)
    await page.keyboard.press('3')
    await page.waitForTimeout(50)
  }
  await expect(page.getByRole('heading', { name: 'Sessione completata' })).toBeVisible()
})
