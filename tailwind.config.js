/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // === PRIMARY: Purple/Violet ===
        purple: {
          DEFAULT: "#A855F7",       // main accent
          bright: "#C084FC",
          dark: "#7E22CE",
          deep: "#581C87",
          soft: "rgba(168,85,247,0.15)",
          glow: "rgba(168,85,247,0.45)",
        },
        // === SECONDARY: Electric Blue ===
        electric: {
          DEFAULT: "#3B82F6",
          bright: "#60A5FA",
          dark: "#1D4ED8",
          deep: "#1E3A8A",
          glow: "rgba(59,130,246,0.4)",
        },
        // === BACKGROUNDS (Dark Mode) ===
        bg: {
          DEFAULT: "#0A0613",        // deepest background, near-black with violet tint
          base: "#0F0820",           // page background
          surface: "#160B2C",        // cards
          elevated: "#1E1140",       // elevated cards / modals
          higher: "#2A1856",         // hover surfaces
        },
        // === TEXT ===
        ink: {
          DEFAULT: "#FFFFFF",
          soft: "#E5E1F0",
          mid: "#A39BB8",
          light: "#6B6481",
        },
        // === LEGACY MAP (so we don't have to retouch everything) ===
        orange: {
          DEFAULT: "#A855F7",
          bright: "#C084FC",
          dark: "#7E22CE",
          soft: "rgba(168,85,247,0.15)",
          pale: "rgba(168,85,247,0.08)",
        },
        surface: {
          DEFAULT: "#160B2C",
          soft: "#0F0820",
          gray: "#1E1140",
          gray2: "#2A1856",
          black: "#0A0613",
          blacksoft: "#160B2C",
        },
        live: "#FF3B5C",
        online: "#22C55E",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
        card: "0 4px 24px rgba(168,85,247,0.08), 0 2px 6px rgba(0,0,0,0.3)",
        elevated: "0 16px 48px rgba(168,85,247,0.18), 0 8px 16px rgba(0,0,0,0.4)",
        orange: "0 8px 32px rgba(168,85,247,0.5)",          // mapped to purple
        "orange-strong": "0 12px 40px rgba(168,85,247,0.65)", // mapped to purple
        purple: "0 8px 32px rgba(168,85,247,0.5)",
        "purple-strong": "0 12px 40px rgba(168,85,247,0.65)",
        electric: "0 8px 32px rgba(59,130,246,0.4)",
        glow: "0 0 32px rgba(168,85,247,0.4)",
        nav: "0 -4px 24px rgba(0,0,0,0.5), 0 -1px 0 rgba(168,85,247,0.1)",
      },
      borderRadius: {
        pill: "999px",
      },
      animation: {
        "pulse-dot": "pulse-dot 1.5s ease-in-out infinite",
        "fade-up": "fade-up 0.35s ease-out",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
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
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(168,85,247,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(168,85,247,0.6)" },
        },
      },
      backgroundImage: {
        "gradient-purple": "linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)",
        "gradient-purple-deep": "linear-gradient(135deg, #581C87 0%, #1E3A8A 100%)",
        "radial-glow": "radial-gradient(circle at top, rgba(168,85,247,0.15), transparent 60%)",
      },
    },
  },
  plugins: [],
};
