import type { Config } from "tailwindcss";

// Placeholder palette. Once you've pulled a palette from your own stills
// (try Coolors.co — upload a still, extract the hex codes), replace the
// values below. Keep the structure (bg / bg-raised / ink / ink-dim / accent).
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f5f1ea",
        "bg-raised": "#ede9e0",
        ink: "#0f0e0d",
        "ink-dim": "#7a766e",
        accent: "#b5471b",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
