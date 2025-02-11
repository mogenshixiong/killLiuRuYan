<script setup lang="ts">
import { onActivated, ref } from 'vue'
import { api_getOnlineUserPlayerList, type GetOnlineUserPlayerVO } from '@/api/user/apiUserPlayer'
import { getUserClassName } from '@/stores/userPlayerStore'
import { closeToast, showFailToast, showLoadingToast } from 'vant'
import { formatLastLoginTime } from '@/utils/format'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'

const list = ref<GetOnlineUserPlayerVO[]>([])
const total = ref(0)
const loading = ref(false)
const getList = async () => {
  if (loading.value) return
  loading.value = true
  showLoadingToast({
    message: '加载中...'
  })
  const [err, res] = await api_getOnlineUserPlayerList({ nickName: '' })
  loading.value = false
  setTimeout(() => {
    closeToast()
  }, 500)
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
  getList()
})
</script>

<template>
  <div class="py-2.5 px-1">
    <div class="text-[#ffd100] px-2.5 text-center mb-1">
      玩家列表({{ list.filter((i) => formatLastLoginTime(i.lastloginTime) === '在线').length }}/{{
        total
      }})
    </div>
    <div class="">
      <PrimaryButton1
        :text="`&nbsp;&nbsp;刷新&nbsp;&nbsp;`"
        @click="getList"
        class="translate-y-[0px] !h-8 !w-[120px] left-[50%] translate-x-[-50%]"
      />
    </div>

    <div class="px-1">
      <van-row
        v-for="(item, index) in list"
        :key="index"
        :class="`cc-${item.class}`"
        class="mb-2 text-xs border-b-[0.5px] border-b-[#EFEFEF] pb-2"
      >
        <van-col span="6" class="truncate">{{ item.nickName }}</van-col>
        <van-col span="6" class="text-center truncate"
          >{{ item.stateLevel }}级{{ getUserClassName(item.class) }}</van-col
        >
        <van-col span="6" class="text-center truncate">{{ item.stageName }}</van-col>
        <van-col span="6" class="text-right truncate">{{
          formatLastLoginTime(item.lastloginTime)
        }}</van-col>
      </van-row>
    </div>
  </div>
</template>
