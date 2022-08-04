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
      <a-table :row-selection="rowSelection" :columns="columns" :data-source="data"></a-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = [
  {
    title: '名字',
    dataIndex: 'name',
  }, {
    title: '角色',
    dataIndex: 'role',
  }
];

const data = [
  {
    key: '1',
    name: 'da',
    role: 'admin',
  }, {
    key: '2',
    name: '杰哥不要啊',
    role: 'root'
  }
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    name: record.name,
  }),
};

const add = _ => {
  console.log('add')
}

const edit = _ => {
  console.log('edit')
}

const del = _ => {
  console.log('del')
}

const searchValue = ref('')
const onSearch = _ => {
  console.log('search', searchValue.value)
}
</script>
