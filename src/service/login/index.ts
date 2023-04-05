import axiosInstance from '..'

export const accountLogin = (name: string, password: string) => {
  return axiosInstance.post('/login', {
    name,
    password
  })
}

export const getUserRoleByAccountId = (id: number) => {
  return axiosInstance.get(`/users/${id}`)
}

export const getUserMenusByRoleId = (id: number) => {
  return axiosInstance.get(`/role/${id}/menu`)
}
