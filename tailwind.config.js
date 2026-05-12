/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#FF7A00",
          bright: "#FF8C1A",
          dark: "#E66800",
          soft: "#FFE4CC",
          pale: "#FFF4EC",
        },
        ink: {
          DEFAULT: "#0F0F0F",
          soft: "#1F1F1F",
          mid: "#6B6B6B",
          light: "#9CA3AF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#FAFAFA",
          gray: "#F5F5F7",
          gray2: "#EEEEF0",
          black: "#0F0F0F",
          blacksoft: "#1A1A1A",
        },
        live: "#FF3333",
        online: "#22C55E",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)",
        card: "0 4px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)",
        elevated: "0 12px 32px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)",
        orange: "0 8px 24px rgba(255,122,0,0.25)",
        "orange-strong": "0 12px 32px rgba(255,122,0,0.35)",
        nav: "0 -4px 24px rgba(0,0,0,0.04)",
      },
      borderRadius: {
        pill: "999px",
      },
      animation: {
        "pulse-dot": "pulse-dot 1.5s ease-in-out infinite",
        "fade-up": "fade-up 0.35s ease-out",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.9)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
