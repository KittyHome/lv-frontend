/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#EE1D4F",
          200: "#D50C4C",
          300: "#7E0948",
        },
        secondary: {
          100: "#171625",
        },
        background: {
          100: "#090b12",
          200: "#161a25",
        },
        text: {
          100: "#FFFFFF",
          200: "#F0F0F0",
        },
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(90deg, #EE1D4F 0%, #D50C4C 60%, #7E0948 100%)",
      },
      boxShadow: {
        "glow-primary": "0 0 10px #EE1D4F",
        "glow-secondary": "0 0 10px #161a25",
      },
    },
  },
  plugins: [],
};
