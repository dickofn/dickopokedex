<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
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

useFetch("/api/pokemon/preload");
</script>

<style>
html {
  @apply h-full text-matterhorn-800;
}
body {
  @apply h-full;
}
</style>
