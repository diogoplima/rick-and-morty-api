<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    type="text"
    :placeholder="placeholder ? placeholder : 'Input field'"
    class="p-2 border border-gray-300 rounded-lg focus:outline-none"
    :class="{ 'pl-8': $slots.icon, 'w-full': fullWidth }"
  >
  <span v-if="$slots.icon" class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
    <slot name="icon" />
  </span>
  <span v-if="modelValue !== ''" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
    <x-mark-icon
      class="h-6 w-6 cursor-pointer"
      @click="$emit('update:modelValue', '')"/>
  </span>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
defineProps<{
  modelValue: string;
  placeholder?: string;
  fullWidth?: boolean;
}>();

defineEmits(['update:modelValue']);
</script>