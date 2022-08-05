<template>
  <!-- 左侧菜单栏 -->
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo">{{ logoMsg }}</div>
    <!-- 菜单按钮 -->
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item v-for="item in menus" :key="item.name" @click="handClickMenu(item)">
        <component :is="item.logo"></component>
        <span>{{ item.title }}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMenuStore, menuType } from '@/store/modules/menu'
import { useTabStore } from '@/store/modules/tabs'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
//      当前选中的菜单  侧边栏菜单的展开和合起来
const { selectedKeys, collapsed, menus } = storeToRefs(useMenuStore())
// logo区域文字
const logoMsg = computed(() => collapsed.value ? '' : '后台管理')
// tab标签状态
const tabStore = useTabStore()

// 菜单按钮点击事件
const handClickMenu = (item: menuType) => {
  // 添加tab到tab栏
  if (item.title) {
    tabStore.add(item.title)
  }
  if (item.name) {
    // 跳转指定路由的页面
    router.push({
      name: item.name
    })
  }
}
</script>

<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
  line-height: 32px;
  color: white;
  text-align: center;
  font-weight: 600;
}
</style>

