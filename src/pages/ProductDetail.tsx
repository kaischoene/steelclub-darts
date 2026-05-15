import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Heart, Star, ShoppingCart, Plus, Minus, Truck, ShieldCheck } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { getProductBySlug, products } from "../data/products";
import { ProductCard } from "../components/Cards";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : null;
  const [qty, setQty] = useState(1);
  const [imgIdx] = useState(0);

  if (!product) {
    return (
      <AppShell>
        <div className="p-8 text-center">
          <p className="text-ink-mid">Produkt nicht gefunden.</p>
          <Link to="/shop" className="text-orange font-semibold mt-4 inline-block">← Zum Shop</Link>
        </div>
      </AppShell>
    );
  }

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);

  return (
    <AppShell hasBottomBar>
      {/* IMAGE GALLERY */}
      <div className="relative bg-surface-gray aspect-square">
        <img src={product.images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-6">
          <button
            onClick={() => window.history.back()}
            className="w-10 h-10 rounded-full bg-bg-surface/90 backdrop-blur flex items-center justify-center shadow-soft active:scale-95"
          >
            <ChevronLeft size={20} className="text-ink" strokeWidth={2.5} />
          </button>
          <button className="w-10 h-10 rounded-full bg-bg-surface/90 backdrop-blur flex items-center justify-center shadow-soft">
            <Heart size={18} className="text-ink" />
          </button>
        </div>

        {product.maxHoppRecommended && (
          <div className="absolute bottom-4 left-4 right-4 bg-orange text-white text-xs font-bold uppercase tracking-wider text-center py-2 rounded-pill shadow-orange">
            ICON Pick · Top Empfehlung
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="px-4 mt-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-black text-ink tracking-tight flex-1">{product.name}</h1>
          <p className="text-2xl font-black text-orange tabular">{product.price.toFixed(2).replace(".", ",")} €</p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.round(product.rating) ? "fill-orange text-orange" : "fill-surface-gray2 text-surface-gray2"}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-ink">{product.rating}</span>
          <span className="text-xs text-ink-mid">· {product.reviewCount} Bewertungen</span>
        </div>

        <p className="text-sm text-ink-soft mt-4 leading-relaxed">{product.description}</p>
      </div>

      {/* FEATURES */}
      <section className="px-4 mt-6">
        <h2 className="text-base font-black text-ink mb-3">Features</h2>
        <ul className="space-y-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-ink-soft">
              <div className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* DELIVERY BOX */}
      <section className="px-4 mt-6">
        <div className="bg-surface-gray rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-9 h-9 rounded-full bg-bg-surface flex items-center justify-center">
              <Truck size={16} className="text-orange" />
            </div>
            <span className="text-ink-soft">Versandkostenfrei ab 50 €</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-9 h-9 rounded-full bg-bg-surface flex items-center justify-center">
              <ShieldCheck size={16} className="text-orange" />
            </div>
            <span className="text-ink-soft">30 Tage Rückgaberecht</span>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="mt-8 px-4">
        <h2 className="text-lg font-black text-ink mb-3 tracking-tight">Häufig zusammen gekauft</h2>
        <div className="grid grid-cols-2 gap-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* STICKY CTA — sits ABOVE the BottomNav */}
      <div className="fixed left-0 right-0 bg-bg-surface border-t border-white/10 p-4 z-40 shadow-elevated" style={{ bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}>
        <div className="max-w-screen-lg mx-auto flex items-center gap-3">
          <div className="flex items-center bg-surface-gray rounded-pill p-1">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 flex items-center justify-center active:scale-95">
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-bold text-ink tabular">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-9 h-9 flex items-center justify-center active:scale-95">
              <Plus size={16} />
            </button>
          </div>
          <button className="flex-1 bg-orange hover:bg-orange-bright text-white font-bold py-3.5 rounded-pill shadow-orange transition active:scale-95 flex items-center justify-center gap-2">
            <ShoppingCart size={18} />
            In den Warenkorb
          </button>
        </div>
      </div>

      <div className="h-24" />
    </AppShell>
  );
}
