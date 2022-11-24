/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./imports/ui/**/*.{js,jsx,ts,tsx}",
    "./imports/ui/*.{js,jsx,ts,tsx}",
    "./client/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
