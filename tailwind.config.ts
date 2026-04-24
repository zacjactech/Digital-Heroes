import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest:       '#1A3C34',
        gold:         '#C89749',
        emerald:      '#4CAF82',
        canopy:       '#2E6B5E',
        ink:          '#1C2B26',
        moss:         '#3D5A52',
        slate:        '#6B8F84',
        mist:         '#F4F9F6',
        'sage-tint':  '#F0F7F3',
        'leaf-wash':  '#E2F2EA',
        'soft-sage':  '#D0E8DC',
      },
      fontFamily: {
        display:  ['Playfair Display', 'Georgia', 'serif'],
        heading:  ['DM Sans', 'system-ui', 'sans-serif'],
        body:     ['DM Sans', 'system-ui', 'sans-serif'],
        mono:     ['JetBrains Mono', 'Courier New', 'monospace'],
        sans:     ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        regular:   '400',
        medium:    '500',
        semibold:  '600',
        bold:      '700',
        extrabold: '800',
      },
      borderRadius: {
        sm:   '0.375rem',
        md:   '0.5rem',
        lg:   '0.75rem',
        xl:   '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        sm:   '0 1px 3px rgba(28,43,38,0.08)',
        md:   '0 4px 16px rgba(28,43,38,0.10)',
        lg:   '0 8px 32px rgba(28,43,38,0.14)',
        gold: '0 0 0 2px rgba(200,151,73,0.25)',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'count-flip': 'countFlip 0.4s ease-in-out',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        countFlip: {
          '0%':   { transform: 'rotateX(90deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)',  opacity: '1' },
        },
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '11': '2.75rem',  /* 44px touch target */
        '18': '4.5rem',
        '22': '5.5rem',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

export default config
