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
  { id: 3, loc: "Chavriata", zone: "Penisola di Paliki", price: 30000, sqm: 972, status: "in", note: "Entro oikismos", src: "Premium Kefalonia · 10311", star: true },
  { id: 4, loc: "Kalligata", zone: "Livathos", price: 30000, sqm: 1500, status: "no", note: "NON edificabile — da scartare", src: "Enos Properties · ID 2911" },
  { id: 5, loc: "Dorizata", zone: "Livathos", price: 33000, sqm: 500, status: "in", note: "Edificabile", src: "Premium Kefalonia · 10150", star: true },
  { id: 6, loc: "Prokopata", zone: "Argostoli · Razata", price: 35000, sqm: 758, status: "in", note: "Entro piano urbanistico", src: "Premium Kefalonia · 10348", star: true },
  { id: 7, loc: "Ratzakli", zone: "Sud · verso Skala", price: 35000, sqm: 2317, status: "out", note: "Fuori piano · edificabile", src: "Enos Properties · ID 2965" },
  { id: 8, loc: "Epanoxori", zone: "Valsamata", price: 38000, sqm: 4035, status: "out", note: "Fuori piano · >4.000 m² → ~186 m² costruibili", src: "Enos Properties · ID 3261", star: true },
  { id: 9, loc: "Livathos", zone: "Area Livathos", price: 39000, sqm: 442, status: "in", note: "Entro piano", src: "Premium Kefalonia · 10334" },
  { id: 10, loc: "Peratata", zone: "Livathos", price: 40000, sqm: 420, status: "in", note: "Entro piano · ~240 m² edificabili", src: "Premium Kefalonia · 1075" },
  { id: 11, loc: "Dorizata", zone: "Livathos", price: 40000, sqm: 501, status: "in", note: "Entro oikismos", src: "Enos Properties · ID 3214" },
  { id: 12, loc: "Vlichata", zone: "Vista mare · 2,5 km dal mare", price: 40000, sqm: 4000, status: "out", note: "Fuori oikismos · 6 lotti disponibili", src: "Mesitiko Moisis / estateellas" },
  { id: 13, loc: "Menegata", zone: "Livathos", price: 45000, sqm: 538, status: "in", note: "Entro piano · ~240 m² edificabili", src: "Premium Kefalonia · 10490" },
];
