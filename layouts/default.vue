<template>
  <div class="min-h-screen min-w-full">
    <div v-if="backUrl">{{ backUrl }}</div>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  backUrl: {
    type: String,
    default: "",
  },
});
</script>
