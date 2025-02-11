<script setup lang="ts">
import { computed } from 'vue'
import useStore from '@/stores/stores'
import AhFormItem from './AhFormItem.vue'
import { ref } from 'vue'
import ItemInfo from '@/components/form/ItemInfo/ItemInfo.vue'
import { type TypeUserBagItem } from '@/stores/userBagStore'
// import { getItemLevelColor } from '@/stores/userBagStore'
import { api_addAhOrder, type addAhOrderVo } from '@/api/ah/apiAh'
import { showToast } from 'vant'
import audio from '@/utils/audio'

const store = useStore()
const form = ref<addAhOrderVo>({
  orderType: 'sell',
  orderCount: 0,
  itemId: '',
  itemType: undefined,
  unitPrice: 0
})
const list = computed(() => store.userBag.userBagItems.filter((i) => i.transaction))
const chooseItem = ref<TypeUserBagItem>()
// const color = computed(() => {
//   return chooseItem.value && getItemLevelColor(chooseItem.value.itemLevel)
// })

const onClickItem = (item: TypeUserBagItem) => {
  chooseItem.value = item
  form.value.itemId = item.itemId
  form.value.itemType = item.itemType
  // form.value.unitPrice = item.price || 1
  form.value.orderCount = item.itemCount
}

const onClick = async () => {
  if (!chooseItem.value) return
  if (!form.value.itemId || !form.value.itemType) {
    showToast('请选择商品')
    return
  }
  if (form.value.orderCount <= 0) {
    showToast('请输入或选择数量')
    return
  }
  if (form.value.unitPrice <= 0) {
    showToast('请设置单价')
    return
  }
  const [err, res] = await api_addAhOrder(form.value)
  if (err || !res) return
  showToast(res.msg)
  if (res.code !== 0) return

  audio.play('gold')
  store.userBag.getUserBagItems()
  if (form.value.orderType == 'purchase') {
    store.userPlayer.getUserPlayerInfo()
  }
}
</script>

<template>
  <div class="p-2.5">
    <van-sticky offset-top="45">
      <div
        class="bg-[#15171e] min-h-[200px] mb-2.5 border border-[#ffd100] rounded-lg p-1 text-center leading-10"
        v-if="!chooseItem"
      >
        请选择待售物品
      </div>
      <div class="min-h-[200px] mb-2.5 border border-[#ffd100] rounded-lg p-1 bg-[#15171e]" v-else>
        <van-row gutter="20">
          <van-col span="12">
            <div>待售物品</div>
            <ItemInfo :itemInfo="chooseItem" />
            <!-- <div :style="{ color: color }">
            </div> -->
          </van-col>
          <van-col span="12">
            <div class="mb-2.5 text-sm">出售数量</div>
            <van-stepper
              v-model="form.orderCount"
              min="0"
              :max="chooseItem.itemCount"
              integer
              input-width="80px"
              button-size="30px"
              class="block"
            />
            <div class="my-2 text-sm">出售单价(单位:铜)</div>
            <van-stepper
              v-model="form.unitPrice"
              min="0"
              integer
              :step="chooseItem.price || 1000"
              input-width="80px"
              button-size="30px"
              class="block"
            />
            <div class="py-1 text-sm">单价：<CoinComp :coin="form.unitPrice" /></div>
            <div>
              <PrimaryButton1
                v-if="chooseItem && form.itemId && form.itemId"
                text="&nbsp;&nbsp;上架&nbsp;&nbsp;"
                @click="onClick"
                class="!h-8 w-[100px] -translate-x-[6px]"
              />
            </div>
          </van-col>
        </van-row>
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
        @click="onClickItem(item)"
        style="--van-grid-item-content-padding: 0px"
      >
        <AhFormItem
          :item="item"
          :class="{
            '!border-2': chooseItem && chooseItem.itemId === item.itemId,
            '!border-[#ffd100]': chooseItem && chooseItem.itemId === item.itemId
          }"
        />
      </van-grid-item>
    </van-grid>
    <van-back-top bottom="80px" immediate />
  </div>
</template>
