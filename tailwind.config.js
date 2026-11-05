/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chingu: {
          purple: '#7955E8',
          'purple-light': '#9B7BF7',
          pink: '#FF5CA8',
          'pink-light': '#FF8DC3',
          blue: '#55C8F5',
          'blue-light': '#8FE0FA',
          lavender: '#E9DFFF',
          navy: '#252343',
          'navy-light': '#363363',
          white: '#FFFFFF',
        },
        academy: {
          navy: '#252343',          // ChinguPop Deep Navy
          'navy-dark': '#1A1830',     // Darker Navy
          'navy-light': '#363363',    // Light Navy
          ivory: '#FAF8FD',           // Soft Lavender Ivory tint
          'ivory-dark': '#F0EAF8',
          gold: '#7955E8',            // ChinguPop Primary Purple
          'gold-light': '#E9DFFF',    // Soft Lavender
          'gold-dark': '#6139D6',     // Deep Purple
          charcoal: '#1E232E',
          'charcoal-muted': '#5A6273',
          sage: '#3B7A57',
          'sage-light': '#E9F4EE',
          wine: '#FF5CA8',            // ChinguPop Hot Pink
          'wine-light': '#FFF0F7',
          pink: '#FF5CA8',
          blue: '#55C8F5',
          lavender: '#E9DFFF',
          purple: '#7955E8'
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
