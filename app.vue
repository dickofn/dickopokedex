<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useGlobalStore } from "./store/global";

useHead({
  title: "Welcome",
  titleTemplate: "%s | Dicko Pokedex",
  meta: [
    {
      name: "description",
      content:
        "Pokedex with Nuxt 3 x Tailwind 3, Feel free to come, this project is also open-source",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});

const globalStore = useGlobalStore();

// On application init, do server function to preload all pokemon data to MongoDB
try {
  await useFetch("/api/pokemon/preload");
} catch (err) {
  globalStore.setError(err);
}
</script>

<style>
html {
  @apply h-full text-matterhorn-800;
}
body {
  @apply h-full;
}
</style>
