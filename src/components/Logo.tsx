type LogoVariant = "full" | "icon" | "stacked" | "horizontal-small" | "white";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "icon") {
    return <LogoIcon className={className} />;
  }

  const heights: Record<Exclude<LogoVariant, "icon">, string> = {
    full: "h-36",
    stacked: "h-32",
    "horizontal-small": "h-20",
    white: "h-20",
  };

  return (
    <img
      src="/img/icon-darts-logo.png"
      alt="THE ICON DARTS"
      className={`${heights[variant]} w-auto select-none object-contain ${className}`}
      draggable={false}
    />
  );
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <img
      src="/img/icon-darts-logo.png"
      alt="THE ICON DARTS"
      className={`${className} object-contain select-none`}
      draggable={false}
    />
  );
}
