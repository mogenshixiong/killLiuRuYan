<script setup lang="ts">
import { computed, ref } from 'vue'
import { type TypeUserBagItem, getItemLevelColor } from '@/stores/userBagStore'
import useStore from '@/stores/stores'
import CoinComp from '@/components/form/coin/CoinComp.vue'
import { showFailToast, showSuccessToast } from 'vant'
import { api_sellItem } from '@/api/user/apiUserBag'
import audio from '@/utils/audio'

const color = computed(() => {
  return itemInfo.value && getItemLevelColor(itemInfo.value.itemLevel)
})

const show = ref(false)
const itemInfoId = ref('')
const store = useStore()
const itemInfo = computed<TypeUserBagItem | undefined>(() => {
  return store.userBag.userBagItems.find((item) => item.itemId === itemInfoId.value)
})
const openDialog = (item: TypeUserBagItem) => {
  itemInfoId.value = item.itemId
  show.value = true
  sellCount.value = item.itemCount
}

const sellCount = ref(0)
const onClickSell = async () => {
  if (!itemInfo.value) return
  if (sellCount.value <= 0) {
    showFailToast('请输入出售数量')
    return
  }
  const [err, res] = await api_sellItem({
    id: itemInfo.value.id,
    itemId: itemInfo.value.itemId,
    sellCount: sellCount.value
  })
  if (err || !res) return false
  if (res.code !== 0) {
    showFailToast(res.msg)
    return
  }
  showSuccessToast(res.msg)
  const store = useStore()
  store.userPlayer.getUserPlayerInfo()
  store.userBag.getUserBagItems()
  show.value = false
  audio.play('gold')
}
defineExpose({ openDialog })
</script>

<template>
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
    class="border border-solid !top-[200px]"
    :style="{
      'border-color': '#ffd100',
      'box-shadow': '1px 1px 5px #ffd100 !important'
    }"
  >
    <template #title></template>
    <template #default>
      <div class="p-2" v-if="itemInfo && itemInfo.price">
        <div class="text-center">出售物品</div>
        <div class="text-[14px] mt-2">
          物品名称：<span :style="{ color: color }">{{ itemInfo.itemName }}</span>
        </div>
        <div class="text-[14px] mt-2">
          物品描述：<span class="text-[#1eff00]">{{ itemInfo.desc }}</span>
        </div>
        <van-stepper
          v-model="sellCount"
          min="0"
          :max="itemInfo.itemCount"
          integer
          input-width="100px"
          button-size="40px"
          class="block my-4"
        />
        <CoinComp class="block" :coin="itemInfo.price * sellCount" />
      </div>
    </template>
    <template #footer>
      <PrimaryButton1
        text="&nbsp;&nbsp;取消出售&nbsp;&nbsp;"
        @click="show = false"
        class="translate-y-[0px] !h-8 w-[130px] ml-2"
      />
      <PrimaryButton1
        text="&nbsp;&nbsp;确定售出&nbsp;&nbsp;"
        @click="onClickSell"
        class="translate-y-[0px] !h-8 w-[130px]"
      />
    </template>
  </van-dialog>
</template>

<style scoped lang="less"></style>
