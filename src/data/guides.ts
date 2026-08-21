/* Testi delle guide: sorgente unica condivisa fra il sito e lo script
   che genera i PDF in public/guide (vedi scripts/make-guides-pdf.mjs). */
export type Guide = { id: string; icon: string; title: string; sub: string; bullets: string[]; body: string };
export const GUIDES: Guide[] = [
  {
    id: "afm", icon: "🪪",
    title: "Codice fiscale greco (AFM) passo passo",
    sub: "Il primo documento obbligatorio: senza AFM non firmi il rogito.",
    bullets: ["3 modi per ottenerlo (anche da remoto)", "Documenti esatti per cittadini UE", "Modulo M1 e credenziali TAXISnet"],
    body: `GUIDA GRATUITA · CAPRA IONIA
COME OTTENERE IL CODICE FISCALE GRECO (AFM) — PASSO PASSO

L'AFM (ΑΦΜ) è un codice di 9 cifre rilasciato gratuitamente dall'Agenzia delle entrate greca (AADE). È il PRIMO passo obbligatorio per comprare un terreno: senza AFM non puoi firmare il rogito, pagare l'imposta di trasferimento né registrare la proprietà.

PASSO 1 — PREPARA I DOCUMENTI
Cittadini UE: carta d'identità o passaporto in corso di validità. Utile avere anche il codice fiscale italiano. Cittadini non-UE: serve anche un rappresentante fiscale greco.

PASSO 2 — SCEGLI IL CANALE
A) Di persona: presso una DOY (ufficio delle imposte), es. la DOY di Argostoli.
B) Online da remoto: tramite la piattaforma MyAADE, con appuntamento in videochiamata.
C) Tramite avvocato: con procura (PoA) apostillata — tu non ti muovi dall'Italia.

PASSO 3 — COMPILA IL MODULO M1
È il modulo di attribuzione del codice. Se nomini un rappresentante fiscale si aggiunge il modulo M7.

PASSO 4 — APPUNTAMENTO
Presentati alla DOY o collegati in videochiamata con i documenti. La procedura dura pochi minuti.

PASSO 5 — RICEVI L'AFM
Il codice viene rilasciato subito o in pochi giorni. È gratuito.

PASSO 6 — ATTIVA TAXISNET
Richiedi le credenziali TAXISnet: ti serviranno per pagare l'imposta di trasferimento (FMA 3,09%) tramite myPROPERTY prima del rogito.

CHECKLIST FINALE
[ ] Documento d'identità valido
[ ] Modulo M1 (+ M7 se serve)
[ ] AFM ricevuto
[ ] Credenziali TAXISnet attive

Nota: guida informativa, non consulenza legale. Verifica sempre con un avvocato greco.`,
  },
  {
    id: "permesso", icon: "🏠",
    title: "Permesso edilizio per casette prefabbricate",
    sub: "La regola che nessuno ti dice prima di comprare il terreno.",
    bullets: ["Perché il prefabbricato NON è esente da permesso", "Entro piano vs fuori piano (4.000 m²)", "Norme antisismiche di Cefalonia"],
    body: `GUIDA GRATUITA · CAPRA IONIA
PERMESSO EDILIZIO E CASETTE PREFABBRICATE IN GRECIA

LA REGOLA CHIAVE
Il termine "mobile home" non esiste nell'urbanistica greca. Se la casetta è collegata stabilmente al suolo, all'acqua o alla corrente, è una COSTRUZIONE a tutti gli effetti: serve un permesso edilizio come per una casa in muratura. Quindi il terreno DEVE essere edificabile.

ROULOTTE E CARAVAN
Una roulotte targata su ruote può stare temporaneamente su terreno privato (non in zone archeologiche, litorali, spiagge o foreste), ma NON può essere allacciata legalmente a corrente e acqua — nemmeno con fotovoltaico al posto della rete.

DENTRO IL PIANO (entos schediou / oikismou)
Il lotto ha un coefficiente di edificabilità (spesso 0,8, copertura 50% negli oikismoi). Il PD 194/2025 ha introdotto nuovi minimi negli insediamenti sotto i 2.000 abitanti (da 300 a 2.000 m² a seconda della zona).

FUORI DAL PIANO (ektos schediou)
Di norma servono ALMENO 4.000 m² con fronte su strada pubblica: si costruiscono circa 186 m² residenziali, copertura massima 10%. Nuovo Decreto Presidenziale atteso nel 2026: quadro in evoluzione.

CEFALONIA E IL TERREMOTO DEL 1953
L'isola applica tra le norme antisismiche più severe della Grecia. Ogni progetto prefabbricato va adattato da un ingegnere locale (norme NOK + KENAK) e spesso passa dalla commissione architettonica.

I 3 CONTROLLI PRIMA DELL'OFFERTA
1. Il lotto è entos schediou/oikismou? (chiedilo per iscritto)
2. Quanti m² sono realmente costruibili?
3. Il prefabbricato è autorizzabile su QUEL lotto?

Nota: guida informativa, non consulenza legale.`,
  },
  {
    id: "costi", icon: "💶",
    title: "Costi e tasse d'acquisto, senza sorprese",
    sub: "Quanto paghi davvero oltre il prezzo del terreno.",
    bullets: ["FMA 3,09% e come si paga (myPROPERTY)", "Notaio, catasto, avvocato: le percentuali", "Esempio pratico su un terreno da 35.000 €"],
    body: `GUIDA GRATUITA · CAPRA IONIA
COSTI E TASSE PER COMPRARE UN TERRENO IN GRECIA

IMPOSTA DI TRASFERIMENTO (FMA): 3,09%
Si calcola sul prezzo o sul valore fiscale oggettivo (il maggiore) e si paga PRIMA del rogito tramite il sistema online myPROPERTY.

GLI ALTRI COSTI
· Notaio (obbligatorio): ~1–1,5% + diritti
· Registrazione al Catasto (Ktimatologio): ~0,5%
· Avvocato (consigliato): ~0,5–1,5%
· Ingegnere/topografo (consigliato): forfait variabile, ~800 €
· Agente immobiliare: ~2% + IVA 24% (da concordare)

ESEMPIO SU UN TERRENO DA 35.000 €
FMA: ~1.082 € · Notaio: ~350–525 € · Catasto: ~175 € · Avvocato: ~175–525 € + ingegnere e agente.
Budget accessori realistico: 3.000–4.000 € (~8–10% del prezzo).

DOPO L'ACQUISTO
Ogni anno si pagano ENFIA (imposta sulla proprietà) e TAP (tassa comunale).

NOTA IVA
L'IVA 24% riguarda solo gli immobili nuovi (sospesa fino al 31/12/2026), NON i terreni: sui terreni si applica il 3,09%.

Nota: guida informativa, non consulenza legale.`,
  },
  {
    id: "conto", icon: "🏦",
    title: "Aprire un conto in banca in Grecia",
    sub: "Non serve per firmare, diventa indispensabile subito dopo.",
    bullets: ["Quando serve davvero e quando no", "I documenti che chiedono le banche", "Come farlo senza andare in Grecia"],
    body: `GUIDA GRATUITA · CAPRA IONIA
APRIRE UN CONTO IN BANCA IN GRECIA

Per comprare un terreno il conto greco non è sempre obbligatorio: l'imposta di trasferimento si paga online tramite myPROPERTY e il saldo al rogito passa di norma per assegno circolare o bonifico. Diventa però difficile farne a meno dopo: ENFIA e TAP ogni anno, eventuali utenze, i pagamenti a ingegnere e avvocato. Conferma col notaio come vuole ricevere il saldo prima di decidere.

PRIMA DI TUTTO SERVE L'AFM
Il codice fiscale greco viene prima del conto: senza, nessuna banca apre. Se non ce l'hai ancora, parti dalla guida dedicata.

I DOCUMENTI CHE CHIEDONO
· Passaporto o carta d'identità UE in corso di validità
· AFM (il codice fiscale greco)
· Prova di indirizzo di residenza, di solito una bolletta recente
· Dichiarazione della residenza fiscale
· Prova di reddito o di attività: busta paga, dichiarazione dei redditi, visura

LE RICHIESTE CAMBIANO DA BANCA A BANCA
Non esiste una lista unica: ogni istituto applica le proprie regole antiriciclaggio, e alcune filiali chiedono anche permesso di soggiorno o documentazione aggiuntiva ai non residenti. Conviene sentire due o tre banche prima di scegliere, invece di dare per scontato che la prima rifiuti per tutte.

FARLO DA REMOTO
Anche qui vale la procura: puoi incaricare un avvocato o un commercialista greco di aprire il conto per tuo conto, con procura notarile apostillata. È la stessa procedura che serve per l'AFM e per il rogito, quindi conviene farne una sola che copra tutto.

DA CHIARIRE PRIMA
Chiedi in anticipo canone mensile, costo dei bonifici dall'Italia e se il conto viene declassato quando resta inattivo. Su un terreno da 30.000 €, cento euro l'anno di spese fisse non sono un dettaglio.

Nota: guida informativa, non consulenza legale. Le condizioni bancarie cambiano spesso: verifica sempre con la banca.`,
  },
  {
    id: "procura", icon: "✍️",
    title: "Comprare da remoto con la procura",
    sub: "Firmare il rogito senza mai salire su un aereo.",
    bullets: ["Procura speciale, non generale", "Notaio in Italia più apostille", "Cosa deve contenere per essere valida"],
    body: `GUIDA GRATUITA · CAPRA IONIA
COMPRARE DA REMOTO CON LA PROCURA

Non serve essere in Grecia per comprare. Con una procura a un avvocato greco puoi delegare tutto: ottenere l'AFM, aprire il conto, firmare il rogito. È la strada che sceglie chi non può permettersi due o tre viaggi durante la trattativa.

SPECIALE, NON GENERALE
Esistono due tipi di procura. Quella generale copre ogni materia legale; quella speciale è limitata a un'operazione precisa. Per un acquisto è preferibile la speciale: definisce esattamente cosa il tuo incaricato può fare, e nulla di più.

I TRE PASSAGGI
A) Firma davanti a un notaio in Italia, sul testo predisposto dal tuo avvocato greco.
B) Apostille sul documento, secondo la Convenzione dell'Aia del 1961. In Italia la rilascia la Prefettura o la Procura, a seconda dell'atto.
C) Traduzione giurata in greco, da un traduttore riconosciuto dai tribunali greci.

In alternativa ai primi due passaggi puoi firmare direttamente davanti al consolato greco in Italia, che autentica senza bisogno di apostille.

COSA DEVE CONTENERE
La procura deve identificare il terreno in modo inequivocabile: ubicazione esatta, superficie, dati catastali. Deve elencare i poteri concessi e gli eventuali limiti, per esempio un prezzo massimo oltre il quale il tuo incaricato non può firmare. Una procura vaga viene contestata o rifiutata dal notaio greco.

METTICI TUTTO INSIEME
Visto che ogni procura costa notaio, apostille e traduzione, conviene farne una sola che copra AFM, conto corrente e rogito, invece di tre separate a distanza di settimane.

UN LIMITE DA CONOSCERE
Delegare la firma non significa delegare il giudizio. Il controllo dei titoli, dei confini e dei vincoli resta lavoro dell'avvocato e dell'ingegnere che scegli tu: la procura rende possibile non esserci, non ti dispensa dal capire cosa stai comprando.

Nota: guida informativa, non consulenza legale.`,
  },
  {
    id: "allacci", icon: "⚡",
    title: "Luce e acqua sul terreno",
    sub: "La regola che sorprende: senza permesso non c'è allaccio.",
    bullets: ["Perché serve il permesso edilizio prima", "Cosa chiede DEDDIE per la connessione", "Il costo nascosto della distanza"],
    body: `GUIDA GRATUITA · CAPRA IONIA
LUCE E ACQUA SUL TERRENO

È la domanda che arriva sempre dopo il rogito, e la risposta spiazza: in Grecia l'allaccio elettrico non segue il terreno, segue la costruzione. Senza permesso edilizio non c'è fornitura domestica.

COSA CHIEDE DEDDIE
Il gestore della rete di distribuzione chiede, per una nuova connessione, la domanda di allaccio, copia del permesso edilizio, il diagramma topografico approvato e le planimetrie. Serve inoltre la verifica di connessione emessa tramite il sistema e-Licenses del TEE, la Camera tecnica greca, da un ingegnere che devi incaricare tu.

QUINDI SU TERRENO NON EDIFICABILE
Non si allaccia, ed è il motivo per cui un lotto non edificabile a buon prezzo resta comunque un cattivo affare. È anche la ragione per cui una casetta prefabbricata collegata stabilmente a corrente e acqua viene trattata come costruzione a tutti gli effetti.

LA FORNITURA AGRICOLA È UN'ALTRA COSA
Esiste una categoria separata per usi agricoli, che richiede una relazione tecnico-economica del servizio agricolo dell'unità regionale competente. Serve a irrigare o alimentare un'attività agricola, non a vivere sul posto: non è una scorciatoia per abitare un terreno non edificabile.

L'ACQUA DIPENDE DAL COMUNE
Non c'è una regola nazionale unica: la gestione idrica è comunale, e condizioni e tempi cambiano da un comune all'altro. A Cefalonia va verificato caso per caso, soprattutto fuori dagli insediamenti.

IL COSTO CHE NESSUNO TI DICE
Il preventivo di allaccio dipende dalla distanza dalla rete esistente. Un terreno panoramico lontano dai pali della luce può costare in allacci quanto una parte del terreno stesso. Prima di firmare, guarda dove passa la linea più vicina e fatti fare una stima.

Nota: guida informativa, non consulenza legale. Procedure e requisiti vanno confermati con un ingegnere greco.`,
  },
  {
    id: "societa", icon: "🏢",
    title: "Comprare tramite società",
    sub: "Spesso non conviene, e c'è un'imposta del 15% da conoscere.",
    bullets: ["Nessuno sconto ENFIA per le società", "L'imposta speciale del 15% annuo", "Quando ha senso e quando no"],
    body: `GUIDA GRATUITA · CAPRA IONIA
COMPRARE TRAMITE SOCIETÀ

Prima o poi qualcuno te lo suggerisce. Per un terreno da 30.000 o 40.000 € che non produce reddito, quasi mai è una buona idea: i costi di gestione societaria sono certi, i vantaggi no.

NESSUNO SCONTO SULL'ENFIA
Le società pagano l'imposta annuale sulla proprietà con le stesse aliquote delle persone fisiche. Non c'è alcuna esenzione legata alla forma societaria: chi te la presenta come un risparmio fiscale sull'ENFIA sta dicendo una cosa falsa.

L'IMPOSTA SPECIALE DEL 15%
È il punto che va conosciuto prima di ogni altro. La Grecia applica un'imposta annuale del 15% sul valore dell'immobile alle strutture societarie che non rendono trasparente la propria compagine.

Sono esenti le società che dichiarano i soci, a condizione che siano persone fisiche dotate di AFM greco e che l'entità sia registrata in Grecia o in un altro Stato dell'Unione europea. Le società registrate fuori dall'UE possono ottenere l'esenzione solo se la loro giurisdizione non rientra fra quelle considerate non cooperative dalla legge fiscale greca.

La dichiarazione va presentata ogni anno entro il 20 maggio. Non è una formalità: su un immobile da 500.000 € una sola dichiarazione dimenticata vale 75.000 € di imposta.

QUANDO PUÒ AVERE SENSO
Il vantaggio reale riguarda i redditi da locazione: l'aliquota societaria si attesta al 22%, contro un massimo del 45% per le persone fisiche. Ma i dividendi scontano poi una ritenuta all'uscita, quindi il confronto va fatto sul netto finale, non sull'aliquota nominale.

IL CALCOLO ONESTO
Un terreno che non produce reddito non ha niente da tassare al 22%. Restano costi di costituzione, contabilità annuale, dichiarazioni e il rischio dell'imposta speciale se qualcosa nella struttura non è in regola. Prima di intraprendere questa strada, fatti fare due preventivi a confronto da un commercialista greco: acquisto come persona fisica e come società, su dieci anni.

Nota: guida informativa, non consulenza fiscale. La materia è tecnica e cambia: fatti assistere da un professionista greco.`,
  },
];

export const AFM_STEPS: [string, string][] = [
  ["Prepara i documenti", "Carta d'identità o passaporto validi (cittadini UE). Se non-UE, serve anche un rappresentante fiscale greco."],
  ["Scegli il canale", "Di persona alla DOY di Argostoli · online via MyAADE in videochiamata · oppure tramite avvocato con procura apostillata, senza muoverti dall'Italia."],
  ["Compila il modulo M1", "È il modulo di attribuzione dell'AFM. Con rappresentante fiscale si aggiunge il modulo M7."],
  ["Fai l'appuntamento", "Alla DOY o in videochiamata: pochi minuti con i documenti alla mano."],
  ["Ricevi l'AFM", "9 cifre, gratuito, rilasciato subito o in pochi giorni dall'AADE."],
  ["Attiva TAXISnet", "Le credenziali ti servono per pagare l'imposta FMA 3,09% via myPROPERTY prima del rogito."],
];
