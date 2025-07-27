<template>
  <loading-spinner v-if="characterStore.isLoading" />
  <div
    v-else-if="characterStore.multipleCharacters.length"
    class="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
  >
    <character-card v-for="character in characterStore.multipleCharacters" :key="character.id" :character="character" disallow-modal />
  </div>
  <p v-else class="flex-1 text-center text-gray-500">
    No residents available.
  </p>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useCharacterStore } from "@/stores/characterStore";

import LoadingSpinner from "@/components/Common/LoadingSpinner.vue";
import CharacterCard from "@/components/Character/CharacterCard.vue";

const props = defineProps<{
  residents: string[];
}>();

const characterStore = useCharacterStore();

onBeforeMount(async () => {
  const ids = props.residents.map((url) => {
    const urlObj = new URL(url);
    return Number(urlObj.pathname.split("/").pop());
  });

  await characterStore.fetchMultipleCharacters(ids);
});
</script>
