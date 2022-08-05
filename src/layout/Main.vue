<template>
  <a-layout>
    <!-- 左侧菜单栏 -->
    <SideMenu />
    <a-layout>
      <!-- 头部顶栏 -->

      <Head />
      <!-- 内容区域 -->
      <a-layout-content style="min-height:calc(100vh - 100px)">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import SideMenu from '@/components/SideMenu.vue'
import Head from '@/components/Head.vue'
</script>
