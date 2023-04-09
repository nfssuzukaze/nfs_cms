import { defineStore } from 'pinia'
import { postUsersListData } from '@/service/main/system/system'
import type { IPostUsersListData, ISystemState } from './type.d.ts'

const useSystemStore = defineStore('system', {
  state(): ISystemState {
    return {
      usersList: [],
      usersTotalCount: 0
    }
  },
  actions: {
    async postUsersListAction(data: IPostUsersListData) {
      const usersListData = await postUsersListData(data)
      const { totalCount, list } = usersListData.data
      this.usersTotalCount = totalCount
      this.usersList = list
      // console.log('usersList: =========>', usersListData)
    }
  }
})

export default useSystemStore
