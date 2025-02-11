<script setup lang="ts">
import { showToast } from 'vant'
import { ref } from 'vue'
import { emailRE } from '@/utils/regexp'
import { api_registerByEmail } from '@/api/user/apiUser'
import { isDev, sleep } from '@/utils/utils'
import useStore from '@/stores/stores'
import AboutContent from '@/views/about/AboutContent.vue'
import vWaves from '@/directive/waves/waves'
import vNoMoreClick from '@/directive/noMoreClick/noMoreClick'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const username = ref(isDev ? '785017247@qq.com' : '')
const password = ref(isDev ? 'bb4b' : '')
const validationEmail = () => {
  if (!username.value.trim()) {
    showToast('请输入邮箱')
    return false
  }
  if (!emailRE.pattern.test(username.value)) {
    showToast('邮箱格式错误')
    return false
  }
  return true
}

const successTips = ref('')
const registerLoading = ref(false)
const onRegiste = async () => {
  if (registerLoading.value) return
  if (!validationEmail()) return
  registerLoading.value = true
  const [err, res] = await api_registerByEmail(username.value)
  setTimeout(() => {
    registerLoading.value = false
  }, 1000)
  if (err || !res) return
  if (res.code !== 0) {
    showToast(res.msg || '注册失败')
    return
  }
  successTips.value = res.msg || '注册成功，请前往邮箱查看默认密码。'
  showToast({
    message: successTips.value,
    duration: 5000
  })
}
const loginLoading = ref(false)

const onLogin = async () => {
  if (loginLoading.value) return
  if (!validationEmail()) return

  loginLoading.value = true
  const res = await store.user.login({
    username: username.value,
    password: password.value
  })
  if (res === false) {
    loginLoading.value = false
    showToast({ message: '登录失败', duration: 3000 })
    return
  }
  await store.init()
  await sleep(500)
  router.replace('/')
  await sleep(1000)
  loginLoading.value = false
}

const passwordType = ref(true)
</script>

<template>
  <div class="bg-white min-h-svh">
    <van-form class="pt-5">
      <van-cell-group inset class="border border-slate-200">
        <van-field
          v-model.trim="username"
          autofocus
          colon
          clearable
          maxlength="30"
          label="username"
          placeholder="请输入注册邮箱登录"
        />
        <van-field
          v-model.trim="password"
          :type="passwordType ? 'password' : 'text'"
          maxlength="30"
          label="password"
        >
          <template #right-icon>
            <span class="solts" @click="passwordType = !passwordType">
              <van-icon name="eye" v-if="passwordType" />
              <van-icon name="closed-eye" v-else />
            </span>
          </template>
        </van-field>
      </van-cell-group>
    </van-form>
    <div v-if="successTips" style="text-align: center; margin-top: 10px">
      {{ successTips }}
    </div>
    <div class="px-4 mt-5" style="display: flex">
      <van-button
        type="primary"
        block
        @click="onRegiste"
        loading-text="Loading..."
        v-waves
        v-noMoreClick="1000"
        :loading="registerLoading"
      >
        registe
      </van-button>
      <div class="w-8"></div>
      <van-button
        type="primary"
        block
        @click="onLogin"
        loading-text="Loading..."
        v-waves
        v-noMoreClick="1000"
        :loading="loginLoading"
      >
        login
      </van-button>
    </div>
    <AboutContent class="mt-3" />
  </div>
</template>

<style scoped></style>
