<template>
  <div class="w-full min-h-screen bg-black">
    <div v-move text="red-500 5xl center" font="bold" class="top-1/3 left-1/4">404 not found</div>
    <div class=" absolute top-1/2 left-1/2">
      <span class="text-3xl font-bold text-orange-500 cursor-pointer select-none" @click="goHome">回首页</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '../store/modules/menu'

const router = useRouter()
const { selectedKeys } = storeToRefs(useMenuStore())

const goHome = () => {
  selectedKeys.value = ['home']
  router.push({
    name: 'home'
  })
}
</script>
