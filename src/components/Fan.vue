<!-- 绘制扇形的组件 -->
<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  size: Number,
  data: Array
})

const canvas = ref(null)

// 获取当前坐标的偏移点
const cp = (x, y, d, r) => {
  const x1 = r * Math.cos(d * Math.PI / 180) + x
  const y1 = r * Math.sin(d * Math.PI / 180) + y
  return [x1, y1]
}

// 绘制扇形
const drawFan = (x, y, r, d1, d2, ctx) => {
  const sp = cp(x, y, d1, r)
  const ep = cp(x, y, d2, r)
  ctx.beginPath()
  // 绘制三角形
  ctx.moveTo(sp[0], sp[1])
  ctx.lineTo(x, y)
  ctx.lineTo(ep[0], ep[1])
  // 绘制弧形
  ctx.arc(x, y, r, d1 * Math.PI / 180, d2 * Math.PI / 180, false)
  ctx.fill()
}

const draw = (ctx, size, data) => {
  // 把数据从大到小排序
  data.sort((a, b) => b - a)
  // 数据总和
  const sum = data.reduce((a, b) => a + b)
  // 开始角度
  let sd = 0
  // 清空画布
  ctx.clearRect(0, 0, size, size)
  for (let i in data) {
    // 结束角度
    const ed = data[i] / sum * 360 + sd
    ctx.fillStyle = `hsl(${i / data.length * 360}deg, 55%, 50%)`
    drawFan(size / 2, size / 2, size / 2, sd, ed, ctx)
    sd = ed
  }
}

onMounted(() => {
  const can = canvas.value
  if (can) {
    const size = props.size
    can.width = can.height = size
    const ctx = can.getContext('2d')
    draw(ctx, size, props.data)
  }
})

</script>
