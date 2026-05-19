/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050816',
        panel: '#0b1020',
        line: '#1f2a44',
        cyan: '#38bdf8',
        mint: '#34d399'
      },
      boxShadow: {
        glow: '0 0 45px rgba(56, 189, 248, 0.16)'
      }
    }
  },
  plugins: []
};
