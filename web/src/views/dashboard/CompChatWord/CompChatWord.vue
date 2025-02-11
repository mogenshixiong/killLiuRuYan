<script setup lang="ts">
import CompChatWordWork from './CompChatWordWork.vue'
import CompChatWordWow from './CompChatWordWow.vue'
import useStore from '@/stores/stores'

const store = useStore()
</script>

<template>
  <div class="w-full sm:w-[480px]">
    <CompChatWordWork v-if="store.userConfig.userConfig.theme === 'work'" />
    <CompChatWordWow v-else-if="store.userConfig.userConfig.theme === 'wow'" />
  </div>
</template>

<style scoped lang="less"></style>
