<template>
  <div class="relative min-h-full min-w-full px-5 pt-5 pb-16">
    <div
      class="sticky top-0 z-20 -mx-5 mb-5 flex flex-col-reverse items-center bg-white bg-opacity-80 py-5 px-5 sm:flex-row"
    >
      <PokemonSearch
        class="mr-0 mb-0 w-full flex-1 sm:mr-2 sm:w-auto"
        @submit="search"
      />
      <NuxtLink
        to="/favorites"
        class="btn ml-auto flex w-auto cursor-pointer items-center rounded-b-none border-b-0 border-primary py-4 shadow-none sm:rounded-b sm:border-b sm:shadow-xl"
      >
        <div class="w-full text-center">See favorites</div>
      </NuxtLink>
    </div>

    <Grid>
      <PokemonCard
        v-for="pokemon in data"
        :key="pokemon.name"
        :pokemon="pokemon"
        :favorites="favorites"
        @toggle-favorite="toggleFavorite"
      />
    </Grid>

    <div
      class="absolute flex justify-center p-4"
      :class="[
        { 'inset-x-0 bottom-0': data },
        { 'inset-0 items-center': !data },
      ]"
    >
      <Spinner v-if="pending" />
    </div>

    <div
      v-if="!pending && data && data.length <= 0"
      class="py-4 text-center text-primary"
    >
      No results found
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
const filter = ref("");
const { pokemons, filter: storedFilter, favorites } = storeToRefs(pokemonStore);

function search(searchInput: string) {
  if (searchInput === storedFilter.value) return;
  data.value = null;
  limit.value = 24;
  offset.value = 0;
  filter.value = searchInput;

  // After search go back to top
  if (process.client) document.documentElement.scrollTop = 0;

  refresh();
}

function toggleFavorite(pokemonName: string) {
  if (favorites.value.includes(pokemonName)) {
    pokemonStore.removeFavorites(pokemonName);
  } else {
    pokemonStore.addFavorites(pokemonName);
  }
}

const { data, error, refresh, pending } = useAsyncData(
  "pokemons",
  () =>
    $fetch("/api/pokemon/getAll", {
      params: {
        limit: limit.value,
        offset: offset.value,
        filter: filter.value,
      },
    }),
  {
    transform: (data) => {
      // First hydration is happen on the server, normal reactive didn't support SSR
      // So using pinia to store first hydration data, and combine it again after that
      const temp = [...pokemons.value];
      temp.push(...data);
      pokemonStore.setPokemons(temp);

      // New filter prevent scroll load stacking and reset from top
      if (filter.value !== storedFilter.value) {
        pokemonStore.setParams({
          filter: filter.value,
        });
        pokemonStore.setPokemons(data);
      }

      // Allow scroll load stacking filtered or non filtered
      const combined = [...pokemons.value];
      return combined;
    },
  }
);

if (error) {
  globalStore.setError(error);
}

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
      if (!pending.value) offset.value++;
    }
  }
}
</script>
