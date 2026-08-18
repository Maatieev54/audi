/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {

    screens: {
      sm: '640px',
      card: '700px',
      md: '768px',
      strip: '991px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {

        ink: '#000000',
        paper: '#ffffff',
        accent: '#bb0a30',
        steel: {
          50: '#f2f2f2',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4c4c4c',
          800: '#333333',
          900: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: [
          'Audi Type',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        shell: '1440px',
      },
      spacing: {
        tile: '6px',
      },
      transitionTimingFunction: {
        audi: 'cubic-bezier(0.75, 0.02, 0.5, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.75, 0.02, 0.5, 1) both',
        fadeIn: 'fadeIn 0.5s ease both',
        slideDown: 'slideDown 0.3s cubic-bezier(0.75, 0.02, 0.5, 1) both',
        zoomIn: 'zoomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
