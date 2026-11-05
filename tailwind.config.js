/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        academy: {
          navy: '#0B1B3D',
          'navy-dark': '#071228',
          'navy-light': '#162C5C',
          ivory: '#FAF8F5',
          'ivory-dark': '#F0EBE1',
          gold: '#C5A880',
          'gold-light': '#E2CFAF',
          'gold-dark': '#9A7D56',
          charcoal: '#1E232E',
          'charcoal-muted': '#5A6273',
          sage: '#3B7A57',
          'sage-light': '#E9F4EE',
          wine: '#8B2635',
          'wine-light': '#FDF2F4'
        }
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Noto Serif KR"', 'Georgia', 'serif'],
        korean: ['"Noto Sans KR"', '"Malgun Gothic"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
