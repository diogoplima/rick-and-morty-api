<template>
  <div
    v-for="(modal, index) in modalStore.modalStack"
    :key="index"
    class="fixed inset-0 bg-gray-200/50 flex items-center justify-center z-[v-bind(51 + index)]"
    @click.self="closeTopModal"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 relative" :class="modal.size ? `max-w-${modal.size}` : 'max-w-md'">
      <button
        @click="closeTopModal"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 class="text-2xl font-bold mb-4">{{ modal.title }}</h2>
      <div class="max-h-[75vh] overflow-y-auto py-4">
        <component
          :is="modal.component"
          v-if="modal.component"
          v-bind="modal.props"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "@/stores/modalStore";

const modalStore = useModalStore();

const closeTopModal = () => {
  modalStore.closeModal();
};
</script>

<style scoped></style>
