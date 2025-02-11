<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
// import { formatTime1 } from '@/utils/time'
import useStore from '@/stores/stores'
import CompProgress from '@/components/form/progress/CompProgress.vue'

const store = useStore()
const router = useRouter()
const toPage = () => {
  router.push('/chat')
}
const list = computed(() => store.chatMessage.messages.slice(0, 5))

const progress = computed(() => {
  let p = (store.chatMessage.countDown.current.total / store.chatMessage.countDownTime) * 100
  if (store.chatMessage.getMessageLoading) p = 100
  return p.toFixed(2) + '%'
})
</script>

<template>
  <div
    class="w-9/12 dashboard-view-item sm:w-[calc(480px/2)]"
    @click="toPage"
    style="position: relative"
  >
    <!-- <div class="mg-text-gold -mt-[2px]">世界频道</div> -->
    <div class="px-1 py-0.5">
      <div
        class="text-xs leading-[0.9rem] truncate text-[#e7aeab]"
        v-for="(item, index) in list"
        :key="index"
      >
        <!-- <span class="">[{{ formatTime1(item.sendTime) }}] </span> -->
        <span :class="`cc-${item.senderUserPlayerClass}`">{{ item.senderUserPlayerName }}</span
        >:
        {{ item.content }}
      </div>
    </div>
    <div class="relative -top-0.5">
      <CompProgress :progress="progress" />
    </div>
  </div>
</template>

<style scoped lang="less">
.dashboard-view-item {
  cursor: pointer;
  background: transparent;
  background-color: #15171e;
  // background-size: 100% auto;
  // background-position: 0px -45px;
  // background-repeat: no-repeat;
  // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  // border: 0.5px solid #148eff;
  // border: 1px solid #373737;
  // border-right: none;
  // border-left: none;
  // border-bottom: none;
  // border-top: none;
}
</style>
