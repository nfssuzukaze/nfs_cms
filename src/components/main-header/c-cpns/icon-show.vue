<script setup lang="ts">
defineProps<{
  iconName: string
  size: number
}>()
</script>

<template>
  <div class="icon-show">
    <el-icon :size="size + 'px'">
      <component :is="iconName"></component>
    </el-icon>
  </div>
</template>

<style lang="less" scoped>
.icon-show {
  @apply flex items-center;
}
</style>
