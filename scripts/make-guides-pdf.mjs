/**
 * Genera i PDF delle guide in public/guide, uno per ogni voce di GUIDES.
 *
 *   node --experimental-strip-types scripts/make-guides-pdf.mjs
 *
 * Non gira in CI: i testi delle guide cambiano di rado, quindi i PDF sono
 * versionati e la build si limita a copiarli. Rilancialo quando modifichi
 * src/data/guides.ts, e committa i file aggiornati.
 *
 * Serve Chromium: usa CHROME_PATH, altrimenti cerca i percorsi più comuni.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { GUIDES } from "../src/data/guides.ts";
import { goatSvg } from "../src/data/logo.ts";

const OUT = resolve("public/guide");

/* Da tenere allineati a src/App.tsx. FACEBOOK vuoto = il blocco non compare:
   meglio nessun link che un link alla home generica di Facebook. */
const SITE = "https://fracabu.github.io/capra-ionia";
const FACEBOOK = "";
const CANDIDATES = [
  process.env.CHROME_PATH,
  "/opt/pw-browsers/chromium",
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  "/usr/bin/chromium",
  "/usr/bin/google-chrome",
].filter(Boolean);

const chrome = CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error("Chromium non trovato. Imposta CHROME_PATH al binario.");
  process.exit(1);
}

const esc = (t) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Una riga è un'intestazione se, tolte le parentesi, è quasi tutta maiuscola. */
function isHeading(line) {
  const bare = line.replace(/\([^)]*\)/g, "");
  const letters = bare.match(/\p{L}/gu) ?? [];
  if (letters.length < 3 || line.length > 90) return false;
  const upper = letters.filter((c) => c !== c.toLowerCase()).length;
  return upper / letters.length > 0.8;
}

/** Tre tipi di riga elencata, ognuno con un marcatore diverso. */
function bulletKind(line) {
  if (/^\[\s?\]\s/.test(line)) return "check";
  if (/^[A-Z]\)\s/.test(line)) return "letters";
  if (/^[·•-]\s/.test(line)) return "dots";
  return null;
}

/** Il corpo è testo semplice: riga 1 occhiello, riga 2 titolo, poi sezioni. */
export function render(body) {
  const lines = body.split("\n");
  const kicker = lines[0].trim();
  const title = lines[1].trim();
  const out = [];
  let list = null;
  let kind = null;

  const flush = () => {
    if (list) { out.push(`<ul class="${kind}">${list.join("")}</ul>`); list = null; kind = null; }
  };

  for (const raw of lines.slice(2)) {
    const line = raw.trim();
    if (!line) { flush(); continue; }

    const k = bulletKind(line);
    if (k) {
      if (kind !== k) flush();
      kind = k;
      list ??= [];
      // La lettera resta visibile e fa da marcatore; per gli altri si toglie.
      const text = k === "letters" ? line : line.replace(/^(\[\s?\]|[·•-])\s/, "");
      list.push(`<li>${esc(text)}</li>`);
      continue;
    }

    flush();
    if (isHeading(line)) out.push(`<h2>${esc(line)}</h2>`);
    else if (/^Nota\b/i.test(line)) out.push(`<p class="note">${esc(line)}</p>`);
    else out.push(`<p>${esc(line)}</p>`);
  }
  flush();
  return { kicker, title, html: out.join("\n") };
}

/** Rimanda al sito e alle altre guide: chi scarica questa non sa che esistono. */
function linksHtml(current) {
  const others = GUIDES.filter((g) => g.id !== current);
  const list = others
    .map((g) => `<li><a href="${SITE}/#/guide/${g.id}">${esc(g.title)}</a></li>`)
    .join("");
  const fb = FACEBOOK
    ? `<p class="cta"><a href="${FACEBOOK}">Entra nel gruppo Facebook</a> — nuovi terreni ogni settimana</p>`
    : "";
  return `<section class="links">
    <h2>Continua su Capra Ionia</h2>
    <p class="cta"><a href="${SITE}/#/terreni">Vedi i terreni in vendita a Cefalonia</a>
       — annunci ordinati per €/m², con scheda e contatti dell'agenzia.</p>
    ${fb}
    <p class="also">Le altre guide gratuite:</p>
    <ul>${list}</ul>
  </section>`;
}

export function page({ kicker, title, html }, sub, id) {
  // Il marchio ora sta nella testata col logo: ripeterlo nell'occhiello no.
  kicker = kicker.replace(/\s*·\s*CAPRA IONIA\s*$/i, "");
  return `<!doctype html><html lang="it"><head><meta charset="utf-8">
<style>
  @page { size: A4; margin: 14mm 15mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0; font-family: "DejaVu Sans", sans-serif; font-size: 10pt;
    line-height: 1.45; color: #24424C; -webkit-print-color-adjust: exact;
  }
  header { border-bottom: 2.5pt solid #2E93A6; padding-bottom: 7pt; margin-bottom: 12pt; }
  .brand {
    display: flex; align-items: center; gap: 6pt; margin-bottom: 5pt;
  }
  .brand span {
    font-family: "DejaVu Serif", serif; font-size: 10.5pt;
    letter-spacing: .06em; color: #0F3440;
  }
  .kicker {
    font-size: 7.5pt; letter-spacing: .22em; text-transform: uppercase;
    color: #2E93A6; font-weight: bold; margin: 0 0 6pt;
  }
  h1 {
    font-family: "DejaVu Serif", serif; font-size: 19pt; line-height: 1.25;
    color: #0F3440; margin: 0; font-weight: normal;
  }
  .sub { margin: 5pt 0 0; font-size: 9.5pt; color: #4A6B75; font-style: italic; }
  h2 {
    font-size: 9pt; letter-spacing: .1em; color: #135E73; font-weight: bold;
    margin: 11pt 0 3pt; padding-left: 7pt; border-left: 2.5pt solid #D9A441;
    break-after: avoid;
  }
  p { margin: 0 0 7pt; }
  ul { margin: 0 0 7pt; padding-left: 14pt; }
  li { margin-bottom: 3pt; }
  /* La lettera A) B) C) è già il marcatore: un pallino in più sarebbe doppio. */
  ul.letters { list-style: none; padding-left: 2pt; }
  ul.check { list-style: none; padding-left: 2pt; }
  ul.check li::before {
    content: ""; display: inline-block; width: 8pt; height: 8pt;
    border: .8pt solid #2E93A6; border-radius: 1.5pt;
    margin-right: 7pt; vertical-align: -.5pt;
  }
  .links {
    margin-top: 13pt; padding: 8pt 11pt;
    background: #F2F7F6; border-radius: 6pt; break-inside: avoid;
  }
  .links h2 {
    margin: 0 0 6pt; padding: 0; border: 0;
    font-size: 9pt; letter-spacing: .1em; color: #135E73;
  }
  .links p { margin: 0 0 5pt; font-size: 9pt; }
  .links a { color: #135E73; font-weight: bold; }
  .links .also { margin-top: 8pt; color: #93A9B0; font-size: 8.5pt; }
  .links ul { margin: 3pt 0 0; padding-left: 14pt; font-size: 9pt; }
  .note {
    margin-top: 14pt; padding-top: 7pt; border-top: .5pt solid #E4EDEC;
    font-size: 8.5pt; color: #93A9B0; font-style: italic;
  }
  /* Non fisso: un elemento posizionato nel margine fa generare a Chromium
     una pagina in più, anche quando il contenuto entrerebbe in una sola. */
  footer {
    display: flex; justify-content: space-between; gap: 12pt;
    margin-top: 12pt; padding-top: 5pt;
    border-top: .5pt solid #E4EDEC;
    font-size: 7.5pt; color: #93A9B0;
    break-inside: avoid;
  }
</style></head><body>
<header>
  <div class="brand">${goatSvg({ size: 24, stroke: "#0F3440" })}<span>CAPRA IONIA</span></div>
  <p class="kicker">${esc(kicker)}</p>
  <h1>${esc(title)}</h1>
  <p class="sub">${esc(sub)}</p>
</header>
${html}
${linksHtml(id)}
<footer><span>Capra Ionia · terreni edificabili a Cefalonia</span><span>fracabu.github.io/capra-ionia</span></footer>
</body></html>`;
}

export function build() {
  mkdirSync(OUT, { recursive: true });
  const tmp = join(tmpdir(), `guide-pdf-${process.pid}`);
  mkdirSync(tmp, { recursive: true });

  for (const g of GUIDES) {
    const src = join(tmp, `${g.id}.html`);
    writeFileSync(src, page(render(g.body), g.sub, g.id), "utf8");
    execFileSync(chrome, [
      "--headless", "--disable-gpu", "--no-sandbox",
      "--no-pdf-header-footer",
      `--print-to-pdf=${join(OUT, `${g.id}.pdf`)}`,
      `file://${src}`,
    ], { stdio: "pipe" });
    console.log(`  public/guide/${g.id}.pdf`);
  }

  rmSync(tmp, { recursive: true, force: true });
  console.log(`\n${GUIDES.length} PDF generati.`);
}

// Importabile senza effetti collaterali: genera solo se eseguito direttamente.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  build();
}
