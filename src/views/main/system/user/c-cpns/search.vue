<script setup lang="ts">
import { reactive } from 'vue'
interface ISearchForm {
  // [key: string]: string | number | Date[]
  name: string
  realname: string
  cellphone: string
  enable: number
  createAt: string | Date[]
}

const searchForm = reactive<ISearchForm>({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})

const handleReset = () => {
  Reflect.ownKeys(searchForm).forEach((key: string | symbol) => {
    const prop = key as keyof ISearchForm
    if (typeof searchForm[prop] === 'string') {
      searchForm[prop] = ''
    } else if (typeof searchForm[prop] === 'number') {
      searchForm[prop] = 1
    } else {
      searchForm[prop] = []
    }
  })
}

const emit = defineEmits<{
  (e: 'user-search', value: ISearchForm): void
  (e: 'user-reset', value: ISearchForm): void
}>()

const handleSearch = () => {
  emit('user-search', searchForm)
}
</script>

<template>
  <div class="search">
    <el-form :model="searchForm" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名">
            <el-input v-model="searchForm.realname" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码">
            <el-input v-model="searchForm.cellphone" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select style="width: 100%" v-model="searchForm.enable">
              <el-option label="select1" :value="1"></el-option>
              <el-option label="select2" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="form-button">
        <el-button icon="refresh" @click="handleReset">重置</el-button>
        <el-button icon="search" type="primary" @click="handleSearch"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.search {
  @apply bg-light-50 px-16 pt-8 pb-2 rounded;
  .form-button {
    .el-button:nth-of-type(1) {
      margin-left: auto;
    }
  }
}
</style>
