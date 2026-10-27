# Babele — convenzioni di progetto

Vedi `docs/SPEC.md` per i requisiti completi. Questo file serve a far partire
le sessioni future dal contesto giusto.

## Stato

Sviluppo per fasi (§9 di `docs/SPEC.md`), una alla volta. Fase corrente: **F0 — Fondamenta**.
Non passare alla fase successiva senza via libera esplicito dell'utente.

## Stack

- Vite + React + TypeScript (strict, `tsconfig.app.json` / `tsconfig.node.json`)
- Tailwind CSS v4 (config CSS-first in `src/index.css`, nessun `tailwind.config.js`)
- Dexie.js su IndexedDB (`src/db/db.ts`) — persistenza locale, nessun backend
- `vite-plugin-pwa` per offline/installabilità
- React Router con **hash routing** (`HashRouter`) — scelto invece di `BrowserRouter`
  per evitare il trucco del fallback SPA su GitHub Pages
- Vitest + Testing Library (`jsdom`, `fake-indexeddb/auto` per i test su Dexie)

## Comandi

- `npm run dev` — sviluppo locale
- `npm run build` — `tsc -b && vite build`, deve restare senza errori
- `npm test` — `vitest run`, deve restare verde
- `npm run lint` — `oxlint`

## Convenzioni

- **Interfaccia in italiano**, codice/variabili/commenti in inglese.
- `base: '/babele/'` in `vite.config.ts`: coerente con `https://denisndokaj.github.io/babele/`.
- Ogni lingua (`fr`/`de`/`es`) ha colore e trattamento tipografico fissi, definiti in
  `src/languages.ts` e nelle classi `.font-accent-*` in `src/index.css`. Non introdurre
  altri modi di colorare/etichettare le lingue altrove.
- Niente chiavi, token o dati personali nel repo. La chiave API Anthropic e il token
  del Gist vivono solo in IndexedDB nel browser, mai nel codice.
- **Ogni funzionalità deve restare utilizzabile senza chiave API**: l'LLM arricchisce,
  non è un requisito.
- Testi di canzoni e altri contenuti protetti da copyright: mai nel repo, solo incollati
  dall'utente a runtime.
- I contenuti "di massa" (liste di frequenza, frasi, unità grammaticali) vanno prodotti
  dalla pipeline in `/scripts` verso `/public/data/`, non scritti a mano nel codice.
- Backup dati: `src/db/backup.ts` (`exportBackup` / `importBackup`), usato dalla pagina
  Impostazioni. Qualsiasi nuova tabella Dexie va aggiunta anche lì.
- Dark mode manuale (classe `.dark` su `<html>`, toggle in `src/theme.ts`), con default
  alla preferenza di sistema.

## Deploy

- Workflow in `.github/workflows/deploy.yml`: build + test + deploy su GitHub Pages
  a ogni push su `main`.
- Nelle impostazioni del repo, *Settings → Pages → Source* deve essere **GitHub Actions**.
- Push diretto su `main` autorizzato esplicitamente dall'utente per questo progetto
  (repo personale, nessuna PR richiesta per fase di default).
