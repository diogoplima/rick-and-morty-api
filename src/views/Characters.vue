<template>
  <div class="w-full min-h-[calc(100vh-60px)] p-4 bg-gray-100 flex flex-col">
    <div class="flex justify-between items-center mb-4 relative">
      <h1 class="text-3xl font-bold">Characters</h1>
      <character-filters />
    </div>
    <loading-spinner v-if="characterStore.isLoading" />
    <div
      v-else-if="characterStore.characters.length"
      class="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
    >
      <character-card v-for="character in characterStore.characters" :key="character.id" :character="character" />
    </div>
    <p v-else class="flex-1 text-center text-gray-500">
      No characters available.
    </p>
    <character-pagination />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useCharacterStore } from "@/stores/characterStore";

import CharacterFilters from "@/components/Character/CharacterFilters.vue";
import CharacterCard from "@/components/Character/CharacterCard.vue";
import CharacterPagination from "@/components/Character/CharacterPagination.vue";
import LoadingSpinner from "@/components/Common/LoadingSpinner.vue";

const characterStore = useCharacterStore();

onBeforeMount(async () => {
  await characterStore.fetchCharacters();
});
</script>

<style scoped></style>
