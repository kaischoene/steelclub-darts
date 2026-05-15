import { useParams, Link } from "react-router-dom";
import { BadgeCheck, ChevronLeft, MoreVertical, Target, ArrowUp, Equal, Activity, Globe } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { getPlayerBySlug } from "../data/players";
import { events } from "../data/events";

export default function PlayerDetail() {
  const { slug } = useParams();
  const player = slug ? getPlayerBySlug(slug) : null;

  if (!player) {
    return (
      <AppShell>
        <div className="p-8 text-center">
          <p className="text-ink-mid">Spieler nicht gefunden.</p>
          <Link to="/" className="text-orange font-semibold mt-4 inline-block">← Startseite</Link>
        </div>
      </AppShell>
    );
  }

  const upcomingEvents = events.filter(e => e.participants.includes(player.slug)).slice(0, 3);

  return (
    <AppShell hasBottomBar>
      {/* Subtle gradient background */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange/8 to-transparent pointer-events-none" />

        {/* TOP BAR */}
        <div className="relative flex items-center justify-between p-4 pt-6">
          <button
            onClick={() => window.history.back()}
            className="w-10 h-10 rounded-full bg-bg-surface shadow-soft border border-white/10 flex items-center justify-center active:scale-95"
          >
            <ChevronLeft size={20} className="text-ink" strokeWidth={2.5} />
          </button>
          <button className="w-10 h-10 rounded-full bg-bg-surface shadow-soft border border-white/10 flex items-center justify-center active:scale-95">
            <MoreVertical size={18} className="text-ink" />
          </button>
        </div>

        {/* AVATAR HERO */}
        <div className="relative flex flex-col items-center pt-2 pb-6 px-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-orange shadow-orange">
              <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
            </div>
            {player.verified && (
              <span className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-orange ring-4 ring-white flex items-center justify-center shadow-soft">
                <BadgeCheck size={18} className="text-white" strokeWidth={3} />
              </span>
            )}
          </div>
          <h1 className="text-2xl font-black text-ink tracking-tight mt-4">{player.name}</h1>
          <p className="text-sm text-ink-mid mt-1">{player.flag} {player.nationality} · {player.league}</p>
        </div>
      </div>

      {/* STATS GRID */}
      <section className="px-4 grid grid-cols-2 gap-3">
        <StatCard label="Average" value={player.stats.average} icon={<Target size={18} className="text-orange" />} />
        <StatCard label="Doppelquote" value={`${player.stats.doubleQuote}%`} icon={<Equal size={18} className="text-orange" />} />
        <StatCard label="180er" value={player.stats.oneEighties} icon={<Activity size={18} className="text-orange" />} />
        <StatCard label="Ranglistenposition" value={`${player.stats.rank}.`} icon={<ArrowUp size={18} className="text-orange" />} />
      </section>

      {/* META INFO */}
      <section className="px-4 mt-6">
        <div className="bg-bg-surface border border-white/10 rounded-2xl p-5 shadow-soft space-y-3">
          {player.hand && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-mid">Wurfhand</span>
              <span className="font-bold text-ink">{player.hand}</span>
            </div>
          )}
          {player.walkOnSong && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-mid">Walk-on Song</span>
              <span className="font-bold text-ink text-right max-w-[60%] truncate">{player.walkOnSong}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-mid">Karriere-Preisgeld</span>
            <span className="font-bold text-orange tabular">{player.prize.toLocaleString("de-DE")} €</span>
          </div>
        </div>
      </section>

      {/* KOMMENDE TURNIERE */}
      {upcomingEvents.length > 0 && (
        <section className="mt-6 px-4">
          <h2 className="text-lg font-black text-ink tracking-tight mb-3">Kommende Turniere</h2>
          <div className="flex gap-3 overflow-x-auto scroll-hide snap-x pb-2 -mx-4 px-4">
            {upcomingEvents.map((e) => (
              <Link key={e.id} to={`/events/${e.slug}`} className="w-[180px] flex-shrink-0 snap-start bg-bg-surface border border-white/10 rounded-2xl shadow-soft hover:shadow-card hover:-translate-y-1 transition-all p-4">
                <p className="font-bold text-sm text-ink line-clamp-2 leading-snug">{e.title}</p>
                <p className="text-xs text-orange font-semibold mt-1">{e.dateLabel}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SOCIAL */}
      <section className="px-4 mt-6 flex justify-center gap-3">
        <button className="w-12 h-12 rounded-full bg-bg-surface border border-white/10 shadow-soft flex items-center justify-center hover:bg-orange hover:text-white hover:border-orange transition-all active:scale-95" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>
        </button>
        <button className="w-12 h-12 rounded-full bg-bg-surface border border-white/10 shadow-soft flex items-center justify-center hover:bg-orange hover:text-white hover:border-orange transition-all active:scale-95" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        </button>
        <button className="w-12 h-12 rounded-full bg-bg-surface border border-white/10 shadow-soft flex items-center justify-center hover:bg-orange hover:text-white hover:border-orange transition-all active:scale-95" aria-label="Website">
          <Globe size={20} />
        </button>
      </section>

      {/* BOTTOM CTA — sits ABOVE the BottomNav */}
      <div className="fixed left-0 right-0 bg-bg-base p-4 z-40 shadow-elevated" style={{ bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}>
        <div className="max-w-screen-lg mx-auto flex gap-3">
          <button className="flex-1 bg-orange hover:bg-orange-bright text-white font-bold py-3.5 rounded-pill shadow-orange transition active:scale-95">
            Folgen
          </button>
          <button className="flex-1 border-2 border-orange text-orange font-bold py-3.5 rounded-pill transition active:scale-95 hover:bg-orange hover:text-white">
            Herausfordern
          </button>
        </div>
      </div>

      <div className="h-32" />
    </AppShell>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="bg-bg-surface border border-white/10 rounded-2xl p-4 shadow-soft">
      <div className="flex items-start justify-between">
        <p className="text-xs text-ink-mid font-medium">{label}</p>
        {icon}
      </div>
      <p className="text-3xl font-black text-orange mt-2 tabular tracking-tight">{value}</p>
    </div>
  );
}
