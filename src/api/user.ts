// 之后从后台获取用户信息
interface result {
  msg: string,
  data: {}
}

// 登录方法
export const login: (username: string, password: string) => Promise<result> = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && password) {
        if (username === 'admin' && password === 'admin') {
          resolve({
            msg: '登录成功',
            data: {
              name: 'Da',
              // 头像
              avatar: 'https://tx2.a.yximgs.com/udata/music/music_c22a0749a7a644109f42553a67b4862e0.jpg',
              // 角色
              role: ['admin']
            }
          })
        }
      }
      reject({ msg: '登录失败' })
    }, 1000)
  })
}


interface user {
  key: number | string,
  name: string,
  role: string
}

// 获取所有的用户
export const list = (): Array<user> => {
  return Array(50).fill(0).map((_, i) => ({
    key: i,
    name: `name${i + 1}`,
    role: `role${i + 1}`
  }))
}
