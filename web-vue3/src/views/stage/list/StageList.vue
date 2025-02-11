<script setup lang="ts">
import StageListWork from './StageListWork.vue'
import StageListWow from './StageListWow.vue'
import useStore from '@/stores/stores'

const store = useStore()
</script>

<template>
  <div>
    <StageListWork v-if="store.userConfig.userConfig.theme === 'work'" />
    <StageListWow v-else-if="store.userConfig.userConfig.theme === 'wow'" />
  </div>
</template>

<style scoped lang="less"></style>
