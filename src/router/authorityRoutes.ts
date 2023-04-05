import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    name: 'overview',
    path: '/main/analysis/overview',
    component: () => import('@/views/main/analysis/overview/overview.vue')
  },
  {
    name: 'dashboard',
    path: '/main/analysis/dashboard',
    component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
  },
  {
    name: 'user',
    path: '/main/system/user',
    component: () => import('@/views/main/system/user/user.vue')
  },
  {
    name: 'department',
    path: '/main/system/department',
    component: () => import('@/views/main/system/department/department.vue')
  },
  {
    name: 'menu',
    path: '/main/system/menu',
    component: () => import('@/views/main/system/menu/menu.vue')
  },
  {
    name: 'role',
    path: '/main/system/role',
    component: () => import('@/views/main/system/role/role.vue')
  },
  {
    name: 'category',
    path: '/main/product/category',
    component: () => import('@/views/main/product/category/category.vue')
  },
  {
    name: 'goods',
    path: '/main/product/goods',
    component: () => import('@/views/main/product/goods/goods.vue')
  },
  {
    name: 'chat',
    path: '/main/story/chat',
    component: () => import('@/views/main/story/chat/chat.vue')
  },
  {
    name: 'list',
    path: '/main/story/list',
    component: () => import('@/views/main/story/list/list.vue')
  }
]

export default routes