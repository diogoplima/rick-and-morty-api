<template>
  <div v-click-outside="handleOutsideClick" class="relative">
    <button
      @click="$emit('toggle')"
      class="p-2 border border-gray-300 text-black rounded-lg hover:bg-orange-300 focus:outline-none"
    >
      <funnel-icon class="w-6 h-6" />
    </button>
    <div
      v-if="isOpen"
      class="fixed top-32 right-4 w-3/4 sm:w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-30 max-h-[calc(100vh-100px)] overflow-y-auto"
      style="position: fixed; transform: translateZ(0);"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FunnelIcon } from '@heroicons/vue/24/outline';

// Define props
defineProps<{
  isOpen: boolean;
}>();

// Define emits
const emit = defineEmits<{
  (e: 'toggle'): void;
  (e: 'close'): void;
}>();

const handleOutsideClick = () => {
  emit('close');
};
</script>

<style scoped>
</style>