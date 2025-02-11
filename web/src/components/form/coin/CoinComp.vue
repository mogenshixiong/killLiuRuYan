<script lang="ts" setup>
import { computed } from 'vue'

// import CoinComp from '@/components/form/coin/CoinComp.vue'
interface Props {
  coin: number
}
const props = withDefaults(defineProps<Props>(), {})

const goldCoin = computed(() => {
  return Math.floor(props.coin / 10000)
})
const silverCoin = computed(() => {
  const s = props.coin - goldCoin.value * 10000
  return Math.floor(s / 100)
})
const copperCoin = computed(() => {
  return props.coin - goldCoin.value * 10000 - silverCoin.value * 100
})
</script>

<template>
  <span>
    <!-- <span class="goldCoin">{{ props.coin }} </span> -->
    <span class="goldCoin">{{ goldCoin }} </span>
    <span class="silverCoin">{{ silverCoin }} </span>
    <span class="copperCoin">{{ copperCoin }} </span>
  </span>
</template>

<style scoped>
.goldCoin {
  padding-right: 15px;
  background: url(@/assets/img/gold.gif) right center no-repeat;
}
.silverCoin {
  padding-right: 15px;
  padding-left: 3px;
  background: url(@/assets/img/silver.gif) right center no-repeat;
}
.copperCoin {
  padding-right: 15px;
  padding-left: 3px;
  background: url(@/assets/img/copper.gif) right center no-repeat;
}
</style>
