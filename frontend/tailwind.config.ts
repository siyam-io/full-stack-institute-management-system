import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Red-noir core surface: near-black, faintly warmed toward red.
        obsidian: "#050506",
        "noir-black": "#000000",
        // Reference accent red (Superdesign noir) replaces the old #EC1B23.
        "power-red": "#EF233C",
        "accent-red": "#EF233C",
        "accent-red-deep": "#C8102E",
        // Brand secondary retained for status/accents.
        "prestige-gold": "#FFD700",
        "ice-gray": "#F8FAFC",
        white: "#FFFFFF",
        "titanium-white": "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        // Manrope is the reference's display/headline face.
        manrope: ["var(--font-manrope)", "Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        bengali: ["var(--font-anek-bangla)", "Anek Bangla", "ui-serif", "Georgia", "serif"],
        english: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.025em",
        widest: "0.3em",
      },
      boxShadow: {
        "glow-red": "0 0 30px rgba(239, 35, 60, 0.35)",
        "glow-red-lg": "0 20px 60px rgba(239, 35, 60, 0.35)",
        noir: "0 40px 100px rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        "noir-fade": "linear-gradient(to bottom, #1a0505 0%, #050506 55%, #000000 100%)",
        "noir-radial": "radial-gradient(circle at 50% 0%, rgba(239,35,60,0.18), transparent 60%)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "anim-star": {
          from: { transform: "translateY(0px)" },
          to: { transform: "translateY(-2000px)" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "40px 40px" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "fade-up": "fade-up 0.8s ease-out forwards",
        shimmer: "shimmer 2s infinite",
        "anim-star": "anim-star 60s linear infinite",
        "grid-pan": "grid-pan 20s linear infinite",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
