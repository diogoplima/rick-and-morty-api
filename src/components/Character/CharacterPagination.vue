<template>
  <pagination
    v-if="characterStore.info && !characterStore.isLoading"
    :current-page="characterStore.filters.page ?? 1"
    :total-pages="characterStore.info.pages"
    :disabled-prev="!characterStore.info.prev"
    :disabled-next="!characterStore.info.next"
    @fetchPrevPage="fetchPrevPage"
    @fetchNextPage="fetchNextPage"
  />
</template>

<script setup lang="ts">
import { useCharacterStore } from '@/stores/characterStore';

import Pagination from '@/components/Common/Pagination.vue';

const characterStore = useCharacterStore();

const fetchNextPage = async () => {
  if (characterStore.info?.next) {
    const url = new URL(characterStore.info.next);
    characterStore.filters.page = Number(url.searchParams.get('page'));
    await characterStore.fetchCharacters();
  }
};

const fetchPrevPage = async () => {
  if (characterStore.info?.prev) {
    const url = new URL(characterStore.info.prev);
    characterStore.filters.page = Number(url.searchParams.get('page'));
    await characterStore.fetchCharacters();
  }
};
</script>