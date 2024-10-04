/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss}"],
  theme: {
    extend: {},
    screens: {
      xs: { max: "320px" },
      sm: { max: "375px" },
      md: { max: "786px" },
      lg: { max: "1206px" },
      "2xl": { max: "1510px", min: "1207px" },
      "4k": { max: "2638px", min: "1509px" },
  },
  plugins: [],
};
