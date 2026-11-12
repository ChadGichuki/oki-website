import type { Config } from "tailwindcss";

/**
 * OKI design tokens (source: CLAUDE.md → Tokens).
 * Orange (brand) is for buttons with ink text, highlight words in headings,
 * and labels on black. Never orange body text on paper.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    extend: {
      colors: {
        brand: "#ED5F1E",
        ink: "#000000",
        paper: "#FAF9F6",
        sand: "#F0EEE9",
        line: {
          DEFAULT: "#E3E1DB",
          strong: "#D6D4CF",
        },
        muted: {
          DEFAULT: "#444444",
          soft: "#555555",
        },
        "muted-dark": {
          DEFAULT: "#CFCFCF",
          soft: "#8A8A8A",
        },
        card: "#1C1C1C",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(64px, 11vw, 176px)", { lineHeight: "0.88" }],
        "section-title": ["clamp(48px, 7vw, 96px)", { lineHeight: "0.92" }],
        "body-lg": ["22px", { lineHeight: "1.45" }],
        "body-md": ["18px", { lineHeight: "1.55" }],
        body: ["16px", { lineHeight: "1.6" }],
        label: ["13px", { lineHeight: "1.2", letterSpacing: "0.13em" }],
        "label-sm": ["12px", { lineHeight: "1.2", letterSpacing: "0.14em" }],
        "label-lg": ["14px", { lineHeight: "1.2", letterSpacing: "0.12em" }],
      },
      maxWidth: {
        container: "1280px",
      },
      spacing: {
        "section-mobile": "64px",
        section: "120px",
        "btn-md": "44px",
        "btn-lg": "52px",
      },
      minHeight: {
        "btn-md": "44px",
        "btn-lg": "52px",
      },
      transitionTimingFunction: {
        reveal: "cubic-bezier(.2,.7,.1,1)",
      },
    },
  },
  plugins: [],
};

export default config;
