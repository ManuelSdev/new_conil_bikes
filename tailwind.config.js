/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './src/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
   ],
   important: '#__next',
   theme: {
      extend: {},
   },
   corePlugins: {
      // Remove Tailwind CSS's preflight style so it can use the MUI's preflight instead (CssBaseline).
      preflight: false,
   },
   plugins: [],
}
