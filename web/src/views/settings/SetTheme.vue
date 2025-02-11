<script setup lang="ts">
import { t } from '@/i18n'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import useStore from '@/stores/stores'

const store = useStore()
const onClick = (theme: 'work' | 'wow') => {
  store.userConfig.changeTheme(theme)
}
</script>

<template>
  <div class="h-11 px-2.5">
    <PrimaryButton1
      class="translate-x-[4px] translate-y-[0px]"
      :text="t('SetThemeToWork')"
      @click="onClick('work')"
    />
  </div>
  <div class="h-11 px-2.5">
    <PrimaryButton1
      class="translate-x-[9px] translate-y-[0px]"
      :text="t('SetThemeToWow')"
      @click="onClick('wow')"
    />
  </div>
</template>
