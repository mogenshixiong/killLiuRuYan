import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  api_login,
  api_getUserInfoByToken,
  api_updateUserPassword,
  type loginReqVO
} from '@/api/user/apiUser'
// import LoginDialog from '@/components/dialog/login/index'
import { showToast } from 'vant'
import VueCookies from 'vue-cookies'
// import { changeLanguage } from '@/i18n'
// import router from '@/router/router'

// import type { TypeUserType } from '@/stores/userStore'

const Cookies: any = VueCookies
export enum TypeUserType {
  admin = 'admin',
  player = 'player'
}
// import type { TypeUser } from '@/stores/userStore'
export interface TypeUser {
  // id: string
  // email: string
  userType: TypeUserType
  username: string
  // updateTime: string
  /** 语言 */
  // lang: TypeLang
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<TypeUser | undefined>()
  const isLogin = computed<boolean>(() => !!userInfo.value?.username || false)

  async function login(form: loginReqVO): Promise<boolean> {
    const [err, res] = await api_login(form)
    if (err || !res) return false
    if (res.code !== 0) {
      showToast(res.msg || '登录失败')
      return false
    }
    localStorage.setItem('token', res.data)

    /** 因为微信浏览器的缓存策略会清理它认为过期的网站的所有数据，所以token放在localStorage里会被定期清理掉，所以把token在cookie里也放一份。 */
    Cookies.set('token', res.data, 0) // 永不过期
    // VueCookies.set('token', res.data, '7d') // 7天过期
    // await pageInit()
    // router.push('/')
    return true
  }
  async function getUserInfo() {
    let token = localStorage.getItem('token')
    if (!token) {
      token = Cookies.get('token')
    }
    if (!token) return
    const [err, res] = await api_getUserInfoByToken()
    if (err || !res) return
    if (res.code !== 0 || !res.data) return
    const user = {
      // id: res.data.id,
      username: res.data.username,
      // email: res.data.email,
      // nickName: res.data.nickName,
      userType: res.data.userType
      // updateTime: res.data.updateTime
      // lang: res.data.lang || 'zh'
    }
    userInfo.value = user
    // changeLanguage(userInfo.value.lang) // 设置默认语言
  }
  async function updateUserPassword(oldPassword: string, newPassword: string): Promise<boolean> {
    if (!userInfo.value) {
      await getUserInfo()
      return false
    }
    const [err, res] = await api_updateUserPassword({
      // userId: userInfo.value.id,
      oldPassword,
      newPassword
    })
    if (err || !res) return false
    if (res.code !== 0) {
      showToast(res.msg || '修改密码失败')
      return false
    }
    return true
  }

  // async function setNickname(nickName: string): Promise<boolean> {
  //   if (!userInfo.value) return false
  //   const [err, res] = await api_setUserNickname(nickName.trim())
  //   if (err || !res) return false
  //   if (res.code !== 0) {
  //     showToast(res.msg || '设置昵称失败')
  //     return false
  //   }
  //   showToast(res.msg || '设置昵称成功')
  //   userInfo.value.nickName = nickName
  //   return true
  // }
  function logout() {
    localStorage.removeItem('token')
    Cookies.set('token', '', 0)
    userInfo.value = undefined
  }

  return {
    userInfo: userInfo,
    isLogin: isLogin,
    login: login,
    getUserInfo: getUserInfo,
    logout: logout,
    updateUserPassword: updateUserPassword
  }
})
