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
        colorOne: "#D09683",
        colorTwo: "#330000",
      },
      screens: {
        sm: "600px",
        md: "1000px",
        lg: "1500px",
      },
    },
  },
  plugins: [],
};
