<template>
  <div class="flex flex-col justify-center space-y-3">
    <div class="text-center font-medium">
      {{ name }}
    </div>
    <div v-if="!pending" class="text-center text-sm">
      {{ data }}
    </div>
    <div v-else class="text-center">
      <Spinner />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  ability: {
    type: Object,
    required: true,
  },
});

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const name = computed(() => {
  if (props.ability.ability.name.includes("-")) {
    return capitalize(props.ability.ability.name.split("-").join(" "));
  }
  return capitalize(props.ability.ability.name);
});

const { pending, data } = useLazyFetch(props.ability.ability.url, {
  server: false,
  transform: (data: any) => {
    return data.effect_entries.length >= 0
      ? data.effect_entries.find((i) => i.language.name === "en").effect
      : "";
  },
});
</script>
