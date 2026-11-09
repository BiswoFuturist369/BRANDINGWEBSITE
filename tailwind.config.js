/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E11D2A',
          black: '#0A0A0A',
          white: '#FFFFFF',
          tint: '#F6F6F4',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', '"Bodoni Moda"', 'Georgia', '"Times New Roman"', 'serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter Tight"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'card': '16px',
        'pill': '9999px',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'luxury-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
