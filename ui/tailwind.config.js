/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'tab': '0px 1px 0px -0.5px',
        'tabSelected': "0px 0px 4px -2px "
      },
      colors:  {
        'backg': '#081635',
        'inputs': '#102042',
        'blue-custom': '#000031',
        'sky': '#B1FCFE',
        'red-custom': '#ED7043',
        'chok': '#B1FCFE',
        'green-custom': '#7DFBA2',
        'yellow-custom': '#FFFFA6',
        'border': '#334155',
        'export': '#387847',
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}
