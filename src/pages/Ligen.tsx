import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, TrendingUp } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { TopBar } from "../components/TopBar";
import { players } from "../data/players";

const ligaTabs: Array<"Profi" | "A-Klasse" | "B-Klasse" | "C-Klasse" | "NDL"> = ["Profi", "A-Klasse", "B-Klasse", "C-Klasse", "NDL"];

export default function Ligen() {
  const [tab, setTab] = useState<"Profi" | "A-Klasse" | "B-Klasse" | "C-Klasse" | "NDL">("Profi");
  const ranked = players.filter((p) => p.league === tab).sort((a, b) => a.rank - b.rank);
  const ownPlayerSlug = "jonny-clayton"; // demo: highlight Clayton as "me" in Profi

  return (
    <AppShell>
      <TopBar />

      <div className="px-4 mt-2">
        <h1 className="text-3xl font-black text-ink tracking-tight">Ligen & Ranglisten</h1>
        <p className="text-sm text-ink-mid mt-1">Von der C-Klasse bis zur Profiliga</p>
      </div>

      {/* TAB NAV */}
      <div className="mt-5 border-b border-white/10 sticky top-16 bg-bg-surface/95 backdrop-blur-xl z-20">
        <div className="flex overflow-x-auto scroll-hide px-4">
          {ligaTabs.map((l) => (
            <button
              key={l}
              onClick={() => setTab(l)}
              className="relative px-4 py-3.5 whitespace-nowrap text-sm font-semibold transition"
            >
              <span className={tab === l ? "text-orange" : "text-ink-mid"}>{l}</span>
              {tab === l && (
                <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-orange rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* HEADER ROW */}
      <div className="px-4 pt-4 pb-2">
        <div className="grid grid-cols-[40px_1fr_auto] gap-3 px-2 text-[11px] font-bold uppercase tracking-wider text-ink-mid">
          <span>Rang</span>
          <span>Spieler</span>
          <span>Punkte</span>
        </div>
      </div>

      {/* RANKING LIST */}
      <div className="px-4 flex flex-col gap-2">
        {ranked.length === 0 && (
          <div className="bg-surface-gray rounded-2xl p-8 text-center text-ink-mid text-sm">
            Noch keine Spieler in dieser Liga registriert.
          </div>
        )}
        {ranked.map((p) => {
          const isMe = p.slug === ownPlayerSlug;
          return (
            <Link
              key={p.id}
              to={`/spieler/${p.slug}`}
              className={`grid grid-cols-[40px_1fr_auto] items-center gap-3 px-4 py-3 rounded-2xl transition hover:-translate-y-0.5 ${
                isMe
                  ? "bg-orange text-white shadow-orange"
                  : "bg-bg-surface border border-white/10 shadow-soft hover:shadow-card"
              }`}
            >
              <div className="flex items-center gap-2">
                {p.rank <= 3 ? (
                  <Trophy
                    size={18}
                    className={p.rank === 1 ? "text-yellow-400" : p.rank === 2 ? "text-ink-light" : "text-amber-500"}
                    fill={isMe ? "white" : "currentColor"}
                  />
                ) : (
                  <span className={`font-black text-base tabular ${isMe ? "text-white" : "text-ink"}`}>{p.rank}.</span>
                )}
              </div>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white shadow-soft flex-shrink-0">
                  <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className={`font-bold text-sm truncate ${isMe ? "text-white" : "text-ink"}`}>{p.name}</p>
                  <p className={`text-xs ${isMe ? "text-white/80" : "text-ink-mid"}`}>{p.flag} {p.nationality}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-black text-base tabular ${isMe ? "text-white" : "text-ink"}`}>{p.points.toLocaleString("de-DE")}</p>
                <p className={`text-[11px] ${isMe ? "text-white/80" : "text-ink-mid"}`}>Punkte</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* STATS PANEL */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-br from-orange/10 to-orange/5 rounded-3xl p-5 border border-orange/20">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple/15 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={22} className="text-orange" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-ink">Aufstiegs-Chance</h3>
              <p className="text-sm text-ink-mid mt-1">Mit weiteren 50 Punkten qualifizierst du dich für das nächste Liga-Level.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA at bottom of content */}
      <div className="px-4 mt-8 mb-4">
        <button className="w-full bg-orange hover:bg-orange-bright text-white font-bold py-4 rounded-pill shadow-orange-strong transition active:scale-95">
          Turnier anmelden
        </button>
      </div>
    </AppShell>
  );
}
