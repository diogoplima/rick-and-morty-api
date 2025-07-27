<template>
  <navbar />
  <div class="w-full min-h-screen" :style="{ paddingTop: '60px' }">
    <router-view />
  </div>
  <notification />
  <modal />
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Notification from '@/components/Notification.vue';
import Modal from '@/components/Common/Modal.vue';
</script>

<style scoped>
</style>