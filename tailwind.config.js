/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
            code: {
              wordWrap: 'break-word',
              boxDecorationBreak: 'clone',
              padding: '.1rem .3rem .2rem',
              borderRadius: '.2rem',
            },
          },
        },
      },
      colors: {
        'accent': 'black',
        'accent-light': '#EEEEF3',
        'light-gray': '#EEEEF3',
        'apple-gray': '#FAFAFA',
        'gray':'#D6D6D6',
        'some-gray': '#909090',
        'dark-gray': '#5D5D5D'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

