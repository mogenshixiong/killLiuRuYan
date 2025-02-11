<script setup lang="ts">
import { t } from '@/i18n'
import NavBar from '@/components/layout/NavBar/NavBar.vue'
import { onMounted } from 'vue'
import { Guid } from '@/utils/utils'
import { initAPlayer } from '@/views/musicBox/musicBox'

const id = Guid()
onMounted(async () => {
  await initAPlayer(id)
})
</script>
<template>
  <div class="min-h-dvh">
    <NavBar :title="t('musicBox')" />
    <div :id="id"></div>
  </div>
</template>

<style scoped lang="less"></style>
