<script setup lang="ts">
import { ref, computed } from 'vue'
import brandCrumb from './c-cpns/brand-crumb.vue'
import userFunction from './c-cpns/user-function.vue'
import iconShow from './c-cpns/icon-show.vue'

const iconSize = 30
const iconName = computed<string>(() => (isOpen.value ? 'expand' : 'fold'))

const isOpen = ref(true)
const emit = defineEmits<{
  (e: 'collapse-change', value: boolean): void
}>()
const handleClick = () => {
  isOpen.value = !isOpen.value
  emit('collapse-change', isOpen.value)
}

</script>

<template>
  <div class="main-header">
    <div class="left-content">
      <icon-show
        :size="iconSize"
        :iconName="iconName"
        @click="handleClick"
      />
    </div>
    <div class="right-content">
      <brand-crumb />
      <user-function />
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-header {
  @apply h-full w-full;
  @apply flex items-center justify-between;
  .right-content {
    @apply flex-1 mx-5;
    @apply flex items-center justify-between;
  }
}
</style>
