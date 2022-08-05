<template>
  <div v-move class="text-3xl text-blue-500 font-bold select-none cursor-pointer top-1/3 left-1/3">
    这个人很懒,没有留下什么信息
  </div>
  <div class="w-full h-full flex justify-center items-center">
    <div class="w-11/12 h-11/12">
      <Fan :size="300" :data=data />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Fan from '@/components/Fan.vue';
const data = [80, 90, 45, 23, 56, 78]
</script>
