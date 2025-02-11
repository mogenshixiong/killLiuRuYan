<script setup lang="ts">
import MusicBoxWork from './MusicBoxWork.vue'
import MusicBoxWow from './MusicBoxWow.vue'
import useStore from '@/stores/stores'

const store = useStore()
</script>

<template>
  <div>
    <MusicBoxWork v-if="store.userConfig.userConfig.theme === 'work'" />
    <MusicBoxWow v-else-if="store.userConfig.userConfig.theme === 'wow'" />
  </div>
</template>

<style scoped lang="less"></style>
