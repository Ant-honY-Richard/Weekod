/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'text-glow': 'glow 3s ease-in-out infinite',
        'flow-text': 'flow 6s ease-in-out infinite',
        'logo-gleam': 'gleam 8s linear infinite',
        'logo-pulse': 'logoPulse 4s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 5px #fff, 0 0 10px #b721ff, 0 0 20px #b721ff' },
          '50%': { textShadow: '0 0 10px #fff, 0 0 20px #b721ff, 0 0 40px #b721ff' },
        },
        flow: {
          '0%, 100%': { color: '#e0e0e0' },
          '50%': { color: '#ffffff' },
        },
        gleam: {
          '0%': { filter: 'brightness(1) drop-shadow(0 0 0 rgba(183, 33, 255, 0))' },
          '20%': { filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(183, 33, 255, 0.3))' },
          '40%': { filter: 'brightness(1) drop-shadow(0 0 0 rgba(183, 33, 255, 0))' },
          '100%': { filter: 'brightness(1) drop-shadow(0 0 0 rgba(183, 33, 255, 0))' },
        },
        logoPulse: {
          '0%, 100%': { 
            opacity: 0.8,
            filter: 'drop-shadow(0 0 0px rgba(255, 255, 255, 0.8))'
          },
          '50%': { 
            opacity: 1,
            filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.9))'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'dark-700': '#1e1e2f',
        'dark-800': '#141420',
        'dark-900': '#0A0A0A',
        'accent-purple': '#b721ff',
        'accent-magenta': '#ff00c8',
        'silver': '#cfd8dc',
        'futuristic-dark-blue': '#0A0E17',
        'futuristic-dark-slate': '#141E33',
        'neon-blue': '#00A3FF',
        'neon-purple': '#9D4EDD',
        'neon-cyan': '#00FFD1',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}; 
