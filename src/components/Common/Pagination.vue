<template>
  <div
    class="mt-4 flex justify-center items-center space-x-16"
  >
    <button
      @click="$emit('fetchPrevPage')"
      class="cursor-pointer px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
      :disabled="disabledPrev"
    >
      Previous
    </button>
    <span class="text-gray-600"
      >Page {{ currentPage }} of
      {{ totalPages }}</span
    >
    <button
      @click="$emit('fetchNextPage')"
      class="cursor-pointer px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
      :disabled="disabledNext"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
  disabledPrev: boolean;
  disabledNext: boolean;
}>();

defineEmits<{
  (e: 'fetchPrevPage'): void;
  (e: 'fetchNextPage'): void;
}>();

</script>