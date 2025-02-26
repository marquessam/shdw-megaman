/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 0.5s infinite alternate',
      },
      keyframes: {
        bounce: {
          'from': { transform: 'translateY(0px)' },
          'to': { transform: 'translateY(-2px)' },
        },
      },
      boxShadow: {
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};