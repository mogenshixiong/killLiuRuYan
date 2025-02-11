<script setup lang="ts">
import { t } from '@/i18n'
import { ref } from 'vue'

const keywords = ref('')
const searchEngine = ref('bing')
const onClickBack = () => history.back()
const onClick = () => {
  if (searchEngine.value === 'translate') {
    window.open(
      `https://cn.bing.com/translator?ref=TThis&text=${keywords.value}&from=zh-Hans&to=en`
    )
  } else {
    window.open(`https://cn.bing.com/search?q=${keywords.value}`)
  }
}
</script>

<template>
  <div>
    <van-nav-bar :title="t('search')" left-arrow @click-left="onClickBack" />
    <div style="width: calc(100% - 30px * 2); margin: 20px 30px 10px 30px">
      <van-field
        v-model="keywords"
        style="border: 1px solid #ddd; margin-bottom: 30px"
        :autofocus="false"
        placeholder="input keywords"
      />
      <van-radio-group v-model="searchEngine" direction="horizontal">
        <van-radio name="baidu" disabled>baidu</van-radio>
        <van-radio name="bing">bing</van-radio>
        <van-radio name="translate">translate</van-radio>
      </van-radio-group>
      <van-button plain type="primary" @click="onClick" style="width: 100%; margin-top: 30px">
        {{ t('search') }}
      </van-button>
    </div>
  </div>
</template>

<style scoped></style>
