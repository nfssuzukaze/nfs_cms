import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import {
  LOGIN_TOKEN,
  USER_MENU_INFO,
  USER_ROLE_INFO,
  USER_ROUTE_INFO
} from '@/global/constants'
import {
  accountLogin,
  getUserMenusByRoleId,
  getUserRoleByAccountId
} from '@/service/login'
import router from '@/router'
import { menuToRoutes, resolveRoleRoutes } from '@/utils/resolveRoleRoutes'

const useLoginStore = defineStore('login', {
  state() {
    return {
      token: localCache.getCache(LOGIN_TOKEN) ?? '',
      userRoleInfo: JSON.parse(localCache.getCache(USER_ROLE_INFO) ?? 'null'),
      userMenuInfo: JSON.parse(localCache.getCache(USER_MENU_INFO) ?? 'null'),
      userRoutesInfo: JSON.parse(localCache.getCache(USER_ROUTE_INFO) ?? 'null')
    }
  },
  actions: {
    async loginAction(username: string, password: string) {
      const loginRes = await accountLogin(username, password)
      const { id: accountId, token } = loginRes.data

      // 之后的访问数据的操作需要 Authorization, 这需要在请求头上做配置, 需要用到 token, 故而先存储下来
      localCache.setCache(LOGIN_TOKEN, (this.token = token))

      const roleInfo = await getUserRoleByAccountId(accountId)
      const roleId = roleInfo.data.role.id

      const menuInfo = await getUserMenusByRoleId(roleId)

      localCache.setCache(USER_ROLE_INFO, (this.userRoleInfo = roleInfo.data))
      localCache.setCache(USER_MENU_INFO, (this.userMenuInfo = menuInfo.data))
      // console.log(this.userRoleInfo)
      // console.log(this.userMenuInfo)

      // 配置动态路由
      if (this.userMenuInfo) {
        const routes = menuToRoutes(this.userMenuInfo)
        console.log('store routes', routes)
        resolveRoleRoutes(routes)
        localCache.setCache(USER_ROUTE_INFO, routes)
      }

      router.push('/main')
    }
  }
})

export default useLoginStore
