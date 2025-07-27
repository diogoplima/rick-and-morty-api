import { defineStore } from "pinia";
import { ref } from "vue";
import { locationService } from "@/services/locationService";
import { Location } from "@/types/location";
import { eventBus } from '@/lib/eventBus';

export const useLocationStore = defineStore("locationStore", () => {
  // State
  const location = ref<Location | null>(null);
  const isLoading = ref<boolean>(false);

  // Actions
  async function fetchLocation(id: number) {
    try {
      isLoading.value = true;
      location.value = await locationService.getLocation(id);
    } catch (error) {
      eventBus.emit('notification', { message: `Failed to fetch characters: ${error instanceof Error ? error.message : 'Unknown error'}` });
    } finally {
      isLoading.value = false;
    }
  }

  return {
    location,
    isLoading,
    fetchLocation,
  };
});