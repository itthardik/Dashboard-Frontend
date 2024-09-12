/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#E50010", // Custom primary color
				secondary: "#FBF9F7", // Custom secondary color
				ternary: "#BB8377", // Custom accent color
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"], // Custom font
			},
		},
	},
	plugins: [],
};
