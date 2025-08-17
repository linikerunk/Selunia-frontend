/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f5',
          100: '#ffe4ec',
          200: '#fbd2dd',
          300: '#f7d6e0',
          400: '#eaa6bb',
          500: '#d58aa0',
          600: '#c06f86'
        },
        ink: {
          DEFAULT: '#1a1a1a',
          600: '#555555'
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        xl: '12px'
      },
      maxWidth: {
        container: '1120px'
      }
    }
  },
  plugins: []
}


