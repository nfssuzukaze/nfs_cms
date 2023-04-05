import type { RouteRecordRaw } from 'vue-router'
import routes from '@/router/authorityRoutes'
import router from '@/router'

let isResolved = false

export const menuToRoutes = (menu: any[]) => {
  const authorityRoutes: RouteRecordRaw[] = []
  
  menu.forEach((menuItem: any) => {
    menuItem.children.forEach((childMenu: any) => {
      const route = routes.find((route) => route.path === childMenu.url)
      if (route) authorityRoutes.push(route)
    })
  })

  return authorityRoutes
}

export const resolveRoleRoutes = (routes: RouteRecordRaw[]) => {
  console.log('resolve')
  // 保证只解析一次
  if (isResolved) return 
  isResolved = true

  routes.forEach((route: RouteRecordRaw) => {
    console.log('routes loop in resolveRoleRoutes')
    if (!route.component) {
      // console.log('route.component', route.component)
      const path = route.path
      const fileName = path.split('/')[3]
      route.component = () => import(`@/views${path}/${fileName}.vue`)
      console.log('import path: ', `@/views${path}/${fileName}.vue`)
      console.log('route', route)
    }
    router.addRoute('main', route)
  })
}