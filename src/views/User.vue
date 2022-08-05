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
      <a-table :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" :columns="columns"
        :data-source="data" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'

const add = () => {
  console.log('add')
}

const edit = () => {
  console.log('edit')
}

const del = () => {
  console.log('del')
}

const searchValue = ref('')
const onSearch = () => {
  console.log('search', searchValue.value)
}

type Key = string | number;

interface DataType {
  key: Key;
  name: string;
  role: string;
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

const data: DataType[] = [];
for (let i = 0; i < 50; i++) {
  data.push({
    key: i,
    name: `用户 ${i}`,
    role: `角色 ${i}`,
  });
}

const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [],
  loading: false,
});

const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};

</script>
