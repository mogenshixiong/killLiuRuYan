<script setup lang="ts">
import ChestProbabilityWork from './ChestProbabilityWork.vue'
import ChestProbabilityWow from './ChestProbabilityWow.vue'
import useStore from '@/stores/stores'

const store = useStore()
</script>

<template>
  <div>
    <ChestProbabilityWork v-if="store.userConfig.userConfig.theme === 'work'" />
    <ChestProbabilityWow v-else-if="store.userConfig.userConfig.theme === 'wow'" />
  </div>
</template>

<style scoped lang="less"></style>
