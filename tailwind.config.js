/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { 
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['luxury', 'aqua', {
      slinky: {

        "primary": "#047857",

        "secondary": '#3b82f6',

        "accent": "#10b981",

        "neutral": "#9ca3af",

        "base-100": "#4b5563",

        "info": "#ffffff",

        "success": "#4ade80",

        "warning": "#fcd34d",

        "error": "#fb7185",
      },
    }],
    darkTheme: 'luxury',
  }
};
