import type { RouteRecordRaw, RouteRecord } from 'vue-router'
import routes from '@/router/authorityRoutes'
import router from '@/router'
import type { RouteRecordName } from 'vue-router'

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
  console.log('process resolveRoleRoutes method')
  // 保证只解析一次
  if (isResolved) return
  isResolved = true

  const modules = import.meta.glob(`@/views/main/**/*.vue`)
  // console.log(modules)

  for (const path in modules) {
    const route = routes.find(route => path.includes(route.path))
    // console.log(path, route)
    if (route && !route.component) route.component = modules[path]
    // if (route) route.component = modules[path] as any
    // console.log('==========', path, route)
  }

  routes.forEach((route: RouteRecordRaw) => {
    // console.log('routes loop in resolveRoleRoutes')
    // if (!route.component) {
    //   console.log('route.component', route.component)
    //   const componentPath = `@/views${route.path}/${route.name as string}.vue`
    //   route.component = () => import(componentPath)
    //   console.log('import path: ', componentPath)
    //   console.log('route', route, { ...route })
    // }
    // console.log('xxx', route)
    router.addRoute('main', route)
  })

  console.log('router.getRoutes', router.getRoutes())
}
