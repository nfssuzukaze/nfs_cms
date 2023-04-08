<script setup lang="ts">
// import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getBreadCrumbList } from '../../../utils/resolveRoleRoutes'
import useLoginStore from '@/stores/login/login'

const route = useRoute()
const menu = useLoginStore().userMenuInfo
const showList = computed(() => getBreadCrumbList(route.path, menu))
</script>

<template>
  <div class="brand-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in showList" :key="item.id">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style scoped>
.brand-crumb {
}
</style>
