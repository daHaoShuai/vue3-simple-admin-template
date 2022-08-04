import { defineStore } from 'pinia'
import { login } from '@api/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {}
    }
  },
  getters: {

  },
  actions: {
    // 登录
    async login(username, password) {
      const { msg, data } = await login(username, password)
      if (msg === '登录成功') {
        // 登录成功就更新用户信息
        this.userInfo = data
      }
      return msg
    },
    // 注销
    logout() {
      // 清空用户信息
      this.userInfo = {}
    }
  }
})
