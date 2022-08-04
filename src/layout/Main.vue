<template>
  <a-layout>
    <!-- 左侧菜单栏 -->
    <SideMenu />
    <a-layout>
      <!-- 头部顶栏 -->

      <Head />
      <!-- 内容区域 -->
      <a-layout-content style="height:calc(100vh - 100px)">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import SideMenu from '@component/SideMenu.vue'
import Head from '@component/Head.vue'
</script>
