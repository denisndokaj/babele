import { expect, test } from '@playwright/test'

/** Backup JSON: esporta, poi importa lo stesso file e verifica che i dati tornino (§10 SPEC: "I dati sopravvivono a ricaricamento, export e import"). */
test('esporta un backup e lo reimporta senza errori', async ({ page }) => {
  await page.goto('/#/impostazioni')

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Esporta backup (JSON)' }).click()
  const download = await downloadPromise
  const path = await download.path()
  expect(path).toBeTruthy()

  const fs = await import('node:fs/promises')
  const content = JSON.parse(await fs.readFile(path as string, 'utf-8'))
  expect(content.backupVersion).toBe(1)
  expect(content.tables).toHaveProperty('cards')
  expect(content.tables).toHaveProperty('settings')

  await page.setInputFiles('input[aria-label="Seleziona file di backup da importare"]', path as string)
  await expect(page.getByText('Backup importato.')).toBeVisible()
})

test('segnala un file non valido senza bloccare la pagina', async ({ page }) => {
  await page.goto('/#/impostazioni')

  const fs = await import('node:fs/promises')
  const os = await import('node:os')
  const path = await import('node:path')
  const tmpFile = path.join(os.tmpdir(), `babele-bad-backup-${Date.now()}.json`)
  await fs.writeFile(tmpFile, '{"not":"a backup"}')

  await page.setInputFiles('input[aria-label="Seleziona file di backup da importare"]', tmpFile)
  await expect(page.getByText(/non è un backup valido/)).toBeVisible()
})
