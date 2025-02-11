<script setup lang="ts">
import NavBar from '@/components/layout/NavBar/NavBar.vue'
import { onMounted } from 'vue'
import { Guid } from '@/utils/utils'
import { initAPlayer } from '@/views/musicBox/musicBox'

const id = Guid()
onMounted(async () => {
  await initAPlayer(id)
})
</script>
<template>
  <div>
    <!-- text-black bg-white -->
    <NavBar title="希尔瓦娜斯的音乐盒" />
    <div class="text-[#ffd100] px-2.5 text-center">希尔瓦娜斯的音乐盒</div>
    <div class="text-[#ddd] text-xs px-2.5 text-center">Tips:想听什么告诉我...</div>
    <div :id="id" data-theme="dark"></div>
  </div>
</template>

<style scoped lang="less"></style>
