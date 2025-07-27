import { defineStore } from "pinia";
import { ref } from "vue";
import { characterService } from "@/services/characterService";
import { Character, CharacterFilters } from "@/types/character";
import { Info } from "@/types/info";
import { eventBus } from '@/lib/eventBus';

export const useCharacterStore = defineStore("characterStore", () => {
  // State
  const characters = ref<Character[]>([]);
  const character = ref<Character | null>(null);
  const multipleCharacters = ref<Character[]>([]);
  const info = ref<Info | null>(null);
  const filters = ref<CharacterFilters>({});
  const isLoading = ref<boolean>(false);

  // Actions
  async function fetchCharacters() {
    try {
      isLoading.value = true;
      const queryParams = new URLSearchParams(filters.value as any).toString();
      const resp = await characterService.getCharacters(queryParams);
      info.value = resp.info;
      characters.value = resp.results;
    } catch (error) {
      eventBus.emit('notification', { message: `Failed to fetch characters: ${error instanceof Error ? error.message : 'Unknown error'}` });
      characters.value = [];
      info.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchCharacter(id: number) {
    try {
      isLoading.value = true;
      character.value = await characterService.getCharacter(id);
    } catch (error) {
      eventBus.emit('notification', { message: `Failed to fetch character: ${error instanceof Error ? error.message : 'Unknown error'}` });
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchMultipleCharacters(ids: number[]) {
    try {
      isLoading.value = true;
      multipleCharacters.value = await characterService.getMultipleCharacters(ids);
    } catch (error) {
      eventBus.emit('notification', { message: `Failed to fetch multiple characters: ${error instanceof Error ? error.message : 'Unknown error'}` });
      characters.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  async function appplyFilters(newFilters: CharacterFilters) {
    filters.value = { ...filters.value, ...newFilters };
    await fetchCharacters();
  }

  async function clearFilters() {
    filters.value = {};
    await fetchCharacters();
  }

  return {
    characters,
    character,
    multipleCharacters,
    info,
    filters,
    isLoading,
    fetchCharacters,
    fetchCharacter,
    fetchMultipleCharacters,
    appplyFilters,
    clearFilters,
  };
});