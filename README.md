# Babele

Piattaforma personale, statica e offline-first per imparare francese, tedesco e
spagnolo, partendo dall'italiano. I requisiti completi sono in
[`docs/SPEC.md`](docs/SPEC.md); le convenzioni di sviluppo in
[`CLAUDE.md`](CLAUDE.md).

Sito pubblico: <https://denisndokaj.github.io/babele/>

## Avvio in locale

Richiede Node.js 22+.

```bash
npm install
npm run dev
```

L'app parte su `http://localhost:5173/` (porta stampata in console).

## Script disponibili

| Comando | Effetto |
| --- | --- |
| `npm run dev` | server di sviluppo con hot reload |
| `npm run build` | type-check (`tsc -b`) + build di produzione in `dist/` |
| `npm test` | esegue la suite di test (Vitest) |
| `npm run test:watch` | test in modalità watch |
| `npm run lint` | lint con Oxlint |
| `npm run preview` | serve la build di produzione in locale |
| `npm run data:build` | rigenera `/public/data/<lingua>/vocabulary.json` e `credits.json` |
| `npm run test:e2e` | build + test end-to-end Playwright sui flussi principali (`/e2e`) |

Per i test end-to-end, la prima volta serve anche scaricare il browser:
`npx playwright install chromium`.

## Dati e backup

Tutti i dati (carte, revisioni, statistiche, impostazioni…) restano nel browser,
in IndexedDB tramite Dexie.js — non esiste alcun backend. Da **Impostazioni** si
può esportare un backup in JSON o importarne uno per ripristinare i dati.

Nessuna chiave API o token viene mai scritto nel codice o nel repository: la
chiave API Anthropic (opzionale, per diario/conversazione) e il token per la
sincronizzazione via Gist si inseriscono dalle Impostazioni e restano solo in
IndexedDB sul dispositivo.

## Sincronizzazione tra dispositivi

Dalle **Impostazioni** si può sincronizzare il backup tramite un Gist privato
di GitHub: serve un token personale **classico** (non "fine-grained") con lo
scope `gist`, creabile su [github.com/settings/tokens](https://github.com/settings/tokens).
"Carica" crea il Gist la prima volta (mostrandone l'ID da copiare sugli altri
dispositivi) o lo aggiorna; "Scarica" sostituisce i dati locali con quelli nel
Gist. Il token non lascia mai questo browser se non per parlare direttamente
con l'API di GitHub.

## Come aggiungere contenuti

I contenuti "di massa" (liste di frequenza, frasi di esempio, unità
grammaticali…) non si scrivono a mano nel codice: vengono generati da una
pipeline riproducibile in `/scripts/pipeline` (vedi `docs/SPEC.md` §7) e
salvati come JSON in `/public/data/`. Per rigenerarli:

```bash
npm run data:build
```

Scarica liste di frequenza da [hermitdave/FrequencyWords](https://github.com/hermitdave/FrequencyWords)
(MIT/CC-BY-SA-4.0) e frasi d'esempio con traduzione italiana da
[Tatoeba](https://tatoeba.org/) (CC-BY-2.0-FR); richiede accesso di rete e il
comando `bunzip2`. Le fonti e le licenze effettivamente usate compaiono nella
pagina **Crediti e licenze** dell'app.

Testi di canzoni e altri contenuti protetti da copyright non vanno mai
aggiunti al repo: nelle sezioni Musica e Leggi si incollano a runtime e
restano solo in locale.

## Deploy

Il deploy su GitHub Pages è automatico: ogni push su `main` fa partire il
workflow in `.github/workflows/deploy.yml`, che esegue test, build e
pubblica `dist/` tramite GitHub Actions.

Perché funzioni, nelle impostazioni del repository GitHub, *Settings → Pages
→ Build and deployment → Source* deve essere impostato su **GitHub Actions**
(operazione manuale, una tantum, da fare dal proprietario del repo).

## Stato del progetto

Sviluppo per fasi, vedi `docs/SPEC.md` §9. Fase corrente: **F7 — Statistiche,
sincronizzazione via Gist, rifinitura, test end-to-end** (parole note/in
apprendimento, ritenzione stimata, ore di input/output, livello CEFR stimato
e heatmap per lingua, serie di giorni con giorni di riposo configurabili;
sincronizzazione del backup via Gist privato; suite Playwright sui flussi
principali). F0–F6 sono complete.

Non implementato per scelta: il **Dizionario** di `docs/SPEC.md` §6.11 non è
mai stato assegnato a una fase né ha una voce nel menu — resta fuori finché
non viene richiesto esplicitamente.
