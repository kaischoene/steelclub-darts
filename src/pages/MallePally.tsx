import { useEffect, useState } from "react";
import { ChevronLeft, Share2, MapPin, Trophy, Users } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { Logo } from "../components/Logo";

const targetDate = new Date("2026-10-27T12:00:00");

function getDaysLeft() {
  const diff = targetDate.getTime() - Date.now();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

const groups = [
  {
    label: "Gruppe A",
    matches: [
      { p1: "Max Hopp", p2: "Peter Wright", s1: 1, s2: 0 },
      { p1: "Florian Stein", p2: "Daniel König", s1: 0, s2: 1 },
    ],
  },
  {
    label: "Gruppe B",
    matches: [
      { p1: "Michael van Gerwen", p2: "Gabriel Clemens", s1: 1, s2: 1 },
      { p1: "Maximilian Müller", p2: "Lisa König", s1: 1, s2: 0 },
    ],
  },
  {
    label: "Gruppe C",
    matches: [
      { p1: "Gerwyn Price", p2: "Jonny Clayton", s1: 0, s2: 1 },
      { p1: "Joe Cullen", p2: "Phil Taylor", s1: 1, s2: 0 },
    ],
  },
];

export default function MallePally() {
  const [days, setDays] = useState(getDaysLeft());

  useEffect(() => {
    const t = setInterval(() => setDays(getDaysLeft()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <AppShell hasBottomBar>
      {/* HERO */}
      <div className="relative h-[320px]">
        <img
          src="/img/events/malle-pally-2026.jpg"
          alt="Malle Pally Crowd"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-6">
          <button
            onClick={() => window.history.back()}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-soft"
          >
            <ChevronLeft size={20} className="text-ink" strokeWidth={2.5} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-soft">
            <Share2 size={18} className="text-ink" />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center text-center">
          <Logo variant="horizontal-small" className="invert brightness-200 mb-3" />
          <h1 className="text-4xl font-black text-white tracking-tight">MALLE PALLY</h1>
          <p className="text-white/90 text-sm mt-1">Die Amateur-WM im Bierkönig</p>
        </div>
      </div>

      {/* COUNTDOWN */}
      <section className="px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-elevated p-6 text-center border border-black/[0.04]">
          <p className="text-xs uppercase tracking-widest text-ink-mid font-semibold">Noch</p>
          <div className="my-3">
            <span className="text-7xl font-black text-orange tracking-tighter tabular">{days}</span>
          </div>
          <p className="text-base font-bold text-ink">Tage bis zum Malle Pally</p>
          <p className="text-xs text-ink-mid mt-1">27. Okt – 30. Okt 2026</p>
        </div>
      </section>

      {/* QUICK META */}
      <section className="px-4 mt-6 grid grid-cols-3 gap-3">
        <MetaCard icon={<Users size={20} className="text-orange" />} label="Spieler" value="200" />
        <MetaCard icon={<Trophy size={20} className="text-orange" />} label="Preisgeld" value="200K €" />
        <MetaCard icon={<MapPin size={20} className="text-orange" />} label="Location" value="Bierkönig" />
      </section>

      {/* DESCRIPTION */}
      <section className="px-4 mt-6">
        <p className="text-sm text-ink-soft leading-relaxed">
          Das größte Darts-Event für 200 Spieler, mit exklusiven Special Guests und einer unvergesslichen Partyatmosphäre direkt im Bierkönig auf Mallorca. Ein Highlight für alle Darts-Fans der Steel Club Community.
        </p>
      </section>

      {/* LIVE TOURNAMENT BRACKET */}
      <section className="px-4 mt-6">
        <h2 className="text-lg font-black text-ink tracking-tight mb-3">Live Tournament</h2>
        <div className="space-y-3">
          {groups.map((g) => (
            <div key={g.label} className="bg-white border border-black/[0.06] rounded-2xl shadow-soft overflow-hidden">
              <div className="px-4 py-2.5 bg-orange/10 border-b border-orange/20">
                <h3 className="font-bold text-sm text-ink">{g.label}</h3>
              </div>
              <div className="divide-y divide-black/[0.04]">
                {g.matches.map((m, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className={`font-semibold flex-1 ${m.s1 > m.s2 ? "text-ink" : "text-ink-mid"}`}>{m.p1}</span>
                    <div className="flex items-center gap-1.5 mx-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black tabular ${m.s1 > m.s2 ? "bg-orange text-white" : "bg-surface-gray text-ink"}`}>{m.s1}</span>
                      <span className="text-xs text-ink-mid font-bold">vs</span>
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black tabular ${m.s2 > m.s1 ? "bg-orange text-white" : "bg-surface-gray text-ink"}`}>{m.s2}</span>
                    </div>
                    <span className={`font-semibold flex-1 text-right ${m.s2 > m.s1 ? "text-ink" : "text-ink-mid"}`}>{m.p2}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — sits ABOVE the BottomNav */}
      <div className="fixed left-0 right-0 bg-white p-4 border-t border-black/[0.06] shadow-elevated z-40" style={{ bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}>
        <button className="w-full bg-orange hover:bg-orange-bright text-white font-bold py-4 rounded-pill shadow-orange-strong transition active:scale-95">
          Jetzt anmelden
        </button>
      </div>

      <div className="h-24" />
    </AppShell>
  );
}

function MetaCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white border border-black/[0.06] rounded-2xl p-3 text-center shadow-soft">
      <div className="flex justify-center mb-1.5">{icon}</div>
      <p className="text-xs text-ink-mid font-medium">{label}</p>
      <p className="text-lg font-black text-ink mt-0.5 tabular">{value}</p>
    </div>
  );
}
