/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', "serif"],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // ImageTech Industries Industrial Color Palette
        primary: {
          DEFAULT: '#0B3B6F', // Primary Navy Blue
          dark: '#07264a',
          light: '#144f91',
        },
        secondary: {
          DEFAULT: '#0D6EFD', // Secondary Tech Blue
          light: '#e7f0fe',
          dark: '#084dc4',
        },
        accent: {
          DEFAULT: '#FFC107', // Accent Industrial Yellow
          hover: '#e0a800',
          light: '#fff8e1',
        },
        industrial: {
          navy: '#0B3B6F',
          blue: '#0D6EFD',
          yellow: '#FFC107',
          bg: '#F5F8FC',
          text: '#172B4D',
          border: '#DCE5EF',
          muted: '#5E6C84',
        },
        dark: {
          DEFAULT: '#172B4D',
          light: '#253858',
        },
        success: '#198754',
        'bg-body': '#F5F8FC',
        muted: '#5E6C84',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'industrial-gradient': 'linear-gradient(135deg, #0B3B6F 0%, #092c53 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
