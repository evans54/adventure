/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f4c75', // Deep travel blue
          light: '#3282b8',
          dark: '#0a3452',
        },
        accent: {
          DEFAULT: '#fca311', // Golden adventure yellow
          light: '#ffc300',
          dark: '#e08e00',
        },
        secondary: {
          DEFAULT: '#f8f9fa',
          dark: '#e9ecef',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
