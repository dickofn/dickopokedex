<template>
  <div class="flex min-h-full items-center justify-center p-2">
    <Card class="w-[512px]">
      <div class="mx-auto w-full max-w-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
        consequuntur perferendis tenetur, culpa quaerat id, ipsum ducimus
        facilis amet dolore laudantium distinctio autem necessitatibus ex
        consectetur, optio animi voluptatum explicabo.

        <div v-if="isLoading" class="text-4xl">LOADING BRO!</div>

        {{ pokemons }}
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "~~/store/global";
import { usePokemonStore } from "~~/store/pokemon";
import { AllPokemonsPayload } from "~~/types/pokemon";

const pokemonStore = usePokemonStore();
const globalStore = useGlobalStore();
const isLoading = ref(false);

const limit = ref(9);
const offset = ref(0);
const pokemons = computed(() => {
  return pokemonStore.AllPokemons;
});

async function loadAllPokemons(payload: AllPokemonsPayload) {
  isLoading.value = true;
  try {
    await pokemonStore.getAllPokemons(payload);
  } catch (e) {
    globalStore.setError(e);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadAllPokemons({ limit: limit.value, offset: offset.value });
});
</script>
