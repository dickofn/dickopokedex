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

const pokemon = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
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
        pokemon,
      },
    },
    fontFamily: {
      sans: ["Poppins", ...defaultTheme.fontFamily.sans],
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
