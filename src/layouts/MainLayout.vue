<script setup lang="ts">
import NavBar from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-base-300">
    <!-- Navbar -->
    <nav-bar />
    <!-- Main content -->
    <router-view class="flex-auto" />
    <!-- Footer -->
    <footer-component company-name="Example Company." />
  </div>
</template>

<style scoped>

</style>
