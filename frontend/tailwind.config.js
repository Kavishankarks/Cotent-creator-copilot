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
        "primary": "#0EA5E9", // Electric Blue
        "primary-dark": "#0284C7",
        "secondary": "#8B5CF6", // Violet for accents
        "background": "#0B1121", // Very dark blue/black
        "surface": "#151E32", // Slightly lighter for cards
        "surface-highlight": "#1E293B", // For hover states
        "text-main": "#F8FAFC", // White/Off-white
        "text-muted": "#94A3B8", // Muted slate
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "sans": ["Space Grotesk", "sans-serif"], // Set as default sans
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
