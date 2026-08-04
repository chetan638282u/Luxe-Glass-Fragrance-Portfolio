/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ebc166",
        "primary-container": "#c9a24b",
        background: "#0D0C0B", // Dark mode override
        "on-background": "#eae1d7",
        surface: "#16130d",
        "on-surface": "#eae1d7",
        "on-surface-variant": "#d1c5b2",
        secondary: "#cfc5b5",
        "secondary-container": "#4e483c",
        tertiary: "#eabcb4",
        "tertiary-container": "#3a1f1a", // Custom burgundy/amber-brown accent
        outline: "#9a8f7e",
        "outline-variant": "#4e4637",
        "surface-container": "#231f19",
        "surface-container-high": "#2d2923",
        "surface-container-highest": "#38342d",
        "surface-container-low": "#1f1b15",
        "surface-container-lowest": "#110e08",
      },
      fontFamily: {
        serif: ["'Bodoni Moda'", "serif"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        gutter: "24px",
        base: "8px",
        "container-max": "1440px",
        "card-padding": "32px",
        "section-gap": "120px",
      },
      boxShadow: {
        glow: "0 0 60px 5px rgba(235, 193, 102, 0.05)",
      }
    },
  },
  plugins: [],
}
