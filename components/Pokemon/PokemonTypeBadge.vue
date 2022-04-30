<template>
  <span
    class="mr-2 rounded border border-primary px-2.5 py-0.5 text-xs font-semibold shadow-lg"
    :class="classEachType"
  >
    {{ props.type }}
  </span>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

// Custom color class for pokemon by type
const classEachType = computed(() => {
  const type = props.type;
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
