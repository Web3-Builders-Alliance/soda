/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'tab': '0px 1px 0px -0.5px',
        'tabSelected': "0px 0px 4px -2px "
      }
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}
