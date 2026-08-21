/**
 * Geometria del logo: una sola definizione per il sito, i PDF e il favicon.
 *
 * Il componente Goat in App.tsx disegna questi tracciati in JSX; lo script
 * dei PDF li assembla in una stringa SVG. Modificando qui cambiano insieme.
 */
export const GOAT_VIEWBOX = "0 0 64 64";

/** Tracciati del corpo, disegnati col colore principale. */
export const GOAT_PATHS = [
  { d: "M22 18 C18 10, 22 4, 28 6 M30 16 C28 10, 31 5, 36 6", cap: "round" },
  { d: "M24 20 C20 22, 18 27, 20 31 L14 36 C11 38, 12 42, 16 42 L20 40 C22 46, 28 50, 35 49 L48 47 C54 46, 56 40, 53 35 C57 33, 57 27, 52 26 L36 24 C33 20, 28 18, 24 20 Z", join: "round" },
  { d: "M28 49 L28 58 M40 48 L40 58 M46 47 L48 57", cap: "round" },
  { d: "M17 42 L15 47", cap: "round" },
] as const;

/** L'occhio. */
export const GOAT_EYE = { cx: 22, cy: 27, r: 1.6 };

/** Il terreno sotto le zampe, sempre nel giallo del marchio. */
export const GOAT_GROUND = "M24 58 L52 58";
export const GROUND_COLOR = "#D9A441";

/** Versione stringa, per i contesti fuori da React (PDF, favicon). */
export function goatSvg({ size = 40, stroke = "#0F3440" } = {}) {
  const paths = GOAT_PATHS.map(
    (p) =>
      `<path d="${p.d}" stroke="${stroke}" stroke-width="2.4"` +
      ("cap" in p ? ` stroke-linecap="${p.cap}"` : "") +
      ("join" in p ? ` stroke-linejoin="${p.join}"` : "") +
      ` fill="none"/>`,
  ).join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" ` +
    `viewBox="${GOAT_VIEWBOX}" fill="none">${paths}` +
    `<circle cx="${GOAT_EYE.cx}" cy="${GOAT_EYE.cy}" r="${GOAT_EYE.r}" fill="${stroke}"/>` +
    `<path d="${GOAT_GROUND}" stroke="${GROUND_COLOR}" stroke-width="2.4" stroke-linecap="round"/>` +
    `</svg>`
  );
}
