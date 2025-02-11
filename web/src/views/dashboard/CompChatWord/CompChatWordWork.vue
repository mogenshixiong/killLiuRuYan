<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatTime1 } from '@/utils/time'
import useStore from '@/stores/stores'
import CompProgress from '@/components/form/progress/CompProgress.vue'

const store = useStore()
const router = useRouter()
const toPage = () => {
  router.push('/chat')
}

const progress = computed(() => {
  let p = (store.chatMessage.countDown.current.total / store.chatMessage.countDownTime) * 100
  if (store.chatMessage.getMessageLoading) p = 100
  return p.toFixed(2) + '%'
})
</script>

<template>
  <div
    @click="toPage"
    class="relative rounded-sm cursor-pointer mt-1 p-2.5 mx-px border border-solid border-gray-500"
  >
    <CompProgress :progress="progress" />
    <div
      v-for="(item, index) in store.chatMessage.messages.slice(0, 10)"
      :key="index"
      class="truncate"
    >
      <span>[{{ formatTime1(item.sendTime) }}] </span>
      <span>{{ item.senderUserPlayerName }}</span>
      <span>:{{ item.content }}</span>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
