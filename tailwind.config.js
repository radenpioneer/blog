const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

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
      customHeading: ['Fraunces', ...defaultTheme.fontFamily.serif]
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        lightBlue: colors.lightBlue
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
