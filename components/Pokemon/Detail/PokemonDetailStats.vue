<template>
  <div class="mx-auto py-5 md:container">
    <PokemonDetailSubtitle
      :class-each-type="props.classEachType"
      text="Stats"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  stats: {
    type: Array,
    required: true,
  },
  classEachType: {
    type: String,
    default: "",
  },
});
</script>
