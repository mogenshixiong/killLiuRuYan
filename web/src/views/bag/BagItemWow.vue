<script setup lang="ts">
import { type TypeUserBagItem, getItemLevelColor } from '@/stores/userBagStore'
import BagItemInfoDialogWow from '@/views/bag/BagItemInfoDialogWow.vue'
import useStore from '@/stores/stores'
import { ref } from 'vue'

interface Props {
  item: TypeUserBagItem
}
const store = useStore()
const props = withDefaults(defineProps<Props>(), {})

const BagItemInfoDialogWowRef = ref()

const getItemCover = (item: TypeUserBagItem) => {
  return `/wowResource/img/item/${item.itemId}.png`
}
</script>

<template>
  <div class="w-full h-full">
    <BagItemInfoDialogWow ref="BagItemInfoDialogWowRef" />
    <div
      class="relative overflow-hidden w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-md border border-solid z-[1]"
      @click="BagItemInfoDialogWowRef.openDialog(props.item)"
      :style="{
        'border-color': props.item && getItemLevelColor(props.item.itemLevel)
      }"
    >
      <van-image
        :src="getItemCover(props.item)"
        class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu h-full"
        :title="props.item.itemName"
        style="--van-image-placeholder-background: translate"
      />
      <span
        class="absolute bottom-0 cursor-pointer right-1.5 font-bold text-lg"
        :class="{
          '!text-sm': props.item.itemCount > 0,
          '!right-px': props.item.itemCount > 0
        }"
        >{{ props.item.itemCount }}
      </span>
      <span
        v-if="
          props.item.itemType === 'armor' &&
          props.item.requirement &&
          store.userArmor.userArmor &&
          props.item.requirement >
            (store.userArmor.userArmor.find((i) => i.armorType === props.item.armorType)
              ?.requirement || 0)
        "
        class="absolute top-1.5 cursor-pointer right-1.5 font-bold text-lg"
        ><svg
          t="1715203100431"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="14681"
          width="20"
          height="20"
        >
          <path
            d="M512 0L85.333333 512h256v512h341.333334V512h256z"
            fill="#13F444"
            p-id="14682"
          ></path>
        </svg>
      </span>
    </div>
  </div>
</template>
