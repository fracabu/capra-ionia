import { useEffect, useMemo, useRef, useState, createContext, useContext } from "react";
import { HashRouter, Routes, Route, Link, NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

/* ================= CONFIG =================
   Per raccogliere DAVVERO le email: crea un form gratuito su https://formspree.io,
   copia l'endpoint (es. https://formspree.io/f/abcdwxyz) e incollalo qui sotto.
   Finché è vuoto, il form funziona in modalità demo (successo senza invio). */
const FORM_ENDPOINT = "";
const FACEBOOK_URL = "https://www.facebook.com/"; // <-- URL del gruppo Facebook

/* ================= DATA ================= */
type Plot = {
  id: number; loc: string; zone: string; price: number; sqm: number;
  status: "in" | "out" | "no"; note: string; src: string; star?: boolean;
};
const PLOTS: Plot[] = [
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

type Guide = { id: string; icon: string; title: string; sub: string; bullets: string[]; body: string };
const GUIDES: Guide[] = [
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

const AFM_STEPS: [string, string][] = [
  ["Prepara i documenti", "Carta d'identità o passaporto validi (cittadini UE). Se non-UE, serve anche un rappresentante fiscale greco."],
  ["Scegli il canale", "Di persona alla DOY di Argostoli · online via MyAADE in videochiamata · oppure tramite avvocato con procura apostillata, senza muoverti dall'Italia."],
  ["Compila il modulo M1", "È il modulo di attribuzione dell'AFM. Con rappresentante fiscale si aggiunge il modulo M7."],
  ["Fai l'appuntamento", "Alla DOY o in videochiamata: pochi minuti con i documenti alla mano."],
  ["Ricevi l'AFM", "9 cifre, gratuito, rilasciato subito o in pochi giorni dall'AADE."],
  ["Attiva TAXISnet", "Le credenziali ti servono per pagare l'imposta FMA 3,09% via myPROPERTY prima del rogito."],
];

/* ================= HELPERS ================= */
const fmt = (n: number) => n.toLocaleString("it-IT");

function downloadGuide(g: Guide) {
  const blob = new Blob([g.body], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `guida-${g.id}-capra-ionia.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

/* Scroll reveal hook */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);
  return null;
}

/* Minimal goat logo (line art) */
function Goat({ size = 40, stroke = "#0F3440", bob = false }: { size?: number; stroke?: string; bob?: boolean }) {
  return (
    <svg className={bob ? "goat-bob" : ""} width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M22 18 C18 10, 22 4, 28 6 M30 16 C28 10, 31 5, 36 6" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 20 C20 22, 18 27, 20 31 L14 36 C11 38, 12 42, 16 42 L20 40 C22 46, 28 50, 35 49 L48 47 C54 46, 56 40, 53 35 C57 33, 57 27, 52 26 L36 24 C33 20, 28 18, 24 20 Z" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M28 49 L28 58 M40 48 L40 58 M46 47 L48 57" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M17 42 L15 47" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="22" cy="27" r="1.6" fill={stroke} />
      <path d="M24 58 L52 58" stroke="#D9A441" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/* ================= GATES CONTEXT ================= */
const GateCtx = createContext<{ openGuide: (g: Guide) => void; openLead: (p: Plot) => void }>({ openGuide: () => {}, openLead: () => {} });

/* ================= LEAD FORM ================= */
function LeadForm({ context, onDone }: { context: string; onDone?: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email) && privacy;

  async function submit() {
    if (!valid) { setOk(true); return; }
    setSending(true);
    setFailed(false);
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, context }),
        });
        // Senza questo controllo un 4xx passerebbe per invio riuscito e il
        // contatto andrebbe perso senza che nessuno se ne accorga.
        if (!res.ok) throw new Error(`Invio fallito con stato ${res.status}`);
      }
      setSent(true);
      onDone?.();
    } catch {
      setFailed(true);
    } finally { setSending(false); }
  }

  if (sent)
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-3">🐐</div>
        <p className="display text-xl">Fatto, {name.split(" ")[0]}!</p>
        <p className="text-sm text-[#4A6B75] mt-2">La guida è in download. Per non perderti i nuovi terreni sotto i 50k, entra nel gruppo Facebook:</p>
        <Button asChild className="mt-4 bg-[#1877F2] hover:bg-[#1668d6] text-white rounded-full px-6">
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Entra nel gruppo Facebook →</a>
        </Button>
      </div>
    );

  return (
    <div className="space-y-3">
      <Input placeholder="Il tuo nome" value={name} onChange={(e) => setName(e.target.value)} className="h-11" />
      <Input placeholder="La tua email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" />
      <label className="flex items-start gap-2 text-xs text-[#4A6B75] cursor-pointer">
        <Checkbox checked={privacy} onCheckedChange={(v) => setPrivacy(v === true)} className="mt-0.5" />
        <span>Acconsento a ricevere la guida e aggiornamenti sui terreni a Cefalonia. Niente spam, promesso.</span>
      </label>
      {ok && !valid && <p className="text-xs text-[#C0492F]">Compila nome, email valida e consenso.</p>}
      {failed && <p className="text-xs text-[#C0492F]">Invio non riuscito, riprova tra un momento.</p>}
      <Button onClick={submit} disabled={sending} className="w-full h-11 bg-[#0F3440] hover:bg-[#14495a] text-white rounded-full mono tracking-wide">
        {sending ? "Invio…" : "Scarica la guida gratuita ↓"}
      </Button>
      <p className="text-[10px] text-[#93A9B0] mono">Gratis · niente carta di credito · disiscrizione quando vuoi</p>
    </div>
  );
}

/* ================= SHARED UI ================= */
function PlotCard({ p, delay = 0 }: { p: Plot; delay?: number }) {
  const { openLead } = useContext(GateCtx);
  return (
    <Reveal delay={delay}>
      <Card className={`card-lift border-[#E4EDEC] rounded-2xl overflow-hidden h-full ${p.status === "no" ? "opacity-60" : ""}`}>
        <div className="h-1.5" style={{ background: p.status === "in" ? "#2E93A6" : p.status === "out" ? "#D9A441" : "#C0492F" }} />
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="display text-xl">{p.loc}</h3>
              <p className="text-xs text-[#93A9B0]">{p.zone}</p>
            </div>
            <div className="text-right mono text-[11px] text-[#93A9B0]">€/m²<div className="text-[15px] font-semibold text-[#6E7F5A]">{(p.price / p.sqm).toFixed(0)}</div></div>
          </div>
          <div className="mono text-2xl font-semibold text-[#135E73] mt-3">{fmt(p.price)} €</div>
          <div className="text-sm mt-1">Superficie <b className="mono">{fmt(p.sqm)} m²</b></div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {p.status === "in" && <Badge className="bg-[#E2F0EC] text-[#1C6B54] hover:bg-[#E2F0EC]">ENTRO PIANO</Badge>}
            {p.status === "out" && <Badge className="bg-[#F3EDDA] text-[#7A6420] hover:bg-[#F3EDDA]">FUORI PIANO</Badge>}
            {p.status === "no" && <Badge className="bg-[#F7E2DC] text-[#C0492F] hover:bg-[#F7E2DC]">NON EDIFICABILE</Badge>}
            {p.star && <Badge className="bg-[#D9A441] text-[#3D2B00] hover:bg-[#D9A441]">★ CONSIGLIATO</Badge>}
          </div>
          <p className="text-xs text-[#4A6B75] mt-3">{p.note}</p>
          <p className="mono text-[10.5px] text-[#93A9B0] mt-2">{p.src}</p>
          {p.status !== "no" && (
            <Button onClick={() => openLead(p)} variant="outline" className="mt-4 w-full rounded-full border-[#CADEDD] text-[#135E73] hover:bg-[#135E73] hover:text-white h-9 text-sm">
              Richiedi info su questo terreno
            </Button>
          )}
        </CardContent>
      </Card>
    </Reveal>
  );
}

function GuideCard({ g, delay = 0 }: { g: Guide; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/guide/${g.id}`} className="block h-full">
        <Card className="card-lift bg-[#124253] border-[#1B586C] rounded-2xl h-full">
          <CardContent className="p-6">
            <div className="text-3xl">{g.icon}</div>
            <h3 className="display text-xl text-white mt-3">{g.title}</h3>
            <p className="text-sm text-[#A9CDCF] mt-1">{g.sub}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-[#CFE5E6]">
              {g.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-[#D9A441]">›</span>{b}</li>
              ))}
            </ul>
            <div className="mt-5 mono text-xs tracking-wide text-[#D9A441]">LEGGI E SCARICALA GRATIS →</div>
          </CardContent>
        </Card>
      </Link>
    </Reveal>
  );
}

function FbBanner() {
  return (
    <section className="max-w-6xl mx-auto px-5 pb-16">
      <Reveal>
        <div className="rounded-3xl bg-gradient-to-r from-[#135E73] to-[#2E93A6] text-white p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
          <Goat size={72} stroke="#FFFFFF" bob />
          <div className="flex-1 text-center md:text-left">
            <h3 className="display text-2xl">Ogni settimana nuovi terreni sotto i 50k</h3>
            <p className="text-sm text-[#D8ECEC] mt-1">Li pubblichiamo prima nel nostro gruppo Facebook da 33.000 iscritti, con analisi €/m² e verdetto della capretta.</p>
          </div>
          <Button asChild className="bg-white text-[#135E73] hover:bg-[#EFF5F4] rounded-full h-12 px-8 font-semibold">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Entra nel gruppo →</a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

/* ================= PAGES ================= */
function HomePage() {
  const { openGuide } = useContext(GateCtx);
  const stars = PLOTS.filter((p) => p.star).slice(0, 3);
  return (
    <div className="page">
      <section className="max-w-6xl mx-auto px-5 pt-14 pb-10 grid md:grid-cols-[1.2fr_.8fr] gap-10 items-center">
        <div>
          <p className="mono text-xs tracking-[.3em] text-[#2E93A6] uppercase">Cefalonia · Isole Ionie · per italiani</p>
          <h1 className="display text-[clamp(38px,6vw,64px)] leading-[1.02] mt-3">
            Il tuo terreno a Cefalonia, <em className="not-italic text-[#135E73]">senza sorprese</em> burocratiche.
          </h1>
          <p className="mt-5 text-[#4A6B75] max-w-lg">
            Selezioniamo terreni edificabili tra 23.000 e 50.000 € intorno ad Argostoli e ti guidiamo passo passo tra AFM, permessi e tasse — in italiano.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="bg-[#0F3440] hover:bg-[#14495a] text-white rounded-full h-12 px-7">
              <Link to="/terreni">Vedi i 13 terreni</Link>
            </Button>
            <Button onClick={() => openGuide(GUIDES[0])} variant="outline" className="rounded-full h-12 px-7 border-[#0F3440] text-[#0F3440] hover:bg-[#0F3440] hover:text-white">
              Scarica la guida AFM
            </Button>
          </div>
          <div className="mt-8 flex gap-8 mono text-sm">
            <div><b className="text-lg">13</b><span className="block text-[11px] text-[#93A9B0] tracking-widest">ANNUNCI</span></div>
            <div><b className="text-lg">23–45k €</b><span className="block text-[11px] text-[#93A9B0] tracking-widest">ENTRO PIANO</span></div>
            <div><b className="text-lg">3,09%</b><span className="block text-[11px] text-[#93A9B0] tracking-widest">IMPOSTA</span></div>
          </div>
        </div>
        <div className="hidden md:flex justify-center">
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-[#EFF5F4]" />
            <div className="relative"><Goat size={220} bob /></div>
            <p className="relative mono text-[11px] text-[#93A9B0] text-center mt-3 tracking-widest">LE CAPRE TROVANO SEMPRE<br />IL SENTIERO MIGLIORE</p>
          </div>
        </div>
      </section>

      <div className="meander" />

      <section className="max-w-6xl mx-auto px-5 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mono text-xs tracking-[.3em] text-[#2E93A6] uppercase">I preferiti della capretta</p>
            <h2 className="display text-3xl md:text-4xl mt-2">Tre terreni da cui partire</h2>
          </div>
          <Link to="/terreni" className="mono text-xs text-[#135E73] whitespace-nowrap hover:underline">VEDI TUTTI →</Link>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stars.map((p, i) => <PlotCard key={p.id} p={p} delay={i * 90} />)}
        </div>
      </section>

      <section className="bg-[#0F3440] py-16">
        <div className="max-w-6xl mx-auto px-5">
          <p className="mono text-xs tracking-[.3em] text-[#D9A441] uppercase">Guide gratuite</p>
          <h2 className="display text-3xl md:text-4xl mt-2 text-white">La burocrazia greca, tradotta in italiano</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {GUIDES.map((g, i) => <GuideCard key={g.id} g={g} delay={i * 90} />)}
          </div>
        </div>
      </section>

      <div className="pt-16"><FbBanner /></div>
    </div>
  );
}

function TerreniPage() {
  const [filter, setFilter] = useState<"all" | "in" | "out" | "star" | "cheap">("all");
  const [maxPrice, setMaxPrice] = useState(50000);
  const list = useMemo(() => {
    return [...PLOTS]
      .sort((a, b) => a.price / a.sqm - b.price / b.sqm)
      .filter((p) => p.price <= maxPrice)
      .filter((p) => {
        if (filter === "in") return p.status === "in";
        if (filter === "out") return p.status === "out";
        if (filter === "star") return p.star;
        if (filter === "cheap") return p.price <= 35000;
        return true;
      });
  }, [filter, maxPrice]);

  const chip = (f: typeof filter, label: string) => (
    <button key={f} onClick={() => setFilter(f)}
      className={`mono text-xs tracking-wide rounded-full px-4 py-2 border transition-colors ${filter === f ? "bg-[#0F3440] text-white border-[#0F3440]" : "bg-white text-[#135E73] border-[#CADEDD] hover:border-[#2E93A6]"}`}>
      {label}
    </button>
  );

  return (
    <div className="page max-w-6xl mx-auto px-5 py-12">
      <p className="mono text-xs tracking-[.3em] text-[#2E93A6] uppercase">Il portale</p>
      <h1 className="display text-3xl md:text-5xl mt-2">Terreni in vendita a Cefalonia</h1>
      <p className="text-[#4A6B75] mt-2 max-w-xl text-sm">Ordinati per €/m² — il modo più onesto di confrontarli. Prezzi da riconfermare con le agenzie.</p>

      <div className="mt-6 flex flex-wrap items-center gap-2 sticky top-16 z-30 bg-[#FDFDFB]/95 backdrop-blur py-3 -mx-1 px-1">
        {chip("all", "Tutti")}
        {chip("in", "Entro piano")}
        {chip("out", "Fuori piano")}
        {chip("cheap", "≤ 35.000 €")}
        {chip("star", "★ Consigliati")}
        <div className="flex items-center gap-3 ml-auto mono text-xs text-[#4A6B75]">
          <span>Max {fmt(maxPrice)} €</span>
          <input type="range" min={23000} max={50000} step={1000} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="accent-[#135E73] w-36" />
        </div>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((p, i) => <PlotCard key={p.id} p={p} delay={Math.min(i, 5) * 60} />)}
      </div>
      {list.length === 0 && (
        <p className="text-center text-[#93A9B0] py-16">Nessun terreno con questi filtri. La capretta suggerisce di allargare il budget. 🐐</p>
      )}
      <div className="pt-16"><FbBanner /></div>
    </div>
  );
}

function GuideIndexPage() {
  return (
    <div className="page">
      <div className="bg-[#0F3440] py-14">
        <div className="max-w-6xl mx-auto px-5">
          <p className="mono text-xs tracking-[.3em] text-[#D9A441] uppercase">Guide gratuite</p>
          <h1 className="display text-3xl md:text-5xl mt-2 text-white">La burocrazia greca, tradotta in italiano</h1>
          <p className="text-[#A9CDCF] mt-2 max-w-xl text-sm">Tre guide pratiche per chi compra dall'Italia. Le leggi in anteprima e le scarichi gratis lasciando la tua email.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {GUIDES.map((g, i) => <GuideCard key={g.id} g={g} delay={i * 90} />)}
          </div>
        </div>
      </div>
      <FbBanner />
    </div>
  );
}

function GuideDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { openGuide } = useContext(GateCtx);
  const g = GUIDES.find((x) => x.id === id);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  if (!g) { nav("/guide"); return null; }
  const done = AFM_STEPS.filter((_, i) => checked[i]).length;
  const preview = g.body.split("\n").slice(0, 10).join("\n");

  return (
    <div className="page max-w-3xl mx-auto px-5 py-12">
      <Link to="/guide" className="mono text-xs text-[#93A9B0] hover:text-[#135E73]">← TUTTE LE GUIDE</Link>
      <div className="text-4xl mt-6">{g.icon}</div>
      <h1 className="display text-3xl md:text-4xl mt-3">{g.title}</h1>
      <p className="text-[#4A6B75] mt-2">{g.sub}</p>

      <Reveal className="mt-8">
        <div className="relative rounded-2xl border border-[#E4EDEC] bg-white p-6 overflow-hidden">
          <pre className="whitespace-pre-wrap font-sans text-sm text-[#4A6B75] leading-relaxed">{preview}</pre>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </div>
      </Reveal>

      {g.id === "afm" && (
        <Reveal className="mt-10">
          <h2 className="display text-2xl">Anteprima interattiva: i 6 passi</h2>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-[#E4EDEC] overflow-hidden">
              <div className="h-full bg-[#2E93A6] transition-all duration-500" style={{ width: `${(done / AFM_STEPS.length) * 100}%` }} />
            </div>
            <span className="mono text-xs text-[#4A6B75]">{done}/6</span>
          </div>
          <Accordion type="single" collapsible className="mt-3">
            {AFM_STEPS.map(([t, d], i) => (
              <AccordionItem key={i} value={`s${i}`} className="border-[#E4EDEC]">
                <AccordionTrigger className="hover:no-underline">
                  <span className="flex items-center gap-3 text-left">
                    <span onClick={(e) => { e.stopPropagation(); setChecked((c) => ({ ...c, [i]: !c[i] })); }}
                      className={`w-7 h-7 shrink-0 rounded-full border flex items-center justify-center text-sm transition-colors ${checked[i] ? "bg-[#2E93A6] border-[#2E93A6] text-white" : "border-[#CADEDD] text-[#93A9B0]"}`}>
                      {checked[i] ? "✓" : i + 1}
                    </span>
                    <span className="display text-lg">{t}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#4A6B75] pl-10">{d}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      )}

      <div className="mt-10 text-center">
        <Button onClick={() => openGuide(g)} className="bg-[#D9A441] hover:bg-[#c6922f] text-[#3D2B00] rounded-full h-12 px-8 mono text-sm tracking-wide">
          SBLOCCA LA GUIDA COMPLETA — GRATIS ↓
        </Button>
        <p className="mono text-[11px] text-[#93A9B0] mt-3">Ti chiediamo solo nome ed email. Download immediato.</p>
      </div>
    </div>
  );
}

/* ================= LAYOUT ================= */
function Header() {
  const { openGuide } = useContext(GateCtx);
  const navCls = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors ${isActive ? "text-[#135E73] font-semibold" : "hover:text-[#135E73]"}`;
  return (
    <header className="sticky top-0 z-40 bg-[#FDFDFB]/90 backdrop-blur border-b border-[#E4EDEC]">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5">
          <Goat size={34} />
          <span className="display text-xl tracking-wide">CAPRA IONIA</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/terreni" className={navCls}>Terreni</NavLink>
          <NavLink to="/guide" className={navCls}>Guide gratuite</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <nav className="md:hidden flex items-center gap-4 mr-1">
            <NavLink to="/terreni" className={navCls}>Terreni</NavLink>
            <NavLink to="/guide" className={navCls}>Guide</NavLink>
          </nav>
          <Button onClick={() => openGuide(GUIDES[0])} className="bg-[#D9A441] hover:bg-[#c6922f] text-[#3D2B00] rounded-full h-9 px-4 md:px-5 mono text-xs tracking-wide">
            GUIDA ↓
          </Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0F3440] text-[#8FB4B8] text-xs py-10">
      <div className="max-w-6xl mx-auto px-5 space-y-3">
        <div className="flex items-center gap-2"><Goat size={26} stroke="#8FB4B8" /><span className="display text-base text-[#D8ECEC] tracking-wide">CAPRA IONIA</span></div>
        <p>Prezzi e disponibilità cambiano rapidamente: ogni annuncio va riconfermato con l'agenzia. Contenuti informativi, non consulenza legale: la parola finale spetta ad avvocato e ingegnere greci. Fonti: Enos Properties, Premium Kefalonia, Mesitiko Moisis, Spitogatos, XE.gr.</p>
      </div>
    </footer>
  );
}

/* ================= APP ================= */
export default function App() {
  const [guideOpen, setGuideOpen] = useState<Guide | null>(null);
  const [leadOpen, setLeadOpen] = useState<Plot | null>(null);

  return (
    <GateCtx.Provider value={{ openGuide: setGuideOpen, openLead: setLeadOpen }}>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#FDFDFB] flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/terreni" element={<TerreniPage />} />
              <Route path="/guide" element={<GuideIndexPage />} />
              <Route path="/guide/:id" element={<GuideDetailPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>

        <Dialog open={!!guideOpen} onOpenChange={(o) => !o && setGuideOpen(null)}>
          <DialogContent className="max-w-md rounded-2xl">
            {guideOpen && (
              <>
                <DialogHeader>
                  <div className="text-3xl">{guideOpen.icon}</div>
                  <DialogTitle className="display text-2xl font-normal">{guideOpen.title}</DialogTitle>
                  <DialogDescription>{guideOpen.sub} Lascia la tua email e scaricala subito.</DialogDescription>
                </DialogHeader>
                <LeadForm context={`guida:${guideOpen.id}`} onDone={() => downloadGuide(guideOpen)} />
              </>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={!!leadOpen} onOpenChange={(o) => !o && setLeadOpen(null)}>
          <DialogContent className="max-w-md rounded-2xl">
            {leadOpen && (
              <>
                <DialogHeader>
                  <DialogTitle className="display text-2xl font-normal">{leadOpen.loc} · {fmt(leadOpen.sqm)} m²</DialogTitle>
                  <DialogDescription>{fmt(leadOpen.price)} € · {leadOpen.src}. Lasciaci i tuoi contatti e ti mandiamo dettagli e riferimenti dell'agenzia.</DialogDescription>
                </DialogHeader>
                <LeadForm context={`terreno:${leadOpen.loc}-${leadOpen.id}`} />
              </>
            )}
          </DialogContent>
        </Dialog>
      </HashRouter>
    </GateCtx.Provider>
  );
}
