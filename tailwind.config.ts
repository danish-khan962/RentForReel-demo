/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'host-grotesk': ['"Host Grotesk"', 'sans-serif'],
        'noto-serif': ['"Noto Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
