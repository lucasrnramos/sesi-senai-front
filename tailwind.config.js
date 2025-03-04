/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': {
        'min': '320px',
        'max': '480px'
      },
      'md': {
        'min': '480px',
        'max': '829px'
      },
      'lg': {
        'min': '830px',
        'max': '1439px'
      },
      'xl': {
        'min': '1440px',
        'max': '1920px'
      },
      '2xl': {
        'min': '1921px',
        'max': '2560px'
      },
      '3xl': {
        'min': '2561px',
        'max': '9999px'
      }
    },
    extend: {
      colors: {
        'pure-blue': '#0000ff'
      }
    },
  },
  plugins: [],
}
