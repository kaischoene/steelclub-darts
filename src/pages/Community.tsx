import { Link } from "react-router-dom";
import { ChevronRight, Trophy, Activity } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { TopBar } from "../components/TopBar";
import { players } from "../data/players";

const friends = players.filter((p) => ["max-hopp", "peter-wright", "michael-van-gerwen", "gerwyn-price"].includes(p.slug));

const challenges = [
  { mode: "Best-of-5", opponent: "Florian Stein", score: "3 - 2", winning: true },
  { mode: "Cricket", opponent: "Laura Müller", score: "1 - 0", winning: true },
];

const activities = [
  { user: "Max Hopp", action: "hat gerade 180 geworfen!", time: "Gerade eben" },
  { user: "Anna S.", action: "hat eine Herausforderung angenommen", time: "vor 5 Min" },
  { user: "Peter Wright", action: "ist jetzt Liga-Erster", time: "vor 12 Min" },
  { user: "Lukas M.", action: "hat ein neues 10er-Set bestellt", time: "vor 1 Std" },
];

const leaderboard = [
  { name: "Phil Taylor", points: 1500 },
  { name: "Gary Anderson", points: 1450 },
  { name: "Rob Cross", points: 1400 },
  { name: "Maximilian Müller", points: 1380 },
  { name: "Max Hopp", points: 1320 },
];

export default function Community() {
  return (
    <AppShell>
      <TopBar showBack title="Community" />

      <div className="px-4 mt-2 mb-1">
        <h1 className="text-3xl font-black text-ink tracking-tight">Community & Social</h1>
        <p className="text-sm text-ink-mid mt-1">Spielen, vernetzen, herausfordern</p>
      </div>

      {/* FRIENDS */}
      <section className="mt-6 px-4">
        <h2 className="text-lg font-black text-ink mb-3 tracking-tight">Freunde</h2>
        <div className="bg-white border border-black/[0.06] rounded-3xl shadow-soft overflow-hidden divide-y divide-black/[0.04]">
          {friends.map((f) => (
            <div key={f.id} className="flex items-center gap-3 p-3">
              <Link to={`/spieler/${f.slug}`} className="relative flex-shrink-0">
                <img src={f.avatar} alt={f.name} className="w-11 h-11 rounded-full ring-2 ring-orange/30" />
                {f.isOnline ? (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-online ring-2 ring-white" />
                ) : (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-ink-light ring-2 ring-white" />
                )}
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/spieler/${f.slug}`}>
                  <p className="font-bold text-sm text-ink truncate">{f.shortName}</p>
                </Link>
                <p className="text-xs text-ink-mid">
                  {f.isOnline ? <><span className="text-online">●</span> Online</> : `● ${f.lastSeen || "Offline"}`}
                </p>
              </div>
              <button className="bg-orange text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-pill flex items-center gap-1 transition active:scale-95 hover:bg-orange-bright">
                Herausfordern
                <ChevronRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVE CHALLENGES */}
      <section className="mt-6 px-4">
        <h2 className="text-lg font-black text-ink mb-3 tracking-tight">Aktive Herausforderungen</h2>
        <div className="grid grid-cols-2 gap-3">
          {challenges.map((c, i) => (
            <div key={i} className="bg-white border border-black/[0.06] rounded-2xl p-4 shadow-soft">
              <p className="text-xs text-ink-mid">{c.mode}</p>
              <p className="text-sm font-semibold text-ink mt-0.5">vs. {c.opponent}</p>
              <p className="text-3xl font-black text-orange mt-3 tabular">{c.score}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVITY FEED */}
      <section className="mt-6 px-4">
        <h2 className="text-lg font-black text-ink mb-3 tracking-tight flex items-center gap-2">
          <Activity size={18} />
          Aktivitäts-Feed
        </h2>
        <div className="bg-white border border-black/[0.06] rounded-3xl shadow-soft divide-y divide-black/[0.04]">
          {activities.map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5">
              <div className="w-2 h-2 rounded-full bg-orange mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-ink-soft">
                  <span className="font-bold text-ink">{a.user}</span> {a.action}
                </p>
                <p className="text-xs text-ink-mid mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="mt-6 px-4 mb-8">
        <h2 className="text-lg font-black text-ink mb-3 tracking-tight flex items-center gap-2">
          <Trophy size={18} />
          Punkte-Rangliste
        </h2>
        <div className="bg-white border border-black/[0.06] rounded-3xl shadow-soft overflow-hidden divide-y divide-black/[0.04]">
          {leaderboard.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3 px-4 py-3">
              <span className={`w-6 font-black ${i < 3 ? "text-orange" : "text-ink-mid"}`}>{i + 1}.</span>
              <span className="flex-1 font-semibold text-ink text-sm">{p.name}</span>
              <span className="font-bold text-ink tabular">{p.points} Pkt.</span>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
