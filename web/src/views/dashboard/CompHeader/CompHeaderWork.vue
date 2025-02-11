<script setup lang="ts">
import useStore from '@/stores/stores'

const store = useStore()
</script>

<template>
  <div class="rounded-sm px-2.5 pb-1.5 border border-solid border-gray-500 mx-px">
    <div class="inline-block mr-1">nickName:[{{ store.userPlayer.userPlayerInfo?.nickName }}]</div>
    <div class="inline-block mr-1">class:[{{ store.userPlayer.userPlayerInfo?.class }}]</div>
    <div class="inline-block mr-1">
      stateLevel:[{{ store.userPlayer.userPlayerInfo?.stateLevel }}]
    </div>
    <div class="inline-block mr-1">gold:[{{ store.userPlayer.userPlayerInfo?.gold }}]</div>
    <div class="inline-block mr-1">power:[{{ store.userAttribute.userPower }}]</div>
  </div>
  <div class="rounded-sm mt-1 border border-gray-500 border-solid px-2.5 py-1.5 mx-px">
    <div class="inline-block mr-1">hp:[{{ store.userAttribute.userAttribute?.hp }}]</div>
    <div class="inline-block mr-1">ap:[{{ store.userAttribute.userAttribute?.ap }}]</div>
    <div class="inline-block mr-1">ac:[{{ store.userAttribute.userAttribute?.ac }}]</div>
    <div class="inline-block mr-1">sfk:[{{ store.userAttribute.userAttribute?.sfk }}]</div>
    <div class="inline-block mr-1">mdef:[{{ store.userAttribute.userAttribute?.mdef }}]</div>
  </div>
</template>

<style scoped lang="less"></style>
