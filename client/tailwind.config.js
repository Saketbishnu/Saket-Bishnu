/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080303',
        panel: '#12070a',
        line: '#3f151c',
        crimson: '#dc2626',
        ruby: '#e11d48',
        silver: '#e5e7eb',
        soft: '#f8fafc'
      },
      boxShadow: {
        glow: '0 0 45px rgba(239, 68, 68, 0.18)',
        glass: '0 24px 80px rgba(0, 0, 0, 0.28)',
        'neon-red': '0 0 30px rgba(239, 68, 68, 0.34)',
        'neon-ruby': '0 0 30px rgba(225, 29, 72, 0.28)'
      }
    }
  },
  plugins: []
};
