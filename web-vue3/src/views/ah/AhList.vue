<script setup lang="ts">
import { showToast } from 'vant'
import { ref } from 'vue'
import { type GetAhOrderListDto, type AhOrderItem, api_getAhOrderListByPage } from '@/api/ah/apiAh'
import AhListItem from './AhListItem.vue'
import { api_getOrderInfoById } from '@/api/ah/apiAh'
import CoinComp from '@/components/form/coin/CoinComp.vue'
import useStore from '@/stores/stores'

const store = useStore()
const orderList = ref<AhOrderItem[]>([])
const total = ref(0)
const query = ref<GetAhOrderListDto>({
  itemName: '',
  pageNum: 1,
  pageSize: 10
})
const loading = ref(false) // 是否处于加载状态，加载过程中不触发 load 事件
const finished = ref(false) // 是否已加载完成，加载完成后不再触发 load 事件
const refreshing = ref(false) // 是否执行了下拉刷新动作

const onRefresh = () => {
  // 下拉刷新时 refreshing.value === true
  query.value.pageNum = 1
  finished.value = false
  loading.value = true
  orderList.value = []
  total.value = 0
  refreshing.value = false
  onLoad()
}

// 滚动条与底部距离小于 offset 时触发
const onLoad = async () => {
  const [err, res] = await api_getAhOrderListByPage(query.value)
  loading.value = false
  if (err || !res) {
    finished.value = true
    return
  }
  if (res.code !== 0 || !res.data) {
    showToast(res.msg || '请求失败' + res.code)
    finished.value = true
    return
  }
  query.value.pageNum++
  orderList.value = [...orderList.value, ...res.data.orderList]
  total.value = res.data.total

  if (orderList.value.length >= total.value) {
    finished.value = true // no more data
  }
}

const onBuyCallback = async (orderId: number) => {
  // 更新当前商品数量
  loading.value = true
  const [err, res] = await api_getOrderInfoById(orderId)
  loading.value = false
  if (err || !res) return
  if (res.code !== 0 || !res.data) return
  const curOrder = orderList.value.findIndex((i) => i.id === orderId)
  if (curOrder == -1) return
  orderList.value[curOrder].orderCount = res.data.orderCount
}
</script>
<template>
  <div class="px-2.5">
    <van-sticky offset-top="44">
      <div class="bg-[#15171e] text-center">
        <div class="inline-block leading-7 h-7">总计:{{ total }}件</div>
        <div class="inline-block ml-2">
          <PrimaryButton1
            text="&nbsp;&nbsp;刷新&nbsp;&nbsp;"
            @click="onRefresh"
            class="!h-7 w-[90px] translate-y-[3px]"
          />
        </div>
        <div class="inline-block ml-2">
          <CoinComp
            v-if="store.userPlayer.userPlayerInfo"
            :coin="store.userPlayer.userPlayerInfo.gold"
          />
        </div>
      </div>
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="300"
      >
        <AhListItem
          v-for="item in orderList"
          :key="item.id"
          :item="item"
          @onBuyCallback="onBuyCallback"
        />
      </van-list>

      <van-back-top bottom="80px" immediate />
    </van-pull-refresh>
  </div>
</template>

<style scoped></style>
