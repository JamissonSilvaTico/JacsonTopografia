/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{api,components,pages}/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
