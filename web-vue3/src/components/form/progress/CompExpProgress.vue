<script lang="ts" setup>
import useStore from '@/stores/stores'
import { computed } from 'vue'

const store = useStore()

const expProgress = computed(() => {
  if (store.userPlayer.userPlayerInfo) {
    if (
      store.userPlayer.userPlayerInfo.exp &&
      store.userPlayer.userPlayerInfo.levelUpRequirementExp
    ) {
      const p = (
        (store.userPlayer.userPlayerInfo.exp /
          store.userPlayer.userPlayerInfo.levelUpRequirementExp) *
        100
      ).toFixed(2)
      if (Number(p) >= 100) {
        return '100%'
      }
      return p + '%'
    }
  }
  return '0'
})
</script>

<template>
  <div class="h-0.5 relative bg-[#bbbbbb]">
    <div
      :style="{
        '--progress-width': expProgress
      }"
      class="h-0.5 absolute left-0 top-0 bg-[#a335ee] z-[calc(var(--van-nav-bar-z-index)+1)] w-[calc(var(--progress-width))]"
    ></div>
    <div
      class="h-0.5 absolute left-0 text-[10px] text-center -top-[6px] w-full z-[calc(var(--van-nav-bar-z-index)+2)] font-bold tracking-[1.5px]"
    >
      <!-- {{ store.userPlayer.userPlayerInfo?.exp }}/{{
        store.userPlayer.userPlayerInfo?.levelUpRequirementExp
      }} -->
    </div>
  </div>
</template>
