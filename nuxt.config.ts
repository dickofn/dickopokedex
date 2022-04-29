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

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
});
