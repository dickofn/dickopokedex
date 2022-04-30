<template>
  <div
    class="flex items-center rounded border border-primary p-4 shadow-lg"
    :class="classEachType"
  >
    <div class="w-26 rounded border border-primary bg-primary shadow-xl">
      <img :src="defaultPic" :alt="pokemon.name" />
    </div>
    <div class="ml-6">
      <h3 class="mb-1 text-lg font-bold capitalize leading-5">
        {{ pokemon.name }}
      </h3>
      <div class="mt-4 flex flex-wrap space-x-1">
        <PokemonTypeBadge
          v-for="pokemonType in props.pokemon.types"
          :key="pokemonType.type.name"
          :type="pokemonType.type.name"
        />
      </div>
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

const classEachType = computed(() => {
  const type = props.pokemon.types[0].type.name;
  if (type === "normal") {
    return "bg-pokemon-normal";
  } else if (type === "fire") {
    return "bg-pokemon-fire";
  } else if (type === "water") {
    return "bg-pokemon-water";
  } else if (type === "electric") {
    return "bg-pokemon-electric";
  } else if (type === "grass") {
    return "bg-pokemon-grass";
  } else if (type === "ice") {
    return "bg-pokemon-ice";
  } else if (type === "fighting") {
    return "bg-pokemon-fighting text-gray-50";
  } else if (type === "poison") {
    return "bg-pokemon-poison text-gray-50";
  } else if (type === "ground") {
    return "bg-pokemon-ground";
  } else if (type === "flying") {
    return "bg-pokemon-flying";
  } else if (type === "psychic") {
    return "bg-pokemon-psychic";
  } else if (type === "bug") {
    return "bg-pokemon-bug";
  } else if (type === "rock") {
    return "bg-pokemon-rock";
  } else if (type === "ghost") {
    return "bg-pokemon-ghost text-gray-50";
  } else if (type === "dragon") {
    return "bg-pokemon-dragon text-gray-50";
  } else if (type === "dark") {
    return "bg-pokemon-dark text-gray-50";
  } else if (type === "steel") {
    return "bg-pokemon-steel";
  } else if (type === "fairy") {
    return "bg-pokemon-fairy ";
  } else {
    return "bg-primary";
  }
});
</script>
