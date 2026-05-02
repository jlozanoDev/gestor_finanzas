import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d9efff',
          200: '#bce1ff',
          300: '#8ccfff',
          400: '#54b2ff',
          500: '#2e91f5',
          600: '#1d73d8',
          700: '#185cad',
          800: '#184e8f',
          900: '#1a4174',
        },
      },
      boxShadow: {
        soft: '0 20px 40px rgba(15, 23, 42, 0.16)',
      },
      fontFamily: {
        sans: ['Aptos', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
