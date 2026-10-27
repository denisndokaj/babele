# Babele — convenzioni di progetto

Vedi `docs/SPEC.md` per i requisiti completi. Questo file serve a far partire
le sessioni future dal contesto giusto.

## Stato

Sviluppo per fasi (§9 di `docs/SPEC.md`), una alla volta. Fase corrente: **F2 — Grammatica**.
Non passare alla fase successiva senza via libera esplicito dell'utente.

## Stack

- Vite + React + TypeScript (strict, `tsconfig.app.json` / `tsconfig.node.json`)
- Tailwind CSS v4 (config CSS-first in `src/index.css`, nessun `tailwind.config.js`)
- Dexie.js su IndexedDB (`src/db/db.ts`) — persistenza locale, nessun backend
- `vite-plugin-pwa` per offline/installabilità
- React Router con **hash routing** (`HashRouter`) — scelto invece di `BrowserRouter`
  per evitare il trucco del fallback SPA su GitHub Pages
- `ts-fsrs` per lo scheduling SRS (`src/srs/fsrs.ts`)
- Vitest + Testing Library (`jsdom`, `fake-indexeddb/auto` per i test su Dexie)
- `tsx` per eseguire la pipeline dati in `/scripts` (Node, non bundle dell'app)

## Comandi

- `npm run dev` — sviluppo locale
- `npm run build` — `tsc -b && vite build`, deve restare senza errori
- `npm test` — `vitest run`, deve restare verde
- `npm run lint` — `oxlint`
- `npm run data:build` — rigenera `/public/data/<lingua>/vocabulary.json` e `credits.json`
  dalla pipeline (richiede `bunzip2` in PATH e accesso di rete)

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
- **Modelli Dexie**: il campo `id` nelle interfacce in `src/types/models.ts` è dichiarato
  `number` (non opzionale). È `EntityTable<T,'id'>` (in `src/db/db.ts`) a renderlo opzionale
  solo per l'inserimento: se serve il tipo "da inserire" (senza id), usa `Omit<T, 'id'>`
  invece di marcare `id` opzionale nell'interfaccia — altrimenti Dexie inferisce la chiave
  come `number | undefined` anche in lettura.
- **Stato async con doppio invio**: ogni handler che avvia un'operazione asincrona
  innescabile due volte da un utente (click doppio, tasto ripetuto) va protetto con un
  lock (`useRef<boolean>`), non solo con lo stato di React — vedi `answeringRef` in
  `Onboarding.tsx` e `ratingRef` in `Vocabolario.tsx`. Senza il lock, due inviti concorrenti
  alla stessa scrittura Dexie possono violare un indice unico (es. `settings.&key`) e
  duplicare il seeding delle carte.
- **Impostazioni persistite** in `src/settings/settings.ts` (tabella `settings`, chiave/valore
  tipizzato): `onboardingProfile` (lingue attive, prioritaria, livelli) e `sessionSettings`
  (budget minuti, limite nuove carte/giorno). Qualsiasi nuova preferenza duratura va lì,
  non in `localStorage` (riservato a comodità di UI non critiche, come il tema).
- **Piano del giorno** (`src/session/planner.ts`): le revisioni dovute hanno sempre
  priorità sul budget; le nuove carte si riducono (anche a zero) se le revisioni saturano
  il tempo disponibile, mai il contrario. Le lingue restano in blocchi separati, non si
  mescolano le carte tra lingue nello stesso blocco (§3.8 SPEC).
- **Contenuto grammaticale** (`src/content/grammar/`): a differenza del vocabolario, non
  viene da una pipeline esterna (non esiste una fonte aperta di spiegazioni contrastive
  per italofoni) — è scritto a mano come dato tipizzato (`GrammarUnitContent`), non dentro
  i componenti React. Aggiungere una nuova unità o lingua significa estendere
  `fr.ts`/`de.ts`/`es.ts` (o un nuovo file), non toccare `Grammatica.tsx`.
  `src/content/grammar/content.test.ts` verifica automaticamente l'integrità di ogni
  unità (≥15 esercizi, permutazioni valide dei riordini, indici validi delle scelte
  multiple…): va tenuto verde quando si aggiunge contenuto. `src/grammar/checkAnswer.ts`
  contiene la logica di verifica delle risposte, pura e testata separatamente dalla UI.

## Deploy

- Workflow in `.github/workflows/deploy.yml`: build + test + deploy su GitHub Pages
  a ogni push su `main`.
- Nelle impostazioni del repo, *Settings → Pages → Source* deve essere **GitHub Actions**.
- Push diretto su `main` autorizzato esplicitamente dall'utente per questo progetto
  (repo personale, nessuna PR richiesta per fase di default).
