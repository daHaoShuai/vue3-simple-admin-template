// 自定义指令插件
import { App, Directive, DirectiveBinding } from 'vue'
// 移动元素指令
const move: Directive<any, void> = (el: HTMLElement, _: DirectiveBinding) => {

  const elMove = (e: MouseEvent) => {
    // 定位到鼠标的位置,e.client*指向的是元素的左上角
    const X = e.clientX - el.offsetLeft
    const Y = e.clientY - el.offsetTop
    // 改变元素的位置
    const domMove = (e: MouseEvent) => {
      el.style.left = e.clientX - X + 'px'
      el.style.top = e.clientY - Y + 'px'
    }
    // 监听鼠标移动事件
    document.addEventListener('mousemove', domMove)
    // 监听鼠标松开事件
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', domMove)
    })

  }
  // 给当前元素的父元素加上相对定位
  const parentElement: HTMLElement = el.parentElement!
  parentElement.style.position = 'relative'
  // 给元素加上鼠标移动样式
  el.style.cursor = 'move'
  // 给元素的定位设置为绝对定位
  el.style.position = 'absolute'
  // 给元素加上鼠标按下事件
  el.addEventListener('mousedown', elMove)
}

type dirType = {
  key: string,
  value: Directive
}

const directives: Array<dirType> = [
  {
    key: 'move',
    value: move
  }
]

export default {
  install(app: App) {
    // 全局注册指令
    directives.forEach(d => {
      app.directive(d.key, d.value)
    })
  }
}
