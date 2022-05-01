<template>
  <div
    class="relative rounded border border-primary py-5 px-4 shadow-lg"
    :class="classEachType"
  >
    <div class="flex items-center">
      <div class="star absolute inset-0 right-0 z-10 p-1">
        <client-only>
          <div class="relative">
            <StarIconSolid
              class="absolute top-0 right-0 h-8 w-8 cursor-pointer transition-opacity duration-200"
              :class="[
                { 'z-20 opacity-100': isFavorited },
                { 'z-10 opacity-0': !isFavorited },
              ]"
              @click="toggleFavorite"
            />
            <StarIcon
              class="absolute top-0 right-0 h-8 w-8 cursor-pointer transition-opacity duration-200"
              :class="[
                { 'z-20 opacity-100': !isFavorited },
                { 'z-10 opacity-0': isFavorited },
              ]"
              @click="toggleFavorite"
            />
          </div>
        </client-only>
      </div>

      <div
        class="h-24 w-24 rounded border border-primary bg-white p-1 shadow-xl"
      >
        <img :src="defaultPic" :alt="pokemon.name" />
      </div>

      <div class="ml-6 flex-1">
        <h3 class="mb-1 text-lg font-bold capitalize leading-5">
          {{ pokemon.name }}
        </h3>
        <div class="mt-4 flex flex-wrap space-x-1">
          <PokemonTypeBadge
            v-for="pokemonType in props.pokemon.types"
            :key="pokemonType.type.name"
            :type="pokemonType.type.name"
            class="mt-1"
          />
        </div>
      </div>
    </div>

    <NuxtLink
      :to="`/${pokemon.name}`"
      class="btn mt-4 block w-full cursor-pointer text-center transition-all hover:translate-y-1 focus:translate-y-1"
    >
      See details
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { StarIcon } from "@heroicons/vue/outline";
import { StarIcon as StarIconSolid } from "@heroicons/vue/solid";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
  favorites: {
    type: Array,
    default: () => [],
  },
});

// Check if pokemon is favorited
const isFavorited = computed(() => {
  return props.favorites.includes(props.pokemon.name);
});

// Incase front_default is null
const defaultPic = computed(() => {
  return (
    props.pokemon.sprites.front_default || props.pokemon.sprites.front_female
  );
});

const emit = defineEmits(["toggleFavorite"]);

function toggleFavorite() {
  emit("toggleFavorite", props.pokemon.name);
}

// Custom color class for pokemon by type
const classEachType = computed(() => {
  const type = props.pokemon.types[0].type.name;
  if (type === "normal") {
    return "bg-pokemon-normal star-light";
  } else if (type === "fire") {
    return "bg-pokemon-fire star-light";
  } else if (type === "water") {
    return "bg-pokemon-water star-light";
  } else if (type === "electric") {
    return "bg-pokemon-electric";
  } else if (type === "grass") {
    return "bg-pokemon-grass star-light";
  } else if (type === "ice") {
    return "bg-pokemon-ice";
  } else if (type === "fighting") {
    return "bg-pokemon-fighting text-gray-50 star-light";
  } else if (type === "poison") {
    return "bg-pokemon-poison text-gray-50 star-light";
  } else if (type === "ground") {
    return "bg-pokemon-ground";
  } else if (type === "flying") {
    return "bg-pokemon-flying star-light";
  } else if (type === "psychic") {
    return "bg-pokemon-psychic star-light";
  } else if (type === "bug") {
    return "bg-pokemon-bug star-light";
  } else if (type === "rock") {
    return "bg-pokemon-rock star-light";
  } else if (type === "ghost") {
    return "bg-pokemon-ghost text-gray-50 star-light";
  } else if (type === "dragon") {
    return "bg-pokemon-dragon text-gray-50 star-light";
  } else if (type === "dark") {
    return "bg-pokemon-dark text-gray-50 star-light";
  } else if (type === "steel") {
    return "bg-pokemon-steel star-light";
  } else if (type === "fairy") {
    return "bg-pokemon-fairy star-light";
  } else {
    return "bg-primary";
  }
});
</script>

<style>
.star {
  @apply text-yellow-700;
}

.star-light .star {
  @apply text-yellow-200;
}
</style>
