/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#06070D",
        qala: {
          bg: "#06070D",
          card: "#0C0E17",
          border: "rgba(255, 255, 255, 0.1)",
          indigo: "#4F46E5",
          indigoLight: "#6366F1",
          cyan: "#3FE0E0",
          good: "#34D399",
        }
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fillBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        }
      },
      animation: {
        blink: 'blink 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        marquee: 'marquee 25s linear infinite',
        fillBar: 'fillBar 3.6s linear forwards',
      },
    },
  },
  plugins: [],
}
