import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PLOTS, type Plot } from "@/data/plots";
import { LOCALITIES, KEFALONIA_CENTER } from "@/data/localities";

const fmt = (n: number) => n.toLocaleString("it-IT");

/** Un segnaposto per località: è la precisione che i dati permettono davvero. */
function groupByLocality() {
  const groups = new Map<string, Plot[]>();
  for (const p of PLOTS) {
    if (!LOCALITIES[p.loc]) continue;
    const list = groups.get(p.loc);
    if (list) list.push(p);
    else groups.set(p.loc, [p]);
  }
  return groups;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Miniatura: la foto se c'è, altrimenti un riquadro con l'iniziale. */
function thumbHtml(p: Plot) {
  if (p.img) {
    return `<img src="${esc(p.img)}" alt="" loading="lazy"
      style="width:52px;height:52px;object-fit:cover;border-radius:8px;flex:0 0 auto">`;
  }
  return `<div aria-hidden style="
      width:52px;height:52px;border-radius:8px;flex:0 0 auto;
      background:linear-gradient(135deg,#135E73,#2E93A6);
      color:#fff;display:flex;align-items:center;justify-content:center;
      font-size:18px;font-weight:600">${esc(p.loc.slice(0, 1))}</div>`;
}

function popupHtml(loc: string, plots: Plot[]) {
  const rows = plots
    .slice()
    .sort((a, b) => a.price - b.price)
    .map((p) => {
      const perSqm = Math.round(p.price / p.sqm);
      const tone = p.status === "no" ? "#C0492F" : p.status === "in" ? "#2E93A6" : "#D9A441";
      const label = p.status === "no" ? "non edificabile" : p.status === "in" ? "entro piano" : "fuori piano";
      return `<li style="margin:0 0 4px">
        <a href="#/terreni/${p.id}" style="
            display:flex;gap:9px;align-items:center;padding:6px;border-radius:10px;
            text-decoration:none;color:inherit">
          ${thumbHtml(p)}
          <span style="min-width:0">
            <b style="color:#0F3440">${fmt(p.price)} €</b>
            <span style="color:#4A6B75">· ${fmt(p.sqm)} m² · ${perSqm} €/m²</span>
            <span style="display:block;font-size:11px;color:${tone}">${label}</span>
            <span style="display:block;font-size:11px;color:#93A9B0;
                         overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(p.note)}</span>
          </span>
        </a>
      </li>`;
    })
    .join("");

  return `<div style="font-family:inherit">
    <p style="margin:0 0 1px;font-weight:600;color:#0F3440">${esc(loc)}</p>
    <p style="margin:0 0 6px;font-size:11px;color:#93A9B0">${esc(plots[0].zone)}</p>
    <ul style="margin:0;padding:0;list-style:none;font-size:12px">${rows}</ul>
    <p style="margin:6px 0 0;font-size:11px;color:#93A9B0">Tocca un terreno per la scheda completa.</p>
  </div>`;
}

export default function PlotsMap() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!box.current) return;

    const map = L.map(box.current, {
      center: KEFALONIA_CENTER,
      zoom: 10,
      // Su telefono la rotella/lo scroll deve scorrere la pagina, non zoomare.
      scrollWheelZoom: false,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const groups = groupByLocality();
    const markers: L.Marker[] = [];

    for (const [loc, plots] of groups) {
      const { lat, lng } = LOCALITIES[loc];
      const min = Math.min(...plots.map((p) => p.price));
      // divIcon invece dell'icona predefinita: quella carica un PNG da un
      // percorso esterno, che nel bundle a file singolo non esisterebbe.
      // Pillola stretta col solo prezzo: i paesi di Livathos distano poche
      // centinaia di metri e le etichette per esteso si sovrapponevano.
      const icon = L.divIcon({
        className: "",
        html: `<div style="
            transform:translate(-50%,-50%);white-space:nowrap;
            background:#0F3440;color:#fff;border:2px solid #fff;border-radius:999px;
            padding:2px 8px;font-size:11px;font-weight:700;line-height:1.5;
            box-shadow:0 1px 4px rgba(0,0,0,.35)">
            ${Math.round(min / 1000)}k${plots.length > 1 ? `<span style="opacity:.65;font-weight:400"> ×${plots.length}</span>` : ""}
          </div>`,
        iconSize: [0, 0],
      });

      markers.push(
        L.marker([lat, lng], { icon, title: loc })
          .addTo(map)
          .bindTooltip(loc, { direction: "top", offset: [0, -10] })
          .bindPopup(popupHtml(loc, plots), { minWidth: 210 }),
      );
    }

    if (markers.length) {
      map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [50, 50] });
    }

    return () => { map.remove(); };
  }, []);

  const unverified = Object.values(LOCALITIES).filter((l) => !l.verified).length;

  return (
    <div>
      <div ref={box} className="h-[420px] w-full rounded-2xl overflow-hidden border border-[#E4EDEC] z-0" />
      <p className="mt-2 text-xs text-[#93A9B0]">
        I segnaposto indicano la <b>località</b>, non il confine del lotto: la posizione è
        indicativa e va confermata con l&apos;agenzia.
        {unverified > 0 && " Coordinate in corso di verifica."}
      </p>
    </div>
  );
}
