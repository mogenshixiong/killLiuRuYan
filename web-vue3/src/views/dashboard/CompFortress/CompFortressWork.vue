<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const toPage = () => {
  router.push('/fortress')
}
</script>

<template>
  <div
    @click="toPage"
    class="rounded-sm cursor-pointer mt-1 px-2.5 py-5 mx-px border border-solid border-gray-500"
  >
    fortress
  </div>
</template>

<style scoped lang="less"></style>
