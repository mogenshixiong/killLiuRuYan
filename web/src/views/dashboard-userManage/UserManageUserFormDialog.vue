<script setup lang="ts">
import { ref } from 'vue'

type DialogType = 'add' | 'edit'

const show = ref(false)
const dialogType = ref<DialogType>('add')
const openDialog = (type: DialogType) => {
  dialogType.value = type
  show.value = true
}

const tel = ref('')
const text = ref('')
const password = ref('')

const onSubmit = (values: any) => {
  console.log('submit', values)
}
// 校验函数返回 true 表示校验通过，false 表示不通过
const validator = (val: any) => /1\d{10}/.test(val)

const onFailed = (errorInfo: any) => {
  console.log('failed', errorInfo)
}
defineExpose({ openDialog }) // 当前组件对外暴露的方法
</script>

<template>
  <van-dialog v-model:show="show" :title="`${dialogType} user`" show-cancel-button transition="">
    <van-form @submit="onSubmit" @failed="onFailed">
      <van-cell-group inset>
        <!-- 输入任意文本 -->
        <van-field
          v-model="text"
          autofocus
          colon
          show-word-limit
          clearable
          label-width="50px"
          maxlength="10"
          label="文本"
          placeholder="。。。"
          :rules="[{ required: true, message: 'please input username' }]"
        />
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field
          v-model="tel"
          :rules="[{ validator, message: '请输入正确内容' }]"
          maxlength="10"
          type="tel"
          label="手机号"
        />
        <!-- 输入密码 -->
        <van-field v-model="password" maxlength="10" type="password" label="密码" />
      </van-cell-group>
    </van-form>
  </van-dialog>
</template>

<style scoped></style>
