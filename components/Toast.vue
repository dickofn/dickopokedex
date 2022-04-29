<template>
  <div
    class="flex w-full max-w-xs items-center rounded-lg border border-primary bg-white p-4 shadow"
  >
    <div class="ml-3 text-sm font-normal text-red-600">{{ props.message }}</div>
    <button type="button" class="btn ml-auto p-2" @click="close">
      <XIcon class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup>
import { XIcon } from "@heroicons/vue/outline";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["close"]);

function close() {
  emit("close");
}
</script>
