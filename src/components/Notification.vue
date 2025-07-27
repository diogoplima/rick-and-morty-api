<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed top-4 right-4 z-50 max-w-sm p-4 bg-red-600 text-white rounded-lg shadow-lg flex items-center">
      <exclamation-circle-icon class="w-6 h-6 mr-2" />
      <span class="text-sm">{{ message }}</span>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { eventBus } from '@/lib/eventBus';
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline';

const isVisible = ref(false);
const message = ref('');
let timeoutId: number | null = null;

const handleNotification = ({ message: msg, duration = 5000 }: { message: string; duration?: number }) => {
  message.value = msg;
  isVisible.value = true;
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    isVisible.value = false;
  }, duration);
};

onMounted(() => {
  eventBus.on('notification', handleNotification);
});

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId);
  eventBus.off('notification', handleNotification);
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>