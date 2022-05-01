<template>
  <div class="mx-auto py-5 md:container">
    <PokemonDetailSubtitle
      :class-each-type="props.classEachType"
      text="Moves"
    />

    <div class="grid gap-y-8 px-5 py-8">
      <PokemonDetailMovesItem
        v-for="move in moves"
        :key="move.move.name"
        :move="move"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  moves: {
    type: Array,
    required: true,
  },
  classEachType: {
    type: String,
    default: "",
  },
});
</script>
