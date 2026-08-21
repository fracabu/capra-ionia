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
  { id: 1, loc: "Faraklata", zone: "Argostoli · ~7 km", price: 23000, sqm: 166, status: "in", note: "Entro oikismos", src: "Enos Properties · ID 3035",
    desc: `Faraklata guarda il golfo di Argostoli da circa 220 metri di quota, a 4 km dal capoluogo. È la comunità che comprende anche Prokopata, Razata e Drapano: campagna vicina alla città, con l'ospedale e il porto a pochi minuti.

**Attenzione alla superficie.** Il lotto è di 166 m². Il PD 194/2025 ha fissato per gli insediamenti sotto i 2.000 abitanti superfici minime edificabili che partono da 300 m²: questo terreno sta ben al di sotto. Può essere ugualmente edificabile solo se rientra in una deroga per lotti storici, cosa che va accertata prima di qualunque impegno.

È il terreno dal prezzo più basso dell'elenco, 23.000 €, e questo lo rende attraente a colpo d'occhio. Ma a 139 €/m² è **l'undicesimo su dodici** per convenienza: paghi poco perché è piccolo, non perché costi poco al metro.

Da verificare, in quest'ordine: se il lotto è edificabile alla luce delle nuove soglie; e in caso affermativo quanti metri quadri si possono davvero costruire, perché su 166 m² di terreno la risposta potrebbe essere "molto pochi".`,
  },
  { id: 2, loc: "Peratata", zone: "Livathos · ~8 km", price: 25000, sqm: 100, status: "in", note: "Entro oikismos", src: "Enos Properties · ID 2903",
    desc: `Peratata sta ai piedi del castello veneziano di Agios Georgios, nella zona del Livathos, a 8 km da Argostoli. Posizione riconoscibile e comoda, fra le più conosciute dell'isola.

**Cento metri quadri.** È la superficie di questo lotto, ed è il dato da cui partire: le soglie minime introdotte dal PD 194/2025 negli insediamenti minori partono da 300 m². Come per Faraklata, l'edificabilità dipenderebbe da una deroga per lotti preesistenti, da accertare con un ingegnere prima di ogni altra considerazione.

A 250 €/m² è **il terreno meno conveniente dell'intero elenco**, il dodicesimo su dodici. Per dare la misura: con 38.000 € a Epanochori compri 4.035 m², quaranta volte tanto, spendendo solo 13.000 € in più.

Lo teniamo in elenco perché è in vendita e perché il confronto è istruttivo, non perché lo consigliamo.`,
  },
  { id: 3, loc: "Chavriata", zone: "Penisola di Paliki", price: 30000, sqm: 972, status: "in", note: "Entro oikismos", src: "Premium Kefalonia · 10311", star: true,
    desc: `Chavriata sta sulla penisola di Paliki, a 8 km da Lixouri, e la chiamano il «balcone dello Ionio»: dal paese si vedono insieme la piana coltivata e il mare. È un borgo storico — la chiesa di Panagia Chavriata è del Cinquecento — ricostruito dopo il terremoto del 1953 che rase al suolo buona parte dell'isola. Poco distanti ci sono il monastero di Kipoureon e le spiagge di Xi e Megas Lakkos, riconoscibili dalla sabbia rosso-arancio.

Il lotto è di 972 m² dentro l'oikismos, cioè entro il perimetro dell'insediamento. È la condizione più comoda per costruire: non si applicano i 4.000 m² minimi richiesti fuori dal piano, e negli oikismoi la copertura arriva di norma al 50%.

A 30,9 €/m² è il terreno **più conveniente di tutti quelli entro piano** del nostro elenco: gli unici tre che costano meno al metro quadro sono fuori piano, con i vincoli che ne derivano.

Da verificare prima di muoversi: il PD 194/2025 ha introdotto nuove superfici minime negli insediamenti sotto i 2.000 abitanti, da 300 a 2.000 m² secondo la zona. Con 972 m² il lotto rientra nella maggior parte dei casi, ma la soglia esatta dipende dalla zona urbanistica specifica e va confermata da un ingegnere greco sulla planimetria.`,
  },
  { id: 4, loc: "Kalligata", zone: "Livathos", price: 30000, sqm: 1500, status: "no", note: "NON edificabile — da scartare", src: "Enos Properties · ID 2911",
    desc: `Kalligata è un paese del Livathos a circa 96 metri di quota, nella fascia fertile che scende da Argostoli verso le spiagge del sud.

**Su questo terreno non si può costruire.** È la ragione per cui compare in elenco con l'avviso, invece di essere nascosto: 1.500 m² a 30.000 € fanno 20 €/m², che sarebbe il quarto miglior prezzo al metro di tutto il listino. Chi guarda solo quella cifra pensa di aver trovato l'affare.

Non lo è. Senza edificabilità non ottieni il permesso, e senza permesso **non ottieni nemmeno l'allaccio della corrente**: in Grecia la fornitura domestica segue la costruzione, non il terreno. Resta un appezzamento agricolo, con il valore di un appezzamento agricolo.

Lo pubblichiamo perché il €/m² da solo inganna, e questo è il caso che lo dimostra meglio.`,
  },
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
  { id: 7, loc: "Ratzakli", zone: "Sud · verso Skala", price: 35000, sqm: 2317, status: "out", note: "Fuori piano · edificabile", src: "Enos Properties · ID 2965",
    desc: `Ratzakli è un borgo di poco più di cento abitanti a 104 metri di quota, nell'unità di Eleios-Pronnoi, a 2 km da Skala — la località balneare più frequentata del sud dell'isola.

**Un punto tecnico da chiarire con l'agenzia.** Il lotto è di 2.317 m² fuori dal piano urbanistico, ma la regola generale fuori piano chiede almeno 4.000 m² e 25 metri di fronte su strada pubblica. Un terreno di questa dimensione può essere edificabile solo attraverso una deroga per lotti che avevano acquisito il diritto prima di certe date, tipicamente sulla soglia dei 2.000 m².

Quelle deroghe esistono, ma lo Stato greco le sta progressivamente eliminando: comprare contando su una di esse comporta un rischio più alto della norma, e va valutato con un ingegnere che verifichi se il diritto è tuttora valido.

Detto questo, a 15,1 €/m² è il **terzo miglior prezzo al metro** dell'elenco, e la vicinanza a Skala è un fattore reale per chi pensa all'affitto estivo. Vale la verifica.`,
  },
  { id: 8, loc: "Epanoxori", zone: "Valsamata", price: 38000, sqm: 4035, status: "out", note: "Fuori piano · >4.000 m² → ~186 m² costruibili", src: "Enos Properties · ID 3261", star: true,
    desc: `Epanochori è un paese di venticinque abitanti a 480 metri di quota, nell'unità di Omala, 10 km a est di Argostoli lungo la stradina che da Valsamata scende verso Vlachata. Siamo alle pendici del monte Ainos, nella valle di Omala: è la zona della Robola, il vitigno bianco che cresce solo qui, sulle terrazze calcaree del monte. Poco più in basso stanno il monastero di Agios Gerasimos, patrono dell'isola, e la cantina cooperativa a 410 metri.

Il lotto è di 4.035 m² fuori dal piano urbanistico, e quella cifra non è casuale: fuori piano servono almeno 4.000 m² con fronte su strada pubblica per poter costruire. Questo terreno supera il minimo di appena 35 m². La copertura massima è del 10% e l'edificabilità residenziale si aggira sui 186 m².

A 9,4 €/m² è **il terreno più conveniente di tutto l'elenco**, di misura su Vlichata: paghi 38.000 € una superficie quaranta volte più grande del lotto da 100 m² di Peratata, che ne costa 25.000. È il caso che spiega meglio di ogni altro perché il prezzo in vetrina inganna.

Due avvertenze serie. Primo: il margine sui 4.000 m² è sottilissimo, quindi il frazionamento catastale va verificato con un topografo prima di qualunque impegno — se la superficie reale scendesse sotto la soglia, il terreno non sarebbe edificabile. Secondo: è atteso un nuovo Decreto Presidenziale sull'edificabilità fuori piano, che potrebbe cambiare le regole.`,
  },
  { id: 9, loc: "Livathos", zone: "Area Livathos", price: 39000, sqm: 442, status: "in", note: "Entro piano", src: "Premium Kefalonia · 10334",
    desc: `L'annuncio indica genericamente "area Livathos", la fascia a sud di Argostoli che va dall'aeroporto di Minies fino alle spiagge di Ai Helis, Avithos e Trapezaki. È la zona più abitata e servita dell'isola dopo il capoluogo, con paesi molto curati come Kourkoumelata e Svoronata.

**Il paese preciso non è indicato**, ed è la prima cosa da chiedere: dentro il Livathos i prezzi cambiano parecchio fra un borgo interno e uno a due passi dal mare. Sulla mappa il segnaposto è collocato al centro dell'area, non su un punto reale.

Il lotto è di 442 m² entro piano, a 88 €/m²: il nono su dodici per convenienza. Sei in una zona comoda, ma stai pagando quella comodità.

Da verificare: la località esatta, la superficie minima edificabile applicabile a quella zona dopo il PD 194/2025, e quanti metri quadri si possono costruire.`,
  },
  { id: 10, loc: "Peratata", zone: "Livathos", price: 40000, sqm: 420, status: "in", note: "Entro piano · ~240 m² edificabili", src: "Premium Kefalonia · 1075",
    desc: `Il secondo lotto che seguiamo a Peratata, ai piedi del castello di Agios Georgios, nel Livathos. Qui la posizione è fra le più riconoscibili dell'isola e i servizi di Argostoli sono a otto chilometri.

420 m² entro piano, con circa 240 m² edificabili secondo l'agenzia: abbastanza per una casa singola con un po' di respiro attorno, non per un progetto ambizioso.

A 95 €/m² è il decimo su dodici per convenienza. Il confronto interno all'elenco è impietoso: l'altro lotto di Peratata costa 25.000 € per 100 m², questo 40.000 € per 420 m². Il secondo costa di più in assoluto ma **meno della metà al metro quadro**, ed è l'unico dei due che supera senza discussioni le soglie minime di edificabilità.

Da verificare: la conferma scritta dei 240 m² edificabili, e la distanza dalla rete elettrica.`,
  },
  { id: 11, loc: "Dorizata", zone: "Livathos", price: 40000, sqm: 501, status: "in", note: "Entro oikismos", src: "Enos Properties · ID 3214",
    desc: `Dorizata è una frazione di una quarantina di residenti nel Livathos, a 89 metri di quota, nella fascia che scende verso le spiagge del sud.

**Un confronto da fare prima di scrivere all'agenzia.** In elenco ci sono due terreni a Dorizata quasi identici: questo, 501 m² a 40.000 €, e un altro di 500 m² a 33.000 €. Un metro quadro di differenza, **settemila euro di differenza**. A parità di superficie e di paese, la spiegazione può stare nell'esposizione, nella pendenza, nella distanza dalla strada o dagli allacci — oppure semplicemente nel fatto che un venditore ha più fretta dell'altro.

Chiedi entrambi e fatteli spiegare. È il tipo di domanda che fa capire all'agenzia che non stai comprando alla cieca.

A 80 €/m² questo è il settimo su dodici; l'altro, a 66 €/m², è il sesto ed è fra i nostri consigliati.`,
  },
  { id: 12, loc: "Vlichata", zone: "Vista mare · 2,5 km dal mare", price: 40000, sqm: 4000, status: "out", note: "Fuori oikismos · 6 lotti disponibili", src: "Mesitiko Moisis / estateellas",
    desc: `Vlachata Eikosimias sta nel Livathos, a un chilometro da Lourdata e circa 2,5 km dal mare, sul versante sud dell'isola. Da non confondere con l'altra Vlachata dell'isola, che si trova presso Sami: sono due paesi diversi a undici chilometri di distanza, ed è bene accertarsi con l'agenzia di quale si parla.

**Quattromila metri quadri esatti.** Fuori dal piano urbanistico la soglia per costruire è di 4.000 m² con almeno 25 metri di fronte su strada pubblica. Questo lotto è esattamente al limite: **margine zero**. Se il frazionamento catastale reale risultasse anche solo di pochi metri inferiore al dichiarato, il terreno non sarebbe edificabile.

È la verifica da fare per prima, con un topografo, prima di qualunque impegno. Vale anche la conferma del fronte stradale, che è un requisito autonomo e altrettanto vincolante.

Superata quella soglia, i numeri sono buoni: 10 €/m² è il **secondo miglior prezzo al metro** dell'elenco. L'annuncio segnala sei lotti disponibili nella stessa zona, quindi c'è margine per confrontarli fra loro.`,
  },
  { id: 13, loc: "Menegata", zone: "Livathos", price: 45000, sqm: 538, status: "in", note: "Entro piano · ~240 m² edificabili", src: "Premium Kefalonia · 10490",
    desc: `Menegata è una piccola frazione del Livathos, adiacente a Lakithra, nella zona meglio servita dell'isola dopo Argostoli: aeroporto, spiagge sabbiose e paesi curati nel raggio di pochi chilometri.

538 m² entro piano, con circa 240 m² edificabili secondo l'agenzia. È il terreno **più caro dell'elenco in valore assoluto**, 45.000 €, e a 84 €/m² sta all'ottavo posto su dodici per convenienza: paghi la zona, non la superficie.

Ha senso per chi vuole vivere a Cefalonia tutto l'anno e non solo passarci l'estate — servizi aperti d'inverno, aeroporto vicino, strade buone. Ha meno senso per chi cerca il massimo dei metri quadri per euro speso.

Da verificare: la conferma scritta dei 240 m² edificabili e la superficie minima applicabile alla zona dopo il PD 194/2025. La posizione del segnaposto sulla mappa è al momento una stima ancorata a Lakithra.`,
  },
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
