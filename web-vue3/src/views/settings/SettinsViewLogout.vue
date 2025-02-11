<script setup lang="ts">
import { t } from '@/i18n'
import { ref, onDeactivated } from 'vue'
import { showConfirmDialog } from 'vant'
import { useRouter } from 'vue-router'
import useStore from '@/stores/stores'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'

const store = useStore()

const show = ref(false)
onDeactivated(() => (show.value = false))

const router = useRouter()
const beforeClose = async (action: 'cancel' | 'confirm'): Promise<boolean> => {
  if (action === 'confirm') {
    store.user.logout()
    router.replace('/login')
    return true
  }
  return true
}
const onClick = () => {
  showConfirmDialog({
    title: 'are you sure?',
    // message: '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
    beforeClose
  })
    .then(() => {}) // on confirm
    .catch(() => {}) // on cancel
}
</script>

<template>
  <div class="h-11 px-2.5">
    <PrimaryButton1 :text="t('logout')" @click="onClick" class="translate-y-[0px]" />
  </div>
</template>
