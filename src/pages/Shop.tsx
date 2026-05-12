import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { ProductCard } from "../components/Cards";
import { products } from "../data/products";

const categories = [
  { key: "equipment", label: "Equipment" },
  { key: "mode", label: "Mode" },
  { key: "merchandise", label: "Merchandise" },
] as const;

export default function Shop() {
  const [active, setActive] = useState<"equipment" | "mode" | "merchandise">("equipment");
  const list = products.filter((p) => p.category === active);

  return (
    <AppShell>
      {/* ORANGE HERO HEADER */}
      <header className="bg-orange relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
            <circle cx="350" cy="100" r="90" fill="none" stroke="white" strokeWidth="3" />
            <circle cx="350" cy="100" r="60" fill="none" stroke="white" strokeWidth="3" />
            <circle cx="350" cy="100" r="30" fill="none" stroke="white" strokeWidth="3" />
          </svg>
        </div>
        <div className="relative px-4 pt-10 pb-6 flex items-end justify-between">
          <div>
            <p className="text-white/80 text-xs font-semibold uppercase tracking-widest">Geprüft von Max Hopp</p>
            <h1 className="text-3xl font-black text-white tracking-tight mt-1">Shop vom Hopp</h1>
          </div>
          <button className="relative w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center transition hover:bg-white/30 active:scale-95">
            <ShoppingCart size={22} className="text-white" strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-ink text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-orange">
              3
            </span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 px-4 pb-5 overflow-x-auto scroll-hide">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`px-5 py-2 rounded-pill text-sm font-bold transition active:scale-95 whitespace-nowrap ${
                active === c.key
                  ? "bg-white text-orange shadow-lg"
                  : "bg-white/20 text-white backdrop-blur"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </header>

      {/* PRODUCT GRID */}
      <section className="px-4 pt-6">
        <div className="grid grid-cols-2 gap-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {list.length === 0 && (
          <div className="text-center py-12 text-ink-mid text-sm">Keine Produkte in dieser Kategorie.</div>
        )}
      </section>

      <div className="h-8" />
    </AppShell>
  );
}
