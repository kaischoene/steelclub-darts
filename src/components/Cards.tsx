import { Link } from "react-router-dom";
import { MapPin, Calendar, Play, Users, ChevronRight, BadgeCheck, Heart } from "lucide-react";
import type { DartEvent } from "../data/events";
import type { Player } from "../data/players";
import type { Product } from "../data/products";
import type { NewsArticle } from "../data/news";
import type { Stream } from "../data/streams";

export function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block w-2 h-2 ${className}`}>
      <span className="absolute inset-0 bg-live rounded-full animate-pulse-dot" />
      <span className="absolute inset-0 bg-live rounded-full opacity-60 animate-ping" />
    </span>
  );
}

export function LeagueBadge({ league }: { league: string }) {
  const colors: Record<string, string> = {
    "Profi": "bg-orange text-white",
    "A-Klasse": "bg-electric text-white",
    "B-Klasse": "bg-ink-mid text-white",
    "C-Klasse": "bg-ink-light text-white",
    "NDL": "bg-bg-base text-white",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-pill text-[10px] font-bold uppercase tracking-wider ${colors[league] || "bg-ink-mid text-white"}`}>
      {league}
    </span>
  );
}

export function EventCard({ event, compact = false }: { event: DartEvent; compact?: boolean }) {
  if (compact) {
    return (
      <Link
        to={`/events/${event.slug}`}
        className="group block w-[240px] flex-shrink-0 snap-start bg-bg-surface rounded-2xl border border-white/10 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all p-4"
      >
        <div className="w-11 h-11 rounded-xl bg-purple/15 flex items-center justify-center mb-3">
          <img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FF7A00' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><circle cx='12' cy='12' r='6'/><circle cx='12' cy='12' r='2'/></svg>"
            className="w-6 h-6"
            alt=""
          />
        </div>
        <h3 className="font-bold text-base text-ink leading-snug mb-2 line-clamp-2">{event.title}</h3>
        <div className="flex items-center gap-1.5 text-xs text-ink-mid mb-1">
          <MapPin size={13} className="text-orange" strokeWidth={2.5} />
          <span>{event.city}, {event.venue}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ink-mid mb-3">
          <Calendar size={13} className="text-orange" strokeWidth={2.5} />
          <span>{event.dateLabel}</span>
        </div>
        <button className="w-full bg-orange hover:bg-orange-bright text-white font-semibold text-sm py-2.5 rounded-pill shadow-orange transition-all active:scale-95">
          Jetzt anmelden
        </button>
      </Link>
    );
  }

  return (
    <Link
      to={`/events/${event.slug}`}
      className="group block bg-bg-surface rounded-2xl border border-white/10 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3"><LeagueBadge league={event.league} /></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-bold text-lg text-white leading-tight mb-1 line-clamp-1">{event.title}</h3>
          <p className="text-xs text-white/80">{event.dateLabel}</p>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-ink-mid">
          <MapPin size={14} className="text-orange" strokeWidth={2.5} />
          <span className="line-clamp-1">{event.city}</span>
        </div>
        <span className="text-orange font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
          Details <ChevronRight size={16} />
        </span>
      </div>
    </Link>
  );
}

export function PlayerCard({ player, size = "default" }: { player: Player; size?: "default" | "small" }) {
  const sizeClasses = size === "small" ? "w-20 h-20" : "w-24 h-24";
  return (
    <Link
      to={`/spieler/${player.slug}`}
      className="group flex flex-col items-center flex-shrink-0 snap-start"
    >
      <div className={`relative ${sizeClasses} rounded-full ring-2 ring-orange overflow-hidden shadow-soft group-hover:shadow-orange transition-all group-hover:scale-105`}>
        <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
        {player.verified && (
          <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-orange ring-2 ring-white flex items-center justify-center">
            <BadgeCheck size={14} className="text-white" strokeWidth={3} />
          </span>
        )}
      </div>
      <div className="mt-2.5 text-center">
        <p className="font-bold text-sm text-ink line-clamp-1">{player.shortName}</p>
        <p className="text-[11px] text-ink-mid mt-0.5">{player.league}</p>
      </div>
    </Link>
  );
}

export function NewsCard({ article, compact = false }: { article: NewsArticle; compact?: boolean }) {
  return (
    <Link
      to={`/news/${article.slug}`}
      className={`group block bg-bg-surface rounded-2xl border border-white/10 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all overflow-hidden ${
        compact ? "w-[280px] flex-shrink-0 snap-start" : ""
      }`}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-pill text-[10px] font-bold uppercase tracking-wider ${
            article.category === "Breaking" ? "bg-live text-white" : "bg-orange text-white"
          }`}>
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-base text-ink leading-snug mb-2 line-clamp-2 group-hover:text-orange transition-colors">{article.title}</h3>
        <div className="flex items-center gap-2 text-xs text-ink-mid">
          <span>{article.dateLabel}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/produkt/${product.slug}`}
      className="group block bg-bg-surface rounded-2xl border border-white/10 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-gray">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <button className="absolute top-2 right-2 w-9 h-9 rounded-full bg-bg-surface/90 backdrop-blur flex items-center justify-center shadow-soft hover:bg-bg-surface transition" onClick={(e) => e.preventDefault()}>
          <Heart size={16} className="text-ink-mid" />
        </button>
        {product.maxHoppRecommended && (
          <div className="absolute inset-x-0 bottom-0 bg-orange text-white text-[10px] font-bold uppercase tracking-wider text-center py-1.5">
            ICON Pick
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm text-ink line-clamp-2 leading-snug min-h-[2.5rem]">{product.name}</h3>
        <p className="text-orange font-bold text-base mt-1.5">{product.price.toFixed(2).replace(".", ",")} €</p>
      </div>
    </Link>
  );
}

export function StreamCard({ stream, large = false }: { stream: Stream; large?: boolean }) {
  if (large) {
    return (
      <Link
        to={`/streaming/${stream.slug}`}
        className="group block relative rounded-3xl overflow-hidden shadow-elevated bg-bg-base"
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img src={stream.thumbnail} alt={stream.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {stream.isLive && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-live text-white px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-bg-surface animate-pulse-dot" />
            LIVE
          </div>
        )}

        {stream.viewerCount && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur text-white text-xs px-2.5 py-1 rounded-md">
            <Users size={12} />
            <span className="font-semibold">{stream.viewerCount} Zuschauer</span>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-bg-surface/20 backdrop-blur-xl border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-bg-surface/30 transition-all shadow-2xl">
            <Play size={32} className="text-white ml-1" fill="white" />
          </div>
        </div>

        {stream.player1 && stream.player2 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold truncate">{stream.player1.name}</p>
            </div>
            <div className="flex items-baseline gap-3 px-4 py-2 bg-black/60 backdrop-blur rounded-xl">
              <span className="text-2xl font-black text-white tabular">{stream.player1.score}</span>
              <span className="text-xs text-white/60 font-bold">VS</span>
              <span className="text-2xl font-black text-orange tabular">{stream.player2.score}</span>
            </div>
            <div className="flex-1 min-w-0 text-right">
              <p className="text-white text-sm font-bold truncate">{stream.player2.name}</p>
            </div>
          </div>
        )}
      </Link>
    );
  }

  return (
    <Link
      to={`/streaming/${stream.slug}`}
      className="group block w-[240px] flex-shrink-0 snap-start"
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-bg-base shadow-card group-hover:shadow-elevated transition-all">
        <img src={stream.thumbnail} alt={stream.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {stream.duration && (
          <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[11px] px-2 py-0.5 rounded-md font-semibold">
            {stream.duration}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
          <div className="w-12 h-12 rounded-full bg-bg-surface/20 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play size={20} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
      </div>
      <h4 className="font-bold text-sm text-ink mt-2.5 line-clamp-2 leading-snug">{stream.title}</h4>
      <p className="text-xs text-ink-mid mt-0.5 line-clamp-1">{stream.subtitle}</p>
      {stream.views && <p className="text-[11px] text-ink-light mt-0.5">{stream.views} Aufrufe</p>}
    </Link>
  );
}
