import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { TopBar } from "../components/TopBar";
import { StreamCard, LiveDot } from "../components/Cards";
import { streams } from "../data/streams";

export default function Streams() {
  const live = streams.filter((s) => s.isLive);
  const onDemand = streams.filter((s) => s.category === "highlights" || s.category === "ondemand");
  const creator = streams.filter((s) => s.category === "creator");

  return (
    <AppShell>
      <TopBar />

      <div className="px-4 mt-2">
        <h1 className="text-3xl font-black text-ink tracking-tight">Streams</h1>
        <p className="text-sm text-ink-mid mt-1">Live-Matches, Highlights & exklusiver Content</p>
      </div>

      {/* LIVE NOW */}
      {live.length > 0 && (
        <section className="mt-6">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-xl font-black text-ink flex items-center gap-2 tracking-tight">
              <LiveDot />
              <span>Live jetzt</span>
            </h2>
          </div>
          <div className="px-4 flex flex-col gap-3">
            {live.map((s) => (
              <StreamCard key={s.id} stream={s} large />
            ))}
          </div>
        </section>
      )}

      {/* ON-DEMAND */}
      <section className="mt-8">
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="text-xl font-black text-ink tracking-tight">On-Demand</h2>
          <Link to="/streams" className="text-sm font-semibold text-orange flex items-center gap-1 hover:gap-2 transition-all">
            Alle <ChevronRight size={16} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scroll-hide snap-x scroll-pl-4 scroll-pr-4 px-4 pb-2">
          {onDemand.map((s) => (
            <StreamCard key={s.id} stream={s} />
          ))}
        </div>
      </section>

      {/* CREATOR CONTENT */}
      <section className="mt-8">
        <div className="px-4 mb-3">
          <h2 className="text-xl font-black text-ink tracking-tight">Creator-Content</h2>
          <p className="text-xs text-ink-mid mt-0.5">Aus dem Steelclub Media-Room Heiligenroth</p>
        </div>
        <div className="flex gap-3 overflow-x-auto scroll-hide snap-x scroll-pl-4 scroll-pr-4 px-4 pb-2">
          {creator.map((s) => (
            <StreamCard key={s.id} stream={s} />
          ))}
        </div>
      </section>

      {/* MEDIA ROOM CTA */}
      <section className="px-4 mt-8">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white">
          <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-orange/20 blur-3xl" />
          <div className="absolute -right-4 -bottom-12 w-40 h-40 rounded-full bg-orange/30 blur-3xl" />
          <div className="relative">
            <h3 className="text-2xl font-black tracking-tight">Steelclub Media-Room</h3>
            <p className="text-sm text-white/70 mt-1 max-w-[80%]">
              Professionelle Streaming-Anlage mit 5 Boards, Lichtringen und automatischem Zählsystem in Heiligenroth.
            </p>
            <button className="mt-4 bg-orange hover:bg-orange-bright text-white font-semibold text-sm px-5 py-2.5 rounded-pill shadow-orange transition active:scale-95">
              Mehr erfahren
            </button>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </AppShell>
  );
}
