<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const onOffsetChange = (_offset: number) => {
  // showToast(`x: ${offset.x.toFixed(0)}, y: ${offset.y.toFixed(0)}`)
}
</script>

<template>
  <van-floating-bubble
    axis="xy"
    icon="chat"
    v-if="show"
    magnetic="x"
    @offset-change="onOffsetChange"
  >
  </van-floating-bubble>
</template>
