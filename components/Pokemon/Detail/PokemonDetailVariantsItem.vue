<template>
  <div class="flex flex-col justify-between text-center">
    <div class="text-medium">
      {{ props.title }}
    </div>
    <img :src="props.img" :alt="props.title" class="mx-auto h-24 w-24" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});
</script>
