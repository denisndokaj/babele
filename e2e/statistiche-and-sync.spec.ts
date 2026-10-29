import { expect, test } from '@playwright/test'

test('Statistiche mostra le tre lingue e permette di impostare i giorni di riposo', async ({ page }) => {
  await page.goto('/#/statistiche')
  await expect(page.getByRole('heading', { name: 'Statistiche' })).toBeVisible()
  await expect(page.getByText('Francese')).toBeVisible()
  await expect(page.getByText('Tedesco')).toBeVisible()
  await expect(page.getByText('Spagnolo')).toBeVisible()

  const domenica = page.getByRole('button', { name: 'Dom' })
  await expect(domenica).toHaveAttribute('aria-pressed', 'false')
  await domenica.click()
  await expect(domenica).toHaveAttribute('aria-pressed', 'true')
})

/** Sincronizzazione via Gist (§9 SPEC F7): l'API di GitHub è intercettata, non viene mai chiamata davvero. */
test('Impostazioni: carica e scarica il backup da un Gist privato (API intercettata)', async ({ page }) => {
  await page.route('https://api.github.com/gists', async (route) => {
    await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ id: 'e2efakegist', files: {} }) })
  })
  await page.route('https://api.github.com/gists/e2efakegist', async (route) => {
    if (route.request().method() === 'PATCH') {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: 'e2efakegist', files: {} }) })
      return
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'e2efakegist',
        files: { 'babele-backup.json': { content: JSON.stringify({ backupVersion: 1, exportedAt: new Date().toISOString(), tables: {} }) } },
      }),
    })
  })

  await page.goto('/#/impostazioni')
  // Attende che i caricamenti iniziali da IndexedDB (profilo, impostazioni, chiavi) si siano
  // assestati prima di digitare, per non intercettare il campo a metà di un re-render.
  await expect(page.getByText(/Nessuna chiave salvata|chiave è salvata/)).toBeVisible()
  await page.fill('input[aria-label="Token GitHub per il Gist"]', 'ghp_e2efaketoken')
  await page.getByRole('button', { name: 'Salva token' }).click()
  await expect(page.getByText('Token salvato in locale su questo dispositivo.')).toBeVisible()

  await page.getByRole('button', { name: 'Carica su Gist' }).click()
  await expect(page.getByText(/caricato sul Gist/)).toBeVisible()
  await expect(page.locator('input[aria-label="ID del Gist"]')).toHaveValue('e2efakegist')

  await page.getByRole('button', { name: 'Scarica da Gist' }).click()
  await expect(page.getByText('Dati ripristinati dal Gist: hanno sostituito quelli locali.')).toBeVisible()
})
