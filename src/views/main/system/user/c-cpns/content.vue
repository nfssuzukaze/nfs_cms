<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { formatUTC } from '@/utils/formatDate'
import type { ISearchForm } from '../type'

const systemStore = useSystemStore()
const { usersList, usersTotalCount } = storeToRefs(systemStore)

const fetchUsersListData = (data?: ISearchForm) => {
  const postInfo = {
    size: pageSize.value,
    offset: (currentPage.value - 1) * pageSize.value,
    ...data
  }
  systemStore.postUsersListAction(postInfo)
}

defineExpose({
  fetchUsersListData
})

const currentPage = ref(1)
const pageSize = ref(10)
fetchUsersListData()

const handleSizeChange = () => {
  fetchUsersListData()
  // console.log(newCurrentSize, pageSize.value)
}
const handleCurrentChange = () => {
  fetchUsersListData()
  // console.log(newCurrentPage, currentPage.value)
}

const handleEdit = (id: number) => {
  console.log('edit', id)
}
const handleDelete = (id: number) => {
  console.log('delete', id)
}
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList">
        <!-- <el-table-column
          v-for="(item, key) in usersList[0]"
          :key="key"
          :prop="key"
          :label="key"
        /> -->
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />

        <el-table-column
          align="center"
          label="用户名"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="150px"
        />
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="150px"
        />
        <el-table-column
          align="center"
          label="状态"
          prop="enable"
          width="100px"
        >
          <!-- 作用域插槽 -->
          <template #default="props">
            <el-button :type="props.row.enable ? 'primary' : 'danger'" plain>
              {{ props.row.enable ? '启用' : '禁用' }}
              <!-- {{ fn(props) }} -->
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="props">
            {{ formatUTC(props.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="props">
            {{ formatUTC(props.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="200px">
          <template #default="props">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEdit(props.row.id)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDelete(props.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="usersTotalCount"
        :page-sizes="[5, 6, 7, 8, 9, 10]"
        :background="true"
        layout="sizes, prev, pager, next, jumper, total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  @apply bg-light-50 mt-8 rounded px-8 py-4;
  @apply text-black;
  .header {
    @apply flex items-center justify-between;
    .title {
      @apply text-lg font-bold;
    }
  }

  .table {
    @apply w-full h-full;
    :deep(.el-table__cell) {
      @apply py-12px;
    }
  }

  .pagination {
    @apply mt-4;
    @apply flex items-center justify-center;
    .el-pagination {
      @apply space-x-5;
    }
  }
}
</style>
