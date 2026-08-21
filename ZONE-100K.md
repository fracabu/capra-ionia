# Ampliare a Cefalonia, fascia 50–100k

Il sito è già pronto: prezzi, cursore dei filtri, mappa e ricerca si adattano da
soli agli annunci che aggiungiamo. Mancano gli annunci veri.

**Non posso raccoglierli io.** I siti delle agenzie non riesco ad aprirli dal mio
ambiente, e inventare prezzi e metrature su un sito immobiliare significherebbe
far scrivere le persone per terreni che non esistono. Qui c'è dove cercare e
cosa serve per ogni annuncio.

---

## Dove sta la fascia 50–100k

Il listino attuale copre 23.000–45.000 €, con un €/m² fra 9 e 250.
Salendo verso i 100k cambia *cosa* compri, non solo quanto spendi.

| Zona | Cosa aspettarsi in questa fascia |
|---|---|
| **Nord — Fiskardo, Assos** | La parte più cara dell'isola: yacht, case di lusso. A 100k difficilmente trovi vista mare, semmai lotti interni o piccoli. Da verificare, non da escludere |
| **Paliki — Lixouri, Xi, Petani** | Fascia intermedia, spiagge molto note. Qui i 50–100k comprano davvero qualcosa di buono |
| **Sud — Lourdas, Trapezaki, Skala** | Costa turistica, domanda alta d'estate. Buon compromesso vista mare / prezzo |
| **Est — Sami, Karavomylos** | Porto per l'Italia, meno battuta dai compratori stranieri |
| **Interno** | Lotti più grandi a parità di prezzo, vita tutto l'anno, ma meno rivendibile |

> A 50–100k il salto tipico non è "un terreno migliore" ma **vista mare** oppure
> **superficie molto maggiore**. Vale la pena raccontarlo così sul sito: chi
> arriva dai 30k deve capire cosa ottiene in cambio del doppio.

---

## Agenzie da contattare

Oltre a Enos Properties e Premium Kefalonia che già usi:

- **DPS Kefalonia Homes** — dichiara di avere più terreni di quanti ne pubblichi, e invita a scrivere indicando zona, superficie e uso previsto. È quella da cui partire
- **Kefalonia Property (Peterson's)** — specializzata in terreni con vista mare
- **Diamantis Real Estate**, **Delta Properties**, **Mantas**, **Vinieris** — agenzie locali
- **Spitogatos** — il portale greco generalista, buono per capire i prezzi reali
- **Green Acres**, **Savills** — portali internazionali, prezzi tendenzialmente più alti

Nella stessa mail conviene chiedere **le coordinate esatte** dei lotti e **il
permesso di usare le foto** con credito: risolverebbe in un colpo i due problemi
ancora aperti sul sito.

---

## Cosa mi serve per ogni annuncio

Sono i campi che il sito usa davvero. Senza i primi otto non posso pubblicarlo.

```ts
{
  id: 14,                      // progressivo, dopo l'ultimo esistente
  loc: "Assos",                // il paese
  zone: "Nord · penisola di Erisso",   // come descriverlo in una riga
  price: 78000,                // euro, senza punti
  sqm: 1200,                   // metri quadri
  status: "in",                // "in" entro piano · "out" fuori piano · "no" non edificabile
  note: "Entro oikismos, vista mare",  // una riga
  src: "DPS Kefalonia · rif. 1234",    // agenzia e riferimento

  star: true,                  // facoltativo: fra i consigliati
  img: "foto/14.jpg",          // facoltativo
  desc: "...",                 // facoltativo: descrizione estesa, la scrivo io
}
```

Se il paese è nuovo servono anche le sue coordinate, per la mappa. Se hai quelle
del singolo lotto, meglio ancora.

Puoi passarmeli anche in disordine — incolla pure il testo dell'annuncio, li
sistemo io. L'importante è che siano **veri**.

---

## Una scelta da fare

Il sito oggi promette *"terreni edificabili tra 23.000 e 45.000 €"*. È una promessa
precisa, ed è parte del suo valore: chi cerca il terreno economico a Cefalonia
trova esattamente quello. Aggiungendo la fascia alta diventa un portale più
generico.

Due strade:

1. **Un unico elenco**, con il filtro di prezzo che già funziona
2. **Due sezioni distinte** — "sotto i 50k" e "vista mare" — che tengono separate
   due promesse e due pubblici

La seconda costa un po' di lavoro in più ma difende il posizionamento. Dimmi
quale preferisci.
