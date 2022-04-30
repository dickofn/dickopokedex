<template>
  <form class="shadow-xl" @submit.prevent="submit">
    <div class="relative">
      <button
        type="submit"
        class="absolute inset-y-0 left-4 z-20 cursor-pointer"
      >
        <SearchIcon class="h-4 w-4" />
      </button>

      <input
        id="output"
        v-model="search"
        class="relative w-full rounded bg-white px-10 py-4 text-sm leading-none outline-none"
        type="text"
        placeholder="Search..."
      />

      <button
        onclick="eraseText();"
        class="absolute inset-y-0 right-4 z-20 cursor-pointer text-xs font-medium leading-3 underline"
      >
        Clear
      </button>
    </div>
  </form>
</template>

<script setup>
import { SearchIcon } from "@heroicons/vue/outline";

const search = ref("");

const emit = defineEmits(["submit"]);

function submit() {
  emit("submit", search.value);
}
</script>
