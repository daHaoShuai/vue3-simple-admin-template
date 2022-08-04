// 之后从后台获取用户信息
export const login = (username, password) => {
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
          }, 1000)

        }
      }
      reject({ msg: '登录失败' })
    })
  })
}
