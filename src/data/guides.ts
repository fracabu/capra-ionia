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
];

export const AFM_STEPS: [string, string][] = [
  ["Prepara i documenti", "Carta d'identità o passaporto validi (cittadini UE). Se non-UE, serve anche un rappresentante fiscale greco."],
  ["Scegli il canale", "Di persona alla DOY di Argostoli · online via MyAADE in videochiamata · oppure tramite avvocato con procura apostillata, senza muoverti dall'Italia."],
  ["Compila il modulo M1", "È il modulo di attribuzione dell'AFM. Con rappresentante fiscale si aggiunge il modulo M7."],
  ["Fai l'appuntamento", "Alla DOY o in videochiamata: pochi minuti con i documenti alla mano."],
  ["Ricevi l'AFM", "9 cifre, gratuito, rilasciato subito o in pochi giorni dall'AADE."],
  ["Attiva TAXISnet", "Le credenziali ti servono per pagare l'imposta FMA 3,09% via myPROPERTY prima del rogito."],
];
