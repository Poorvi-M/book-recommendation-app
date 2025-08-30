module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
      'serif': ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        'cozy-bg': '#F8FAFC',
        'cozy-rose': '#ffe4e6',
        'cozy-indigo': '#6366f1',
        'cozy-violet': '#8b5cf6',
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'cozy': '0 4px 32px 0 rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
