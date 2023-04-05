import type { AxiosResponse } from 'axios'
import type { InterceptorsConfig } from '../types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const interceptorsConfig: InterceptorsConfig = {
  requestSuccessInterceptors(config) {
    const token = localCache.getCache(LOGIN_TOKEN)
    if (token && config.headers) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  requestFailedInterceptors() {},
  responseSuccessInterceptors(response: AxiosResponse) {
    return response.data
  },
  responseFailedInterceptors() {}
}

export default interceptorsConfig
