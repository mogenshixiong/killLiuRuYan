<script setup lang="ts">
import { api_updateUserLang } from '@/api/user/apiUser'
import { i18n, changeLanguage, type TypeLang } from '@/i18n'
import { closeToast, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import { ref } from 'vue'

const checked = ref<TypeLang>(i18n.getLocale() as TypeLang)
const onClickLanguage = async (lang: TypeLang) => {
  changeLanguage(lang)
  checked.value = lang
  showLoadingToast({
    message: '正在保存设置...',
    duration: 0,
    forbidClick: true
  })
  const [err, res] = await api_updateUserLang(lang)
  closeToast()
  if (err || !res) return
  if (res.code !== 0 || !res.data) {
    showFailToast('修改失败')
  }
  showSuccessToast('修改成功')
}
</script>

<template>
  <van-radio-group v-model="checked">
    <van-cell-group inset>
      <van-cell title="中文" clickable @click="onClickLanguage('zh')">
        <template #right-icon>
          <van-radio name="zh" />
        </template>
      </van-cell>
      <van-cell title="English" clickable @click="onClickLanguage('en')">
        <template #right-icon>
          <van-radio name="en" />
        </template>
      </van-cell>
    </van-cell-group>
  </van-radio-group>
</template>
