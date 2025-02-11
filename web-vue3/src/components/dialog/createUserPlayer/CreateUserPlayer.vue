<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { UserClassConfig, UserGenderConfig } from '@/stores/userPlayerStore'
import { showFailToast, showToast } from 'vant'
import type { createUserPlayerDto } from '@/api/user/apiUserPlayer'
import useStore from '@/stores/stores'
import { bus } from '@/utils/utils'
import { validateNickName } from '@/utils/utils'

onMounted(async () => {
  bus.on('onCreateUserPlayer_openDialog', () => {
    openDialog()
  })
})
onBeforeUnmount(() => {
  bus.off('onCreateUserPlayer_openDialog')
})
// 通过bus监听是否显示弹窗
const store = useStore()
const show = ref(false)
const form = ref<createUserPlayerDto>({
  nickName: '',
  gender: UserGenderConfig[0].value,
  class: UserClassConfig[0].value
})

// 使用方式1.手动调用
const openDialog = () => {
  show.value = true
}

const onConfirm = async () => {
  const validateRes = validateNickName(form.value.nickName)
  if (validateRes !== true) {
    showToast(validateRes)
    return
  }
  const [res, msg] = await store.userPlayer.createUserPlayer(form.value)
  if (res === true) {
    await store.init() // 重新初始化数据
    show.value = false
    showToast('创建成功')
  } else {
    showFailToast(msg)
  }
}

defineExpose({ openDialog }) // 当前组件对外暴露的方法
</script>

<template>
  <van-dialog v-model:show="show" title="创建角色" show-cancel-button>
    <div class="dialog-body">
      <van-field
        v-model="form.nickName"
        style="border: 1px solid #ddd; padding: 10px; border-radius: 5px"
        autofocus
        maxlength="8"
        autocomplete="off"
        placeholder="请输入角色名称..."
      />
      <van-radio-group v-model="form.gender" direction="horizontal" class="mt-2.5">
        <van-radio v-for="item in UserGenderConfig" :key="item.value" :name="item.value">
          {{ item.name }}
        </van-radio>
      </van-radio-group>
      <van-radio-group v-model="form.class" direction="horizontal" class="mt-2.5">
        <van-radio v-for="item in UserClassConfig" :key="item.value" :name="item.value">
          {{ item.name }}
        </van-radio>
      </van-radio-group>
    </div>
    <template #footer>
      <div style="text-align: center; padding-bottom: 15px">
        <button @click="onConfirm" style="width: 50%; height: 40px; color: black">确定</button>
      </div>
    </template>
  </van-dialog>
</template>

<style scoped lang="less">
.dialog-body {
  margin: 10px 30px 20px 30px;
  width: calc(100% - 60px);
}
</style>
