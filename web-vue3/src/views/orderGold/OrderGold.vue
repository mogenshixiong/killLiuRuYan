<script setup lang="ts">
import { onActivated, ref } from 'vue'
import {
  api_getUserPlayerListByOrderGold,
  type GetUserPlayerListByOrderGoldVO
} from '@/api/user/apiUserPlayer'
import { showFailToast } from 'vant'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import { sleep } from '@/utils/utils'
import CoinComp from '@/components/form/coin/CoinComp.vue'

const list = ref<GetUserPlayerListByOrderGoldVO[]>([])
const loading = ref(false)
const getOrderLevelList = async () => {
  loading.value = true
  const [err, res] = await api_getUserPlayerListByOrderGold()
  loading.value = false
  if (err || !res) return
  if (res.code !== 0 || !res.data) {
    showFailToast(res.msg || '获取金币排行榜失败')
    return
  }
  list.value = res.data
}
getOrderLevelList()
onActivated(() => {
  handleOnOrderLevelList()
})
const handleOnOrderLevelList = async () => {
  loading.value = true
  await sleep(1000)
  getOrderLevelList()
}
</script>

<template>
  <div class="p-2.5">
    <div>【金币排行榜】</div>
    <PrimaryButton1 text="刷新" @click="handleOnOrderLevelList" />
    <div class="p-3">
      <div v-for="(item, index) in list" :key="index">
        <span>第{{ index + 1 }}名：{{ item.nickName }}</span>
        <span> (<CoinComp :coin="item.gold || 0" />)</span>
      </div>
    </div>
  </div>
</template>
