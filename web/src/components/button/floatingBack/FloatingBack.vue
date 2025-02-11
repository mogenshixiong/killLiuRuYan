<script setup lang="ts">
import { computed } from 'vue'
import router from '@/router/router'
import IconBack from '@/components/icons/IconBack.vue'
import useStore from '@/stores/stores'

const store = useStore()

const onClick = () => {
  history.back()
}
const offsetChange = (offset: { x: string; y: string }) => {
  store.userConfig.changeFloatingBackOffset(offset)
}
const show = computed(() => {
  return !!router.currentRoute.value.meta.floatingBack
  // if (
  //   store.userConfig.userConfig.floatingBack === false ||
  //   router.currentRoute.value.path === '/' ||
  //   router.currentRoute.value.path === '/dashboard' ||
  //   router.currentRoute.value.path === '/login'
  //   // router.currentRoute.value.meta.unlogin === true
  // ) {
  //   return false
  // }
  // return true
})
</script>

<template>
  <van-floating-bubble
    @click="onClick"
    @offset-change="offsetChange"
    style="--van-floating-bubble-background: auto"
    v-if="show"
    :offset="{
      x: store.userConfig.userConfig.floatingBackOffsetX,
      y: store.userConfig.userConfig.floatingBackOffsetY
    }"
    axis="xy"
    icon="chat"
  >
    <IconBack />
  </van-floating-bubble>
</template>
