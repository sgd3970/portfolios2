/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 기본 색상 팔레트
      colors: {
        primary: {
          50: '#f0f4ff',
          500: '#4c6fff',
          900: '#0A1F44', // 메인 네이비
        },
        gold: {
          500: '#B8860B',
        },
        beige: {
          500: '#F5F5DC',
        },
      },
      // 폰트 패밀리
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 