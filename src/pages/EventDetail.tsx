import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronDown, MapPin, Calendar, Trophy, Users as UsersIcon, Share2, Heart, ChevronLeft } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { getEventBySlug, events } from "../data/events";
import { getPlayerBySlug } from "../data/players";
import { LeagueBadge } from "../components/Cards";

const sections = [
  { id: "info", label: "Event Infos" },
  { id: "schedule", label: "Spielplan" },
  { id: "location", label: "Ort & Anreise" },
  { id: "tickets", label: "Tickets" },
];

export default function EventDetail() {
  const { slug } = useParams();
  const event = slug ? getEventBySlug(slug) : null;
  const [open, setOpen] = useState<string | null>("info");

  if (!event) {
    return (
      <AppShell>
        <div className="p-8 text-center">
          <p className="text-ink-mid">Event nicht gefunden.</p>
          <Link to="/" className="text-orange font-semibold mt-4 inline-block">← Zurück zur Startseite</Link>
        </div>
      </AppShell>
    );
  }

  const participants = event.participants
    .map((s) => getPlayerBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <AppShell hasBottomBar>
      {/* HERO */}
      <div className="relative h-[420px]">
        <img src={event.heroImage} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-6">
          <button
            onClick={() => window.history.back()}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-soft active:scale-95"
          >
            <ChevronLeft size={20} className="text-ink" strokeWidth={2.5} />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-soft active:scale-95">
              <Heart size={18} className="text-ink" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-soft active:scale-95">
              <Share2 size={18} className="text-ink" />
            </button>
          </div>
        </div>
      </div>

      {/* INFO CARD (overlapping hero) */}
      <div className="relative -mt-16 px-4">
        <div className="bg-white rounded-3xl shadow-elevated p-6 border border-black/[0.04]">
          <div className="mb-3"><LeagueBadge league={event.league} /></div>
          <h1 className="text-2xl font-black text-ink leading-tight tracking-tight">{event.title}</h1>
          <div className="mt-2 flex items-center gap-1.5 text-orange font-bold text-sm uppercase tracking-wider">
            <Calendar size={14} />
            <span>{event.dateLabel}{event.time && ` · ${event.time}`}</span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="bg-surface-gray rounded-2xl p-3 text-center">
              <Trophy size={18} className="text-orange mx-auto mb-1.5" />
              <p className="text-xs text-ink-mid font-medium">Preisgeld</p>
              <p className="font-black text-ink text-sm mt-0.5 tabular">{event.prizeMoney.toLocaleString("de-DE")} €</p>
            </div>
            <div className="bg-surface-gray rounded-2xl p-3 text-center">
              <UsersIcon size={18} className="text-orange mx-auto mb-1.5" />
              <p className="text-xs text-ink-mid font-medium">Teilnehmer</p>
              <p className="font-black text-ink text-sm mt-0.5 tabular">{event.participants.length}+</p>
            </div>
            <div className="bg-surface-gray rounded-2xl p-3 text-center">
              <MapPin size={18} className="text-orange mx-auto mb-1.5" />
              <p className="text-xs text-ink-mid font-medium">Ort</p>
              <p className="font-black text-ink text-sm mt-0.5">{event.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PARTICIPANTS */}
      <section className="mt-6 px-4">
        <h2 className="text-lg font-black text-ink tracking-tight mb-3">Teilnehmer</h2>
        <div className="grid grid-cols-4 gap-3">
          {participants.slice(0, 8).map((p) => (
            <Link key={p.id} to={`/spieler/${p.slug}`} className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-orange/70 shadow-soft group-hover:ring-orange group-hover:scale-105 transition-all">
                <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <p className="font-bold text-[11px] text-ink mt-1.5 text-center line-clamp-1">{p.shortName}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="px-4 mt-6">
        <p className="text-sm text-ink-soft leading-relaxed">{event.description}</p>
      </section>

      {/* ACCORDION */}
      <section className="px-4 mt-6 space-y-2">
        {sections.map((s) => (
          <div key={s.id} className="bg-white border border-black/[0.06] rounded-2xl shadow-soft overflow-hidden">
            <button
              onClick={() => setOpen(open === s.id ? null : s.id)}
              className="w-full px-5 py-4 flex items-center justify-between transition hover:bg-surface-gray"
            >
              <span className="font-bold text-ink">{s.label}</span>
              <ChevronDown
                size={20}
                className={`text-ink-mid transition-transform ${open === s.id ? "rotate-180" : ""}`}
              />
            </button>
            {open === s.id && (
              <div className="px-5 pb-5 pt-1 text-sm text-ink-soft animate-fade-up">
                {s.id === "info" && (
                  <div className="space-y-2">
                    <p><span className="font-semibold">Format:</span> {event.format}</p>
                    <p><span className="font-semibold">Preisgeld:</span> {event.prizeMoney.toLocaleString("de-DE")} €</p>
                    <p><span className="font-semibold">Veranstalter:</span> Steel Club Darts</p>
                    <p><span className="font-semibold">Sponsoren:</span> Steel Club Darts, Dr. Fischer, Kleinigkeit</p>
                  </div>
                )}
                {s.id === "schedule" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-black/5">
                      <span>Einlass</span>
                      <span className="font-semibold text-ink">12:00 Uhr</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-black/5">
                      <span>Vorrunde</span>
                      <span className="font-semibold text-ink">14:00 Uhr</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-black/5">
                      <span>Halbfinale</span>
                      <span className="font-semibold text-ink">18:30 Uhr</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span>Finale</span>
                      <span className="font-semibold text-ink">21:00 Uhr</span>
                    </div>
                  </div>
                )}
                {s.id === "location" && (
                  <div>
                    <p className="font-semibold text-ink">{event.venue}</p>
                    <p className="mt-1">{event.city}, Deutschland</p>
                    <button className="mt-3 text-orange font-semibold">In Google Maps öffnen →</button>
                  </div>
                )}
                {s.id === "tickets" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-surface-gray rounded-xl">
                      <div>
                        <p className="font-bold text-ink">Standard</p>
                        <p className="text-xs text-ink-mid">Eintritt + Drink</p>
                      </div>
                      <p className="font-black text-orange text-lg tabular">39 €</p>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-surface-gray rounded-xl">
                      <div>
                        <p className="font-bold text-ink">VIP</p>
                        <p className="text-xs text-ink-mid">Erste Reihe, Catering</p>
                      </div>
                      <p className="font-black text-orange text-lg tabular">89 €</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* SIMILAR EVENTS */}
      <section className="mt-8">
        <h2 className="px-4 text-lg font-black text-ink tracking-tight mb-3">Ähnliche Events</h2>
        <div className="flex gap-3 overflow-x-auto scroll-hide snap-x scroll-pl-4 scroll-pr-4 px-4 pb-2">
          {events.filter(e => e.slug !== event.slug && e.league === event.league).slice(0, 4).map((e) => (
            <Link key={e.id} to={`/events/${e.slug}`} className="w-[200px] flex-shrink-0 snap-start bg-white border border-black/[0.06] rounded-2xl shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img src={e.image} alt={e.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm text-ink line-clamp-2">{e.title}</h3>
                <p className="text-xs text-orange font-semibold mt-1">{e.dateLabel}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STICKY BOTTOM CTA — sits ABOVE the BottomNav */}
      <div className="fixed left-0 right-0 bg-ink p-4 z-40 shadow-elevated" style={{ bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}>
        <div className="max-w-screen-lg mx-auto flex gap-3">
          <button className="flex-1 bg-orange hover:bg-orange-bright text-white font-bold py-3.5 rounded-pill shadow-orange transition active:scale-95">
            Tickets kaufen
          </button>
          <button className="flex-1 border-2 border-white text-white font-bold py-3.5 rounded-pill transition active:scale-95 hover:bg-white hover:text-ink">
            Live ansehen
          </button>
        </div>
      </div>

      <div className="h-24" />
    </AppShell>
  );
}
