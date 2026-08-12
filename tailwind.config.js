/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './templates/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SFMono-Regular', 'SF Mono', 'ui-monospace', 'PingFang SC', 'Microsoft YaHei', 'monospace'],
        mono: ['SFMono-Regular', 'SF Mono', 'ui-monospace', 'PingFang SC', 'Microsoft YaHei', 'monospace'],
        display: ['Avenir Next Condensed', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
