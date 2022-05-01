<template>
  <div class="relative flex min-h-screen min-w-full flex-col">
    <!-- Header -->
    <header class="sticky mx-auto w-full bg-white shadow">
      <nav class="relative flex justify-center p-5">
        <NuxtLink to="/">
          <h1 class="text-3xl font-bold text-primary">Pokedex</h1>
        </NuxtLink>
      </nav>
    </header>

    <!-- Main -->
    <main class="relative flex-1">
      <div class="absolute inset-0 mx-auto min-h-full min-w-full">
        <slot />
      </div>
    </main>

    <!-- Toast -->
    <div v-if="toast" class="absolute inset-x-0 bottom-0 pb-4">
      <div class="flex items-center justify-center">
        <Toast :message="error" @close="closeToast" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGlobalStore } from "~~/store/global";

const globalStore = useGlobalStore();
const { error } = storeToRefs(globalStore);

const toast = ref(false);
const toastTimeout = ref(3000);

// If new error come out toast popup
watch(error, (val, oldVal) => {
  if (val !== oldVal && val) toast.value = true;
});

let timeout = null;

// Close toast after a while
watch(toast, (val, oldVal) => {
  if (val !== oldVal)
    timeout = setTimeout(() => {
      closeToast();
    }, toastTimeout.value);
});

function closeToast() {
  clearTimeout(timeout);
  toast.value = false;
  globalStore.clearError();
}
</script>
