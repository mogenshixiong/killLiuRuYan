<script setup lang="ts">
import ChatViewWork from './ChatViewWork.vue'
import ChatViewWow from './ChatViewWow.vue'
import useStore from '@/stores/stores'

const store = useStore()
</script>

<template>
  <div>
    <ChatViewWork v-if="store.userConfig.userConfig.theme === 'work'" />
    <ChatViewWow v-else-if="store.userConfig.userConfig.theme === 'wow'" />
  </div>
</template>

<style scoped lang="less"></style>
