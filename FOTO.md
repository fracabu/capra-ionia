# Foto dei terreni — guida allo scatto

Le foto le fate voi. Non esistono immagini libere di questi terreni, e quelle
delle agenzie sono protette da copyright. Le vostre sono anche l'unica cosa che
nessun altro portale avrà.

---

## Prima di partire: accendete il GPS della fotocamera

È la cosa più importante di tutta questa guida.

Ogni foto scattata **stando sul terreno** registra nei suoi dati le coordinate
esatte del punto. Oggi la mappa del sito piazza il segnaposto sul centro del
paese, che per un lotto può voler dire sbagliare di centinaia di metri. Con le
vostre foto il punto diventa quello vero.

- **iPhone**: Impostazioni → Privacy e sicurezza → Localizzazione → Fotocamera → *Mentre usi l app*
- **Android**: apri Fotocamera → Impostazioni → attiva *Tag posizione* (o *Salva posizione*)

Verificate su una foto di prova prima di mettervi in viaggio: apritela nella
galleria e controllate che mostri un luogo.

> Attenzione: se mandate le foto via WhatsApp i dati GPS vengono **cancellati**.
> Usate Google Drive, AirDrop o il cavo.

---

## Cosa fotografare, per ogni terreno

Chi compra un terreno non guarda il panorama: guarda se ci può costruire.
Sei scatti bastano, in questo ordine.

1. **Dal bordo strada** — inquadra insieme il terreno e la strada da cui si
   accede. Fuori piano l'accesso su strada pubblica è requisito di legge.
2. **Il terreno intero** — arretra quanto serve. Se è grande, due scatti dai
   due estremi.
3. **La pendenza** — di profilo, non frontale: un terreno in piano e uno
   scosceso costano molto diverso da costruire.
4. **I confini** — paletti, muretti a secco, filari. Anche approssimativi
   aiutano a capire la forma del lotto.
5. **Il vicinato** — cosa c'è intorno: case abitate, ruderi, campagna vuota.
   Dice se ci si vive tutto l'anno o solo d'estate.
6. **Allacci** — pali della luce, contatori, tubazioni. La distanza dalla rete
   è uno dei costi nascosti più pesanti.

**E la vista, se c'è**, come settimo scatto. Ma dopo gli altri sei, non al
posto loro: una scheda con solo tramonti sembra nascondere qualcosa.

### Regole tecniche

- **Orizzontale**, sempre. Il sito le mostra in orizzontale.
- Mattina presto o tardo pomeriggio: a mezzogiorno il terreno viene piatto.
- Niente filtri, niente ritocchi del cielo. Deve somigliare a ciò che si trova.
- Risoluzione piena. Al ridimensionamento pensiamo dopo.

### Come nominarle

Il numero è l'id dell'annuncio, che trovate qui sotto:

```
3.jpg      foto principale del terreno 3
3-2.jpg    seconda foto dello stesso
3-3.jpg    terza
```

---

## I 13 terreni, raggruppati per giro

### Argostoli e dintorni

| id | Località | Prezzo | Superficie | Note |
|---|---|---|---|---|
| **1** | Faraklata | 23.000 € | 166 m² | Entro oikismos |
| **6** | Prokopata ★ | 35.000 € | 758 m² | Entro piano urbanistico ⚠️ coordinate da confermare |

### Livathos

| id | Località | Prezzo | Superficie | Note |
|---|---|---|---|---|
| **2** | Peratata | 25.000 € | 100 m² | Entro oikismos |
| **4** | Kalligata | 30.000 € | 1500 m² | NON edificabile — da scartare |
| **5** | Dorizata ★ | 33.000 € | 500 m² | Edificabile ⚠️ coordinate da confermare |
| **9** | Livathos | 39.000 € | 442 m² | Entro piano ⚠️ coordinate da confermare |
| **10** | Peratata | 40.000 € | 420 m² | Entro piano · ~240 m² edificabili |
| **11** | Dorizata | 40.000 € | 501 m² | Entro oikismos ⚠️ coordinate da confermare |
| **12** | Vlichata | 40.000 € | 4000 m² | Fuori oikismos · 6 lotti disponibili |
| **13** | Menegata | 45.000 € | 538 m² | Entro piano · ~240 m² edificabili ⚠️ coordinate da confermare |

### Penisola di Paliki

| id | Località | Prezzo | Superficie | Note |
|---|---|---|---|---|
| **3** | Chavriata ★ | 30.000 € | 972 m² | Entro oikismos |

### Valle di Omala

| id | Località | Prezzo | Superficie | Note |
|---|---|---|---|---|
| **8** | Epanoxori ★ | 38.000 € | 4035 m² | Fuori piano · >4.000 m² → ~186 m² costruibili |

### Sud, verso Skala

| id | Località | Prezzo | Superficie | Note |
|---|---|---|---|---|
| **7** | Ratzakli | 35.000 € | 2317 m² | Fuori piano · edificabile |

★ = consigliato. Se il tempo è poco, partite da questi quattro.

Il terreno **4 (Kalligata)** non è edificabile: una foto sola basta, sta in
elenco solo per trasparenza.

---

## Quando tornate

Mettete le foto in una cartella e lanciate:

```bash
node scripts/import-photos.mjs ~/percorso/alla/cartella
```

Lo script le copia in `public/foto/` e stampa le coordinate GPS trovate in
ciascuna. Passatemi quell'elenco: aggiorno la mappa coi punti reali e collego
le foto alle schede.
