import createAxiosInstance from './request'
import interceptorsConfig from './config/interceptors'

const axiosInstance = createAxiosInstance({
  interceptors: interceptorsConfig
})

export default axiosInstance
