/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        charcoal: '#101113',
        slatefilm: '#17191d',
        platinum: '#f4f1ea',
        muted: '#a7a8aa',
        line: 'rgba(255,255,255,0.11)',
        bone: '#f7f7f4',
        ash: '#d7d7d2',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 24px 80px rgba(0, 0, 0, 0.42)',
        glow: '0 0 70px rgba(255, 255, 255, 0.08)',
      },
      backgroundImage: {
        'film-grid':
          'linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 34s) linear infinite',
      },
    },
  },
  plugins: [],
};
