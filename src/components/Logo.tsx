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
    "horizontal-small": "h-16",
    white: "h-20",
  };

  return (
    <img
      src="/img/logo.png"
      alt="Steel Club Darts"
      className={`${heights[variant]} w-auto select-none ${variant === "white" ? "invert brightness-200" : ""} ${className}`}
      draggable={false}
    />
  );
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Steel Club Darts Icon"
      className={`${className} aspect-square inline-block bg-no-repeat`}
      style={{
        backgroundImage: "url(/img/logo.png)",
        backgroundSize: "auto 100%",
        backgroundPosition: "0% center",
      }}
    />
  );
}
