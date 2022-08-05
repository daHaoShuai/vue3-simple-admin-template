import { defineStore } from 'pinia'

export const useTabStore = defineStore('tabs', {
  state: () => {
    return {
      tabs: ['首页']
    }
  },
  actions: {
    add(title: string) {
      // 先删除原来的,再添加新的
      const idx = this.tabs.indexOf(title)
      if (idx !== -1) {
        this.del(title)
      }
      if (idx !== 0) {
        this.tabs.push(title)
      }
    },
    del(title: string) {
      const idx = this.tabs.indexOf(title)
      // 找到了,并且不是首页就从数组中删除掉
      if (idx !== -1 && idx !== 0) {
        this.tabs.splice(idx, 1)
      }
    },
    logout() {
      // 退出登录的时候回到初始状态
      this.tabs = ['首页']
    }
  }
})
