<script setup lang="ts">
import { onActivated, ref } from 'vue'
import { api_getOnlineUserPlayerList, type GetOnlineUserPlayerVO } from '@/api/user/apiUserPlayer'
import { showFailToast } from 'vant'
import { formatLastLoginTime } from '@/utils/format'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import { sleep } from '@/utils/utils'

const list = ref<GetOnlineUserPlayerVO[]>([])
const total = ref(0)
const loading = ref(false)
const getList = async () => {
  loading.value = true
  const [err, res] = await api_getOnlineUserPlayerList({ nickName: '' })
  loading.value = false
  if (err || !res) return
  if (res.code !== 0 || !res.data) {
    showFailToast(res.msg || '获取在线玩家列表失败')
    return
  }
  list.value = res.data.playerList || []
  total.value = res.data.total || 0
}
getList()

onActivated(() => {
  OnGetList()
})
const OnGetList = async () => {
  loading.value = true
  await sleep(1000)
  getList()
}
</script>

<template>
  <div class="p-2.5">
    <div class="px-3 pb-3">在线玩家查询(总玩家数量：{{ total }})</div>
    <PrimaryButton1 text="刷新" @click="OnGetList" />
    <div class="p-3">
      <div v-for="(item, index) in list" :key="index">
        <span>{{ item.nickName }}</span>
        <span>(最后访问时间：{{ formatLastLoginTime(item.lastloginTime) }})</span>
      </div>
    </div>
  </div>
</template>
