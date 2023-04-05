import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

interface InterceptorsConfig {
  requestSuccessInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailedInterceptors?: (error: any) => any
  responseSuccessInterceptors?: (response: AxiosResponse) => any
  responseFailedInterceptors?: (error: any) => any
}

interface MyAxiosConfig extends AxiosRequestConfig {
  interceptors?: InterceptorsConfig
}

export type { MyAxiosConfig, InterceptorsConfig }
