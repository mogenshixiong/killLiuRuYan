<script setup lang="ts">
import NavBar from '@/components/layout/NavBar/NavBar.vue'
import { t } from '@/i18n'
import { computed } from 'vue'
import useStore from '@/stores/stores'
import BagItemWow from '@/views/bag/BagItemWow.vue'
import CoinComp from '@/components/form/coin/CoinComp.vue'

const store = useStore()
const list = computed(() => store.userBag.userBagItems)
</script>
<template>
  <div>
    <NavBar :title="t('bag')" />
    <van-sticky>
      <div v-if="store.userPlayer.userPlayerInfo" class="pl-1 mb-1 bg-black">
        <CoinComp :coin="store.userPlayer.userPlayerInfo.gold" />
      </div>
    </van-sticky>
    <van-grid
      :border="false"
      :gutter="0"
      :column-num="7"
      square
      style="--van-grid-item-content-padding: 0px; --van-grid-item-content-background: #15171e"
    >
      <van-grid-item
        v-for="item in list"
        :key="item.itemId"
        style="--van-grid-item-content-padding: 0px"
      >
        <BagItemWow :item="item" />
      </van-grid-item>
    </van-grid>
    <van-back-top bottom="80px" immediate />
  </div>
</template>

<style scoped lang="less"></style>
