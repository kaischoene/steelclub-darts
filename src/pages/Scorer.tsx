import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { TopBar } from "../components/TopBar";
import { Camera, RotateCcw, Save, Target, TrendingUp } from "lucide-react";

export default function Scorer() {
  const [scores] = useState({ p1: 301, p2: 286 });
  const [legs] = useState({ p1: 3, p2: 2 });
  const [activePlayer] = useState(1);
  const [cameraOn, setCameraOn] = useState(true);

  return (
    <AppShell>
      <TopBar showBack title="KI-Scorer" />

      {/* SCORE PANEL */}
      <section className="px-4 mt-3">
        <div className="grid grid-cols-2 gap-3">
          <ScoreBox label="Spieler 1" score={scores.p1} legs={legs.p1} active={activePlayer === 1} />
          <ScoreBox label="Spieler 2" score={scores.p2} legs={legs.p2} active={activePlayer === 2} />
        </div>
      </section>

      {/* DARTBOARD */}
      <section className="px-4 mt-5">
        <div className="relative aspect-square bg-bg-base rounded-3xl shadow-elevated overflow-hidden">
          <img
            src="/img/products/professional-dartboard.jpg"
            alt="Dartboard"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Hit markers */}
          <div className="absolute" style={{ top: "22%", left: "48%" }}>
            <div className="w-5 h-5 rounded-full bg-orange shadow-[0_0_20px_rgba(255,122,0,0.9)] animate-pulse" />
          </div>
          <div className="absolute" style={{ top: "35%", left: "55%" }}>
            <div className="w-5 h-5 rounded-full bg-orange shadow-[0_0_20px_rgba(255,122,0,0.9)] animate-pulse" />
          </div>
          <div className="absolute" style={{ top: "48%", left: "35%" }}>
            <div className="w-5 h-5 rounded-full bg-orange shadow-[0_0_20px_rgba(255,122,0,0.9)] animate-pulse" />
          </div>

          {/* Camera Toggle */}
          <button
            onClick={() => setCameraOn(!cameraOn)}
            className={`absolute top-4 right-4 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition active:scale-95 ${
              cameraOn ? "bg-orange shadow-orange" : "bg-bg-surface/20"
            }`}
          >
            <Camera size={20} className="text-white" />
          </button>

          {cameraOn && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur text-white px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse-dot" />
              KI Tracking
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 mt-5">
        <div className="grid grid-cols-3 gap-3">
          <StatTile label="Average" value="75.3" />
          <StatTile label="Doppelquote" value="42%" />
          <StatTile label="180er" value="2" />
        </div>
      </section>

      {/* ACTIONS */}
      <section className="px-4 mt-6 space-y-3">
        <button className="w-full bg-orange hover:bg-orange-bright text-white font-bold py-4 rounded-pill shadow-orange-strong flex items-center justify-center gap-2 transition active:scale-95">
          <Save size={18} />
          Spiel beenden & speichern
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-bg-surface border border-white/10 text-ink font-semibold py-3.5 rounded-pill flex items-center justify-center gap-2 transition active:scale-95 hover:bg-surface-gray">
            <RotateCcw size={16} />
            Wurf rückgängig
          </button>
          <button className="bg-bg-surface border border-white/10 text-ink font-semibold py-3.5 rounded-pill flex items-center justify-center gap-2 transition active:scale-95 hover:bg-surface-gray">
            <TrendingUp size={16} />
            Statistik
          </button>
        </div>
      </section>

      {/* Manual entry */}
      <section className="px-4 mt-6">
        <p className="text-xs text-ink-mid mb-2 font-semibold uppercase tracking-wider">Manuelle Eingabe</p>
        <div className="grid grid-cols-4 gap-2">
          {[60, 45, 26, 100, 140, 180, 81, "BUST"].map((v) => (
            <button
              key={v}
              className="bg-bg-surface border border-white/10 rounded-xl py-3 font-bold text-ink active:scale-95 transition shadow-soft hover:shadow-card"
            >
              {v}
            </button>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </AppShell>
  );
}

function ScoreBox({ label, score, legs, active }: { label: string; score: number; legs: number; active: boolean }) {
  return (
    <div className={`bg-bg-surface border-2 rounded-3xl p-5 transition-all ${
      active ? "border-orange shadow-orange" : "border-white/10 shadow-soft"
    }`}>
      <div className="flex items-center justify-between">
        <p className={`text-xs font-bold uppercase tracking-wider ${active ? "text-orange" : "text-ink-mid"}`}>{label}</p>
        {active && <Target size={14} className="text-orange" />}
      </div>
      <p className="text-5xl font-black text-ink mt-2 tabular tracking-tight">{score}</p>
      <p className="text-xs text-ink-mid mt-2">Legs: <span className="font-bold text-ink">{legs}</span></p>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-surface border border-white/10 rounded-2xl p-3 text-center shadow-soft">
      <p className="text-[11px] text-ink-mid font-semibold uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-black text-ink mt-1 tabular">{value}</p>
    </div>
  );
}
