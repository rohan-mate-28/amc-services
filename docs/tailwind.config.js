module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'opacity-transform': 'opacity, transform',
      },
       fontFamily: {
        sans: ['ui-sans-serif', 'system-ui'], 
      },
    },
  },
  plugins: [],
};
