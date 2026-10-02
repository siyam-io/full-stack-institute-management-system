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
        obsidian: "#000A1A",
        "power-red": "#EC1B23",
        "prestige-gold": "#FFD700",
        "ice-gray": "#F8FAFC",
        white: "#FFFFFF",
        "titanium-white": "#FFFFFF",
      },
      fontFamily: {
        sans: ["Anek Bangla", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        bengali: ["Anek Bangla", "ui-serif", "Georgia", "serif"],
        english: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.025em",
        widest: "0.3em",
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
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "fade-up": "fade-up 0.8s ease-out forwards",
        "shimmer": "shimmer 2s infinite",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
