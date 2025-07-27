<template>
  <nav
    class="fixed top-0 left-0 w-full bg-white border-b border-gray-300 shadow-md z-50"
    style="height: 60px"
  >
    <div class="mx-auto flex items-center justify-between h-full w-full px-8">
      <div class="text-lg font-semibold">
        <router-link to="/" class="text-black hover:text-gray-600"
          >Rick & Morty</router-link
        >
      </div>
      <div class="hidden sm:flex gap-x-6">
        <router-link
          to="/characters"
          class="text-black hover:text-gray-600"
          :class="{ 'text-orange-500': $route.path === '/characters' }"
          >Characters</router-link
        >
      </div>
      <!-- Mobile menu button -->
      <div class="sm:hidden">
        <button @click="isOpen = !isOpen" class="focus:outline-none">
          <bars3-bottom-right-icon
            class="w-6 h-6 text-black hover:text-gray-600"
          />
        </button>
      </div>
    </div>
    <!-- Mobile sidebar -->
    <transition name="slide">
      <div
        v-if="isOpen"
        class="fixed top-0 left-0 w-full h-screen bg-white shadow-lg z-40 p-4 sm:hidden"
      >
        <button
          @click="isOpen = false"
          class="absolute top-4 right-4 focus:outline-none"
        >
          <x-mark-icon
            class="w-6 h-6 text-black hover:text-gray-600"
          />
        </button>
        <div class="flex flex-col items-start space-y-6 mt-16">
          <router-link
            to="/"
            class="text-black hover:text-gray-600 text-lg"
            :class="{ 'text-orange-500': $route.path === '/' }"
            @click="isOpen = false"
            >Home</router-link
          >
          <router-link
            to="/characters"
            class="text-black hover:text-gray-600 text-lg"
            :class="{ 'text-orange-500': $route.path === '/characters' }"
            @click="isOpen = false"
            >Characters</router-link
          >
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const isOpen = ref(false);
const $route = useRoute();
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
