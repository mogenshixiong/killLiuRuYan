<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { type AhOrderItem, api_buyItem } from '@/api/ah/apiAh'
import ItemInfo from '@/components/form/ItemInfo/ItemInfo.vue'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import { getBagItemInfo } from '@/api/user/apiUserBag'
import { showFailToast, showSuccessToast } from 'vant'
import { type TypeUserBagItem, getItemLevelColor } from '@/stores/userBagStore'
import useStore from '@/stores/stores'
import audio from '@/utils/audio'

const color = computed(() => {
  return itemInfo.value && getItemLevelColor(itemInfo.value.itemLevel)
})

const buyCount = ref(0)
const show = ref(false)
const itemInfo = ref<TypeUserBagItem>()
const loading = ref(false)
const orderItemInfo = ref<AhOrderItem>()
const openDialog = async (i: AhOrderItem) => {
  show.value = true
  orderItemInfo.value = i
  loading.value = true
  const [err, res] = await getBagItemInfo({
    itemId: i.itemId,
    itemType: i.itemType
  })
  loading.value = false
  if (err || !res) return
  if (res.code !== 0 || !res.data) {
    showFailToast(res.msg)
    return
  }
  itemInfo.value = res.data
}

const buyLoading = ref(false)
const store = useStore()
const attrs = useAttrs() as any
const onClickBy = async () => {
  if (buyLoading.value) return
  if (!orderItemInfo.value) return
  buyLoading.value = true
  const [err, res] = await api_buyItem({
    OrderId: orderItemInfo.value.id,
    BuyCount: buyCount.value
  })
  buyLoading.value = false
  if (err || !res) return
  if (res.code !== 0) {
    showFailToast({ message: res.msg, position: 'top' })
    return
  }
  showSuccessToast({ message: res.msg, position: 'top' })
  if (buyCount.value === orderItemInfo.value.orderCount) {
    show.value = false // 买完了关闭窗口
  }
  audio.play('gold')
  store.userBag.getUserBagItems()
  store.userPlayer.getUserPlayerInfo()
  attrs.onOnBuyCallback(orderItemInfo.value.id)
}
defineExpose({ openDialog }) // 当前组件对外暴露的方法
</script>

<template>
  <div>
    <van-dialog
      v-model:show="show"
      close-on-click-overlay
      style="
        --van-dialog-background: rgb(19, 20, 31);
        --van-text-color: #0070dd;
        --van-dialog-message-padding: 9px;
        --van-dialog-header-padding-top: 0px;
        --van-dialog-radius: 6px;
        --van-dialog-transition: 0.1s;
      "
      class="border-2 border-solid !top-[200px]"
      :style="{
        'border-color': color,
        'box-shadow': '1px 1px 15px ' + color + ' !important'
      }"
    >
      <template #title></template>
      <template #default>
        <div class="p-2.5" v-if="itemInfo">
          <van-row gutter="20">
            <van-col span="12">
              <ItemInfo :itemInfo="itemInfo" />
            </van-col>
            <van-col span="12">
              <div class="mb-2.5 text-sm">
                购买数量({{ buyCount }}/{{ orderItemInfo?.orderCount }})
              </div>
              <van-stepper
                v-model="buyCount"
                min="1"
                :max="orderItemInfo?.orderCount"
                integer
                input-width="50px"
                button-size="30px"
                class="block"
              />
              <div class="my-2.5 text-sm">
                总价：<CoinComp :coin="buyCount * (orderItemInfo?.unitPrice || 0)" />
              </div>
              <div>
                <PrimaryButton1
                  text="&nbsp;&nbsp;购买&nbsp;&nbsp;"
                  @click="onClickBy"
                  class="-translate-x-[6px] !h-8"
                />
              </div>
            </van-col>
          </van-row>
        </div>
      </template>
      <template #footer> </template>
    </van-dialog>
  </div>
</template>

<style scoped></style>
