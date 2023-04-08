<script setup lang="ts">
// import { ArrowRight } from '@element-plus/icons-vue'
type ItemType = {
  id: number
  path: string
  name: string
}
const showList: ItemType[] = []
</script>

<template>
  <div class="brand-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in showList" :key="item.id">
        <el-breadcrumb-item :to="item.path"></el-breadcrumb-item>
      </template>
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>
.brand-crumb {
}
</style>
