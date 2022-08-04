import { HomeOutlined, LinkOutlined, UserOutlined } from '@ant-design/icons-vue';
import { routes } from '@router'

// 用routes表中的logo名字注册对应的组件
export const logos = routes[1].children.map(c => c.meta.logo)
const logoComponents = [HomeOutlined, UserOutlined, LinkOutlined]

export default {
  install(app) {
    logos.forEach((logo, idx) => {
      app.component(logo, logoComponents[idx])
    })
  }
}
