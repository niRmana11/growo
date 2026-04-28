/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        growo: {
          50: '#F9FDF4',
          100: '#F2FAE8',
          200: '#E2F4CC',
          300: '#C9E99A',
          400: '#A8DC6C',
          500: '#7ED957',
          600: '#65C437',
          700: '#4A9D2C',
          800: '#3A7A24',
          900: '#2D601F',
          950: '#15330C',
        },
        // Brand colors from design system
        primary: '#7ED957',
        success: '#22C55E',
        darkGreen: '#15803D',
        darkNav: '#0D1117',
        gray: '#6B7280',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
      },
    },
  },
  plugins: [],
};
