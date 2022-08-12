import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabStore = defineStore('tabs', () => {

  let tabs = ref(['首页'])

  const add = (title: string) => {
    // 先删除原来的,再添加新的
    const idx = tabs.value.indexOf(title)
    if (idx !== -1) {
      del(title)
    }
    if (idx !== 0) {
      tabs.value.push(title)
    }
  }

  const del = (title: string) => {
    const idx = tabs.value.indexOf(title)
    // 找到了,并且不是首页就从数组中删除掉
    if (idx !== -1 && idx !== 0) {
      tabs.value.splice(idx, 1)
    }
  }

  const logout = () => {
    // 退出登录的时候回到初始状态
    tabs.value = ['首页']
  }

  return {
    tabs,
    add,
    del,
    logout
  }
}, {
  // 数据持久化
  persist: true
})