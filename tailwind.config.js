/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        grayddd: "#DDD",
        primary: "#1DC071",
        secondary: "#A4D96C",
      },
    },
    screens: {
      mobile: { max: "639px" },
      sm: { min: "640px", max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1024px" },
      xl: { min: "1280px" },
    },
  },
  plugins: [],
};
