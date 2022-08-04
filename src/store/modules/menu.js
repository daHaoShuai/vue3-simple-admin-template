import { defineStore } from 'pinia'
import { routes } from '@router'

// 动态生成左侧的菜单
const menus = routes[1].children.map((item, idx) => (
  {
    title: item.meta.title,
    name: item.name,
    path: item.path,
    logo: item.meta.logo
  }
))

export const useMenuStore = defineStore('side-menu', {
  state: () => {
    return {
      // 侧边栏菜单的展开和合起来
      collapsed: false,
      // 当前选中的菜单
      selectedKeys: [menus[0].name],
      // 左侧所有的菜单选项
      menus
    }
  }
})
