/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Angular templates and component files
  ],
  corePlugins: {
    preflight: false, // Disable Tailwind's default CSS reset (Preflight)
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
