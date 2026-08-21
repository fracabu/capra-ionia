# Verifica coordinate — Capra Ionia

Aggiornato dopo la ricerca sulle fonti geografiche.
**7 località su 11** hanno coordinate da fonte consultata.
Le restanti 4 sono stime ancorate a un paese vicino verificato.

Per controllarne una, apri i due link: **A** è il punto usato dalla mappa del sito,
**B** cerca il posto per nome. Se coincidono è giusto. Poi in `src/data/localities.ts`
correggi i numeri e porta `verified` a `true`.

## Da verificare

| Località | Annunci | Coordinata | Link | Da dove viene |
|---|---|---|---|---|
| **Prokopata** | 1 | `38.1975, 20.515` | [A](https://www.google.com/maps?q=38.1975,20.515) · [B](https://www.google.com/maps/search/Prokopata%2C%20Kefalonia%2C%20Greece) | stima: frazione della comunità di Faraklata, a ovest di Razata |
| **Menegata** | 1 | `38.1265, 20.5215` | [A](https://www.google.com/maps?q=38.1265,20.5215) · [B](https://www.google.com/maps/search/Menegata%2C%20Kefalonia%2C%20Greece) | stima: adiacente a Lakithra (38.12533, 20.51873) |
| **Dorizata** | 2 | `38.125, 20.545` | [A](https://www.google.com/maps?q=38.125,20.545) · [B](https://www.google.com/maps/search/Dorizata%2C%20Kefalonia%2C%20Greece) | stima: nel Leivatho, fra Kaligata e Peratata |
| **Livathos** | 1 | `38.125, 20.56` | [A](https://www.google.com/maps?q=38.125,20.56) · [B](https://www.google.com/maps/search/Livathos%2C%20Kefalonia%2C%20Greece) | area, non un borgo: baricentro dei paesi del Leivatho |

## Già verificate

Controllale solo se un segnaposto ti sembra fuori posto.

| Località | Annunci | Coordinata | Link | Fonte |
|---|---|---|---|---|
| **Faraklata** | 1 | `38.2, 20.517` | [A](https://www.google.com/maps?q=38.2,20.517) · [B](https://www.google.com/maps/search/Faraklata%2C%20Kefalonia%2C%20Greece) | Wikipedia — comunità di Faraklata, 4 km a NE di Argostoli |
| **Peratata** | 2 | `38.13528, 20.5575` | [A](https://www.google.com/maps?q=38.13528,20.5575) · [B](https://www.google.com/maps/search/Peratata%2C%20Kefalonia%2C%20Greece) | Wikipedia — Leivatho, ai piedi del castello di Agios Georgios |
| **Kalligata** | 1 | `38.11573, 20.53585` | [A](https://www.google.com/maps?q=38.11573,20.53585) · [B](https://www.google.com/maps/search/Kalligata%2C%20Kefalonia%2C%20Greece) | Mapcarta — Kaligata, quota 96 m |
| **Chavriata** | 1 | `38.1833, 20.384` | [A](https://www.google.com/maps?q=38.1833,20.384) · [B](https://www.google.com/maps/search/Chavriata%2C%20Kefalonia%2C%20Greece) | Wikipedia e Wikidata — Paliki, 8 km da Lixouri |
| **Ratzakli** | 1 | `38.075909, 20.771848` | [A](https://www.google.com/maps?q=38.075909,20.771848) · [B](https://www.google.com/maps/search/Ratzakli%2C%20Kefalonia%2C%20Greece) | elevationmap.net — Eleios-Pronnoi, 2 km da Skala |
| **Epanoxori** | 1 | `38.1575, 20.5982` | [A](https://www.google.com/maps?q=38.1575,20.5982) · [B](https://www.google.com/maps/search/Epanoxori%2C%20Kefalonia%2C%20Greece) | Wikipedia — Epanochori, unità di Omala, quota 480 m |
| **Vlichata** | 1 | `38.1233, 20.625` | [A](https://www.google.com/maps?q=38.1233,20.625) · [B](https://www.google.com/maps/search/Vlichata%2C%20Kefalonia%2C%20Greece) | Wikipedia — Vlachata Eikosimias, Leivatho, 1 km da Lourdata |

## Nota su Vlachata

A Cefalonia esistono **due** Vlachata. La mappa usa quella di Livathos
(Vlachata Eikosimias), a 1 km da Lourdata, perché l annuncio parla di 2,5 km
dal mare. Se il terreno fosse invece presso l altra Vlachata, vicino a Sami,
il segnaposto sarebbe sbagliato di circa 11 km: vale la pena confermarlo
con l agenzia.

## Se ottieni le coordinate del singolo lotto

Sono meglio di quelle del paese. In quel caso conviene spostarle
sull annuncio in `src/data/plots.ts` invece che sulla località: la mappa
potrà mostrare il punto reale del terreno.
