<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';

import { useAccessStore, useUserStore } from '@vben/stores';

import {
  ElButton,
  ElCard,
  ElMessage,
  ElTable,
  ElTableColumn,
} from 'element-plus';

const userStore = useUserStore();
const accessStore = useAccessStore();

// 模拟用户列表数据（后续可从后端接口获取）
const userList = ref([]);

// 从 store 中获取权限数组
const accessCodes = computed(() => accessStore.accessCodes || []);

// 权限判断函数
const hasPermission = (code: string) => {
  return accessCodes.value.includes(code);
};

// 示例按钮操作
const handleView = (row) => {
  ElMessage.info(`查看用户：${row.username}`);
};
const handleEdit = (row) => {
  ElMessage.success(`编辑用户：${row.username}`);
};
const handleDelete = (row) => {
  ElMessage.warning(`删除用户：${row.username}`);
};
onBeforeMount(() => {
  console.log('用户权限', accessStore.accessCodes);
  console.log('用户信息', userStore.userInfo);
});
</script>

<template>
  <div class="p-4">
    <ElCard shadow="hover">
      <template #header>
        <span>用户管理</span>
      </template>

      <ElTable :data="userList" border style="width: 100%">
        <ElTableColumn prop="id" label="ID" width="60" />
        <ElTableColumn prop="account" label="账号" />
        <ElTableColumn prop="username" label="用户名" />
        <ElTableColumn prop="email" label="邮箱" />
        <ElTableColumn prop="role" label="角色" />

        <ElTableColumn label="操作" width="220">
          <template #default="scope">
            <ElButton
              v-if="hasPermission('USER:VIEW')"
              type="primary"
              size="small"
              @click="handleView(scope.row)"
            >
              查看
            </ElButton>

            <ElButton
              v-if="hasPermission('USER:EDIT')"
              type="success"
              size="small"
              @click="handleEdit(scope.row)"
            >
              编辑
            </ElButton>

            <ElButton
              v-if="hasPermission('USER:DELETE')"
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"
            >
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<style scoped>
.p-4 {
  padding: 16px;
}
</style>
