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
          DEFAULT: '#0F1F3D',
          50: '#E8EBF2',
          100: '#C5CEDF',
          200: '#9FB0CA',
          300: '#7992B5',
          400: '#5374A0',
          500: '#365685',
          600: '#274468',
          700: '#1B324E',
          800: '#122340',
          900: '#070F1F',
        },
        gold: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        accent: {
          DEFAULT: '#38BDF8',
          50: '#F0F9FF',
          100: '#E0F2FE',
          500: '#38BDF8',
          600: '#0EA5E9',
          700: '#0284C7',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'navy-gradient':
          'linear-gradient(135deg, #0F1F3D 0%, #1B324E 50%, #070F1F 100%)',
        'gold-gradient': 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 0 3px rgba(59, 130, 246, 0.25)',
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
