# Babele — convenzioni di progetto

Vedi `docs/SPEC.md` per i requisiti completi. Questo file serve a far partire
le sessioni future dal contesto giusto.

## Stato

Sviluppo per fasi (§9 di `docs/SPEC.md`), una alla volta. Fase corrente: **F7 — Statistiche,
sync via Gist, rifinitura, test end-to-end**. Non passare alla fase successiva senza via
libera esplicito dell'utente.

Nota: §6.11 SPEC (Dizionario, ricerca locale su dati Wiktionary) non è mai stata assegnata
a una fase in §9 né ha una voce nel menu — resta volutamente non implementata. Da
riconsiderare solo se l'utente lo chiede esplicitamente.

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
- `npm run test:e2e` — build di produzione + test end-to-end Playwright (`/e2e`) sulla build
  servita da `vite preview`; la prima volta serve anche `npx playwright install chromium`

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
  **Traguardo dichiarato (ottobre 2026)**: estensione da A1 a madrelingua **fino al C1**, a
  tappe (un livello alla volta, con verifica e resoconto tra l'una e l'altra), non C2 — a
  quel punto la competenza è lessicale/pragmatica più che grammaticale, e un esercizio a
  scelta multipla sul C2 ha poco senso didattico; il C2 resta coperto da Leggi/Conversa/
  Scrivi. Stato: **A1 (6 unità/lingua), A2 (5 unità/lingua) e B1 completi**; B2/C1 ancora da
  scrivere (titoli B2 in `UPCOMING_UNITS`, C1 ancora da definire nel dettaglio). Gli argomenti
  NON sono forzati identici tra le tre lingue: a A1/A2 ci sono 4-5 argomenti condivisi per
  livello (scritti separatamente per lingua, stesso `nodeId`) più argomenti specifici dove la
  grammatica reale lo richiede (es. A2: partitivo FR, verbi modali DE, ser/estar ES); al B1 il
  tedesco ne ha 4 (casi, verbi separabili, **più** condizionale e congiuntivo tedeschi — il
  Konjunktiv II e il Konjunktiv I richiedono un trattamento specifico, non il semplice
  "condizionale"/"congiuntivo" di FR/ES) contro 2 per francese e spagnolo; il B2 pianificato non
  ha più nemmeno un argomento condiviso (è tutto specifico per lingua, due a testa). `nodeId`
  non va quindi assunto condiviso tra lingue, serve solo a raggruppare le tabelle comparative
  in `comparativeTables.ts` quando il confronto a 4 colonne è sensato (es. condizionale e
  congiuntivo al B1: anche se le forme tedesche sono diverse, il confronto concettuale regge).
  `content.test.ts`: `EXPECTED_UNIT_COUNTS` tiene il conteggio atteso per lingua/livello — va
  aggiornato ad ogni tappa, non è più un numero fisso uguale per tutte le lingue.
- **Sottotitoli e video** (`src/subtitles/`, `src/media/`): parser SRT/VTT scritti a mano
  (sono formati di file standard, non un dataset esterno). Il player video locale usa
  `<video>` nativo; YouTube passa sempre dall'IFrame API ufficiale
  (`src/media/youtube.ts`), mai da embed non ufficiali. La stima di copertura lessicale
  (`src/subtitles/coverage.ts`) tokenizza come la pipeline dati e confronta con i lemmi
  delle carte già salvate — tienila aggiornata se cambi la tokenizzazione altrove.
  Catalogo iniziale in `src/content/media/catalog.ts`: ogni URL va verificato (HTTP 200)
  prima di aggiungerlo, mai inventato; niente film o podcast finché non si può
  verificarne la disponibilità in modo ripetibile (la disponibilità streaming cambia
  troppo spesso per una verifica singola).
- **Lettura e musica** (`src/reading/`, `src/music/`): `ClickableChunk` (in `src/reading/`)
  è il lettore condiviso da Leggi e Musica — stesso meccanismo di clic-per-aggiungere e
  colorazione per stato (`src/reading/wordStatus.ts`: "nota" = FSRS state Review, "in
  apprendimento" = carta presente ma non consolidata). Non duplicarlo nelle due pagine.
  Il percorso filosofico (`src/content/reading/philosophy.ts`) contiene solo estratti
  verificati parola per parola su Wikisource prima di essere incollati nel codice, con
  licenza e link alla fonte: ogni nuovo estratto va verificato allo stesso modo (pubblico
  dominio dell'opera + attribuzione alla trascrizione). I testi delle canzoni incollati
  dall'utente in Musica restano solo in IndexedDB: non committare mai un testo di
  canzone, nemmeno come fixture di test. La playlist (`src/content/music/playlist.ts`)
  cita solo canzoni reali ed esistenti, senza link né testo.
- **Confusioni** (`src/confusion/`, `src/content/confusion/pairs.ts`): coppie di falsi
  amici scritte a mano, un lato può essere `'it'` (italiano) perché `Card.language` non
  lo supporta — solo i lati nelle tre lingue di studio diventano carte
  (`addContrastCards.ts` lo filtra già, non aggirarlo). Il rilevamento delle interferenze
  ripetute (`settings.ts`: `confusionMistakes`) persiste **tra sessioni**, non all'interno
  di un singolo giro d'esercizio: un utente deve confondere la stessa coppia in sessioni
  diverse prima che scatti la proposta di carta di contrasto — è il comportamento voluto,
  non un bug.
- **Pronuncia e dettato** (`src/speech/`, `src/dictation/`): `src/speech/recognition.ts`
  avvolge `SpeechRecognition`/`webkitSpeechRecognition` con tipi ambiente dedicati (non
  nella lib standard di TS) e si risolve sempre con `null` in caso di errore o mancato
  supporto, mai con un'eccezione non gestita — stesso principio di `shadowing.ts` in F3.
  La guida ai suoni (`src/content/pronunciation/soundGuide.ts`) e le coppie minime
  (`minimalPairs.ts`) sono scritte a mano: non esiste un dataset aperto di questo tipo.
  Il dettato confronta posizione per posizione (`diffChars`), non per edit-distance.
- **LLM** (`src/llm/`, `src/content/llm/prompts.ts`): verificata in Fase 6 la documentazione
  ufficiale corrente (`https://platform.claude.com/docs/en/api/overview` e
  `.../cli-sdks-libraries/sdks/typescript`) prima di scrivere il client. Chiamata diretta
  dal browser (niente backend): header `x-api-key`, `anthropic-version: 2026-10-21`,
  `content-type: application/json` e `anthropic-dangerous-direct-browser-access: true` —
  quest'ultimo è descritto da Anthropic stesso come "dangerous" perché espone la chiave nel
  codice client, accettabile qui solo perché è la chiave personale dell'utente, salvata e
  usata esclusivamente sul suo dispositivo (uno dei casi che la stessa documentazione
  individua come a basso rischio). Modello predefinito `claude-sonnet-5-5`
  (`DEFAULT_MODEL` in `src/llm/client.ts`): buon compromesso qualità/costo per una chiave a
  consumo personale, non il più economico né il più potente disponibile — cambiarlo lì, non
  sparso nei chiamanti. `callClaude` (`src/llm/client.ts`) **lancia** un `LlmError` con
  messaggio in italiano in caso di errore, a differenza di `recognition.ts`/`shadowing.ts`
  (che risolvono silenziosamente `null`): lì il fallimento è un'alternativa muta accettabile,
  qui l'utente ha scritto qualcosa e aspetta un esito, quindi un messaggio chiaro è meglio del
  silenzio. Le risposte del modello sono richieste in JSON (`src/llm/schema.ts` le estrae
  anche da blocchi \`\`\`json ed eventuale testo introduttivo) e **mai fidate ciecamente**:
  se il parsing fallisce, l'errore arriva all'utente invece di salvare dati corrotti. Il
  prompt di sistema del tutor e del correttore del diario sono dati versionati in
  `src/content/llm/prompts.ts` (non inline nei componenti, come richiesto da §6.10 SPEC);
  cambiarne il testo non richiede toccare `Scrivi.tsx`/`Conversa.tsx`. Sia "Scrivi" che
  "Conversa" restano fruibili senza chiave (il diario funziona comunque con
  salvataggio/autovalutazione; "Conversa" senza chiave mostra solo un messaggio che spiega
  perché è necessaria, mai un errore). Gli errori segnalati dal modello diventano carte di
  tipo `production` taggate `diario`/`conversazione` tramite `errorsToCards`/`saveErrorCards`
  in `src/llm/diary.ts` (riusata da entrambe le pagine).
- **Statistiche** (`src/stats/`): niente snapshot giornaliero di parole note/in apprendimento
  — `wordsKnown`/`wordsLearning` in `dailyStats` restano a 0 e il conteggio vero si calcola
  dal vivo (`languageStats.ts`, riusa `buildWordStatusIndex`), più accurato di uno snapshot
  per un'app senza lavori in background che lo scriverebbero una volta al giorno. `dailyStats`
  serve solo per `minutesInput`/`minutesOutput` (vedi `activityTimer.ts`, un hook React che
  misura il tempo con la scheda visibile e lo registra con un flush periodico ogni 20s + allo
  smontaggio/`pagehide`, montato come 'input' in AscoltaGuarda/Leggi/Musica e nel tab Dettato
  di Pronuncia, come 'output' in Scrivi/Conversa e nel tab Pronuncia) e per la heatmap
  (`heatmap.ts`: le giornate attive includono anche diario/conversazioni/revisioni SRS, non
  solo il tempo cronometrato). La ritenzione stimata usa `scheduler.get_retrievability` di
  `ts-fsrs` (esportato da `src/srs/fsrs.ts` insieme a `toFsrsCard`, non duplicarlo altrove).
  Il livello CEFR stimato (`cefr.ts`) è una soglia euristica sul numero di parole note, **satura
  a B2**: il vocabolario della pipeline (~2000 lemmi a lingua, §7 SPEC) non permette di
  attestare C1/C2 in modo verificabile. Lo streak (`streak.ts`) è unico, sulle lingue
  combinate, non per lingua; i giorni di riposo configurabili (`settings.ts`:
  `streakSettings`) non interrompono la serie se non c'è attività, e il giorno corrente non
  la interrompe finché non è ancora finito — nessuna pressione o gamification invadente
  (§6.13 SPEC).
- **Sincronizzazione via Gist** (`src/sync/gist.ts`): verificata in Fase 7 la documentazione
  ufficiale (`docs.github.com/en/rest/gists/gists`) prima di scrivere il client — header
  `Authorization: Bearer <token>` (non il vecchio formato `token <token>`), endpoint
  `POST /gists` (crea) / `PATCH /gists/{id}` (aggiorna) / `GET /gists/{id}` (legge, con
  fallback su `raw_url` se il contenuto è troncato). Serve un token **classico** con lo
  scope "gist": i token "fine-grained" non coprono i Gist. Riusa `exportBackupText`/
  `importBackupText` di `src/db/backup.ts` (stesso formato dell'export/import su file):
  non duplicare la logica di backup per il Gist. Come la chiave API Anthropic, il token
  resta solo in IndexedDB (`settings.ts`: `gistToken`/`gistId`/`gistLastSyncAt`).
- **Test end-to-end** (`/e2e`, Playwright): girano sulla build di produzione
  (`npm run test:e2e` = `npm run build && playwright test`), non sul dev server — quello che
  testano è quello che finisce davvero su GitHub Pages. `playwright.config.ts` usa un solo
  worker e blocca i service worker (`serviceWorkers: 'block'`): altrimenti quello di
  `vite-plugin-pwa` può restare attivo tra una pagina e l'altra più del previsto e introdurre
  lentezze incoerenti nei test. `retries: 1`: l'automazione del browser ha una variabilità di
  tempo intrinseca che a volte supera il timeout anche a parità di comportamento dell'app; un
  fallimento che si ripete anche al retry è un fallimento vero. Scrivendo un nuovo test, se un
  selettore è ambiguo (es. un link che compare sia nella barra di navigazione sia nel testo),
  restringilo con `.locator('#contenuto')` o un ruolo/testo più specifico invece di aggiungere
  attese arbitrarie.

## Deploy

- Workflow in `.github/workflows/deploy.yml`: build + test + deploy su GitHub Pages
  a ogni push su `main`.
- Nelle impostazioni del repo, *Settings → Pages → Source* deve essere **GitHub Actions**.
- Push diretto su `main` autorizzato esplicitamente dall'utente per questo progetto
  (repo personale, nessuna PR richiesta per fase di default).
