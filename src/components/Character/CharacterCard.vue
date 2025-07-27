<template>
  <div
    class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    :class="{ 'cursor-pointer': !disallowModal }"
    @click="openCharacterModal(character)"
  >
    <image-loader
      :src="character.image"
      :alt="character.name"
      @image-error="onImageError"
    />
    <div class="p-2">
      <h2 class="text-xl font-semibold">{{ character.name }}</h2>
      <p class="text-gray-600">Status: {{ character.status }}</p>
      <p class="text-gray-600">Species: {{ character.species }}</p>
      <p class="text-gray-600">Origin: {{ character.origin.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from "@/stores/characterStore";
import { useModalStore } from '@/stores/modalStore';

import ImageLoader from "@/components/Common/Image.vue";
import CharacterDetails from "@/components/Character/CharacterDetails.vue";

import { Character } from "@/types/character";
import { Modal } from "@/types/modal";

const props = defineProps<{
  character: Character;
  disallowModal?: boolean;
}>();

const characterStore = useCharacterStore();
const modalStore = useModalStore();

const openCharacterModal = (character: Character) => {
  if (props.disallowModal) return;

  characterStore.character = character;
  const modalConfig: Modal = {
    title: `Character Details - ${character.name}`,
    component: CharacterDetails,
    props: {
      id: character.id
    }
  };
  modalStore.openModal(modalConfig);
};

const onImageError = () => {
  console.warn(`Failed to load image for ${props.character.name}`);
};
</script>
