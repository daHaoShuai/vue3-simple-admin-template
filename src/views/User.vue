<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="w-11/12">
      <div class="py-4 flex justify-between">
        <div>
          <a-button @click="add" type="primary">新增</a-button>
          <a-button @click="edit" class="ml-2">编辑</a-button>
          <a-button @click="del" class="ml-2" type="primary" danger>删除</a-button>
        </div>
        <div>
          <a-input-search v-model:value="searchValue" placeholder="输入名字搜索" enter-button="搜索" @search="onSearch" />
        </div>
      </div>
      <a-table :loading="state.loading"
        :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" :columns="columns"
        :data-source="data" />
    </div>
    <a-modal v-model:visible="visible" :title="modelTitle" :footer="null">
      <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="名字" name="name" :rules="[{ required: true, message: '请输入名字' }]">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="角色" name="role" :rules="[{ required: true, message: '请输入角色' }]">
          <a-input v-model:value="formState.role" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">{{ modelTitle }}</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { list } from '@/api/user'

interface FormState {
  name: string;
  role: string;
}

type Key = string | number;

interface DataType {
  key: Key;
  name: string;
  role: string;
}
const enum TITLE {
  ADD = '新增',
  EDIT = '更新'
}

const columns = [
  {
    title: '名字',
    dataIndex: 'name',
  },
  {
    title: '角色',
    dataIndex: 'role',
  },
];

// 表格数据
const data = ref<DataType[]>([])

const useForm = Form.useForm

const visible = ref<boolean>(false)

const modelTitle = ref<TITLE>(TITLE.ADD)

const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [],
  loading: false,
});

const formState = reactive<FormState>({
  name: '',
  role: '',
});

const { resetFields } = useForm(formState)
// 获取当前选中的行的key数组
const getKeys = () => state.selectedRowKeys
// 在用户列表中通过key查找用户
const findUserByKey = (key: Key) => data.value.filter(user => user.key === key)
// 获取用户在原数组中的坐标
const findUserIndexByKey = (key: Key) => data.value
  .map((user, idx) => user.key === key ? idx : -1)
  .filter(i => i !== -1)

// 获取后台数据
const queryData = () => {
  state.loading = true
  setTimeout(() => {
    data.value = list()
    state.loading = false
  }, 100)
}

queryData()

const onFinish = (values: FormState) => {
  const { name, role } = values
  if (modelTitle.value === TITLE.ADD) {
    data.value.push({
      key: Math.random(),
      name,
      role
    })
  } else if (modelTitle.value === TITLE.EDIT) {
    const key = getKeys()[0]
    const idxs = findUserIndexByKey(key)
    if (idxs && idxs.length === 1) {
      const col = data.value[idxs[0]]
      col.name = name
      col.role = role
      data.value[idxs[0]] = col
      state.selectedRowKeys = []
    }
  }
  visible.value = false
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
  message.error('你的输入有误,请检查输入')
};

const openMode = (title: TITLE) => {
  resetFields()
  visible.value = true
  modelTitle.value = title
}

const add = () => {
  openMode(TITLE.ADD)
}

const edit = () => {
  const selected = getKeys()
  if (selected.length === 0) {
    message.error('你还没有选中要编辑的数据')
    return
  }
  if (selected.length > 1) {
    message.error('你不能同时编辑多行!')
    return
  }
  openMode(TITLE.EDIT)
  const [key] = selected
  const col = findUserByKey(key)
  formState.name = col[0].name
  formState.role = col[0].role
}

const del = () => {
  const keys = getKeys()
  // 过滤出要删除的用户信息
  const filterArrByKey = (arr: DataType[], keys: Key[]) => arr.map(item => {
    if (keys && keys.length > 0) {
      for (let i = 0; i < keys.length; i++) {
        if (item.key === keys[i]) {
          return { key: '', name: '', role: '' }
        }
      }
    }
    return item
  }).filter(item => item.key !== '');
  // 因为没有写后端所以就先这样
  data.value = filterArrByKey(data.value, keys) as DataType[]
}

const searchValue = ref('')
const onSearch = () => {
  const key = searchValue.value
  if (key) {
    const nameArr = data.value.filter(item => item.name === key)
    if (nameArr.length > 0) {
      data.value = nameArr
    } else {
      message.error(`没有找到name为${key}的用户`)
    }
  } else {
    queryData()
  }
}

// 选中表格的行时触发
const onSelectChange = (selectedRowKeys: Key[]) => {
  state.selectedRowKeys = selectedRowKeys;
};

</script>
