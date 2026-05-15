import { Link } from "react-router-dom";
import { ChevronRight, Target, Users as UsersIcon, Radio as RadioIcon, ArrowRight } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { TopBar } from "../components/TopBar";
import { EventCard, PlayerCard, NewsCard, ProductCard, StreamCard, LiveDot } from "../components/Cards";
import { events } from "../data/events";
import { players } from "../data/players";
import { news } from "../data/news";
import { products } from "../data/products";
import { streams } from "../data/streams";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { makeDartPin } from "../components/MapPin";

const featuredEvents = events.filter((e) => e.isFeatured).slice(0, 3);
const nearbyEvents = events.filter((e) => !e.isFeatured).slice(0, 6);
const featuredPlayers = players.slice(0, 8);
const liveStreams = streams.filter((s) => s.isLive);

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroIndex((i) => (i + 1) % featuredEvents.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <AppShell>
      <TopBar />

      {/* HERO CAROUSEL */}
      <section className="px-4 mt-3">
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-elevated">
          {featuredEvents.map((event, i) => (
            <Link
              key={event.id}
              to={`/events/${event.slug}`}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === heroIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="inline-flex self-start items-center px-2.5 py-1 rounded-pill bg-orange text-white text-[10px] font-bold uppercase tracking-wider mb-3 shadow-orange">
                  {event.league} · Featured
                </span>
                <h2 className="text-3xl font-black text-white leading-[0.95] tracking-tight max-w-[80%]">
                  {event.title}
                </h2>
                <p className="text-orange font-bold text-sm mt-2">{event.dateLabel}</p>
              </div>
            </Link>
          ))}

          {/* Pagination Dots */}
          <div className="absolute bottom-3 right-4 flex gap-1.5">
            {featuredEvents.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === heroIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="px-4 mt-6">
        <div className="grid grid-cols-3 gap-3">
          <Link
            to="/scorer"
            className="group flex flex-col items-center justify-center bg-bg-surface border border-white/10 rounded-2xl py-4 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-purple/15 flex items-center justify-center mb-2 group-hover:bg-purple/25 transition-colors">
              <Target size={22} className="text-orange" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xs text-ink">KI-Scorer</span>
            <span className="text-[10px] text-ink-mid mt-0.5">Spielen</span>
          </Link>
          <Link
            to="/community"
            className="group flex flex-col items-center justify-center bg-bg-surface border border-white/10 rounded-2xl py-4 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-purple/15 flex items-center justify-center mb-2 group-hover:bg-purple/25 transition-colors">
              <UsersIcon size={22} className="text-orange" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xs text-ink">Community</span>
            <span className="text-[10px] text-ink-mid mt-0.5">Freunde</span>
          </Link>
          <Link
            to="/malle-pally"
            className="group relative flex flex-col items-center justify-center bg-gradient-to-br from-orange to-orange-dark rounded-2xl py-4 shadow-orange hover:shadow-orange-strong hover:-translate-y-1 transition-all overflow-hidden"
          >
            <div className="w-11 h-11 rounded-xl bg-bg-surface/20 backdrop-blur flex items-center justify-center mb-2">
              <RadioIcon size={22} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xs text-white">Malle Pally</span>
            <span className="text-[10px] text-white/80 mt-0.5">47 Tage</span>
          </Link>
        </div>
      </section>

      {/* LIVE NOW */}
      {liveStreams.length > 0 && (
        <section className="mt-8">
          <div className="px-4 flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-ink flex items-center gap-2 tracking-tight">
              <LiveDot />
              <span>Live jetzt</span>
            </h2>
            <Link to="/streams" className="text-sm font-semibold text-orange flex items-center gap-1 hover:gap-2 transition-all">
              Alle <ChevronRight size={16} />
            </Link>
          </div>
          <div className="px-4">
            <StreamCard stream={liveStreams[0]} large />
          </div>
        </section>
      )}

      {/* EVENTS IN DEINER NÄHE */}
      <section className="mt-8">
        <div className="px-4 flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-ink tracking-tight">Events in deiner Nähe</h2>
          <Link to="/karte" className="text-sm font-semibold text-orange flex items-center gap-1 hover:gap-2 transition-all">
            Alle <ChevronRight size={16} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scroll-hide snap-x scroll-pl-4 scroll-pr-4 px-4 pb-2">
          {nearbyEvents.map((event) => (
            <EventCard key={event.id} event={event} compact />
          ))}
        </div>
      </section>

      {/* GERMANY MAP */}
      <section className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-ink tracking-tight">Events in ganz Deutschland</h2>
            <p className="text-xs text-ink-mid mt-0.5">Tippe auf einen Pin für Details</p>
          </div>
          <Link to="/karte" className="text-sm font-semibold text-orange flex items-center gap-1 hover:gap-2 transition-all">
            Vollkarte <ChevronRight size={16} />
          </Link>
        </div>
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-card h-[320px]">
          <MapContainer
            center={[51.16, 10.45]}
            zoom={5.5}
            scrollWheelZoom={false}
            zoomControl={false}
            attributionControl={false}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            {events.filter(e => e.lat > 47 && e.lat < 55 && e.lng > 5 && e.lng < 16).map((event) => (
              <Marker
                key={event.id}
                position={[event.lat, event.lng]}
                icon={makeDartPin(event.pinColor, event.isFeatured)}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-bold text-ink mb-1">{event.title}</p>
                    <p className="text-xs text-ink-mid mb-2">{event.city} · {event.dateLabel}</p>
                    <Link to={`/events/${event.slug}`} className="text-orange font-semibold text-xs">
                      Details ansehen →
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Legend overlay */}
          <div className="absolute top-3 left-3 bg-bg-surface/95 backdrop-blur-md rounded-2xl shadow-card p-3 border border-white/10">
            <div className="flex items-center gap-1.5 text-[10px] mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange" />
              <span className="font-semibold text-ink">Profi</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="font-semibold text-ink">A-Klasse</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="w-2.5 h-2.5 rounded-full bg-ink-mid" />
              <span className="font-semibold text-ink">B/C-Klasse</span>
            </div>
          </div>

          {/* CTA overlay */}
          <Link
            to="/karte"
            className="absolute bottom-4 right-4 bg-orange hover:bg-orange-bright text-white font-semibold text-sm px-4 py-2.5 rounded-pill shadow-orange flex items-center gap-1.5 transition-all active:scale-95"
          >
            Vollständige Karte
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* SPIELER IM FOKUS */}
      <section className="mt-8">
        <div className="px-4 flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-ink tracking-tight">Spieler im Fokus</h2>
          <Link to="/ligen" className="text-sm font-semibold text-orange flex items-center gap-1 hover:gap-2 transition-all">
            Alle <ChevronRight size={16} />
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto scroll-hide snap-x scroll-pl-4 scroll-pr-4 px-4 pb-2">
          {featuredPlayers.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section className="mt-8">
        <div className="px-4 flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-ink tracking-tight">News & Stories</h2>
          <Link to="/news" className="text-sm font-semibold text-orange flex items-center gap-1 hover:gap-2 transition-all">
            Alle <ChevronRight size={16} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scroll-hide snap-x scroll-pl-4 scroll-pr-4 px-4 pb-2">
          {news.slice(0, 4).map((article) => (
            <NewsCard key={article.id} article={article} compact />
          ))}
        </div>
      </section>

      {/* SHOP */}
      <section className="mt-8">
        <div className="px-4 flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-ink tracking-tight">ICON Shop</h2>
          <Link to="/shop" className="text-sm font-semibold text-orange flex items-center gap-1 hover:gap-2 transition-all">
            Zum Shop <ChevronRight size={16} />
          </Link>
        </div>
        <div className="px-4 grid grid-cols-2 gap-3">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <div className="h-8" />
    </AppShell>
  );
}
