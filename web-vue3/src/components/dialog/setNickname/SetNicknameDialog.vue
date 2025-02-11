<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const nickName = ref('')

const openDialog = () => (show.value = true)

// const user = useUserStore()
const onConfirm = async (_action: string) => {
  if (!nickName.value) {
    return false
  }
  return true
  // const res = await user.setNickname(nickName.value)
  // return res
}

defineExpose({ openDialog }) // 当前组件对外暴露的方法
</script>

<template>
  <van-dialog v-model:show="show" title="角色名称" :before-close="onConfirm">
    <van-field
      v-model="nickName"
      style="
        border: 1px solid #ddd;
        margin: 30px;
        width: calc(100% - 60px);
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 5px;
      "
      autofocus
      placeholder="..."
    />
  </van-dialog>
</template>

<style scoped></style>
