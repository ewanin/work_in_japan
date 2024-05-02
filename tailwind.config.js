/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-sarif']
      },
      backgroundImage: {
        'HeroImage': "url('/BG.png')"
      },
      dropShadow: {
        'textShadow': '5px 1px 2px rgba(0, 0, 0, 1)'
      }
    },
  },
  plugins: [],
}