/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'geist-mono': ['Geist Mono', 'monospace'],
      },
    },
  },

  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: []
}
