/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#071326',
        panel: '#ffffff',
        line: '#dbe4f0',
        navy: '#0b1f3a',
        royal: '#2563eb',
        azure: '#3b82f6',
        silver: '#e5e7eb',
        soft: '#f8fafc'
      },
      boxShadow: {
        glow: '0 18px 55px rgba(37, 99, 235, 0.16)',
        glass: '0 18px 55px rgba(15, 23, 42, 0.1)',
        'neon-red': '0 16px 42px rgba(37, 99, 235, 0.22)',
        'neon-ruby': '0 16px 42px rgba(59, 130, 246, 0.18)'
      }
    }
  },
  plugins: []
};
