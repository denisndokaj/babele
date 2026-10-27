# Progetto "Babele" — piattaforma personale per imparare francese, tedesco e spagnolo

## 0. Come voglio che tu lavori

- Prima di scrivere codice leggi tutto questo documento e proponimi un **piano in fasi** (vedi §9). Se ci sono ambiguità che bloccano davvero il lavoro, fammi al massimo 5 domande; per tutto il resto scegli un default ragionevole e dichiaralo.
- Lavora **una fase alla volta**. A fine fase: build pulita, test verdi, commit con messaggio descrittivo, push su `main`, breve riepilogo di cosa funziona e cosa manca. Non passare alla fase successiva senza il mio via libera.
- Salva questo documento nel repo come `docs/SPEC.md` e crea un `CLAUDE.md` con le convenzioni del progetto, così le sessioni future partono dal contesto giusto.
- Non inventare dataset, URL o API. Se citi una risorsa esterna, verifica che esista e quale licenza abbia; se non puoi verificarlo, segnalalo invece di fingere.
- Interfaccia **in italiano**. Codice, nomi di variabili e commenti in inglese.

## 1. Contesto dell'utente

- Madrelingua italiano. Livello di partenza nelle tre lingue da determinare con un test (non dare per scontato principiante assoluto).
- Studente di filosofia: voglio un percorso di lettura che arrivi ai testi filosofici in lingua originale (vedi §6.7).
- Uso da desktop e da smartphone: layout responsive, mobile-first.
- Tempo disponibile variabile: la sessione giornaliera deve adattarsi a un budget in minuti che scelgo io (10 / 20 / 40 / 60).

## 2. Vincoli tecnici

- **Hosting**: GitHub Pages sul repo `denisndokaj/babele` (https://github.com/denisndokaj/babele). Come primo passo verifica di avere accesso al repo e dimmi se è vuoto o contiene già file; se non esiste o non è raggiungibile, fermati e chiedimi come procedere. Deploy automatico con GitHub Actions a ogni push su `main`; nelle impostazioni del repo, Pages deve usare "GitHub Actions" come sorgente (se serve un mio intervento manuale, dimmelo).
- **URL pubblico atteso**: `https://denisndokaj.github.io/babele/`, quindi `base: '/babele/'` in Vite (o hash routing) e percorsi di asset, service worker e manifest PWA coerenti con quel sottopercorso.
- **Nessun backend**. Sito statico.
- **Stack** (salvo tue obiezioni motivate): Vite + React + TypeScript (strict), Tailwind CSS, Dexie.js su IndexedDB per la persistenza, `vite-plugin-pwa` per funzionamento offline e installazione su telefono, Vitest per i test unitari.
- Configura correttamente il `base` path per GitHub Pages (oppure usa hash routing) e verifica che il deploy funzioni già nella Fase 0.
- **Dati**: tutto in locale nel browser. Funzioni di **esporta/importa** (JSON) per backup. Sincronizzazione opzionale tra dispositivi tramite un Gist privato di GitHub, con token inserito da me nelle impostazioni, salvato solo in locale e mai committato.
- **LLM opzionale**: impostazione per inserire una chiave API Anthropic, salvata solo in IndexedDB, mai nel codice né nel repo. Verifica sulla documentazione attuale come si chiama l'API direttamente dal browser (header richiesti, modello consigliato). **Ogni funzione del sito deve funzionare anche senza chiave**: l'LLM arricchisce, non regge.
- Dark mode, accessibilità di base (contrasto, navigazione da tastiera, `aria-label`), scorciatoie da tastiera nelle revisioni.

## 3. Principi didattici (sono requisiti, non decorazione)

Ogni modulo deve rispettarli; se una scelta di design li contraddice, segnalalo.

1. **Comprehensible input** (Krashen): la maggior parte del tempo va su input leggermente sopra il livello attuale (i+1). Il sito stima la percentuale di parole note in un testo/video e lo segnala (obiettivo: ~95–98% di copertura).
2. **Output e noticing** (Swain, Schmidt): produrre lingua fa emergere le lacune; gli errori diventano materiale di studio.
3. **Spaced repetition**: revisione a intervalli crescenti, algoritmo **FSRS** (es. libreria `ts-fsrs`, verifica), con SM-2 solo come fallback.
4. **Retrieval practice**: si richiama attivamente, non si rilegge. Produzione > riconoscimento appena possibile.
5. **Interleaving e desirable difficulties** (Bjork): mescolare tipi di esercizio all'interno di una lingua; un po' di fatica è il segnale che sta funzionando.
6. **Unità lessicale = chunk, non parola isolata**: ogni carta porta con sé una frase di contesto reale.
7. **Grammatica contrastiva con l'italiano**: si parte da ciò che si sa. Cognati, falsi amici, differenze strutturali esplicitate.
8. **Gestione dell'interferenza tra lingue**: ogni lingua ha un'identità visiva forte e costante (colore, font d'accento, bandiera); i blocchi di lingue diverse sono separati nella sessione; esiste una sezione dedicata alle **confusioni tra FR/ES/IT** (es. *salir* vs *salire*, *embarazada*, *attendre* vs *atender*).
9. **Dual coding**: audio sempre disponibile; immagini dove servono; colore per il genere grammaticale.

## 4. Modello dati (indicativo, raffinalo tu)

- `Language`: `fr` | `de` | `es`, con colore, nome, livello CEFR stimato.
- `Card`: lingua, lemma, forma, POS, genere (per i sostantivi), frase di esempio L2, traduzione IT, IPA, audio (TTS o URL), tag, flag `cognate` / `falseFriend`, origine (lista di frequenza, video X al minuto Y, testo Z…), tipi di esercizio abilitati.
- `ReviewLog`: stato FSRS, storico revisioni.
- `GrammarUnit`: lingua, livello CEFR, titolo, esempi per il noticing, spiegazione contrastiva, esercizi, collegamenti alle altre lingue.
- `Exercise`: tipo (cloze, scelta multipla, traduzione IT→L2, riordino, dettato, coniugazione, genere…), payload, soluzione, spiegazione.
- `MediaItem`: tipo (video, film, serie, canzone, podcast, testo), lingua, livello, URL o file locale, sottotitoli, copertura lessicale stimata, stato (da vedere / in corso / visto).
- `JournalEntry`, `Conversation`, `Session`, `DailyStats`, `Settings`.

## 5. Struttura del sito

- **Home / Piano del giorno**
- **Vocabolario** (revisione SRS + browser delle carte)
- **Grammatica** (percorso per lingua + tabelle comparative trilingui)
- **Ascolta & guarda** (video, film, serie, podcast)
- **Musica**
- **Leggi** (testi graduati + percorso filosofico)
- **Pronuncia**
- **Scrivi** (diario)
- **Conversa** (tutor, richiede LLM)
- **Confusioni** (falsi amici e interferenze tra lingue)
- **Statistiche**
- **Impostazioni** (lingue attive, budget minuti, chiave API, backup, sync)

## 6. Moduli — requisiti e criteri di accettazione

### 6.1 Onboarding e test di livello
- Scelta delle lingue attive e della **lingua prioritaria** (le altre due crescono a ritmo ridotto).
- Test adattivo breve per lingua (vocabolario per fasce di frequenza + qualche item di grammatica e ascolto) che stima un livello CEFR e segna come "note" le parole già acquisite.
- ✅ Dopo il test ho un livello stimato e un mazzo di partenza coerente.

### 6.2 Piano del giorno (motore delle sessioni)
- Dato il budget in minuti, genera una sessione con blocchi: revisioni SRS dovute → nuove carte (limite giornaliero configurabile) → micro-unità di grammatica → input (video/lettura/canzone al livello giusto) → una produzione breve (frase, dettato o diario).
- Ripartizione indicativa: ~50% input, ~25% SRS, ~15% grammatica, ~10% output; la lingua prioritaria prende circa metà del tempo.
- Le revisioni dovute non si accumulano all'infinito: se superano una soglia, il sistema riduce le nuove carte.
- ✅ Una sessione da 20 minuti si apre con un clic e si completa senza dover decidere niente.

### 6.3 Vocabolario (SRS)
- Tipi di carta: riconoscimento (L2→IT), **produzione** (IT→L2), cloze nella frase, ascolto (audio→significato), genere (*der/die/das*, *le/la*, *el/la*).
- Colori fissi per il genere in tutto il sito.
- Segnalazione automatica di cognati e falsi amici rispetto all'italiano.
- Aggiunta rapida da qualunque punto del sito (clic su una parola in un video, testo, canzone) con frase e fonte salvate.
- Valutazione a 4 pulsanti (FSRS), scorciatoie da tastiera, audio automatico.
- ✅ Posso fare 50 revisioni da tastiera senza toccare il mouse; i dati sopravvivono a un ricaricamento e a un export/import.

### 6.4 Grammatica contrastiva
- Ogni unità: (1) esempi da osservare con la struttura evidenziata (noticing), (2) spiegazione breve **contrastiva rispetto all'italiano**, (3) esercizi graduati, (4) frasi chiave che entrano nell'SRS.
- **Tabelle comparative** IT/FR/ES/DE per i nodi principali (articoli, pronomi, ausiliari, tempi del passato, congiuntivo, casi tedeschi, *ser/estar*, ordine delle parole in tedesco, verbi separabili, partitivo francese…).
- Contenuto iniziale: le unità A1 complete per le tre lingue e la scaletta delle unità fino a B1.
- Coniugatore/declinatore come esercizio, non solo come consultazione.
- ✅ Per ogni unità A1 esistono spiegazione, almeno 15 esercizi e collegamento all'SRS.

### 6.5 Ascolta & guarda (video, film, serie, podcast)
- Player che incorpora video YouTube (IFrame API) e accetta **file video locali** e **sottotitoli `.srt`/`.vtt`** caricati da me.
- Sottotitoli L2, IT, doppi o spenti; navigazione per battuta; ripeti battuta; velocità 0.5–1.25×; pausa automatica a fine battuta (modalità intensiva).
- Clic su una parola del sottotitolo → definizione (vedi §6.11) → aggiungi carta con frase e timestamp.
- **Shadowing**: ripeti la battuta dopo l'audio, con registrazione locale per confrontare.
- Stima della copertura lessicale dei sottotitoli in base alle mie carte note → indicatore "troppo facile / giusto / troppo difficile".
- Catalogo iniziale (JSON curato) di risorse **gratuite e legali** per livello: canali di emittenti pubbliche e progetti didattici (es. corsi di Deutsche Welle, RFI, RTVE, canali "Easy German/French/Spanish"), **verificando che esistano**. Per i film: solo schede con titolo, livello consigliato e piattaforma dove guardarli; nessun contenuto scaricato o ospitato.
- ✅ Carico un episodio con i suoi `.srt`, lo guardo con doppi sottotitoli, salvo 5 parole e le ritrovo nelle revisioni con la frase giusta.

### 6.6 Musica
- Schede canzone con link all'ascolto ufficiale (embed dove consentito).
- I **testi non vengono inclusi nel repo**: li incollo io e restano solo in locale.
- Sul testo incollato: lettura parola per parola con aggiunta all'SRS, esercizio cloze sulle parole del mio livello.
- Playlist iniziale suggerita per lingua e livello (solo titolo, artista, motivo didattico).
- ✅ Incollo un testo, genero un cloze, salvo parole; nulla del testo finisce in Git.

### 6.7 Leggi
- Lettore per testi incollati o importati (`.txt`, `.epub` se fattibile) con: clic su parola, evidenziazione delle parole nuove/in apprendimento/note, traduzione della frase a richiesta, audio TTS della frase.
- Testi graduati e testi di **pubblico dominio** (Wikisource, Project Gutenberg), con attribuzione.
- **Percorso filosofico** come obiettivo di lungo periodo, con estratti brevi e annotati, ordinati per difficoltà: es. Descartes (*Discours de la méthode*), Pascal, Rousseau; Nietzsche, Schopenhauer, Kant; Unamuno. Verifica lo stato di pubblico dominio di ogni testo prima di includerlo.
- Glossario del lessico filosofico trilingue (*Dasein*, *Aufhebung*, *Vernunft/Verstand*, *esprit*, *conatus*…).
- ✅ Apro un estratto, vedo la percentuale di parole note, salvo termini con la frase d'origine.

### 6.8 Ascolto e dettato
- Dettato a partire da frasi con audio (TTS o registrazioni con licenza aperta), correzione carattere per carattere con evidenziazione degli errori, errori ricorrenti registrati.
- Esercizi di discriminazione (coppie minime).

### 6.9 Pronuncia
- IPA su ogni carta; guida ai suoni difficili per un italofono (*ü/ö*, *Ich-/Ach-Laut*, vocali nasali francesi, *u/ou*, *j* spagnola, *r* uvulare…).
- TTS con Web Speech API scegliendo una voce nativa disponibile; riconoscimento vocale (`SpeechRecognition`) dove supportato, con fallback dichiarato.
- ✅ Funziona su Chrome desktop e Android; su browser non supportati compare un messaggio chiaro, non un errore.

### 6.10 Scrivi e Conversa (LLM opzionale)
- **Diario**: scrivo poche frasi al giorno in una lingua; con la chiave API ricevo correzione, spiegazione breve di ogni errore (in italiano) e versione riformulata; gli errori diventano carte.
- **Conversa**: tutor che adatta lessico e strutture al mio livello stimato e alle parole in apprendimento, con scenari (bar, stazione, colloquio, discussione filosofica); a fine conversazione, riepilogo degli errori.
- Il prompt di sistema del tutor sta in un file versionato e modificabile.
- Senza chiave: il diario funziona comunque (salvataggio, autovalutazione, confronto con frasi modello).

### 6.11 Dizionario
- Ricerca locale su dati da Wiktionary (es. estratti strutturati di kaikki.org, verifica licenza e dimensioni); se troppo pesante, carica i dati per lingua in modo lazy.
- Fallback: link esterni a dizionari online.

### 6.12 Confusioni
- Raccolta di falsi amici e interferenze tra IT/FR/ES/DE, con esercizi dedicati e carte che finiscono nell'SRS.
- Se nelle revisioni sbaglio ripetutamente usando la parola di un'altra lingua, il sito lo rileva e propone la coppia come carta di contrasto.

### 6.13 Statistiche
- Per lingua: parole note/in apprendimento, ritenzione stimata, ore di input, ore di output, livello CEFR stimato, heatmap delle giornate.
- Nessuna gamification invadente: niente mascotte, niente sensi di colpa. Una serie di giorni consecutivi è ammessa, ma con "giorni di riposo" configurabili.

## 7. Contenuti iniziali e pipeline dati

- Cartella `/scripts` con una pipeline riproducibile che: scarica liste di frequenza (es. `hermitdave/FrequencyWords`, verifica licenza), seleziona le prime ~2000 parole per lingua, abbina frasi d'esempio da **Tatoeba** (licenza CC BY, conserva attribuzione e ID), aggiunge traduzioni IT, genere e IPA da Wiktionary dove disponibili, e produce JSON in `/public/data/<lingua>/`.
- Pagina **Crediti e licenze** generata automaticamente dalle fonti usate.
- Se una fonte non è utilizzabile (licenza, dimensioni, formato), dimmelo e proponi un'alternativa.

## 8. Cosa NON fare

- Non ospitare né scaricare film, episodi, canzoni o testi di canzoni protetti da diritto d'autore.
- Non fare scraping di siti che lo vietano.
- Non committare chiavi, token o miei dati personali (aggiungi i controlli necessari al `.gitignore`).
- Non introdurre un backend o servizi a pagamento senza chiedermelo.
- Non generare migliaia di voci di contenuto "a mano" dentro il codice: i contenuti stanno in file dati prodotti dalla pipeline.

## 9. Fasi di sviluppo

- **F0 — Fondamenta**: scaffold, design system con le tre identità di lingua, routing, Dexie, export/import, PWA, deploy su GitHub Pages funzionante.
- **F1 — Nucleo**: pipeline dati, SRS con FSRS, onboarding e test di livello, piano del giorno (anche se con meno blocchi).
- **F2 — Grammatica**: unità A1 delle tre lingue, tabelle comparative, esercizi.
- **F3 — Ascolta & guarda**: player, sottotitoli, mining delle parole, shadowing, catalogo iniziale.
- **F4 — Leggi e Musica**: lettore, percorso filosofico, cloze sulle canzoni.
- **F5 — Pronuncia, ascolto, dettato, confusioni**.
- **F6 — LLM**: diario corretto e tutor di conversazione.
- **F7 — Statistiche, sync via Gist, rifinitura, test end-to-end sui flussi principali**.

## 10. Definition of done (per ogni fase)

- `npm run build` e `npm test` passano; nessun errore TypeScript.
- Il sito pubblicato su GitHub Pages funziona su desktop e su smartphone.
- I dati sopravvivono a ricaricamento, export e import.
- `README.md` aggiornato: come avviarlo in locale, come aggiungere contenuti, come funziona il deploy.
