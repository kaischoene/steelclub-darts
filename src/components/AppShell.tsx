import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface AppShellProps {
  children: ReactNode;
  hideBottomNav?: boolean;
  hasBottomBar?: boolean;
  fullHeight?: boolean; // for pages that need full viewport (e.g. map) — no bottom padding
}

export function AppShell({
  children,
  hideBottomNav = false,
  hasBottomBar = false,
  fullHeight = false,
}: AppShellProps) {
  const mainClass = fullHeight
    ? ""
    : hasBottomBar
    ? "pb-44"
    : hideBottomNav
    ? ""
    : "pb-24";

  return (
    <div className="min-h-screen bg-black">
      <main className={mainClass}>{children}</main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
