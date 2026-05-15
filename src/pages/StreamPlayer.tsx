import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Share2, Heart, Users as UsersIcon, MessageCircle, Send } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { getStreamBySlug } from "../data/streams";
import { LiveDot } from "../components/Cards";

export default function StreamPlayer() {
  const { slug } = useParams();
  const stream = slug ? getStreamBySlug(slug) : null;

  if (!stream) {
    return (
      <AppShell>
        <div className="p-8 text-center">
          <p className="text-ink-mid">Stream nicht gefunden.</p>
          <Link to="/streams" className="text-orange font-semibold mt-4 inline-block">← Zu Streams</Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* VIDEO PLAYER */}
      <div className="relative bg-bg-base aspect-video">
        <img src={stream.thumbnail} alt={stream.title} className="absolute inset-0 w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10" />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-6">
          <button
            onClick={() => window.history.back()}
            className="w-10 h-10 rounded-full bg-bg-surface/20 backdrop-blur flex items-center justify-center shadow-soft active:scale-95"
          >
            <ChevronLeft size={20} className="text-white" strokeWidth={2.5} />
          </button>
          {stream.isLive && (
            <div className="flex items-center gap-1.5 bg-live text-white px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider">
              <LiveDot className="!bg-bg-surface" />
              LIVE
            </div>
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-24 h-24 rounded-full bg-bg-surface/20 backdrop-blur-xl border-2 border-white/40 flex items-center justify-center hover:scale-110 transition-all shadow-2xl active:scale-95">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
          </button>
        </div>
      </div>

      {/* HEADER */}
      <div className="px-4 py-5">
        <h1 className="text-xl font-black text-ink tracking-tight">{stream.title}</h1>
        <p className="text-sm text-ink-mid mt-1">{stream.subtitle}</p>
        {stream.viewerCount && (
          <div className="flex items-center gap-1.5 text-sm text-ink-mid mt-2">
            <UsersIcon size={14} />
            <span className="font-semibold">{stream.viewerCount} Zuschauer</span>
          </div>
        )}

        <div className="flex items-center gap-2 mt-4">
          <button className="flex-1 bg-orange hover:bg-orange-bright text-white font-semibold py-3 rounded-pill shadow-orange transition active:scale-95">
            Folgen
          </button>
          <button className="w-12 h-12 rounded-full bg-surface-gray flex items-center justify-center transition active:scale-95">
            <Heart size={18} className="text-ink" />
          </button>
          <button className="w-12 h-12 rounded-full bg-surface-gray flex items-center justify-center transition active:scale-95">
            <Share2 size={18} className="text-ink" />
          </button>
        </div>
      </div>

      {/* SCORE BOARD (if live with players) */}
      {stream.player1 && stream.player2 && (
        <section className="px-4">
          <div className="bg-bg-base rounded-3xl p-5 text-white relative overflow-hidden shadow-elevated">
            <div className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-purple/25 blur-3xl" />
            <p className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-3">Live Score</p>
            <div className="relative flex items-center justify-between">
              <div className="flex-1 flex items-center gap-3">
                <img src={stream.player1.avatar} alt={stream.player1.name} className="w-12 h-12 rounded-full ring-2 ring-white/30" />
                <div>
                  <p className="font-bold text-sm">{stream.player1.name}</p>
                  <p className="text-3xl font-black text-white mt-1 tabular">{stream.player1.score}</p>
                </div>
              </div>
              <div className="text-xs font-bold text-white/40">VS</div>
              <div className="flex-1 flex items-center gap-3 justify-end">
                <div className="text-right">
                  <p className="font-bold text-sm">{stream.player2.name}</p>
                  <p className="text-3xl font-black text-orange mt-1 tabular">{stream.player2.score}</p>
                </div>
                <img src={stream.player2.avatar} alt={stream.player2.name} className="w-12 h-12 rounded-full ring-2 ring-orange" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LIVE CHAT MOCK */}
      <section className="mt-6 px-4">
        <h2 className="text-lg font-black text-ink tracking-tight mb-3 flex items-center gap-2">
          <MessageCircle size={18} />
          Live Chat
        </h2>
        <div className="bg-bg-surface border border-white/10 rounded-3xl shadow-soft overflow-hidden">
          <div className="p-4 space-y-3 max-h-[280px] overflow-y-auto">
            {[
              { user: "Daniel_K", msg: "Was für ein Wurf!", color: "text-orange" },
              { user: "Sarah87", msg: "MvG ist heute unschlagbar 🎯", color: "text-ink" },
              { user: "DartsLover", msg: "180!!!", color: "text-live" },
              { user: "Max_Profi", msg: "Brutaler Average", color: "text-ink" },
              { user: "FionnFan", msg: "Lets goooo", color: "text-ink" },
            ].map((c, i) => (
              <div key={i} className="text-sm">
                <span className={`font-bold ${c.color}`}>{c.user}</span>
                <span className="text-ink-soft ml-2">{c.msg}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-3 flex items-center gap-2">
            <input
              placeholder="Nachricht schreiben…"
              className="flex-1 bg-surface-gray rounded-pill px-4 py-2.5 text-sm font-medium text-ink placeholder:text-ink-mid focus:outline-none focus:ring-2 focus:ring-orange/40"
            />
            <button className="w-11 h-11 rounded-full bg-orange flex items-center justify-center shadow-orange active:scale-95">
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      </section>

      <div className="h-12" />
    </AppShell>
  );
}
