<script setup lang="ts">
import { t } from '@/i18n'
import { ref } from 'vue'

const onClickBack = () => history.back()
const active = ref(0)
</script>

<template>
  <div>
    <van-nav-bar :title="t('themeTitle')" left-arrow @click-left="onClickBack" />
    <div
      style="
        display: flex;
        min-height: calc(100vh - var(--van-nav-bar-height));
        background: var(--van-sidebar-background);
      "
    >
      <van-sidebar v-model="active" style="height: 100%">
        <van-sidebar-item :title="t('background')" />
        <van-sidebar-item title="wu pin" />
        <van-sidebar-item title="zhuang bei" />
        <van-sidebar-item title="za xiang" />
        <van-sidebar-item title="zhuan ye" />
        <van-sidebar-item title="tu biao " />
      </van-sidebar>
      <div style="flex: 1; background-color: white">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa' }">
          {{ t('dashboard') }}
        </van-divider>
      </div>
    </div>

    <van-back-top bottom="80px" immediate />
  </div>
</template>

<style scoped></style>
