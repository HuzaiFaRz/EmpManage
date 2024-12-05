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
        light_Bg: "#f4f4f4", // Light background
        light_Text: "#333333", // Light text color

        dark_Bg: "#1e1e1e", // Dark background
        dark_Text: "#f5f5f5", // Dark text color
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
