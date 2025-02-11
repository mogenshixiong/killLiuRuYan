<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)

const openDialog = () => (show.value = true)
defineExpose({ openDialog }) // 当前组件对外暴露的方法
</script>

<template>
  <van-dialog v-model:show="show" title="login" show-cancel-button> 1 </van-dialog>
</template>

<style scoped></style>
