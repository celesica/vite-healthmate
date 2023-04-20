/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      ownTeal: '#64C0AB',
      darkTeal: '#106A67',
      lightTeal: '#A1CCCC',
      greenTeal: '#248C73',
      ownGray: '#A2BCC3',
      ownYellow: '#FFAB5D',
      ownOrange: '#EA7733',
      superLightTeal: '#edf2f3'
    }
  },
  plugins: [require("flowbite/plugin")],
  darkMode: 'class',
}