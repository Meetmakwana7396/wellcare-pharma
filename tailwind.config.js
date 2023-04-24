/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",

  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'primary': '#227fbb',
      'secondary': '#7f8c8d',
      'warning': '#f59d00',
      'success': '#1aaf5d',
      'danger': '#c23824',
      'info': '#9c56b8',
      'black':'#000000'
    },
    'tahiti': {
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    extend: {},
  },
  plugins: [],
}

