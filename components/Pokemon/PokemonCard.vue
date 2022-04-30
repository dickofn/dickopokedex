<template>
  <div class="flex items-center rounded border border-primary p-4 shadow">
    <div class="w-26 rounded border border-primary">
      <img :src="defaultPic" :alt="pokemon.name" />
    </div>
    <div class="ml-6">
      <h3 class="mb-1 text-2xl font-bold capitalize leading-5">
        {{ pokemon.name }}
      </h3>
      <p class="text-sm font-normal leading-5 tracking-normal">
        {{ pokemon.types[0].type.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const defaultPic = computed(() => {
  return (
    props.pokemon.sprites.front_default || props.pokemon.sprites.front_female
  );
});
</script>
