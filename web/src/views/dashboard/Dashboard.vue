<script lang="ts" setup>
import CompHeader from './CompHeader/CompHeader.vue'
import CompSubHeader from './CompSubHeader/CompSubHeader.vue'
import CompChatWord from './CompChatWord/CompChatWord.vue'
// import CompTabbar from './CompTabbar/CompTabbar.vue'
// import useStore from '@/stores/stores'

// const store = useStore()
</script>

<template>
  <div class="">
    <CompHeader />
    <CompSubHeader />
    <CompChatWord class="fixed left-0 sm:left-[unset] bottom-[--van-tabbar-height]" />
    <!-- <CompTabbar /> -->
  </div>
</template>

<style scoped lang="less"></style>
