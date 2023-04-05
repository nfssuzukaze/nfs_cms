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
  //     // const modules = import.meta.glob(``)
  //     console.log('route.name', route.name, route)
  //     router.addRoute('main', route)
  //   }
  // }

  // 如果 userRoutesInfo 存在, 则说明用户登录过
  // 这里调用 resolveRoleRoutes 方法保证动态路由的存在
  if (userRoutesInfo) resolveRoleRoutes(userRoutesInfo)

  // 没有指定具体页面, 则默认跳转到 main 组件
  if (to.path === '/') return '/main'
  // 如果用户没有登录则跳转到登录页面
  if (to.path.startsWith('/main') && !token) return '/login'
})

export default router
