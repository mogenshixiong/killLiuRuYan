<script setup lang="ts">
import BagListWork from './BagListWork.vue'
import BagListWow from './BagListWow.vue'
import useStore from '@/stores/stores'

const store = useStore()
</script>

<template>
  <div>
    <BagListWork v-if="store.userConfig.userConfig.theme === 'work'" />
    <BagListWow v-else-if="store.userConfig.userConfig.theme === 'wow'" />
  </div>
</template>

<style scoped lang="less"></style>
