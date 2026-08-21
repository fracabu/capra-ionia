/**
 * Importa le foto dei terreni e ne legge le coordinate GPS.
 *
 *   node scripts/import-photos.mjs <cartella>
 *
 * Cerca file nominati come l'id dell'annuncio (3.jpg, 8-2.jpg, …), li copia
 * in public/foto/ e stampa le coordinate trovate nell'EXIF. Se le foto sono
 * state scattate stando sul terreno, quelle coordinate valgono più del
 * centro del paese che la mappa usa adesso.
 *
 * Nessuna dipendenza: l'EXIF è lettura di byte.
 */
import { readdirSync, readFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { join, extname, basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve("public/foto");

/** Legge lat/lng dal blocco GPS dell'EXIF di un JPEG. null se assente. */
export function readGps(buf) {
  if (buf.readUInt16BE(0) !== 0xffd8) return null; // non è un JPEG

  // Cerca il segmento APP1 che contiene "Exif\0\0".
  let p = 2, app1 = -1;
  while (p < buf.length - 4) {
    if (buf[p] !== 0xff) break;
    const marker = buf.readUInt16BE(p);
    const size = buf.readUInt16BE(p + 2);
    if (marker === 0xffe1 && buf.toString("ascii", p + 4, p + 8) === "Exif") {
      app1 = p + 10;
      break;
    }
    if (marker === 0xffda) break; // inizio dei dati immagine
    p += 2 + size;
  }
  if (app1 < 0) return null;

  const le = buf.toString("ascii", app1, app1 + 2) === "II";
  const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
  const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));

  // Trova il puntatore alla IFD del GPS (tag 0x8825) dentro la IFD0.
  const ifd0 = app1 + u32(app1 + 4);
  let gpsOff = 0;
  const n0 = u16(ifd0);
  for (let i = 0; i < n0; i++) {
    const e = ifd0 + 2 + i * 12;
    if (u16(e) === 0x8825) { gpsOff = app1 + u32(e + 8); break; }
  }
  if (!gpsOff) return null;

  const rational = (o) => u32(o) / (u32(o + 4) || 1);
  const dms = (o) => rational(o) + rational(o + 8) / 60 + rational(o + 16) / 3600;

  let lat = null, lng = null, latRef = "N", lngRef = "E";
  const n = u16(gpsOff);
  for (let i = 0; i < n; i++) {
    const e = gpsOff + 2 + i * 12;
    const tag = u16(e);
    const valueAt = app1 + u32(e + 8); // i RATIONAL non stanno mai inline
    if (tag === 1) latRef = buf.toString("ascii", e + 8, e + 9);
    if (tag === 2) lat = dms(valueAt);
    if (tag === 3) lngRef = buf.toString("ascii", e + 8, e + 9);
    if (tag === 4) lng = dms(valueAt);
  }
  if (lat === null || lng === null) return null;
  return {
    lat: +( latRef === "S" ? -lat : lat ).toFixed(6),
    lng: +( lngRef === "W" ? -lng : lng ).toFixed(6),
  };
}

function main() {
  const dir = process.argv[2];
  if (!dir) {
    console.error("Uso: node scripts/import-photos.mjs <cartella con le foto>");
    process.exit(1);
  }
  if (!existsSync(dir)) {
    console.error(`Cartella non trovata: ${dir}`);
    process.exit(1);
  }

  mkdirSync(OUT, { recursive: true });
  const files = readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

  if (!files.length) {
    console.log(`Nessuna foto in ${dir}. Attesi file .jpg, .png o .webp.`);
    process.exit(0);
  }

  console.log(`${files.length} foto trovate.\n`);
  for (const f of files.sort()) {
    const id = basename(f, extname(f)).split("-")[0];
    const dest = join(OUT, f.toLowerCase());
    copyFileSync(join(dir, f), dest);

    let gps = null;
    try { gps = readGps(readFileSync(join(dir, f))); } catch { /* EXIF illeggibile */ }

    const coord = gps ? `${gps.lat}, ${gps.lng}` : "— nessun GPS nell'EXIF";
    console.log(`  ${f.padEnd(22)} annuncio ${id.padEnd(3)} ${coord}`);
  }

  console.log(`\nCopiate in public/foto/. Ora aggiungi il campo img agli annunci`);
  console.log(`in src/data/plots.ts, per esempio:  img: "foto/3.jpg"`);
  console.log(`Le coordinate qui sopra, se presenti, sono più precise di quelle`);
  console.log(`per località che la mappa usa adesso.`);
}

// Importabile senza effetti collaterali: esegue solo se lanciato direttamente.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
