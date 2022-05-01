<template>
  <form class="shadow-xl" @submit.prevent="submit">
    <div class="relative">
      <button
        type="submit"
        class="absolute inset-y-0 left-0 z-20 cursor-pointer pl-4 pr-2"
      >
        <SearchIcon class="h-4 w-4" />
      </button>

      <input
        id="output"
        v-model="search"
        class="input relative w-full rounded border-primary bg-white py-4 pl-10 pr-14"
        type="text"
        placeholder="Search by name or type..."
      />

      <button
        v-if="!filter"
        type="button"
        class="link absolute inset-y-0 right-0 z-20 cursor-pointer pr-4 pl-2 text-xs font-medium leading-3 underline"
        @click="submit"
      >
        Find
      </button>
      <button
        v-else
        type="button"
        class="link absolute inset-y-0 right-0 z-20 cursor-pointer pr-4 pl-2 text-xs font-medium leading-3 underline"
        @click="clear"
      >
        Clear
      </button>
    </div>
  </form>
</template>

<script setup>
import { SearchIcon } from "@heroicons/vue/outline";
import { storeToRefs } from "pinia";
import { usePokemonStore } from "~~/store/pokemon";

const search = ref("");

const pokemonStore = usePokemonStore();
const { filter } = storeToRefs(pokemonStore);

const emit = defineEmits(["submit"]);

function submit() {
  emit("submit", search.value.toLowerCase());
}

function clear() {
  search.value = "";
  emit("submit", search.value.toLowerCase());
}

onMounted(() => {
  search.value = filter.value;
});
</script>
