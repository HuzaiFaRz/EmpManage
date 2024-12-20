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
        colorOne: "#f5f5f5",
        colorTwo: "#333333",
      },

      screens: {
        xs: "400px",
        sm: "600px",
        md: "900px",
        lg: "1500px",
      },
    },
  },
  plugins: [],
};
