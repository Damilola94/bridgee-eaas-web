/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F1D86',
        secondary: '#F6F6F6',
        lightText: '#B5B6B6',
        textColor: '#1A1A1A',
        inputBg: '#F9F9F9',
        borderColor: '#BDBFC355',
        success: '#CE18DF',
        purple: '#8C5FF8',
        transparentPurple: "rgba(206, 24, 223, 0.05)",
        error: '#EB4336',
        blue: '#5E32C9',
        grey: '#808080',
        greyDark: '#4B5563',
        grey2: "#6B7280",
        textGreen: '#03543F',
        green: '#057A55',
        lightGreen: '#DEF7EC'
      },
      boxShadow: {
        box: '5px 15px 35px rgba(0, 0, 0, 0.15)'
      },
      width: {
        sideMenu: '400px'
      },
      screens: {
        mdx2: '900px',
        sm: '640px',
        xs: '480px'
      },
      backgroundImage: {
        'auth-bg': "url('../assets/svgs/background.svg')"
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
};
