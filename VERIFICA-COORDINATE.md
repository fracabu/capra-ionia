# Verifica coordinate — Capra Ionia

Le coordinate in `src/data/localities.ts` sono stime, non verificate.
Per ogni località apri i due link: **A** mostra il punto che usa la mappa del sito,
**B** cerca il paese per nome. Se coincidono, la coordinata è giusta.

Quando ne correggi una, aggiorna i due numeri nel file e porta `verified` a `true`.

| Località | Annunci | Coordinata usata | A · punto sul sito | B · cerca il paese |
|---|---|---|---|---|
| **Faraklata** | 1 | `38.2131, 20.5286` | [apri](https://www.google.com/maps?q=38.2131,20.5286) | [cerca](https://www.google.com/maps/search/Faraklata%2C%20Kefalonia%2C%20Greece) |
| **Peratata** | 2 | `38.1478, 20.5364` | [apri](https://www.google.com/maps?q=38.1478,20.5364) | [cerca](https://www.google.com/maps/search/Peratata%2C%20Kefalonia%2C%20Greece) |
| **Chavriata** | 1 | `38.1519, 20.4092` | [apri](https://www.google.com/maps?q=38.1519,20.4092) | [cerca](https://www.google.com/maps/search/Chavriata%2C%20Kefalonia%2C%20Greece) |
| **Kalligata** | 1 | `38.1594, 20.5117` | [apri](https://www.google.com/maps?q=38.1594,20.5117) | [cerca](https://www.google.com/maps/search/Kalligata%2C%20Kefalonia%2C%20Greece) |
| **Dorizata** | 2 | `38.1483, 20.5164` | [apri](https://www.google.com/maps?q=38.1483,20.5164) | [cerca](https://www.google.com/maps/search/Dorizata%2C%20Kefalonia%2C%20Greece) |
| **Prokopata** | 1 | `38.1953, 20.5253` | [apri](https://www.google.com/maps?q=38.1953,20.5253) | [cerca](https://www.google.com/maps/search/Prokopata%2C%20Kefalonia%2C%20Greece) |
| **Ratzakli** | 1 | `38.0819, 20.7539` | [apri](https://www.google.com/maps?q=38.0819,20.7539) | [cerca](https://www.google.com/maps/search/Ratzakli%2C%20Kefalonia%2C%20Greece) |
| **Epanoxori** | 1 | `38.1758, 20.6033` | [apri](https://www.google.com/maps?q=38.1758,20.6033) | [cerca](https://www.google.com/maps/search/Epanoxori%2C%20Kefalonia%2C%20Greece) |
| **Livathos** | 1 | `38.152, 20.523` | [apri](https://www.google.com/maps?q=38.152,20.523) | [cerca](https://www.google.com/maps/search/Livathos%2C%20Kefalonia%2C%20Greece) |
| **Vlichata** | 1 | `38.2258, 20.63` | [apri](https://www.google.com/maps?q=38.2258,20.63) | [cerca](https://www.google.com/maps/search/Vlichata%2C%20Kefalonia%2C%20Greece) |
| **Menegata** | 1 | `38.1502, 20.5202` | [apri](https://www.google.com/maps?q=38.1502,20.5202) | [cerca](https://www.google.com/maps/search/Menegata%2C%20Kefalonia%2C%20Greece) |

## Come correggere

Su Google Maps, clic destro (o tocco prolungato) sul punto giusto: le coordinate
compaiono in cima al menu, nell ordine latitudine, longitudine. Copiale in
`src/data/localities.ts`:

```ts
  Faraklata: { lat: 38.2131, lng: 20.5286, verified: true },
```

> Se le agenzie ti danno la posizione del **singolo lotto**, è meglio: in quel caso
> conviene spostare le coordinate sull annuncio invece che sulla località, e la
> mappa può mostrare il punto reale anziché il centro del paese.
