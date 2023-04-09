<script setup lang="ts">
import { ref, computed } from 'vue'
import MainAside from '@/components/main-aside/main-aside.vue'
import MainHeader from '@/components/main-header/main-header.vue'

const isOpen = ref(true)
const asideWidth = computed(() => (isOpen.value ? 200 : 64) + 'px')
const isOpenChange = (value: boolean) => {
  isOpen.value = value
}
</script>

<template>
  <div class="main">
    <el-container class="wrapper-container">
      <el-aside class="left" :width="asideWidth">
        <main-aside :isOpen="isOpen" />
      </el-aside>
      <el-container class="right">
        <el-header class="header">
          <main-header @collapse-change="isOpenChange" />
        </el-header>
        <el-main class="main-view">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.main {
  @apply text-blue-400 bg-light-50 h-full w-full;

  .wrapper-container {
    @apply h-full w-full;
  }
  .left {
    transition: width 0.3s ease;
    // overflow: hidden;
    @apply border-r-gray-200 border-r-1;
  }
  .left::-webkit-scrollbar {
    display: none;
  }

  .right {
    .header {
      // border: 1px solid lightblue;
      @apply border-b-gray-200 border-b-1;
    }

    .main-view {
      @apply bg-light-400;
      // border: 1px solid lightgreen;
    }
  }
}
</style>
