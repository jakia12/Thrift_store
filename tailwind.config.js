/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    container: {
      center: true,
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    }
    ,
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1200px',
      // => @media (min-width: 1440px) { ... }
    },
    colors: {
      firstCol: "#FF5E2B",
      secondCol: "#EC5727",
      rose: "#fb7185",
      darkSlate: "#1e293b",
      lightSlate: "#334155",
      gray: "#f9f9f9",
      white: "#fff",
      darkBlack: "#000",
      darkGray: "#B3B3B3",
      lightBlue: "#508AEF",
      nudeBlue: "#ECF5FF",
      deepBlue: "#000060"

    },
  },

  plugins: [require("daisyui"), require('flowbite/plugin')],


}