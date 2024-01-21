/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green_black': '#163020',
        'dark_green': '#304D30',
        'gray_green': '#B6C4B6',
        'light_gray_green': '#EEF0E5',
      }
    },
  },
  plugins: [require("daisyui")],
}