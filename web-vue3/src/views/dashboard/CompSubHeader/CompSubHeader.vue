<script setup lang="ts">
import CompSubHeaderWork from './CompSubHeaderWork.vue'
import CompSubHeaderWow from './CompSubHeaderWow.vue'
import useStore from '@/stores/stores'

const store = useStore()
</script>

<template>
  <div>
    <CompSubHeaderWork v-if="store.userConfig.userConfig.theme === 'work'" />
    <CompSubHeaderWow v-else-if="store.userConfig.userConfig.theme === 'wow'" />
  </div>
</template>

<style scoped lang="less"></style>
