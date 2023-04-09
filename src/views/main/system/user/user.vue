<script setup lang="ts">
import { ref } from 'vue'
import search from './c-cpns/search.vue'
import content from './c-cpns/content.vue'
import type { ISearchForm } from './type.d.ts'

const searchForm = ref()
const handleSearch = (form: ISearchForm) => {
  searchForm.value = form
  formRef.value?.fetchUsersListData(form)
  console.log('search', form)
}
const formRef = ref<InstanceType<typeof content> >()
</script>

<template>
  <div class="user">
    <search @userSearch="handleSearch" />
    <content ref="formRef" />
  </div>
</template>

<style lang="less" scoped>
.user {
}
</style>
