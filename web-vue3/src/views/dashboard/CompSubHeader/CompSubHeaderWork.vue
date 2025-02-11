<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const to = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="rounded-sm mt-1 p-2.5 mx-px border border-solid border-gray-500">
    <div
      v-for="item in [
        { path: '/bag', name: 'Bag' },
        { path: '/stage', name: 'stage' },
        { path: '/notice', name: 'Notice' },
        { path: '/gallery', name: 'Gallery' },
        { path: '/musicBox', name: 'musixBox' },
        { path: '/chestProbability', name: 'chestProbability' },
        { path: '/settings', name: 'Settings' }
      ]"
      :key="item.path"
      @click="to(item.path)"
      class="rounded-sm px-3.5 mb-1 py-2 inline-block mr-1 border border-gray-500 border-solid cursor-pointer"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped lang="less"></style>
