<script setup lang="ts">
import CompFortressWork from './CompFortressWork.vue'
import CompFortressWow from './CompFortressWow.vue'
import useStore from '@/stores/stores'

const store = useStore()
</script>

<template>
  <div style="display: none">
    <CompFortressWork v-if="store.userConfig.userConfig.theme === 'work'" />
    <CompFortressWow v-else-if="store.userConfig.userConfig.theme === 'wow'" />
  </div>
</template>

<style scoped lang="less"></style>
