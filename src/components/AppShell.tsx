import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface AppShellProps {
  children: ReactNode;
  hideBottomNav?: boolean;
  hasBottomBar?: boolean;
}

export function AppShell({ children, hideBottomNav = false, hasBottomBar = false }: AppShellProps) {
  return (
    <div className="min-h-screen bg-white">
      <main className={hasBottomBar ? "pb-44" : hideBottomNav ? "" : "pb-24"}>{children}</main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
