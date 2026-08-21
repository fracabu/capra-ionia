/**
 * Posizione delle località in cui si trovano i terreni.
 *
 * ⚠️  COORDINATE PROVVISORIE — DA VERIFICARE PRIMA DEL LANCIO
 *
 * Sono state inserite a stima e collocano il paese, non il singolo lotto:
 * un terreno può trovarsi a centinaia di metri dal segnaposto. La mappa lo
 * dichiara esplicitamente, ma vanno comunque controllate una per una.
 *
 * Per correggerne una: apri Google Maps, cerca il paese, clic destro sul
 * punto → le coordinate compaiono in cima al menu, nell'ordine lat, lng.
 * Sostituisci i due numeri qui sotto e porta `verified` a true.
 *
 * Le coordinate esatte dei lotti, se le agenzie te le forniscono, sono
 * sempre preferibili: in quel caso conviene spostarle sul singolo annuncio.
 */
export type Locality = { lat: number; lng: number; verified: boolean };

/** Centro dell'isola, usato per l'inquadratura iniziale. */
export const KEFALONIA_CENTER: [number, number] = [38.175, 20.545];

export const LOCALITIES: Record<string, Locality> = {
  Faraklata: { lat: 38.2131, lng: 20.5286, verified: false },
  Peratata: { lat: 38.1478, lng: 20.5364, verified: false },
  Chavriata: { lat: 38.1519, lng: 20.4092, verified: false },
  Kalligata: { lat: 38.1594, lng: 20.5117, verified: false },
  Dorizata: { lat: 38.1483, lng: 20.5164, verified: false },
  Prokopata: { lat: 38.1953, lng: 20.5253, verified: false },
  Ratzakli: { lat: 38.0819, lng: 20.7539, verified: false },
  Epanoxori: { lat: 38.1758, lng: 20.6033, verified: false },
  Livathos: { lat: 38.1520, lng: 20.5230, verified: false },
  Vlichata: { lat: 38.2258, lng: 20.6300, verified: false },
  Menegata: { lat: 38.1502, lng: 20.5202, verified: false },
};
