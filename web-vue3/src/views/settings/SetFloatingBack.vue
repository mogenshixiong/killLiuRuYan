<script setup lang="ts">
import { t } from '@/i18n'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import useStore from '@/stores/stores'

const store = useStore()
const onClick = () => {
  store.userConfig.changeFloatingBack()
}
</script>

<template>
  <div class="h-11 px-2.5">
    <PrimaryButton1
      class="translate-x-[19px] translate-y-[0px]"
      :text="t('SetFloatingBack')"
      @click="onClick"
    />
  </div>
</template>
