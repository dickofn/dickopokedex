<template>
  <div class="min-h-full min-w-full py-10 px-5">
    <Grid>
      <PokemonCard
        v-for="pokemon in data"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </Grid>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGlobalStore } from "~~/store/global";
import { usePokemonStore } from "~~/store/pokemon";

const pokemonStore = usePokemonStore();
const globalStore = useGlobalStore();

const limit = ref(4);
const offset = ref(0);
const { pokemons } = storeToRefs(pokemonStore);

const { data, error, refresh } = useAsyncData(
  "pokemons",
  () =>
    $fetch("/api/pokemon/getAll", {
      params: { limit: limit.value, offset: offset.value },
    }),
  {
    transform: (data) => {
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

watch([offset, limit], () => {
  refresh();
});
</script>
