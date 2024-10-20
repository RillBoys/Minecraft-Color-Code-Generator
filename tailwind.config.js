/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./src/**/*.{js,jsx,ts,tsx}"
	  ],
	theme: {
    extend: {
      boxShadow: {
        'outline': '0 0 0 3px rgba(66, 153, 225, 0.5)',
      },
    },
  },
  variants: {},
  plugins: [],
}
