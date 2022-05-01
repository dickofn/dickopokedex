<template>
  <div class="relative min-h-full min-w-full">
    <NuxtLink
      to="/"
      class="link absolute -top-[54px] left-0 z-10 flex items-center"
    >
      <ArrowLeftIcon class="h-8 w-8 pl-2" />
    </NuxtLink>
    <div class="relative">
      <PokemonDetailTitle
        v-if="data"
        :title="data.name"
        :types="data.types"
        :class-each-type="classEachType"
      />
    </div>

    <div class="mt-10">
      <PokemonDetailVariants
        v-if="data"
        :sprites="data.sprites"
        :class-each-type="classEachType"
      />
    </div>

    <!-- <div class="mt-10">
      <PokemonDetailStats
        v-if="data"
        :stats="data.stats"
        :class-each-type="classEachType"
      />
    </div> -->

    <div class="absolute inset-0 -z-10 flex items-center justify-center p-4">
      <Spinner v-if="pending" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/outline";
import { useGlobalStore } from "~~/store/global";

const route = useRoute();
const router = useRouter();
const globalStore = useGlobalStore();

const { data, error, pending } = useAsyncData(
  `singlePokemon${route.params.pokemon}`,
  () =>
    $fetch("/api/pokemon/getOne", {
      params: {
        name: route.params.pokemon,
      },
    }),
  { server: false }
);

if (error) {
  globalStore.setError(error);
  if (error.value) router.push("/");
}

onMounted(() => {
  if (process.client) document.documentElement.scrollTop = 0;
});

// Custom color class for pokemon by type
const classEachType = computed(() => {
  if (data.value) {
    const type = data.value.types[0].type.name;
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
      return "bg-pokemon-fairy";
    } else {
      return "bg-primary";
    }
  }
});
</script>
