/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightblue: "#367AC9",
        darkblue: "#0E2E69",
        green: "#3BD27A",
        yellow: "#FFC038",
        red: "#EA6060",
        gray: "#F2F2F2",
      },
    },
  },
  plugins: [],
}
