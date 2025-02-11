<script setup lang="ts">
import NavBar from '@/components/layout/NavBar/NavBar.vue'
import { t } from '@/i18n'
</script>

<template>
  <div>
    <NavBar :title="t('gallery')" />
    <van-tabs swipeable>
      <van-tab v-for="item in ['npc', 'chest', 'race', 'monster']" :title="item" :key="item">
        <div class="h-[calc(100vh-var(--van-tabs-line-height)-var(--van-nav-bar-height))]">
          内容 {{ item }}
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="less"></style>
