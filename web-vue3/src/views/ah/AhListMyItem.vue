<script setup lang="ts">
import { type AhOrderItem } from '@/api/ah/apiAh'
import { computed, ref } from 'vue'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import CoinComp from '@/components/form/coin/CoinComp.vue'
import { getItemLevelColor } from '@/stores/userBagStore'
import { showFailToast, showSuccessToast } from 'vant'
import useStore from '@/stores/stores'
import { api_cancelSell } from '@/api/ah/apiAh'

interface Props {
  item: AhOrderItem
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['refresh'])

const color = computed(() => {
  return props.item && getItemLevelColor(props.item.itemLevel)
})

const loading = ref(false)
const store = useStore()
const cancelSell = async () => {
  loading.value = true
  const [err, res] = await api_cancelSell(props.item.id)
  loading.value = false
  if (err || !res) return
  if (res.code !== 0) {
    showFailToast(res.msg)
    return
  }
  showSuccessToast('下架成功')
  store.userBag.getUserBagItems()
  emit('refresh')
}
</script>

<template>
  <div class="p-1 border-[0.5px] border-[#ffd100] rounded-md my-1">
    <van-cell
      :title="`${item.itemName}*${item.orderCount}`"
      :border="false"
      style="
        --van-cell-background: transparnet;
        --van-cell-text-color: white;
        --van-cell-line-height: 18px;
        --van-cell-border-color: none;
        --van-cell-vertical-padding: 4px;
        --van-cell-horizontal-padding: 4px;
      "
    >
      <template #icon>
        <div
          class="relative overflow-hidden w-8 h-8 rounded-[4px] border border-solid z-[1] mr-1"
          :style="{
            'border-color': color
          }"
        >
          <van-image
            :src="`/wowResource/img/item/${item.itemId}.png`"
            class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
            :title="props.item.itemName"
          />
          <span class="absolute bottom-0 text-sm font-bold cursor-pointer right-px">
            {{ item.orderCount }}
          </span>
        </div>
      </template>
      <template #title>
        <div :style="{ color: color }">{{ item.itemName }}*{{ item.orderCount }}</div>
        <div class="text-xs">单价： <CoinComp :coin="item.unitPrice" /></div>
      </template>
      <template #right-icon>
        <PrimaryButton1
          @click="cancelSell"
          text="&nbsp;&nbsp;下架&nbsp;&nbsp;"
          class="translate-y-[0px] !h-8 w-[90px]"
        />
      </template>
    </van-cell>
  </div>
</template>

<style scoped lang="less"></style>
