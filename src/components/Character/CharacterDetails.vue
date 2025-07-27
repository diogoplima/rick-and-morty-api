<template>
  <loading-spinner v-if="characterStore.isLoading" />
  <div v-else-if="characterStore.character">
    <image-loader
      :src="characterStore.character.image"
      :alt="characterStore.character.name"
      @image-error="onImageError"
    />
    <h3 class="text-xl font-semibold">{{ characterStore.character.name }}</h3>
    <p><strong>Status: </strong>{{ characterStore.character.status }}</p>
    <p><strong>Species: </strong>{{ characterStore.character.species }}</p>
    <p><strong>Type: </strong>{{ characterStore.character.type || "N/A" }}</p>
    <p>
      <strong>Gender: </strong>{{ characterStore.character.gender || "N/A" }}
    </p>
    <p>
      <strong>Origin: </strong>
      <span
        @click="openLocationModal('origin')"
        class="cursor-pointer text-blue-500 hover:underline"
        >{{ characterStore.character.origin.name }}</span
      >
    </p>
    <p>
      <strong>Location: </strong>
      <span
        @click="openLocationModal('location')"
        class="cursor-pointer text-blue-500 hover:underline"
        >{{ characterStore.character.location.name }}</span
      >
    </p>
    <p>
      <strong>Episodes: </strong>
      <span
        @click="openEpisodesModal"
        class="cursor-pointer text-blue-500 hover:underline"
        >{{ characterStore.character.episode.length }} episodes</span
      >
    </p>
  </div>
  <p v-else class="text-center text-gray-500">Character not found.</p>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useCharacterStore } from "@/stores/characterStore";
import { useModalStore } from "@/stores/modalStore";
import { eventBus } from "@/lib/eventBus";

import ImageLoader from "@/components/Common/Image.vue";
import LoadingSpinner from "@/components/Common/LoadingSpinner.vue";
import LocationDetail from "@/components/Location/LocationDetails.vue";
import EpisodesList from "@/components/Episodes/EpisodesList.vue";

const props = defineProps<{
  id: number;
}>();

const characterStore = useCharacterStore();
const modalStore = useModalStore();

const onImageError = () => {
  console.warn(
    `Failed to load image for character ${characterStore.character?.name}`
  );
};

const openLocationModal = async (field: "origin" | "location") => {
  if (!characterStore.character || !characterStore.character[field]) {
    eventBus.emit("notification", {
      message: "Location data is not available.",
    });
    return;
  }

  const location = characterStore.character[field];

  modalStore.openModal({
    title: `Location: ${location.name}`,
    component: LocationDetail,
    props: { location: location },
  });
};

const openEpisodesModal = () => {
  if (!characterStore.character || !characterStore.character.episode) {
    eventBus.emit("notification", {
      message: "Episode data is not available.",
    });
    return;
  }

  const modalConfig = {
    title: `Episodes featuring ${characterStore.character.name}`,
    component: EpisodesList,
    props: {
      episodes: characterStore.character.episode,
    },
    size: 'lg' as const,
  };
  modalStore.openModal(modalConfig);
};

onBeforeMount(() => {
  if (!characterStore.character || characterStore.character.id !== props.id) {
    characterStore.fetchCharacter(props.id);
  }
});
</script>

<style scoped></style>
