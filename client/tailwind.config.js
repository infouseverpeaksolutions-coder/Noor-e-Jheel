/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf0',
          100: '#f7f0e6',
          200: '#ebd9bc',
          300: '#dfc292',
          400: '#d3ab68',
          500: '#c89f56', // Warm luxury gold
          600: '#b2873d',
          700: '#8c6529',
          800: '#694a1d',
          900: '#4a3314',
        },
        dark: {
          800: '#14181f',
          900: '#0a0d10',
          950: '#050709',
        },
        forest: {
          800: '#133a29',
          900: '#0e2a1e',
          950: '#081a12',
        },
        warm: {
          50: '#faf7f2',
          100: '#f7f0e6',
          200: '#ece3d4',
          300: '#dfd2bc',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
