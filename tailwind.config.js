/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "90vh" : "90vh",
        "100vh" : "100vh"
      }
    },
    fontFamily: {
      'poppins': ['Poppins']
    }
  },
  plugins: [],
}
