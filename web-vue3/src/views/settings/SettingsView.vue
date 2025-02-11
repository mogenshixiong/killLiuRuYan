<script setup lang="ts">
import SettinsViewChangePassword from './SettinsViewChangePassword.vue'
import SettinsViewLogout from './SettinsViewLogout.vue'
// import SetFloatingBack from './SetFloatingBack.vue'
import SettingsSound from './SettingsSound.vue'
import SettingsBackgroundImg from './SettingsBackgroundImg.vue'
// import SetTheme from './SetTheme.vue'
import { useFullscreen } from '@vueuse/core'
import NavBar from '@/components/layout/NavBar/NavBar.vue'
import { t } from '@/i18n'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import { useRouter } from 'vue-router'
import { copyText } from '@/utils/utils'
import { showToast } from 'vant'

const router = useRouter()
const to = (path: string) => {
  router.push(path)
}
const { toggle } = useFullscreen()

const reloadPage = () => {
  window.location.href = '/'
}
const copyUrl = () => {
  const res = copyText(window.location.origin)
  showToast(res ? t('本站链接复制成功。') : t('本站链接复制失败'))
}
</script>
<template>
  <div>
    <NavBar :title="t('settings')" />
    <div class="h-11 px-2.5">
      <PrimaryButton1 text="刷新页面" @click="reloadPage" />
    </div>
    <div class="h-11 px-2.5">
      <PrimaryButton1
        text="全屏/取消全屏"
        @click="toggle"
        class="translate-x-[6px] translate-y-[0px]"
      />
    </div>
    <van-divider :style="{ color: '#ffd100', borderColor: '#ffd100', padding: '0 16px' }">
      设置
    </van-divider>
    <div class="px-4 mb-1 text-sm">Tips：配置仅保存在本地浏览器中。</div>
    <!-- <SetFloatingBack /> -->
    <SettingsBackgroundImg />
    <SettingsSound />
    <!-- <SetTheme /> -->
    <van-divider :style="{ color: '#ffd100', borderColor: '#ffd100', padding: '0 16px' }">
      账号
    </van-divider>
    <SettinsViewChangePassword />
    <SettinsViewLogout />
    <van-back-top bottom="80px" immediate />
    <van-divider :style="{ color: '#ffd100', borderColor: '#ffd100', padding: '0 16px' }">
      关于
    </van-divider>
    <div class="h-11 px-2.5">
      <PrimaryButton1
        text="宝箱概率公示"
        @click="to('chestProbability')"
        class="translate-x-[6px] translate-y-[0px]"
      />
    </div>
    <div class="h-11 px-2.5">
      <PrimaryButton1
        text="开发者日志"
        @click="to('notice')"
        class="translate-x-[6px] translate-y-[0px]"
      />
    </div>
    <div class="h-11 px-2.5">
      <PrimaryButton1
        text="关于本站"
        @click="to('about')"
        class="translate-x-[6px] translate-y-[0px]"
      />
    </div>
    <div class="h-11 px-2.5">
      <PrimaryButton1 text="分享" @click="copyUrl" class="translate-x-[6px] translate-y-[0px]" />
    </div>
  </div>
</template>

<style scoped>
.divider {
  color: #1989fa;
  border-color: #1989fa;
}
</style>
