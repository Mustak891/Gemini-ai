/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { "background-position": '-800px 0px' },
          '100%': { "background-position": '800px 0px' },
        }
      },
      gridTemplateColumns:{
        "16": 'repeat(auto-fill, minmax(180px, 1fr))',
        "18": 'repeat(auto-fill, minmax(160px, 1fr))'
      }
    },
    fontFamily: {
      pop: ["Poppins", "sans-serif"]
    },
   
  },
  plugins: [],
}

