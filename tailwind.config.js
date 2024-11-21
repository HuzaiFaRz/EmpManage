/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
      colors: {
        lightBg: "#FEE715",
        darkBg: "#101820",
        lightText: "#101820",
        darkText: "#FEE715",
      },
    },
  },
  plugins: [],
};