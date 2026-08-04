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
        primary: "#9E6749",
        "primary-container": "#C98E6C",
        background: "#DCD3C6",
        "on-background": "#2C2824",
        surface: "#EBE5DF",
        "on-surface": "#2C2824",
        "on-surface-variant": "#7A7067",
        secondary: "#8F8274",
        "secondary-container": "#C5B9AC",
        tertiary: "#7D6B66",
        "tertiary-container": "#BFAFA9",
        outline: "#C7BEB3",
        "outline-variant": "#A99D90",
        "surface-container": "#E3DBD1",
        "surface-container-high": "#DFD6CB",
        "surface-container-highest": "#DBD1C5",
        "surface-container-low": "#EBE5DF",
        "surface-container-lowest": "#F2ECE7",
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
