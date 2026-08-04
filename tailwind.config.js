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
        primary: "#B89341",
        "primary-container": "#E3C381",
        background: "#FDFBF7",
        "on-background": "#1A1814",
        surface: "#FFFFFF",
        "on-surface": "#1A1814",
        "on-surface-variant": "#8C8270",
        secondary: "#BBA885",
        "secondary-container": "#EAE1CD",
        tertiary: "#9C766C",
        "tertiary-container": "#E8D0CA",
        outline: "#E6E1D8",
        "outline-variant": "#C4BCAB",
        "surface-container": "#F5F2EB",
        "surface-container-high": "#EFEBE2",
        "surface-container-highest": "#E8E3D8",
        "surface-container-low": "#FAF8F3",
        "surface-container-lowest": "#FFFFFF",
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
