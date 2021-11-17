const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  fontFamily: {
    sans: ["Poppins", "sans-serif"],
    serif: ["Poppins", "serif"],
  },
  theme: {
    colors: {
      primary: colors.sky,
      secondary: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
      },
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      indigo: colors.indigo,
      blueGray: colors.blueGray,
      red: colors.rose,
      orange: colors.amber,
      green: colors.teal,
      teal: colors.teal,
      purple: colors.purple,
      blue: colors.sky,
    },
    extend: {
      keyframes: {
        shrink: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)", height: 0 },
        },
        swipe: {
          "0%": { transform: "translatX(0)" },
          "100%": { transform: "translaY(100px)" },
        },
      },
      animation: {
        shrink: "shrink 0.3s ease-in-out forwards",
        swipe: "swipe 0.3s ease-in-out forwards",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/aspect-ratio")],
};
