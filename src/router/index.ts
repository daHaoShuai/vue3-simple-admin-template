import { createRouter, createWebHistory } from 'vue-router'
import { AppRouteRecordRaw } from '@/typings'
import { Store } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import { toRaw } from 'vue'

// 左侧的菜单栏根据路由来变化
export const routes: AppRouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404 not found'
    },
    component: () => import('@/views/404.vue')
  },
  {
    path: '/',
    name: 'main',
    meta: {
      title: '首页'
    },
    component: () => import('@/layout/Main.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          logo: 'home-outlined'
        },
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '用户管理',
          logo: 'user-outlined'
        },
        component: () => import('@/views/User.vue'),
      },
      {
        path: '/video',
        name: 'video',
        meta: {
          title: '视频管理',
          logo: 'play-circle-outlined'
        },
        component: () => import('@/views/Video.vue'),
      },
      {
        path: '/editor',
        name: 'editor',
        meta: {
          title: '富文本编辑',
          logo: 'edit-outlined'
        },
        component: () => import('@/views/Editor.vue'),
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          title: '关于',
          logo: 'link-outlined'
        },
        component: () => import('@/views/About.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

// 判断状态里面有没有用户的信息
const isNotLogon = (userStore: Store<"user", { userInfo: {} }, {}, { login(username: string, password: string): Promise<string>; logout(): void }>) => {
  return JSON.stringify(toRaw(userStore.userInfo)) === '{}'
}

// 路由前置拦截
router.beforeEach((to, _, next) => {
  document.title = to.meta.title || 'vue3-simple-admin-template'
  // 获取用户信息(一定要在方法里面调用,不然pinia没有初始化好,调用会报错)
  const userStore = useUserStore()
  // 判断用户是不是已经登录,没登录就跳转登录页面,登录了就调回首页
  if (isNotLogon(userStore)) {
    if (to.path !== '/login') {
      next({ name: 'login' })
      return
    }
  } else {
    if (to.path === '/login') {
      next({ name: 'home' })
      return
    }
  }
  // 登录后就允许跳转到自己要去的页面
  next()
})

export default router
