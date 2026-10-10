/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#020205',
        void: '#070812',
        cyber: {
          cyan: '#00F5FF',
          violet: '#8A2BE2',
          purple: '#7B2CBF',
          magenta: '#FF007F',
          emerald: '#00FF9D',
          amber: '#FFB800',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Syne"', 'sans-serif'],
        syne: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'holo-gradient': 'linear-gradient(135deg, #00F5FF 0%, #7B2CBF 50%, #FF007F 100%)',
        'cyber-grid': 'linear-gradient(to right, rgba(0, 245, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 245, 255, 0.05) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
        'reverse-spin': 'reverse-spin 24s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
