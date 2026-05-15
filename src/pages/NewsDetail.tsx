import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Share2, Heart, Clock } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { getNewsBySlug, news } from "../data/news";
import { NewsCard } from "../components/Cards";

export default function NewsDetail() {
  const { slug } = useParams();
  const article = slug ? getNewsBySlug(slug) : null;

  if (!article) {
    return (
      <AppShell>
        <div className="p-8 text-center">
          <p className="text-ink-mid">Artikel nicht gefunden.</p>
          <Link to="/" className="text-orange font-semibold mt-4 inline-block">← Startseite</Link>
        </div>
      </AppShell>
    );
  }

  const related = news.filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <AppShell>
      {/* HERO */}
      <div className="relative h-[360px]">
        <img src={article.heroImage} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-6">
          <button
            onClick={() => window.history.back()}
            className="w-10 h-10 rounded-full bg-bg-surface/90 backdrop-blur flex items-center justify-center shadow-soft active:scale-95"
          >
            <ChevronLeft size={20} className="text-ink" strokeWidth={2.5} />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-bg-surface/90 backdrop-blur flex items-center justify-center shadow-soft">
              <Heart size={18} className="text-ink" />
            </button>
            <button className="w-10 h-10 rounded-full bg-bg-surface/90 backdrop-blur flex items-center justify-center shadow-soft">
              <Share2 size={18} className="text-ink" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-4 right-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-pill text-[10px] font-bold uppercase tracking-wider mb-3 ${
            article.category === "Breaking" ? "bg-live text-white" : "bg-orange text-white"
          }`}>
            {article.category}
          </span>
          <h1 className="text-3xl font-black text-white leading-tight tracking-tight">{article.title}</h1>
        </div>
      </div>

      {/* META */}
      <div className="px-4 py-5 flex items-center gap-3 border-b border-white/10">
        <img src={article.authorAvatar} alt={article.author} className="w-10 h-10 rounded-full ring-2 ring-orange/40" />
        <div className="flex-1">
          <p className="font-bold text-sm text-ink">{article.author}</p>
          <p className="text-xs text-ink-mid">{article.dateLabel}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-ink-mid">
          <Clock size={14} />
          <span>{article.readTime}</span>
        </div>
      </div>

      {/* BODY */}
      <article className="px-4 py-6 max-w-[680px] mx-auto">
        <p className="text-lg text-ink-soft font-medium leading-relaxed">{article.excerpt}</p>
        <div className="mt-6 space-y-4 text-base text-ink leading-relaxed">
          {article.content.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* TAGS */}
        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-pill border border-orange/30 text-orange text-xs font-semibold">
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* RELATED */}
      <section className="px-4 mt-8 mb-8">
        <h2 className="text-lg font-black text-ink tracking-tight mb-4">Verwandte Artikel</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {related.map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
