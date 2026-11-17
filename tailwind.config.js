/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],

  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },

  theme: {
    fontFamily: {
      golos: ['Golos Text, sans-serif'],
      sans: ['Golos Text, sans-serif'],
      serif: ['Golos Text, sans-serif'],
      body: ['Golos Text, sans-serif'],
    },

    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
    },

    // Расширения классов
    extend: {
      height: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        13: '3.25rem',
        21: '5.25rem',
      },

      width: {
        7.5: '1.875rem',
        13: '3.25rem',
        55: '13.75',
        81: '20.25rem',
        106: '26.5rem',
        108: '27rem',
        114: '28.5rem',
        120: '30rem',
        121: '30.25rem',
      },

      maxWidth: {
        13: '3.25rem',
        108: '27rem',
        114: '28.5rem',
        120: '29.5rem',
        121: '30.25rem',
      },

      minWidth: {
        13: '3.25rem',
        17: '4.25rem',
        35: '8.75rem',
      },

      borderRadius: {
        22: '1.375rem',
      },

      padding: {
        15: '3.75rem',
      },

      colors: {
        decorative: {
          blue: '#143361',
          mint: '#92B5CC',
          beige: '#EFE9DD',
          pink: '#EBC9C8',
          orange: '#F48663',
          yellow: '#D5AD42',
          'light-blue-gray': '#CEE0EC',
          'dark-blue': '#0A2132',
          'gray-blue': '#C0C3C5',
          'light-blue': '#F6FDFF',
          gray: '#586167',
          white: '#FFFFFF',
          green: '#69BC54',
          'light-green': '#F0FBED',
          lavender: '#E2E0FC',
          'light-gray': '#EAEAEA'
        },
        text: {
          default: '#000000',
          secondary: '#808080',
          disable: '#B2B2B2',
          'default-inverted': '#FFFFFF',
          'secondary-inverted': '#F2F2F2',
          critical: '#E0483E',
        },
        bg: {
          default: '#FFFFFF',
          'default-inverted': '#202020',
          secondary: '#F2F2F2',
          tertiary: '#EAEAEA',
        },
        stroke: {
          default: '#EDEDED',
          'default-secondary': '#CCCCCC',
          'default-inverted': '#2B2B2B',
          critical: '#E0483E',
        },
        button: {
          primary: {
            default: '#143361',
            hover: '#0046AD',
            tap: '#0080FF',
            disable: '#B4BEC7',
          },
          secondary: {
            default: '#92B5CC',
            hover: '#659DC3',
            tap: '#83C4EE',
          },
          tertiary: {
            default: '#E6E6E6',
            hover: '#CCCCCC',
            tap: '#143361',
          },
          distructive: {
            default: '#E0483E',
            hover: '#C31F14',
            tap: '#FF382B',
          },
        },
      },

      borderColor: {
        green: '#69BC54',
        gray: '#C0C3C5',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },

  plugins: [require('tailwindcss-animate')],
};
