<script setup lang="ts">
import NavBar from '@/components/NavbarComponent.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-base-300">
    <!-- Navbar -->
    <nav-bar />
    <!-- Main content -->
    <router-view class="flex-auto" />
  </div>
</template>

<style scoped>

</style>
