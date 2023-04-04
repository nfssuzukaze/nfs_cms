import type { InterceptorsConfig } from '../request/types'

const interceptorsConfig: InterceptorsConfig = {
  requestSuccessInterceptors(config) {
    return config
  },
  requestFailedInterceptors() {},
  responseSuccessInterceptors() {},
  responseFailedInterceptors() {}
}

export default interceptorsConfig
