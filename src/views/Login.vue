<template>
  <div class="login">
    <a-form :model="formState" name="basic" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item style="color: #fff;" label="账号" name="username" :rules="[{ required: true, message: '请输入账号' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import { reactive } from 'vue';
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: '',
  password: ''
})

// 验证成功
const onFinish = async (values: any) => {
  try {
    const msg = await userStore.login(values?.username, values?.password)
    router.push({ name: 'home' })
    message.success(msg)
  } catch (error: any) {
    message.error(error?.msg)
  }
}

// 验证失败
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<style scoped>
.login {
  background: url('../assets/login.jpg') no-repeat center;
  background-size: cover;
  @apply w-full min-h-screen flex justify-center items-center
}

::v-deep(.ant-form-item-label)>label {
  color: #ffffff;
}
</style>
