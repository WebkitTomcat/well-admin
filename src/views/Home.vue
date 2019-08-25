<template>
 <div class="home"> <input type="text" v-model="loginFormData.email" prefix-icon='well-icon-huiyuanhuaxiang'>
     <input type="text" v-model="loginFormData.pwd">
    <button @click="userLogin">登陆</button>
    <br/>
    <i class="el-icon-huiyuanhuaxiang" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { userLogin, userReg } from '@/api'
import { Getter, Action } from 'vuex-class'

@Component
export default class Home extends Vue {
  @Action('setUserLoginStatus') setUserLoginStatus!: (loginFormData: { email: string, pwd: string }) => any
  loginFormData = { email: '', pwd: '' }

  async userLogin () {
    const { loginFormData } = this
    if (!loginFormData.email || !loginFormData.pwd) {
      this.$notify.error({ title: '错误!', message: '请完整填写信息！' })
      return
    }
    this.setUserLoginStatus(loginFormData)
  }
}
</script>
