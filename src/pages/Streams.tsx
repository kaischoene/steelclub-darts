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
          <p className="text-xs text-ink-mid mt-0.5">Aus dem Icon Media-Room Heiligenroth</p>
        </div>
        <div className="flex gap-3 overflow-x-auto scroll-hide snap-x scroll-pl-4 scroll-pr-4 px-4 pb-2">
          {creator.map((s) => (
            <StreamCard key={s.id} stream={s} />
          ))}
        </div>
      </section>

      {/* MEDIA ROOM CTA */}
      <section className="px-4 mt-8">
        <div className="relative overflow-hidden rounded-3xl text-white min-h-[220px] shadow-elevated">
          <img
            src="/img/misc/media-room-bg.jpg"
            alt="ICON Media Room"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="relative p-6 flex flex-col justify-end h-full min-h-[220px]">
            <span className="inline-flex self-start items-center px-2.5 py-1 rounded-pill bg-purple/30 backdrop-blur border border-purple/40 text-white text-[10px] font-bold uppercase tracking-wider mb-3">
              Heiligenroth
            </span>
            <h3 className="text-2xl font-black tracking-tight">ICON Media-Room</h3>
            <p className="text-sm text-white/80 mt-1 max-w-[85%]">
              Professionelle Streaming-Anlage mit 5 Boards, Lichtringen und automatischem Zählsystem.
            </p>
            <button className="mt-4 self-start bg-orange hover:bg-orange-bright text-white font-semibold text-sm px-5 py-2.5 rounded-pill shadow-orange transition active:scale-95">
              Mehr erfahren
            </button>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </AppShell>
  );
}
