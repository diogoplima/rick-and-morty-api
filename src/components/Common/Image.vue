<template>
  <loading-spinner v-if="!isImageLoaded" />
  <img
    :src="src"
    :alt="alt"
    class="w-full aspect-auto object-cover rounded-t-lg"
    @load="onImageLoad"
    @error="onImageError"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

import LoadingSpinner from "@/components/Common/LoadingSpinner.vue";

defineProps<{
  src: string;
  alt: string;
}>();

const emit = defineEmits<{
  (event: 'image-error'): void;
}>();

const isImageLoaded = ref(false);

const onImageLoad = () => {
  isImageLoaded.value = true;
};

const onImageError = () => {
  isImageLoaded.value = false;
  emit('image-error');
};
</script>
