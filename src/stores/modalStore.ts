import { defineStore } from "pinia";
import { ref } from "vue";
import { markRaw } from 'vue';
import { Modal } from "@/types/modal";

export const useModalStore = defineStore("modalStore", () => {
  // State
  const modalStack = ref<Modal[]>([]);

  // Actions
  function openModal(modalConfig: Modal) {
    const safeModalConfig = { ...modalConfig, component: markRaw(modalConfig.component) };
    modalStack.value.push(safeModalConfig);
  }

  function closeModal() {
    if (modalStack.value.length > 0) {
      modalStack.value.pop();
    }
  }

  return {
    modalStack,
    openModal,
    closeModal
  };
});