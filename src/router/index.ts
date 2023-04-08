import useLoginStore from '@/stores/login/login'
import { defaultSelectedRoute } from '@/utils/resolveRoleRoutes'
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
  console.log('router beforeEach', to.path, from.path)
  const loginStore = useLoginStore()

  // userRoutesInfo 是存储在 store 中的, 被过滤了的 routes
  const { token, userRoutesInfo } = loginStore

  if (userRoutesInfo) {
    // 如果目标URL和routes中的URL匹配, 且 router 中还没有对应的 route
    // 就添加动态路由
    const route = userRoutesInfo.find(
      (route: RouteRecordRaw) => route.path === to.path
    )
    if (route && !router.hasRoute(route.name)) {
      const modules = import.meta.glob(`@/views/main/**/*.vue`)
      for (const path in modules) {
        const index = path.indexOf(route.path)
        if (index > -1) {
          route.component = modules[path]
        }
      }
      router.addRoute('main', route)
      return route.path
    }
  }

  // 没有指定具体页面, 则默认跳转到 main 组件
  if (to.path === '/') return '/main'
  // 如果用户没有登录则跳转到登录页面
  if (to.path.startsWith('/main') && !token) return '/login'
  if (to.path === '/main' && defaultSelectedRoute?.path)
    return defaultSelectedRoute.path
})

export default router
