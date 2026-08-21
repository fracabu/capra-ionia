/**
 * Posizione delle località in cui si trovano i terreni.
 *
 * `verified: true` significa che la coordinata viene da una fonte
 * geografica consultata, indicata in `source`. `verified: false` è una
 * stima ancorata a un paese vicino verificato: il segnaposto cade nella
 * zona giusta ma non sul borgo esatto, e va corretto (vedi
 * VERIFICA-COORDINATE.md).
 *
 * In ogni caso il segnaposto indica il PAESE, non il confine del lotto:
 * se le agenzie forniscono la posizione del singolo terreno conviene
 * spostare le coordinate sull'annuncio, in src/data/plots.ts.
 */
export type Locality = {
  lat: number;
  lng: number;
  verified: boolean;
  source: string;
};

/** Centro dell'isola, usato prima che la mappa si adatti ai segnaposto. */
export const KEFALONIA_CENTER: [number, number] = [38.15, 20.55];

export const LOCALITIES: Record<string, Locality> = {
  Faraklata:  { lat: 38.2000,   lng: 20.5170,   verified: true,  source: "Wikipedia — comunità di Faraklata, 4 km a NE di Argostoli" },
  Peratata:   { lat: 38.13528,  lng: 20.55750,  verified: true,  source: "Wikipedia — Leivatho, ai piedi del castello di Agios Georgios" },
  Kalligata:  { lat: 38.11573,  lng: 20.53585,  verified: true,  source: "Mapcarta — Kaligata, quota 96 m" },
  Chavriata:  { lat: 38.1833,   lng: 20.3840,   verified: true,  source: "Wikipedia e Wikidata — Paliki, 8 km da Lixouri" },
  Ratzakli:   { lat: 38.075909, lng: 20.771848, verified: true,  source: "elevationmap.net — Eleios-Pronnoi, 2 km da Skala" },
  Epanoxori:  { lat: 38.1575,   lng: 20.5982,   verified: true,  source: "Wikipedia — Epanochori, unità di Omala, quota 480 m" },
  // Attenzione: a Cefalonia ci sono due Vlachata. Questa è quella di
  // Livathos (Vlachata Eikosimias), 1 km da Lourdata — coerente con
  // l'annuncio, che parla di 2,5 km dal mare. L'altra è presso Sami.
  Vlichata:   { lat: 38.1233,   lng: 20.6250,   verified: true,  source: "Wikipedia — Vlachata Eikosimias, Leivatho, 1 km da Lourdata" },

  // Borghi troppo piccoli per avere una scheda geografica propria.
  Prokopata:  { lat: 38.1975,   lng: 20.5150,   verified: false, source: "stima: frazione della comunità di Faraklata, a ovest di Razata" },
  Menegata:   { lat: 38.1265,   lng: 20.5215,   verified: false, source: "stima: adiacente a Lakithra (38.12533, 20.51873)" },
  Dorizata:   { lat: 38.1250,   lng: 20.5450,   verified: false, source: "stima: nel Leivatho, fra Kaligata e Peratata" },

  // Non è un paese ma l'area: l'annuncio indica solo «Area Livathos».
  Livathos:   { lat: 38.1250,   lng: 20.5600,   verified: false, source: "area, non un borgo: baricentro dei paesi del Leivatho" },
};
