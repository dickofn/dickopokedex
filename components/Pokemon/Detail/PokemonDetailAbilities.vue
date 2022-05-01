<template>
  <div class="mx-auto py-5 md:container">
    <PokemonDetailSubtitle
      :class-each-type="props.classEachType"
      text="Abilities"
    />

    <div class="grid gap-y-8 px-5 py-8">
      <PokemonDetailAbilitiesItem
        v-for="ability in abilities"
        :key="ability.ability.name"
        :ability="ability"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  abilities: {
    type: Array,
    required: true,
  },
  classEachType: {
    type: String,
    default: "",
  },
});
</script>
