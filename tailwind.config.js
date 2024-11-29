/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '2': 'repeat(2, 9rem)',
        '3': 'repeat(3, 16rem)',
      },
      gridTemplateRows: {
        '2': 'repeat(2, 16rem)',
        '3': 'repeat(3, 9rem)',
      },
      animation: {
        'select': 'select 500ms ease-in-out',
      },
      keyframes: {
        select: {
          '0%': { 
            transform: 'scale(1)',
          },
          '50%': { 
            transform: 'scale(1.05)',
          },
          '100%': { 
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
}
