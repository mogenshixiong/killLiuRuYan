<script setup lang="ts">
import { getItemLevelColor } from '@/stores/userBagStore'
import { type TypeUserRideItem } from '@/stores/userRideStore'

interface Props {
  item: TypeUserRideItem
}
const props = withDefaults(defineProps<Props>(), {})

const getItemCover = (item: TypeUserRideItem) => {
  return `/wowResource/img/item/${item.rideId}.png`
}
</script>

<template>
  <div
    class="overflow-hidden w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-md border border-solid z-[1]"
    :style="{
      'border-color': props.item && getItemLevelColor(props.item.itemLevel)
    }"
  >
    <van-image
      :src="getItemCover(props.item)"
      class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
      :title="props.item.rideName"
    />
  </div>
</template>
