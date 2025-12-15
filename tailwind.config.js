/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'elegant': ['Playfair Display', 'serif'],
        'elegant-alt': ['Cormorant Garamond', 'serif'],
        'studio': ['Inter', 'sans-serif'],
        'brush': ['Pacifico', 'cursive'],
        'brush-alt': ['Caveat Brush', 'cursive'],
        'volkge': ['Vollkorn', 'serif'],
        'volkge-heavy': ['Vollkorn', 'serif'],
        'volkge-light': ['Vollkorn', 'serif'],
      },
      colors: {
        'nudo-green': '#2D4B39',
        'nudo-gold': '#B8860B',
        'nudo-cream': '#E0D1C0',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px rgba(184, 134, 11, 0.3)'
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 40px rgba(184, 134, 11, 0.6)'
          },
        },
      },
    },
  },
  plugins: [],
}