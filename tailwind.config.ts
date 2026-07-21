import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#300000',
          50: '#F6E6E6',
          100: '#EBC7C7',
          200: '#DB9F9F',
          300: '#CB7777',
          400: '#B44E4E',
          500: '#D30000',
          600: '#A80000',
          700: '#7D0000',
          800: '#520000',
          900: '#2B0000',
        },
        gold: {
          DEFAULT: '#D30000',
          50: '#FCE8E8',
          100: '#F9C9C9',
          200: '#F29999',
          300: '#EA6666',
          400: '#E13333',
          500: '#D30000',
          600: '#A80000',
          700: '#7D0000',
          800: '#520000',
          900: '#2B0000',
        },
        accent: {
          DEFAULT: '#E13333',
          50: '#FCE8E8',
          100: '#F9C9C9',
          500: '#E13333',
          600: '#A80000',
          700: '#7D0000',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'navy-gradient':
          'linear-gradient(135deg, #300000 0%, #7D0000 50%, #1A0000 100%)',
        'gold-gradient': 'linear-gradient(135deg, #E13333 0%, #7D0000 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 0 3px rgba(211, 0, 0, 0.25)',
        card: '0 4px 24px rgba(15, 31, 61, 0.08)',
        'card-hover': '0 12px 36px rgba(15, 31, 61, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
