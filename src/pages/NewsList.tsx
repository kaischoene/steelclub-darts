import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { TopBar } from "../components/TopBar";
import { NewsCard } from "../components/Cards";
import { news } from "../data/news";

const categories = ["Alle", "Breaking", "Profi", "Equipment", "Interview"] as const;

export default function NewsList() {
  const [cat, setCat] = useState<typeof categories[number]>("Alle");
  const filtered = cat === "Alle" ? news : news.filter((n) => n.category === cat);

  return (
    <AppShell>
      <TopBar />

      <div className="px-4 mt-2">
        <h1 className="text-3xl font-black text-ink tracking-tight">News & Stories</h1>
        <p className="text-sm text-ink-mid mt-1">Aktuelles aus der Welt von THE ICON DARTS</p>
      </div>

      <div className="flex gap-2 overflow-x-auto scroll-hide mt-5 px-4 pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-pill text-sm font-semibold whitespace-nowrap transition active:scale-95 ${
              cat === c ? "bg-orange text-white shadow-orange" : "bg-bg-surface border border-white/10 text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <section className="px-4 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((n) => (
          <NewsCard key={n.id} article={n} />
        ))}
      </section>

      <div className="h-8" />
    </AppShell>
  );
}
