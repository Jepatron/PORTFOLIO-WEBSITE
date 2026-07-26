import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#2F4A3D",
        brass: "#9C7A3C",
        cream: "#FAF7F0",
        "cream-deep": "#F4EEDD",
        charcoal: "#2B2B2B",
        grey: "#6E6E6E",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;
