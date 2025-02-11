<script setup lang="ts">
import { useRouter } from 'vue-router'
import { back } from '@/utils/utils'

interface Props {
  title: string
}
const props = withDefaults(defineProps<Props>(), {})
const router = useRouter()

const onClickBack = () => back(router)

const reload = () => {
  window.location.reload()
}
</script>
<template>
  <van-nav-bar
    v-if="false"
    style="
      --van-border-width: 0px;
      --van-nav-bar-title-text-color: #ffd100;
      --van-nav-bar-icon-color: #ffd100;
      --van-nav-bar-background: auto;
    "
    :title="props.title"
    left-arrow
    @click-left="onClickBack"
  >
    <template #left>
      <!-- <van-icon name="wap-home-o" color="#ffd100" size="22" /> -->
    </template>
    <template #right>
      <van-icon name="replay" color="#ffd100" size="22" class="rotate-45" @click="reload" />
    </template>
  </van-nav-bar>
  <div v-else class="h-1"></div>
</template>

<style scoped lang="less"></style>
