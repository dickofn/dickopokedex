<template>
  <div class="mx-auto py-5 md:container">
    <PokemonDetailSubtitle
      :class-each-type="props.classEachType"
      text="Stats"
    />

    <div class="grid grid-cols-2 gap-x-6 gap-y-8 px-5 py-8 sm:grid-cols-3">
      <PokemonDetailStatsItem
        v-for="(stat, index) in stats"
        :key="index"
        :stat="stat"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonDetailStatsItem from "./PokemonDetailStatsItem.vue";
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
