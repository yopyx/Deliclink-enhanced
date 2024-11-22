/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss}"],
  theme: {
    extend: {},
    screens: {
      mobile: { max: "565px", min: "320px" },
      "md-h": { max: "786px", min: "565px" },
      sec: { max: "786px" },
      "lg-h": { max: "1206px", min: "786px" },
      xs: { max: "320px" },
      sm: { max: "375px" },
      md: { max: "786px" },
      lg: { max: "1200px" },
      "2xl": { max: "1510px", min: "1200px" },
      "4k": { max: "2638px", min: "1510px" },
      "lg-search": { max: "950px" },
      "lp-sub2": { max: "1024px" },
      "lp-sub1": { max: "1400px" },
      "xl-search": { max: "1447px", min: "950px" },
      "xl-cart": { max: "1447px" },
    },
  },
  plugins: [],
};
