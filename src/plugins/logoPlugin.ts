import { App } from 'vue'
import { HomeOutlined, LinkOutlined, PlayCircleOutlined, EditOutlined, UserOutlined } from '@ant-design/icons-vue';
import { routes } from '@/router'

// 用routes表中的logo名字注册对应的组件 确定2级路由中是一定有logo的
export const logos: Array<string | undefined> = routes.filter((_, idx) => idx === 1).map(i => i.children)[0]?.map(i => i.meta.logo)!

const logoComponents = [HomeOutlined, UserOutlined, PlayCircleOutlined, EditOutlined, LinkOutlined]

export default {
  install(app: App) {
    logos.forEach((logo: string | undefined, idx: number) => {
      if (logo) {
        app.component(logo, logoComponents[idx])
      }
    })
  }
}
