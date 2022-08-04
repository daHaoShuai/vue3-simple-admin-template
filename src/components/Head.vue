<template>
  <a-layout-header class="header">
    <!-- 展开或者关闭左侧菜单 -->
    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
    <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
    <!-- 右边头像菜单 -->
    <div class="mr-6">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar :src="userInfo.avatar">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <span>个人信息</span>
            </a-menu-item>
            <a-menu-item @click="logoutNow">
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

  </a-layout-header>
</template>

<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@store/menu'
import { useUserStore } from '@store/user'

const router = useRouter()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
// 侧边栏菜单的展开和合起来
const { collapsed } = storeToRefs(useMenuStore())

// 退出登录
const logoutNow = () => {
  // 清除用户信息
  userStore.logout()
  // 跳转登录页面
  router.push({ name: 'login' })
}
</script>

<style scoped>
.header {
  background: #fff;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
