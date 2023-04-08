import type { RouteRecordRaw } from 'vue-router'
import routes from '@/router/authorityRoutes'

// 仅刚登录时有值
export let defaultSelectedRoute: null | RouteRecordRaw = null

export const menuToRoutes = (menu: any[]) => {
  const authorityRoutes: RouteRecordRaw[] = []

  menu.forEach((menuItem: any) => {
    menuItem.children.forEach((childMenu: any) => {
      const route = routes.find((route) => route.path === childMenu.url)
      if (route) {
        // 为保证面包屑选项的交互效果
        if (!authorityRoutes.find((route) => route.path === menuItem.url)) {
          authorityRoutes.push({
            name: menuItem.url.split('/')[2],
            path: menuItem.url,
            redirect: route.path
          })
        }
        authorityRoutes.push(route)
        if (!defaultSelectedRoute) defaultSelectedRoute = route
      }
    })
  })

  return authorityRoutes
}

/**
 *
 * @param path 当前页面的路径
 * @param menu 所有菜单
 * @returns 被路径匹配的子菜单 {id: number, url: string, name: string}
 */

export const pathToMenu = (path: string, menu: any[]): any => {
  for (const menuItem of menu) {
    for (const subItem of menuItem.children) {
      if (subItem.url === path) {
        return subItem
      }
    }
  }
}

type BreadCrumbItem = {
  id: number
  path: string
  name: string
}

export const getBreadCrumbList = (path: string, menu: any[]) => {
  const list: BreadCrumbItem[] = []
  for (const menuItem of menu) {
    for (const subItem of menuItem.children) {
      if (subItem.url === path) {
        list.push({ id: menuItem.id, name: menuItem.name, path: menuItem.url })
        list.push({ id: subItem.id, name: subItem.name, path: subItem.url })
        return list
      }
    }
  }
  return list
}
