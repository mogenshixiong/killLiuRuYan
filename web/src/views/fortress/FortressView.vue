<script lang="ts" setup>
import FortressViewWow from './FortressViewWow.vue'
import FortressViewWork from './FortressViewWork.vue'
import useStore from '@/stores/stores'

const store = useStore()
</script>

<template>
  <div>
    <FortressViewWork v-if="store.userConfig.userConfig.theme === 'work'" />
    <FortressViewWow v-else-if="store.userConfig.userConfig.theme === 'wow'" />
  </div>
</template>

<style scoped lang="less"></style>
