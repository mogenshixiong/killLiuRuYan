<script setup lang="ts">
import { t } from '@/i18n'
import { ref, onDeactivated } from 'vue'
import { showToast, type FormInstance } from 'vant'
import useStore from '@/stores/stores'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'

const store = useStore()

const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const show = ref(false)
onDeactivated(() => (show.value = false))
const onClickLanguage = () => {
  form.value.oldPassword = ''
  form.value.newPassword = ''
  form.value.confirmPassword = ''
  show.value = true
}

const formRef = ref<FormInstance>()

const onConfirm = (action: string) => {
  if (action === 'cancel') return true
  formRef.value?.submit()
  return false
}
const onSubmit = async (values: any) => {
  console.log('submit', values)
  if (form.value.newPassword !== form.value.confirmPassword) {
    showToast(t('两次密码输入不一致'))
    show.value = true
    return
  }
  const res = await store.user.updateUserPassword(form.value.oldPassword, form.value.newPassword)
  showToast(t('密码修改成功'))
  show.value = !res
}
const onFailed = (_errorInfo: any) => (show.value = true)

const passwordType = ref(true)
</script>

<template>
  <div class="h-11 px-2.5">
    <PrimaryButton1
      :text="t('changePassword')"
      @click="onClickLanguage"
      class="translate-y-[0px]"
    />
    <van-dialog
      v-model:show="show"
      :before-close="onConfirm"
      :title="t('changePassword')"
      show-cancel-button
      transition=""
    >
      <van-form @submit="onSubmit" @failed="onFailed" ref="formRef" style="min-height: 220px">
        <van-cell-group inset>
          <van-field
            autofocus
            v-model.trim="form.oldPassword"
            name="oldPassword"
            maxlength="20"
            :type="passwordType ? 'password' : 'text'"
            :label="t('oldPassword')"
            :rules="[{ required: true, message: '请输入旧密码' }]"
            placeholder="请输入旧密码"
          >
            <template #right-icon>
              <span class="solts" @click="passwordType = !passwordType">
                <van-icon name="eye" v-if="passwordType" />
                <van-icon name="closed-eye" v-else />
              </span>
            </template>
          </van-field>
          <van-field
            v-model.trim="form.newPassword"
            name="newPassword"
            maxlength="20"
            :type="passwordType ? 'password' : 'text'"
            :label="t('newPassword')"
            :rules="[{ required: true, message: '请输入新密码' }]"
            placeholder="请输入新密码"
          >
            <template #right-icon>
              <span class="solts" @click="passwordType = !passwordType">
                <van-icon name="eye" v-if="passwordType" />
                <van-icon name="closed-eye" v-else />
              </span>
            </template>
          </van-field>
          <van-field
            v-model.trim="form.confirmPassword"
            maxlength="20"
            name="confirmPassword"
            :type="passwordType ? 'password' : 'text'"
            :label="t('confirmPassword')"
            placeholder="请输入确认密码"
            :rules="[{ required: true, message: '请输入确认密码' }]"
          >
            <template #right-icon>
              <span class="solts" @click="passwordType = !passwordType">
                <van-icon name="eye" v-if="passwordType" />
                <van-icon name="closed-eye" v-else />
              </span>
            </template>
          </van-field>
        </van-cell-group>
      </van-form>
    </van-dialog>
  </div>
</template>
