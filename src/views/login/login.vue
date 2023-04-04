<script setup lang="ts">
import { reactive, ref } from 'vue'
import useLoginStore from '../../stores/login/login'


const form = reactive({
  username: '',
  password: ''
})

const loginStore = useLoginStore()
const handleClick = () => {
  loginStore.loginAction(form.username, form.password)
}
</script>

<template>
  <div class="login">
    <div class="form">
      <h2 class="title">后台管理系统</h2>
      <el-form :model="form" class="el-form">
        <el-form-item>
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="button-item">
          <el-button type="primary" @click="handleClick">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  @apply h-full w-full;
  @apply bg-light-800;
  @apply flex items-center justify-center;
  .form {
    @apply flex items-center justify-center flex-col;
    @apply w-1/3 h-2/5 bg-light-50;
    @apply space-y-10;
    .title {
      @apply text-xl font-bold;
    }
    .el-form {
      @apply w-3/7;

      & button {
        margin-left: auto;
        margin-right: auto;
        @apply w-3/5;
      }
    }
  }
}
</style>
