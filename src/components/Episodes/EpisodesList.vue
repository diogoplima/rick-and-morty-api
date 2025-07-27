<template>
  <loading-spinner v-if="episodeStore.isLoading" />
  <div
    v-else-if="episodeStore.episodes && episodeStore.episodes.length"
    class="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
  >
    <episode-card v-for="episode in episodeStore.episodes" :key="episode.id" :episode="episode" />
  </div>
  <p v-else class="flex-1 text-center text-gray-500">
    No episodes available.
  </p>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useEpisodeStore } from "@/stores/episodeStore";

import LoadingSpinner from "@/components/Common/LoadingSpinner.vue";
import EpisodeCard from "@/components/Episodes/EpisodeCard.vue";

const props = defineProps<{
  episodes: string[];
}>();

const episodeStore = useEpisodeStore();

onBeforeMount(async () => {
  const ids = props.episodes.map((url) => {
    const urlObj = new URL(url);
    return Number(urlObj.pathname.split("/").pop());
  });

  await episodeStore.fetchMultipleEpisodes(ids);
});
</script>
