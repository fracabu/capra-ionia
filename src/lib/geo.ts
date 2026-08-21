import { type Plot } from "@/data/plots";
import { LOCALITIES } from "@/data/localities";

/* Geometria della mappa del portale, fuori dal componente: qui non ci sono
   componenti React, e il fast refresh resta pulito. */
export type Ring = [number, number][];

/** Test del punto dentro il poligono, per raggi. */
export function inRing(ring: Ring, lat: number, lng: number) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [yi, xi] = ring[i];
    const [yj, xj] = ring[j];
    const straddles = yi > lat !== yj > lat;
    if (straddles && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/**
 * Posizione di un annuncio sulla mappa.
 *
 * Più terreni condividono la stessa località e finirebbero sotto lo stesso
 * punto: quelli oltre il primo vengono disposti su un cerchietto attorno al
 * paese, così restano tutti cliccabili. È una separazione grafica, non una
 * posizione reale — la mappa lo dichiara.
 */
export function plotLatLng(p: Plot, siblings: Plot[]): [number, number] | null {
  const base = LOCALITIES[p.loc];
  if (!base) return null;
  if (siblings.length < 2) return [base.lat, base.lng];
  const i = siblings.findIndex((s) => s.id === p.id);
  const angle = (i / siblings.length) * Math.PI * 2;
  const r = 0.0016;
  return [
    base.lat + r * Math.sin(angle),
    base.lng + (r * Math.cos(angle)) / Math.cos((base.lat * Math.PI) / 180),
  ];
}
