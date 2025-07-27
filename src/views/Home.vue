<template>
  <div class="w-full min-h-[calc(100vh-60px)] p-4 bg-gray-100 flex flex-col">
    <h1 class="text-3xl font-bold">Rick and Morty Universe</h1>
    <div class="flex-1">
      <p class="mt-4">Welcome to the Rick and Morty API Explorer! Explore the multiverse with data on characters, locations, and episodes from the hit series.</p>
      <p class="mt-2"><a href="/characters" class="underline hover:text-gray-800">Click here and find out more about the world!</a></p>
    </div>
    <footer class="mt-auto text-sm text-gray-600">
      <div class="flex justify-center">
        Powered by the <a href="https://rickandmortyapi.com/" target="_blank" class="underline hover:text-gray-800 ml-1">Rick and Morty API</a>. Data provided by Fan Studio.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>