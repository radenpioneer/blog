const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/**/*.liquid'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    animation: false
  },
  theme: {
    fontFamily: {
      customHeading: ['Martel', ...defaultTheme.fontFamily.serif]
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
