/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#683AB7',
        secondary: '#F6F6F6',
        lightText: '#B5B6B6',
        inputBg: '#F9F9F9',
        borderColor: '#BDBFC355',
        success: '#30BE6E',
        error: '#EB4336'
      },
      boxShadow: {
        box: '5px 15px 35px rgba(0, 0, 0, 0.15)'
      },
      width: {
        sideMenu: '400px'
      },
      screens: {
        mdx2: '900px',
        sm: '620px',
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
