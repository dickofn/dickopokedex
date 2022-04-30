<template>
  <div class="relative min-h-full min-w-full px-5 pt-10 pb-16">
    <Grid>
      <PokemonCard
        v-for="pokemon in data"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </Grid>

    <div class="absolute inset-x-0 bottom-0 flex justify-center p-4">
      <Spinner v-if="pending" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGlobalStore } from "~~/store/global";
import { usePokemonStore } from "~~/store/pokemon";

const pokemonStore = usePokemonStore();
const globalStore = useGlobalStore();

const limit = ref(24);
const offset = ref(0);
const { pokemons } = storeToRefs(pokemonStore);

const { data, error, refresh, pending } = useAsyncData(
  "pokemons",
  () =>
    $fetch("/api/pokemon/getAll", {
      params: { limit: limit.value, offset: offset.value },
    }),
  {
    transform: (data) => {
      // First hydration is happen on the server, normal reactive didn't support SSR
      // so using pinia to hydrate first data, and combine it again after that
      const temp = [...pokemons.value];
      temp.push(...data);
      pokemonStore.setPokemons(temp);
      const combined = [...pokemons.value];
      return combined;
    },
  }
);

pokemonStore.setParams({ limit: limit.value, offset: offset.value });

if (error) {
  globalStore.setError(error);
}

// Set watch observer to update pokemonStore when limit or offset change
watch([offset, limit], () => {
  refresh();
});

// Infinite scroll watcher
if (process.client) {
  // Desktop watcher
  window.onscroll = () => {
    onBottomScroll();
  };

  // Mobile watcher
  window.ontouchmove = () => {
    onBottomScroll();
  };

  function onBottomScroll() {
    const bottomOfWindow =
      Math.ceil(document.documentElement.scrollTop) + window.innerHeight ===
      document.documentElement.scrollHeight;

    if (bottomOfWindow) {
      console.log("[LOG] | onBottomScroll | pending", pending.value);
      if (!pending.value) offset.value++;
    }
  }
}
</script>
