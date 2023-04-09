import axiosInstance from "@/service"
import type { IPostUsersListData } from "@/stores/main/system/type"

export const postUsersListData = (data: IPostUsersListData) => {
  return axiosInstance.post('/users/list', data)
}