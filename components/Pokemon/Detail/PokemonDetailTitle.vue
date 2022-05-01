<template>
  <div
    class="flex flex-col items-center justify-center py-5 px-4 text-center capitalize sm:flex-row"
    :class="classEachType"
  >
    <h1 class="mr-4 text-2xl font-bold sm:text-3xl">
      {{ props.title }}
    </h1>
    <div class="mt-1 flex flex-wrap space-x-1 sm:mt-0">
      <PokemonTypeBadge
        v-for="pokemonType in props.types"
        :key="pokemonType.type.name"
        :type="pokemonType.type.name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  types: { type: Array, required: true },
  classEachType: { type: String, default: "" },
});
</script>
