import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, MapPin, X, Calendar } from "lucide-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AppShell } from "../components/AppShell";
import { events, type DartEvent } from "../data/events";
import { makeDartPin } from "../components/MapPin";
import { LeagueBadge } from "../components/Cards";

const filters = ["Alle", "Profi", "A-Klasse", "B-Klasse", "C-Klasse", "NDL"];

export default function MapScreen() {
  const [selected, setSelected] = useState<DartEvent | null>(events[0]);
  const [filter, setFilter] = useState("Alle");
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = events.filter((e) => {
    const matchFilter = filter === "Alle" || e.league === filter;
    const matchQuery = !query || e.title.toLowerCase().includes(query.toLowerCase()) || e.city.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  return (
    <AppShell fullHeight>
      <div className="flex flex-col" style={{ height: 'calc(100dvh - 72px - env(safe-area-inset-bottom, 0px))' }}>
        {/* Top Search Bar */}
        <div className="px-4 pt-4 pb-2 bg-bg-surface z-30 relative">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-mid" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Events oder Orte suchen"
                className="w-full h-12 pl-11 pr-4 bg-surface-gray rounded-pill text-sm font-medium text-ink placeholder:text-ink-mid focus:outline-none focus:ring-2 focus:ring-orange/50 transition"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-95 ${
                showFilters ? "bg-orange text-white shadow-orange" : "bg-bg-surface border border-white/10 shadow-soft"
              }`}
            >
              <SlidersHorizontal size={20} strokeWidth={2.5} className={showFilters ? "text-white" : "text-ink"} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange" />
            </button>
          </div>

          {/* Filter chips */}
          {showFilters && (
            <div className="flex gap-2 overflow-x-auto scroll-hide mt-3 pb-1">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-pill text-sm font-semibold whitespace-nowrap transition active:scale-95 ${
                    filter === f
                      ? "bg-orange text-white shadow-orange"
                      : "bg-bg-surface border border-white/10 text-ink"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={[51.16, 10.45]}
            zoom={6}
            scrollWheelZoom
            zoomControl={false}
            attributionControl={false}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            {filtered.map((event) => (
              <Marker
                key={event.id}
                position={[event.lat, event.lng]}
                icon={makeDartPin(event.pinColor, event.isFeatured)}
                eventHandlers={{
                  click: () => setSelected(event),
                }}
              />
            ))}
          </MapContainer>

          {/* Bottom Sheet */}
          {selected && (
            <div className="absolute bottom-0 left-0 right-0 bg-bg-surface rounded-t-3xl shadow-elevated z-[450] animate-fade-up border-t border-white/10">
              <div className="flex justify-center pt-2">
                <div className="w-10 h-1 rounded-full bg-ink-light" />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="mb-2"><LeagueBadge league={selected.league} /></div>
                    <h3 className="text-xl font-black text-ink leading-tight tracking-tight">{selected.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-9 h-9 rounded-full bg-surface-gray flex items-center justify-center"
                    aria-label="Schließen"
                  >
                    <X size={16} className="text-ink" />
                  </button>
                </div>

                <div className="flex items-center gap-3 text-sm text-ink-mid mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-orange" />
                    <span>{selected.city}, {selected.venue}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-ink-mid mb-4">
                  <Calendar size={14} className="text-orange" />
                  <span>{selected.dateLabel}</span>
                </div>

                <Link
                  to={`/events/${selected.slug}`}
                  className="block w-full bg-orange hover:bg-orange-bright text-white font-semibold text-center py-3.5 rounded-pill shadow-orange transition active:scale-95"
                >
                  Mehr erfahren
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
