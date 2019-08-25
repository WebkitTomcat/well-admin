import { userLogin } from '@/api'
import { UserLoginInfo } from '@/utils/storageManager'

const actions = {
  /**
   * @param  email 用户邮箱
   * @param  pwd   用户密码
   */
  setUserLoginStatus (context: RootActionContext, loginFormData: { email: string, pwd: string }) {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        const res = await userLogin(loginFormData)
        if (res.data && res.data.c === 0) {
          const userInfo = res.data.d
          context.commit('SET_USER_INFO', userInfo)
          UserLoginInfo.set(userInfo)
          return resolve(true)
        }
        resolve(false)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default actions
