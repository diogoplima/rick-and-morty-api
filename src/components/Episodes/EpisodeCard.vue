<template>
  <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <h3 class="text-lg font-semibold">{{ episode.name }}</h3>
    <p class="text-gray-600">Episode: {{ episode.episode }}</p>
    <p class="text-gray-600">Air Date: {{ new Date(episode.air_date).toLocaleDateString() }}</p>
    <p class="text-gray-600">Characters: {{ episode.characters.length }}</p>
    <p class="text-gray-600">Created: {{ new Date(episode.created).toLocaleDateString() }}</p>
  </div>
</template>

<script setup lang="ts">
import { Episode } from '@/types/episode';

defineProps<{
  episode: Episode;
}>();
</script>