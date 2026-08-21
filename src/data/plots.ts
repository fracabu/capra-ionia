/* Annunci dei terreni: sorgente unica, usata dalle pagine e dalla mappa. */
export type Plot = {
  id: number; loc: string; zone: string; price: number; sqm: number;
  status: "in" | "out" | "no"; note: string; src: string; star?: boolean;
  /** Percorso della foto in public/, es. "foto/faraklata-1.jpg". Senza
   *  questo campo la scheda mostra un segnaposto grafico al suo posto. */
  img?: string;
  /** Descrizione estesa per la scheda del terreno. In sua assenza la
   *  scheda usa `note`, che però è una riga sola. */
  desc?: string;
};
export const PLOTS: Plot[] = [
  { id: 1, loc: "Faraklata", zone: "Argostoli · ~7 km", price: 23000, sqm: 166, status: "in", note: "Entro oikismos", src: "Enos Properties · ID 3035" },
  { id: 2, loc: "Peratata", zone: "Livathos · ~8 km", price: 25000, sqm: 100, status: "in", note: "Entro oikismos", src: "Enos Properties · ID 2903" },
  { id: 3, loc: "Chavriata", zone: "Penisola di Paliki", price: 30000, sqm: 972, status: "in", note: "Entro oikismos", src: "Premium Kefalonia · 10311", star: true,
    desc: `Chavriata sta sulla penisola di Paliki, a 8 km da Lixouri, e la chiamano il «balcone dello Ionio»: dal paese si vedono insieme la piana coltivata e il mare. È un borgo storico — la chiesa di Panagia Chavriata è del Cinquecento — ricostruito dopo il terremoto del 1953 che rase al suolo buona parte dell'isola. Poco distanti ci sono il monastero di Kipoureon e le spiagge di Xi e Megas Lakkos, riconoscibili dalla sabbia rosso-arancio.

Il lotto è di 972 m² dentro l'oikismos, cioè entro il perimetro dell'insediamento. È la condizione più comoda per costruire: non si applicano i 4.000 m² minimi richiesti fuori dal piano, e negli oikismoi la copertura arriva di norma al 50%.

A 30,9 €/m² è il terreno **più conveniente di tutti quelli entro piano** del nostro elenco: gli unici tre che costano meno al metro quadro sono fuori piano, con i vincoli che ne derivano.

Da verificare prima di muoversi: il PD 194/2025 ha introdotto nuove superfici minime negli insediamenti sotto i 2.000 abitanti, da 300 a 2.000 m² secondo la zona. Con 972 m² il lotto rientra nella maggior parte dei casi, ma la soglia esatta dipende dalla zona urbanistica specifica e va confermata da un ingegnere greco sulla planimetria.`,
  },
  { id: 4, loc: "Kalligata", zone: "Livathos", price: 30000, sqm: 1500, status: "no", note: "NON edificabile — da scartare", src: "Enos Properties · ID 2911" },
  { id: 5, loc: "Dorizata", zone: "Livathos", price: 33000, sqm: 500, status: "in", note: "Edificabile", src: "Premium Kefalonia · 10150", star: true,
    desc: `Dorizata è una frazione minuscola del Livathos — una quarantina di residenti, 89 metri di quota — nella fascia che scende da Argostoli verso la costa sud. È la zona più abitata e servita dell'isola dopo il capoluogo: ci stanno l'aeroporto, all'altezza di Minies, e le spiagge di Ai Helis, Ammes, Avithos, Trapezaki e Lourdas, quasi tutte sabbiose e digradanti. Nel raggio di pochi chilometri ci sono paesi molto curati come Kourkoumelata, Metaxata e Svoronata.

Il lotto è di 500 m² ed è dichiarato edificabile. È il più piccolo dei tre terreni entro piano che consigliamo: adatto a una casa singola, non a un progetto con dépendance o piscina generosa.

A 66 €/m² è il terzo miglior prezzo al metro fra i terreni entro piano. Costa più di Chavriata e Prokopata, ma è anche l'unico dei tre in una zona con servizi, aeroporto e mare a portata di macchina tutto l'anno — se il terreno serve per starci e non solo per costruirci, quella differenza ha un senso.

Da verificare con attenzione: 500 m² sono vicini alla soglia bassa introdotta dal PD 194/2025 per gli insediamenti minori. Prima di firmare qualsiasi cosa, fatti confermare da un ingegnere che il lotto superi il minimo previsto per la sua zona specifica.`,
  },
  { id: 6, loc: "Prokopata", zone: "Argostoli · Razata", price: 35000, sqm: 758, status: "in", note: "Entro piano urbanistico", src: "Premium Kefalonia · 10348", star: true,
    desc: `Prokopata è un pugno di case appena fuori Argostoli, a un centinaio di metri di quota, con meno di trenta residenti. È fra le aree abitate più antiche di Cefalonia: gli scavi nella zona hanno restituito reperti che risalgono al 4000 a.C. Fa comunità con Faraklata, Razata e Drapano; a Razata si trovano le mura ciclopiche di un'acropoli micenea, a 5 km dal capoluogo.

Il lotto è di 758 m² entro piano urbanistico. La posizione è la sua caratteristica forte: sei a pochi minuti da Argostoli — ospedale, porto, negozi, scuole aperti tutto l'anno — restando in campagna. Per chi pensa a una casa da abitare davvero, e non solo da usare tre settimane d'estate, conta più di una vista.

A 46,2 €/m² è il secondo miglior prezzo al metro fra i terreni entro piano, dietro solo a Chavriata, che però sta dall'altra parte del golfo.

Da verificare: la superficie minima edificabile applicabile alla zona dopo il PD 194/2025, e l'esatto tracciato del confine del piano urbanistico, che in queste frazioni passa a volte in mezzo ai lotti.`,
  },
  { id: 7, loc: "Ratzakli", zone: "Sud · verso Skala", price: 35000, sqm: 2317, status: "out", note: "Fuori piano · edificabile", src: "Enos Properties · ID 2965" },
  { id: 8, loc: "Epanoxori", zone: "Valsamata", price: 38000, sqm: 4035, status: "out", note: "Fuori piano · >4.000 m² → ~186 m² costruibili", src: "Enos Properties · ID 3261", star: true,
    desc: `Epanochori è un paese di venticinque abitanti a 480 metri di quota, nell'unità di Omala, 10 km a est di Argostoli lungo la stradina che da Valsamata scende verso Vlachata. Siamo alle pendici del monte Ainos, nella valle di Omala: è la zona della Robola, il vitigno bianco che cresce solo qui, sulle terrazze calcaree del monte. Poco più in basso stanno il monastero di Agios Gerasimos, patrono dell'isola, e la cantina cooperativa a 410 metri.

Il lotto è di 4.035 m² fuori dal piano urbanistico, e quella cifra non è casuale: fuori piano servono almeno 4.000 m² con fronte su strada pubblica per poter costruire. Questo terreno supera il minimo di appena 35 m². La copertura massima è del 10% e l'edificabilità residenziale si aggira sui 186 m².

A 9,4 €/m² è **il terreno più conveniente di tutto l'elenco**, di misura su Vlichata: paghi 38.000 € una superficie quaranta volte più grande del lotto da 100 m² di Peratata, che ne costa 25.000. È il caso che spiega meglio di ogni altro perché il prezzo in vetrina inganna.

Due avvertenze serie. Primo: il margine sui 4.000 m² è sottilissimo, quindi il frazionamento catastale va verificato con un topografo prima di qualunque impegno — se la superficie reale scendesse sotto la soglia, il terreno non sarebbe edificabile. Secondo: è atteso un nuovo Decreto Presidenziale sull'edificabilità fuori piano, che potrebbe cambiare le regole.`,
  },
  { id: 9, loc: "Livathos", zone: "Area Livathos", price: 39000, sqm: 442, status: "in", note: "Entro piano", src: "Premium Kefalonia · 10334" },
  { id: 10, loc: "Peratata", zone: "Livathos", price: 40000, sqm: 420, status: "in", note: "Entro piano · ~240 m² edificabili", src: "Premium Kefalonia · 1075" },
  { id: 11, loc: "Dorizata", zone: "Livathos", price: 40000, sqm: 501, status: "in", note: "Entro oikismos", src: "Enos Properties · ID 3214" },
  { id: 12, loc: "Vlichata", zone: "Vista mare · 2,5 km dal mare", price: 40000, sqm: 4000, status: "out", note: "Fuori oikismos · 6 lotti disponibili", src: "Mesitiko Moisis / estateellas" },
  { id: 13, loc: "Menegata", zone: "Livathos", price: 45000, sqm: 538, status: "in", note: "Entro piano · ~240 m² edificabili", src: "Premium Kefalonia · 10490" },
];

/* Estremi calcolati sugli annunci: aggiungendone uno da 80.000 € il cursore
   dei filtri e i testi si allargano da soli, senza ritoccare l'interfaccia. */
const prices = PLOTS.map((p) => p.price);
export const PRICE_MIN = Math.min(...prices);
export const PRICE_MAX = Math.max(...prices);

/** Soglia della fascia "economici": la mediana, arrotondata a 5.000 €. */
export const PRICE_CHEAP = (() => {
  const sorted = [...prices].sort((a, b) => a - b);
  const mid = sorted[Math.floor(sorted.length / 2)];
  return Math.round(mid / 5000) * 5000;
})();

/** Fascia di prezzo dei soli terreni entro piano, per la riga dei numeri. */
export const IN_PLAN_RANGE = (() => {
  const inPlan = PLOTS.filter((p) => p.status === "in").map((p) => p.price);
  return { min: Math.min(...inPlan), max: Math.max(...inPlan) };
})();
