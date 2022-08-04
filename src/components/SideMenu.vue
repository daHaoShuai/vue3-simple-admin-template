<template>
  <!-- 左侧菜单栏 -->
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo"></div>
    <!-- 菜单按钮 -->
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item v-for="item in menus" :key="item.name" @click="handClickMenu(item)">
        <component :is="item.logo"></component>
        <span>{{ item.title }}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@store/menu'
import { useRouter } from 'vue-router'

//      当前选中的菜单  侧边栏菜单的展开和合起来
const { selectedKeys, collapsed, menus } = storeToRefs(useMenuStore())

const router = useRouter()
// 菜单按钮点击事件
const handClickMenu = item => {
  // 跳转指定路由的页面
  router.push({
    name: item.name
  })
}
</script>

<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>

