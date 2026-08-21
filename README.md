# 🐐 CAPRA IONIA — Terreni edificabili a Cefalonia

Landing/portale per la nicchia "terreni edificabili a Cefalonia", con guide e
assistenza in italiano:
portale annunci con filtri, funnel di guide gratuite con raccolta email (lead),
guida AFM interattiva e CTA verso la pagina Facebook.

**Stack**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + React Router (HashRouter).

## Pagine
- `/` Home — hero, terreni consigliati, guide, CTA Facebook
- `/terreni` — portale con filtri (entro/fuori piano, budget, consigliati) e slider prezzo
- `/guide` — indice delle 3 guide gratuite
- `/guide/:id` — dettaglio guida con anteprima e sblocco via email (per `afm` anche checklist interattiva)

## ⚙️ Configurazione (2 minuti)
Apri `src/App.tsx` e in cima trovi:
```ts
const FORM_ENDPOINT = "";   // endpoint Formspree per ricevere le email dei lead
const FACEBOOK_URL  = "https://www.facebook.com/"; // URL della tua pagina FB
```
1. Crea un form gratuito su https://formspree.io e incolla l'endpoint in `FORM_ENDPOINT`.
   Finché è vuoto il form è in modalità demo (mostra successo ma non invia nulla).
2. Metti l'URL della tua pagina in `FACEBOOK_URL`.
Poi ricompila (vedi sotto).

## 🚀 Sviluppo locale
```bash
pnpm install
pnpm vite        # dev server
pnpm vite build  # produce dist/index.html (file unico)
```

## 📄 Le guide in PDF
I testi vivono in `src/data/guides.ts`, che è la sorgente unica: li usa il sito
e li usa lo script che produce i PDF scaricabili in `public/guide/`.

I PDF sono versionati e la build si limita a copiarli, perché le guide cambiano
di rado e generarli a ogni build costerebbe una dipendenza in CI. Dopo aver
modificato `src/data/guides.ts`, rigenerali e committa i file aggiornati:

```bash
node --experimental-strip-types scripts/make-guides-pdf.mjs
```

Serve Chromium: lo script cerca i percorsi più comuni, altrimenti indicalo con
`CHROME_PATH=/percorso/al/binario`.

## 🌍 Pubblicazione su GitHub Pages
Il deploy è automatico. Il workflow `.github/workflows/deploy.yml` compila dai
sorgenti a ogni push su `main` e pubblica il risultato sul branch `gh-pages`,
che GitHub Pages serve direttamente.

Sito online: `https://<tuo-utente>.github.io/<nome-repo>/`

Non serve ricompilare a mano né aggiornare file di build nel repo: basta
commit e push su `main`. Il branch `gh-pages` contiene solo output generato e
viene riscritto a ogni deploy — non modificarlo a mano.
(Il routing usa HashRouter, quindi funziona su GitHub Pages senza configurazioni.)

## 📝 Note
- Prezzi/disponibilità degli annunci vanno riconfermati con le agenzie.
- Contenuti informativi, non consulenza legale.
