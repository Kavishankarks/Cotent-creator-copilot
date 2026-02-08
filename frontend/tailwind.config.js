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
        "primary": "#13b6ec",
        "background-light": "#f6f8f8",
        "background-dark": "#101d22",
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
