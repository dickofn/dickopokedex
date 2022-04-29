const defaultTheme = require("tailwindcss/defaultTheme");

const matterhorn = {
  DEFAULT: "#4F3E45",
  50: "#D6CBCF",
  100: "#C8B9C0",
  200: "#AD97A0",
  300: "#937581",
  400: "#715963",
  500: "#4F3E45",
  600: "#413339",
  700: "#32282C",
  800: "#241C20",
  900: "#161113",
};

module.exports = {
  content: [
    "components/**/*.{vue,js}",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "composables/**/*.{js,ts}",
    "plugins/**/*.{js,ts}",
    "App.{js,ts,vue}",
    "app.{js,ts,vue}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: matterhorn.DEFAULT,
          lighter: matterhorn[300],
          darker: matterhorn[700],
        },

        matterhorn,
      },
    },
    fontFamily: {
      sans: ["Poppins", ...defaultTheme.fontFamily.sans],
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
