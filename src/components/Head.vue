<template>
  <a-layout-header style="padding: 0; height: 100px">
    <div class="header">
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
              <a-menu-item @click="showUserInfo">
                <span>个人信息</span>
              </a-menu-item>
              <a-menu-item @click="logoutNow">
                <span>退出登录</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class=" bg-light-800 flex items-center pl-4" style="height: calc(100px - 64px);">
      <a-tag style="cursor: pointer; user-select: none;" v-for="(tab, index) in tabs" :key="tab" :closable="index !== 0"
        @click="handTab(tab)" @close="closeTab(tab, index)">
        {{ tab }}
      </a-tag>
    </div>
  </a-layout-header>
  <a-modal v-model:visible="visible" title="个人信息" :footer="null">
    <div>
      <a-image :width="300" :src="userInfo.avatar" />
      <p>{{ userInfo.name }}</p>
      <p v-for="r in userInfo.role" :key="r">{{ r }}</p>
    </div>
  </a-modal>
</template>

<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMenuStore } from '@store/menu'
import { useUserStore } from '@store/user'
import { useTabStore } from '@store/tabs'
import { composeXYZ } from '@util'
import { message } from 'ant-design-vue';

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
// 侧边栏菜单的状态
const { collapsed, menus, selectedKeys } = storeToRefs(useMenuStore())
// tab标签的状态
const tabStore = useTabStore()
const { tabs } = storeToRefs(tabStore)

// 获取当前tab对于的路由名字
const filterMenuInTitle = tab => menus.value.filter(menu => menu.title === tab)
const mapName = arr => arr.map(m => m.name)
// 根据tab标签的名字获取要跳转的路由的名字 相当于 mapName(filterMenu(tab))
const pathName = tab => composeXYZ(filterMenuInTitle)(mapName)(tab)

// tab标签点击事件
const handTab = (tab) => {
  const names = pathName(tab)
  // 多次点击tab标签时判断一下要去的地方跟现在是不是一样的,一样的就不跳转了
  if (names && names.length === 1 && route.name !== names[0]) {
    // 跳转到指定的页面
    router.push({
      name: names[0]
    })
  }
  // 改变左侧菜单的选中项
  selectedKeys.value = names
}

// 关闭tab标签的回调
const closeTab = (tab, index) => {
  // 从状态中删除这个标签
  tabStore.del(tab)
  if (index >= 1) {
    const names = pathName(tabs.value[index - 1])
    router.push({
      name: names[0]
    })
    selectedKeys.value = names
  }
}

// 开关用户信息窗口
const visible = ref(false);

// 弹出用户信息
const showUserInfo = () => {
  visible.value = true;
}

// 退出登录
const logoutNow = () => {
  // 清除用户信息
  userStore.logout()
  // 跳转登录页面
  router.push({ name: 'login' })
  message.success('退出登录')
}
</script>

<style scoped>
.header {
  background: #fff;
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
