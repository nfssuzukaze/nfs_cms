<script setup lang="ts">
import router from '@/router';

const handleClick = () => {
  router.push('/main/analysis/overview')
}
</script>

<template>
  <div class="main">
    <h2>main</h2>
    <router-view />
    <button @click="handleClick">click here</button>
  </div>
</template>

<style scoped>
.main {
  @apply text-blue-400 bg-light-50;
}
</style>