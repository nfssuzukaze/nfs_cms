import axiosInstance from '@/service'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state() {
    return {

    }
  },
  actions: {
    loginAction(username: string, password: string) {
      console.log(username, password)
      axiosInstance.post('/login', {
        username,
        password
      }).then(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
    }
  }
})

export default useLoginStore