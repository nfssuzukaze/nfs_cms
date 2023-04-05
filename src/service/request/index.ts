import axios, { type AxiosInstance } from 'axios'
import { BASE_URL, TIME_OUT } from '../config'
import type { AxiosRequestConfig } from 'axios'
import type { MyAxiosConfig } from '../types'

const baseConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: TIME_OUT
}

const createAxiosInstance = (config: MyAxiosConfig): AxiosInstance => {
  const { interceptors } = config
  delete config.interceptors
  const realConfig: AxiosRequestConfig = config

  // console.log(config, baseConfig, {
  //   ...baseConfig,
  //   ...realConfig
  // })

  const service = axios.create({
    ...baseConfig,
    ...realConfig
  })

  if (interceptors) {
    console.log('has interceptors')
    service.interceptors.request.use(
      interceptors.requestSuccessInterceptors,
      interceptors.requestFailedInterceptors
    )
    service.interceptors.response.use(
      interceptors.responseSuccessInterceptors,
      interceptors.responseFailedInterceptors
    )
  }

  return service
}

export default createAxiosInstance
