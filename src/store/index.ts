import { createPinia, PiniaPluginContext } from 'pinia'
import { toRaw } from 'vue'

// 把数据保存到本地存储中
const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

// 从本地存储中获取对象
const getStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

// 创建持久化插件,把数据存到本地存储中去,不然一刷新页面数据就丢了
const piniaPlugin = (options: any) => {
  return (context: PiniaPluginContext) => {
    const { store } = context
    const key = `${options.key ?? '__piniaKey__'}-${store.$id}`
    // 获取存储到本地存储中的值
    const data = getStorage(key)
    // 监听值改变的时候就往本地存储中去存
    store.$subscribe(() => {
      // toRaw 把代理对象转换成原始对象
      setStorage(key, toRaw(store.$state))
    })
    return {
      ...data
    }
  }
}

const store = createPinia()
store.use(piniaPlugin({
  key: 'pinia'
}))

export default store
