/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "space-grotesk": ['Space Grotesk', 'sans-serif']
      }
    },
    container: { center: true, padding: "2rem" }
  },
  plugins: [require('@tailwindcss/forms')],
}
