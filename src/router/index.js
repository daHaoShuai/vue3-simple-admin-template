import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@store/user'
import { toRaw } from 'vue'

// 左侧的菜单栏根据路由来变化
export const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404 not found'
    },
    component: () => import('@view/404.vue')
  },
  {
    path: '/',
    name: 'main',
    meta: {
      title: '首页'
    },
    component: () => import('@layout/Main.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          logo: 'home-outlined'
        },
        component: () => import('@view/Home.vue'),
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          title: '关于',
          logo: 'link-outlined'
        },
        component: () => import('@view/About.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@view/Login.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

// 判断状态里面有没有用户的信息
const isNotLogon = (userStore) => {
  return JSON.stringify(toRaw(userStore.userInfo)) === '{}'
}

// 路由前置拦截
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'vue3-simple-admin-template'
  // 获取用户信息(一定要在方法里面调用,不然pinia没有初始化好,调用会报错)
  const userStore = useUserStore()
  // 判断用户是不是已经登录,没登录就跳转登录页面,登录了就调回首页
  if (isNotLogon(userStore)) {
    if (to.path !== '/login') {
      next({ name: 'login' })
    }
  } else {
    if (to.path === '/login') {
      next({ name: 'home' })
    }
  }
  next()
})

export default router
