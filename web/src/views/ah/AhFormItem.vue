<script setup lang="ts">
import { type TypeUserBagItem, getItemLevelColor } from '@/stores/userBagStore'

interface Props {
  item: TypeUserBagItem
}
const props = withDefaults(defineProps<Props>(), {})

const getItemCover = (item: TypeUserBagItem) => {
  return `/wowResource/img/item/${item.itemId}.png`
}
</script>

<template>
  <div
    class="relative overflow-hidden w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-md border border-solid z-[1]"
    :style="{
      'border-color': props.item && getItemLevelColor(props.item.itemLevel)
    }"
  >
    <van-image
      :src="getItemCover(props.item)"
      class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
      :title="props.item.itemName"
    />
    <span
      class="absolute bottom-0 cursor-pointer right-1.5 font-bold text-lg"
      :class="{
        '!text-sm': props.item.itemCount > 0,
        '!right-px': props.item.itemCount > 0
      }"
      >{{ props.item.itemCount }}</span
    >
  </div>
</template>
