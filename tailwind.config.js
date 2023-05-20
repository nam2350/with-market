/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryP: { 300: "#E7C3D4", 400: "#EBA4C6", 500: "#E891BA" },
        primaryB: { 300: "#A8C4DE", 400: "#63A7E8", 500: "#4E97DC" },
      },
    },
  },
  plugins: [],
};
