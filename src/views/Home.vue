<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="w-11/12 h-11/12">
      <div class="w-2/3 h-2/3 m-0 m-auto" ref="echar"></div>
    </div>
  </div>
</template>

<script setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import { ref, onMounted } from 'vue'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

// echarts容器
const echar = ref(null)


onMounted(() => {
  if (echar.value) {
    const myChart = echarts.init(echar.value)
    // 绘制图表
    myChart.setOption({
      title: {
        text: '商品销量'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5000, 20000, 30060, 10000, 12500, 20000]
        }
      ]
    });
  }
})
</script>
