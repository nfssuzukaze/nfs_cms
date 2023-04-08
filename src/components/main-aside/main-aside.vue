<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useLoginStore from '@/stores/login/login'
import { pathToMenu } from '../../utils/resolveRoleRoutes';

const loginStore = useLoginStore()
const { userMenuInfo: menu } = loginStore

console.log(menu)

const getIconName = (icon: string) => {
  const iconStr = icon.split('-')[2]
  return iconStr === 'chat' ? 'chatLineRound' : iconStr
}

const router = useRouter()
const handleClickChildrenItem = (url: string) => {
  router.push(url)
}

defineProps<{
  isOpen: boolean
}>()

const route = useRoute()
const currentMenu = pathToMenu(route.path, menu)
console.log('currentMenu =================>', currentMenu)
const defaultActive = ref(currentMenu ? currentMenu.id + '' : '')
</script>

<template>
  <div class="main-aside">
    <div class="title">
      <template v-if="isOpen">
        <span>后台管理系统</span>
      </template>
      <template v-else>
        <img src="@/assets/logo.svg" />
      </template>
    </div>
    <el-menu
      class="main-menu"
      :collapse="!isOpen"
      :collapse-transition="false"
      :default-active="defaultActive"
    >
      <template v-for="menuItem in menu" :key="menuItem.id">
        <component
          :is="menuItem.children ? 'el-sub-menu' : 'el-menu-item'"
          :index="menuItem.id + ''"
        >
          <template #title>
            <el-icon>
              <component :is="getIconName(menuItem.icon)"></component>
            </el-icon>
            <span>{{ menuItem.name }}--{{ menuItem.id }}</span>
          </template>

          <template
            v-for="subMenuItem in menuItem.children"
            :key="subMenuItem.id"
          >
            <el-menu-item
              @click="handleClickChildrenItem(subMenuItem.url)"
              :index="subMenuItem.id + ''"
              >{{ subMenuItem.name }} -- {{ subMenuItem.id }}</el-menu-item
            >
          </template>
        </component>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.main-aside {
  .title {
    @apply text-black text-lg font-bold;
    @apply flex items-center justify-center;

    img {
      @apply my-1;
      width: 70%;
    }
  }
  .main-menu {
    border-right: none;
  }
}
</style>
