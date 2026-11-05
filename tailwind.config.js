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
          purple: '#6C52EE',
          'purple-dark': '#4F35C8',
          'purple-deep': '#2C1E6D',
          'purple-light': '#8E77F7',
          pink: '#FF5CA8',
          'pink-dark': '#E63985',
          'pink-light': '#FFA8D3',
          blue: '#44C5F5',
          'blue-dark': '#22A3D3',
          'blue-light': '#A0E6FC',
          lavender: '#F0EDFF',
          'lavender-light': '#F8F7FF',
          navy: '#2C1E6D',
          'navy-dark': '#1C1346',
          'navy-light': '#422F96',
          white: '#FFFFFF',
        },
        academy: {
          navy: '#2C1E6D',          // ChinguPop Deep Violet
          'navy-dark': '#1C1346',     // Deepest Violet
          'navy-light': '#422F96',    // Mid Violet
          ivory: '#F8F7FF',           // Luminous Lavender-White
          'ivory-dark': '#EEEAFB',
          gold: '#FF5CA8',            // ChinguPop Hot Pink Accent
          'gold-light': '#FFA8D3',    // Light Pink
          'gold-dark': '#E63985',     // Deep Pink
          charcoal: '#22194D',        // Deep Violet Charcoal
          'charcoal-muted': '#6A628A',
          sage: '#10B981',
          'sage-light': '#ECFDF5',
          wine: '#FF5CA8',            // ChinguPop Pink
          'wine-light': '#FFF0F7',
          pink: '#FF5CA8',
          blue: '#44C5F5',
          lavender: '#F0EDFF',
          purple: '#6C52EE'
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
