import { Link } from "react-router-dom";
import { Settings, Heart, History, Trophy, Award, LogOut, ChevronRight, Bell, Shield, HelpCircle } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { TopBar } from "../components/TopBar";

const stats = [
  { label: "Spiele", value: "127" },
  { label: "Siege", value: "84" },
  { label: "Avg.", value: "68.4" },
  { label: "180er", value: "12" },
];

const menuGroups = [
  {
    title: "Meine Aktivitäten",
    items: [
      { icon: Heart, label: "Favoriten", path: "#" },
      { icon: History, label: "Spielhistorie", path: "#" },
      { icon: Trophy, label: "Meine Turniere", path: "#" },
      { icon: Award, label: "Achievements & Punkte", path: "#" },
    ],
  },
  {
    title: "Einstellungen",
    items: [
      { icon: Bell, label: "Benachrichtigungen", path: "#" },
      { icon: Shield, label: "Datenschutz", path: "#" },
      { icon: Settings, label: "App-Einstellungen", path: "#" },
      { icon: HelpCircle, label: "Hilfe & Support", path: "#" },
    ],
  },
];

export default function Profil() {
  return (
    <AppShell>
      <TopBar />

      {/* AVATAR HERO */}
      <section className="px-4 pt-4 pb-2">
        <div className="bg-gradient-to-br from-orange to-orange-dark rounded-3xl p-6 text-white shadow-orange-strong relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-bg-surface/10 blur-3xl" />
          <div className="absolute -right-4 -bottom-12 w-32 h-32 rounded-full bg-bg-surface/15 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <div className="w-20 h-20 rounded-full ring-4 ring-white/40 overflow-hidden shadow-2xl">
              <img
                src="/img/players/max-hopp.jpg"
                alt="Mein Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-widest text-white/70 font-semibold">Mein Profil</p>
              <h1 className="text-2xl font-black tracking-tight mt-0.5">Matthias Distel</h1>
              <p className="text-sm text-white/80 mt-1">🇩🇪 Deutschland · B-Klasse</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-2 relative">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-black tabular tracking-tight">{s.value}</p>
                <p className="text-[10px] text-white/70 uppercase tracking-wider font-semibold mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU GROUPS */}
      {menuGroups.map((g) => (
        <section key={g.title} className="mt-6 px-4">
          <p className="text-xs text-ink-mid uppercase tracking-wider font-bold mb-2 ml-1">{g.title}</p>
          <div className="bg-bg-surface border border-white/10 rounded-2xl shadow-soft divide-y divide-white/[0.05] overflow-hidden">
            {g.items.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-surface-gray transition"
              >
                <div className="w-9 h-9 rounded-xl bg-purple/15 flex items-center justify-center">
                  <item.icon size={18} className="text-orange" strokeWidth={2.5} />
                </div>
                <span className="flex-1 font-semibold text-ink text-sm">{item.label}</span>
                <ChevronRight size={18} className="text-ink-light" />
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-6 px-4">
        <button className="w-full bg-bg-surface border border-white/10 rounded-2xl shadow-soft py-4 flex items-center justify-center gap-2 text-live font-bold transition hover:bg-live/5 active:scale-95">
          <LogOut size={18} />
          Abmelden
        </button>
      </section>

      <div className="h-8" />
    </AppShell>
  );
}
