import { NavLink } from "react-router-dom";
import { Home, Map, Radio, Trophy, ShoppingBag } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/karte", label: "Karte", icon: Map, end: false },
  { to: "/streams", label: "Streams", icon: Radio, end: false },
  { to: "/ligen", label: "Ligen", icon: Trophy, end: false },
  { to: "/shop", label: "Shop", icon: ShoppingBag, end: false },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-bg-surface/95 backdrop-blur-xl border-t border-white/10 shadow-nav pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex items-center justify-around h-[72px] max-w-screen-lg mx-auto px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center flex-1 h-full transition active:scale-95 ${
                isActive ? "" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? "w-12 h-12 rounded-full bg-orange shadow-[0_8px_20px_rgba(255,122,0,0.4)] -translate-y-3"
                      : "w-12 h-12 rounded-full"
                  }`}
                >
                  <tab.icon
                    size={isActive ? 22 : 24}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={isActive ? "text-white" : "text-ink-mid"}
                  />
                </div>
                <span
                  className={`text-[11px] mt-0.5 font-semibold tracking-tight transition-colors ${
                    isActive ? "text-orange -translate-y-2" : "text-ink-mid"
                  }`}
                >
                  {tab.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
