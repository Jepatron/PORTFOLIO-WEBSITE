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
        bg: "#0b0b0a",        // near-black, slightly warm — replace with your still's shadow tone
        "bg-raised": "#141412",
        ink: "#ede9e3",       // off-white, not pure white
        "ink-dim": "#8a867e",
        accent: "#b5471b",    // placeholder warm accent — pull this from your footage instead
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
