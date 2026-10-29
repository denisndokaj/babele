import { defineConfig, devices } from '@playwright/test'

/**
 * Test end-to-end sui flussi principali (§9 SPEC F7). Girano sulla build di produzione
 * (`npm run build` seguito da `vite preview`), non sul dev server, per testare quello che
 * finisce davvero su GitHub Pages. `npm run test:e2e` fa entrambe le cose.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  // 1 ritentativo: l'automazione del browser ha una variabilità di tempo intrinseca
  // (I/O di IndexedDB, avvio del service worker...) che occasionalmente supera il timeout
  // anche a parità di comportamento dell'app; un solo retry assorbe questo rumore senza
  // mascherare un fallimento vero (che si ripete anche al secondo tentativo).
  retries: 1,
  timeout: 45_000,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173/babele/',
    trace: 'retain-on-failure',
    // Il service worker di vite-plugin-pwa non serve nei test e può restare attivo tra una
    // pagina e l'altra più del previsto: bloccarlo evita rallentamenti casuali nella CI.
    serviceWorkers: 'block',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173/babele/',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
})
