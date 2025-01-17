/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#62D985',
        customLightGreen: '#DEFFE8',
        starColor:'#FFAD33',
        buttonColor:'#373737',
        navColor:'#62D98533',
        cartColor:'#373737',
        cartCardColor:'#FCFFFD',
      },
    },
  },
  plugins: [],
}