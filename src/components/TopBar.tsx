import { Link, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Logo } from "./Logo";

interface TopBarProps {
  showBack?: boolean;
  title?: string;
  rightSlot?: React.ReactNode;
  transparent?: boolean;
}

export function TopBar({ showBack = false, title, rightSlot, transparent = false }: TopBarProps) {
  const location = useLocation();
  const goBack = () => window.history.length > 1 ? window.history.back() : null;

  return (
    <header
      className={`sticky top-0 z-40 ${
        transparent
          ? "bg-transparent"
          : "bg-bg-surface/85 backdrop-blur-xl border-b border-white/10"
      }`}
    >
      <div className="flex items-center justify-between h-24 px-4 max-w-screen-lg mx-auto">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {showBack ? (
            <button
              onClick={goBack}
              className="w-10 h-10 rounded-full bg-bg-surface shadow-soft border border-white/10 flex items-center justify-center hover:bg-surface-gray transition active:scale-95"
              aria-label="Zurück"
            >
              <ChevronLeft size={20} strokeWidth={2.5} className="text-ink" />
            </button>
          ) : (
            <Link to="/" aria-label="THE ICON DARTS Home">
              <Logo variant="horizontal-small" />
            </Link>
          )}
          {title && (
            <h1 className="font-bold text-lg text-ink truncate">{title}</h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          {rightSlot}
          {!rightSlot && location.pathname !== "/profil" && (
            <Link
              to="/profil"
              className="relative w-10 h-10 rounded-full ring-2 ring-orange overflow-hidden shadow-soft"
              aria-label="Profil"
            >
              <img
                src="/img/players/max-hopp.jpg"
                alt="Mein Avatar"
                className="w-full h-full object-cover"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
