<script setup lang="ts">
import CompHeaderWork from './CompHeaderWork.vue'
import CompHeaderWow from './CompHeaderWow.vue'
import useStore from '@/stores/stores'

const store = useStore()
</script>

<template>
  <CompHeaderWork v-if="store.userConfig.userConfig.theme === 'work'" />
  <CompHeaderWow v-else-if="store.userConfig.userConfig.theme === 'wow'" />
</template>

<style scoped lang="less"></style>
