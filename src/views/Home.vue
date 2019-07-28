<template>
  <div class="home">
    <input type="text" v-model="loginFormData.email">
    <input type="text" v-model="loginFormData.pwd">
    <button @click="userLogin">登陆</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { userLogin, userReg } from '@/api'

@Component
export default class Home extends Vue {
  loginFormData = { email: '576570555@qq.com', pwd: '123456as789' }
  async userLogin () {
    const { loginFormData } = this
    if (!loginFormData.email || !loginFormData.pwd) return this.$notify.error({ title: '错误!', message: '请完整填写信息！' })
    const res = await userReg(loginFormData)
  }
}
</script>
