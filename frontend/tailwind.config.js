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
        "primary": "#FFB000", // Electric Amber
        "primary-dark": "#FF8000", // Deep Amber
        "secondary": "#E5E7EB", // Platinum/Silver for contrast
        "background": "#050505", // Matte Obsidian Black
        "surface": "#111111", // Slightly lighter for HUD panels
        "surface-highlight": "#1A1A1A", // Hover states
        "text-main": "#FFFFFF", // Pure white for high contrast
        "text-muted": "#888888", // Technical gray
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "sans": ["Space Grotesk", "sans-serif"],
        "mono": ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
