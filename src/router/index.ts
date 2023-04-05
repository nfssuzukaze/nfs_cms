import useLoginStore from '@/stores/login/login'
import { resolveRoleRoutes } from '@/utils/resolveRoleRoutes'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'main',
      path: '/main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  console.log('router beforeEach')
  const loginStore = useLoginStore()
  const { token, userRoutesInfo } = loginStore

  // if (userRoutesInfo) {
  //   console.log('router before has userRoutesInfo')
  //   const route = userRoutesInfo.find(
  //     (route: RouteRecordRaw) => route.path === to.path
  //   )
  //   if (route && !router.hasRoute(route.name)) {
  //     console.log('route.name', route.name, route)
  //     router.addRoute('main', route)
  //   }
  // }

  if (userRoutesInfo) resolveRoleRoutes(userRoutesInfo)

  if (to.path === '/') return '/main'
  if (to.path.startsWith('/main') && !token) return '/login'
})

export default router
