import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefaf6',
          100: '#d9f5ea',
          500: '#1e8f6d',
          600: '#187a5d',
          700: '#125f49',
          900: '#0b4033'
        },
        ink: '#0f172a',
        panel: '#f8fafc',
        subtle: '#e2e8f0',
        success: '#0f9f6e',
        warning: '#d97706',
        danger: '#dc2626'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
