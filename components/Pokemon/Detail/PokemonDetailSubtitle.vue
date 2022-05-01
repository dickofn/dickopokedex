<template>
  <div class="flex md:justify-center">
    <span
      class="w-60 rounded-r py-4 pr-4 text-center text-xl font-medium sm:w-96 md:mx-auto md:rounded md:pr-0 md:text-center"
      :class="props.classEachType"
    >
      {{ props.text }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  classEachType: {
    type: String,
    default: "",
  },
});
</script>
