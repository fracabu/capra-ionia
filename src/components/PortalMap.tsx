import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type Plot } from "@/data/plots";
import { KEFALONIA_CENTER } from "@/data/localities";
import { plotLatLng, type Ring } from "@/lib/geo";

const fmt = (n: number) => n.toLocaleString("it-IT");

type Props = {
  plots: Plot[];
  activeId: number | null;
  onActivate: (id: number) => void;
  drawing: boolean;
  ring: Ring | null;
  onRing: (ring: Ring | null) => void;
};

export default function PortalMap({ plots, activeId, onActivate, drawing, ring, onRing }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);
  const shape = useRef<L.Polygon | L.Polyline | null>(null);
  // I gestori del disegno cambiano a ogni render: un ref evita di ricreare la
  // mappa. Va aggiornato in un effetto, non durante il render.
  const onRingRef = useRef(onRing);
  useEffect(() => { onRingRef.current = onRing; }, [onRing]);

  useEffect(() => {
    if (!box.current || map.current) return;
    const m = L.map(box.current, { center: KEFALONIA_CENTER, zoom: 10, scrollWheelZoom: false });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(m);
    layer.current = L.layerGroup().addTo(m);
    map.current = m;
    return () => { m.remove(); map.current = null; };
  }, []);

  /* Segnaposto: ridisegnati quando cambiano i risultati o la selezione. */
  useEffect(() => {
    const m = map.current, g = layer.current;
    if (!m || !g) return;
    g.clearLayers();

    const byLoc = new Map<string, Plot[]>();
    for (const p of plots) {
      const list = byLoc.get(p.loc);
      if (list) list.push(p); else byLoc.set(p.loc, [p]);
    }

    const pts: L.LatLngExpression[] = [];
    for (const p of plots) {
      const at = plotLatLng(p, byLoc.get(p.loc) ?? [p]);
      if (!at) continue;
      pts.push(at);
      const on = p.id === activeId;
      const icon = L.divIcon({
        className: "",
        html: `<div style="
            transform:translate(-50%,-50%);white-space:nowrap;
            background:${on ? "#D9A441" : "#0F3440"};color:#fff;
            border:2px solid #fff;border-radius:999px;
            padding:2px 8px;font-size:11px;font-weight:700;line-height:1.5;
            box-shadow:0 1px 4px rgba(0,0,0,.35);
            ${on ? "outline:3px solid rgba(217,164,65,.35);" : ""}">
            ${Math.round(p.price / 1000)}k
          </div>`,
        iconSize: [0, 0],
      });
      L.marker(at, { icon, title: `${p.loc} · ${fmt(p.price)} €`, zIndexOffset: on ? 1000 : 0 })
        .on("click", () => onActivate(p.id))
        .bindTooltip(`${p.loc} · ${fmt(p.sqm)} m²`, { direction: "top", offset: [0, -10] })
        .addTo(g);
    }

    if (pts.length && !ring) {
      m.fitBounds(L.latLngBounds(pts).pad(0.25), { animate: false });
    }
  }, [plots, activeId, ring, onActivate]);

  /* Zona disegnata: la si ridisegna quando cambia. */
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    shape.current?.remove();
    shape.current = null;
    if (ring && ring.length > 2) {
      shape.current = L.polygon(ring, {
        color: "#D9A441", weight: 2, fillColor: "#D9A441", fillOpacity: 0.12,
      }).addTo(m);
    }
  }, [ring]);

  /* Disegno a mano libera: traccia il dito e chiude il poligono al rilascio. */
  useEffect(() => {
    const m = map.current;
    const el = box.current;
    if (!m || !el) return;

    if (!drawing) {
      m.dragging.enable();
      el.style.cursor = "";
      return;
    }
    m.dragging.disable();
    el.style.cursor = "crosshair";

    let pts: Ring = [];
    let live: L.Polyline | null = null;
    let active = false;

    const toLatLng = (e: MouseEvent | Touch) => {
      const r = el.getBoundingClientRect();
      const ll = m.containerPointToLatLng([e.clientX - r.left, e.clientY - r.top]);
      return [ll.lat, ll.lng] as [number, number];
    };

    const start = (e: MouseEvent | TouchEvent) => {
      active = true;
      pts = [];
      shape.current?.remove();
      shape.current = null;
      live = L.polyline([], { color: "#D9A441", weight: 2, dashArray: "4 4" }).addTo(m);
      move(e);
    };
    const move = (e: MouseEvent | TouchEvent) => {
      if (!active) return;
      const src = "touches" in e ? e.touches[0] : e;
      if (!src) return;
      e.preventDefault();
      const at = toLatLng(src);
      // Un punto ogni tanto basta: registrarli tutti appesantisce e non aggiunge nulla.
      const last = pts[pts.length - 1];
      if (last && Math.abs(last[0] - at[0]) + Math.abs(last[1] - at[1]) < 0.0004) return;
      pts.push(at);
      live?.setLatLngs(pts);
    };
    const end = () => {
      if (!active) return;
      active = false;
      live?.remove();
      live = null;
      // Meno di tre punti non è un'area: si annulla.
      onRingRef.current(pts.length > 2 ? pts : null);
    };

    el.addEventListener("mousedown", start);
    el.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    el.addEventListener("touchstart", start, { passive: false });
    el.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
    return () => {
      el.removeEventListener("mousedown", start);
      el.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      el.removeEventListener("touchstart", start);
      el.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
      live?.remove();
      m.dragging.enable();
      el.style.cursor = "";
    };
  }, [drawing]);

  return <div ref={box} className="h-full w-full rounded-2xl overflow-hidden border border-[#E4EDEC] z-0" />;
}
