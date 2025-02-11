<script setup lang="ts">
import GalleryViewWork from './GalleryViewWork.vue'
import GalleryViewWow from './GalleryViewWow.vue'
import useStore from '@/stores/stores'

const store = useStore()
</script>

<template>
  <div>
    <GalleryViewWork v-if="store.userConfig.userConfig.theme === 'work'" />
    <GalleryViewWow v-else-if="store.userConfig.userConfig.theme === 'wow'" />
  </div>
</template>

<style scoped lang="less"></style>
