import { expect, test } from '@playwright/test'

/** §6.10 SPEC: il diario deve funzionare anche senza una chiave API Anthropic. */
test('Scrivi: si può salvare una frase e ricevere l\'autovalutazione senza chiave API', async ({ page }) => {
  await page.goto('/#/scrivi')

  await page.fill('textarea[aria-label="Scrivi qui il tuo diario"]', 'Je mange une pomme.')
  await page.getByRole('button', { name: 'Salva' }).click()
  await expect(page.getByText('Frase salvata.')).toBeVisible()
  await expect(page.getByRole('listitem').filter({ hasText: 'Je mange une pomme.' })).toBeVisible()

  await expect(page.getByText(/serve una chiave/)).toBeVisible()
  await expect(page.locator('#contenuto').getByRole('link', { name: 'Impostazioni' })).toBeVisible()
})

/** §6.10 SPEC: Conversa, senza chiave, spiega perché serve e non genera un errore. */
test('Conversa: senza chiave mostra solo un messaggio esplicativo', async ({ page }) => {
  await page.goto('/#/conversa')
  await expect(page.getByText(/richiede una chiave API/)).toBeVisible()
})
