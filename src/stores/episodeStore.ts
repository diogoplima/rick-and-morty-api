import { defineStore } from "pinia";
import { ref } from "vue";
import { episodeService } from "@/services/episodeService";
import { Episode } from "@/types/episode";
import { eventBus } from "@/lib/eventBus";

export const useEpisodeStore = defineStore("episodeStore", () => {
  // State
  const episodes = ref<Episode[] | null>(null);
  const isLoading = ref<boolean>(false);

  // Actions
  async function fetchMultipleEpisodes(ids: number[]) {
    try {
      isLoading.value = true;
      episodes.value = await episodeService.getMultipleEpisodes(ids);
    } catch (error) {
      eventBus.emit("notification", {
        message: `Failed to fetch multiple characters: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
      episodes.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  return {
    episodes,
    isLoading,
    fetchMultipleEpisodes,
  };
});
