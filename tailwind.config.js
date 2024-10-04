/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss}"],
  theme: {
    extend: {},
    screens: {
      "md-h": { max: "786px", min: "0px" },
      "lg-h": { max: "1206px", min: "786px" },
      xs: { max: "320px" },
      sm: { max: "375px" },
      md: { max: "786px" },
      lg: { max: "1206px" },
      "2xl": { max: "1510px", min: "1207px" },
      "4k": { max: "2638px", min: "1509px" },
      "lg-search": { max: "950px" },
      "xl-search": { max: "1447px", min: "951px" },
      "xl-cart": { max: "1440px" },
  },
  plugins: [],
};
