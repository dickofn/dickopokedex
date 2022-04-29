import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      pokeApiUrl: process.env.POKEAPI_API_URL,
    },
  },

  // See: https://github.com/nuxt/framework/issues/2627
  alias: {
    yup: "yup/lib/index.js",
  },

  // See: https://github.com/tailwindlabs/heroicons/issues/564
  build: {
    transpile: ["@heroicons/vue"],
  },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
});
