<template>
  <div class="mt-5 flex min-h-full min-w-full justify-center p-2">
    <Grid v-if="!pending">
      <PokemonCard
        v-for="pokemon in data.pokemons"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </Grid>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "~~/store/global";
import { usePokemonStore } from "~~/store/pokemon";

const pokemonStore = usePokemonStore();
const globalStore = useGlobalStore();

const limit = ref(20);
const offset = ref(0);

const { data, error, pending, refresh } = useAsyncData("pokemons", () =>
  $fetch("/api/pokemon/getAll", {
    params: { limit: limit.value, offset: offset.value },
  })
);

pokemonStore.setParams({ limit: limit.value, offset: offset.value });

if (error) {
  globalStore.setError(error);
}

watch([offset, limit], () => {
  refresh();
});
</script>
