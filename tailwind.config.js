/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    screens: {
      xs: '480px',
      sm: '768px',
      md: '992px',
      lg: '1024px',
      xl: '1440px',
    },
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

    colors: {
      firstCol: "#DA3C3C",
      secondCol: "#C13030",
      rose: "#fb7185",
      darkSlate: "#1e293b",
      lightSlate: "#334155",
      gray: "#f9f9f9",
      white: "#fff",
      darkBlack: "#000",
      darkGray: "#B3B3B3",
      lightGray: "#F0F2F5",
      lightBlue: "#508AEF",
      nudeBlue: "#ECF5FF",
      deepBlue: "#000060"

    },
  },

  plugins: [require("daisyui"), require('flowbite/plugin')],


}