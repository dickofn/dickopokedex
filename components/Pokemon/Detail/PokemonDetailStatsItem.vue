<template>
  <div class="flex flex-col items-center justify-center">
    <div
      class="mb-4 w-full max-w-[200px] border-b border-b-primary pb-4 text-center"
    >
      {{ name }}
    </div>

    <div class="font-medium">
      {{ props.stat.base_stat }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  stat: {
    type: Object,
    required: true,
  },
});

// Capitalize first letter
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const name = computed(() => {
  if (props.stat.stat.name.includes("-")) {
    return capitalize(props.stat.stat.name.split("-").join(" "));
  }
  return capitalize(props.stat.stat.name);
});
</script>
