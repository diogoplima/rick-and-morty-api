<template>
  <loading-spinner v-if="locationStore.isLoading" />
  <div v-else-if="locationStore.location">
    <p><strong>Type: </strong>{{ locationStore.location.type }}</p>
    <p><strong>Dimension: </strong>{{ locationStore.location.dimension }}</p>
    <p>
      <strong>Residents: </strong>
      <span
        @click="openResidentsModal"
        class="cursor-pointer text-blue-500 hover:underline"
        >{{ locationStore.location.residents.length }} residents</span
      >
    </p>
    <p>
      <strong>Created: </strong>
      {{ new Date(locationStore.location.created).toLocaleDateString() }}
    </p>
  </div>
  <p v-else class="text-center text-gray-500">Location not found.</p>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useLocationStore } from "@/stores/locationStore";
import { useModalStore } from "@/stores/modalStore";
import { eventBus } from "@/lib/eventBus";

import LoadingSpinner from "@/components/Common/LoadingSpinner.vue";
import ResidentsList from "@/components/Residents/ResidentsList.vue";

import { LocationCharacter } from "@/types/location";

const props = defineProps<{
  location: LocationCharacter;
}>();

const locationStore = useLocationStore();
const modalStore = useModalStore();

const openResidentsModal = () => {
  if (!locationStore.location || !locationStore.location.residents) {
    eventBus.emit("notification", {
      message: "Something went wrong with the request.",
    });
    return;
  }
  const modalConfig = {
    title: `Residents of ${locationStore.location.name}`,
    component: ResidentsList,
    props: {
      residents: locationStore.location.residents,
    },
    size: 'lg' as const,
  };
  modalStore.openModal(modalConfig);
};

onBeforeMount(async () => {
  const url = new URL(props.location.url);
  const id = Number(url.pathname.split("/").pop());
  await locationStore.fetchLocation(id);
});
</script>

<style scoped></style>
