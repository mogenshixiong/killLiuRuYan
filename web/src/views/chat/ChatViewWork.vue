<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@/i18n'
import NavBar from '@/components/layout/NavBar/NavBar.vue'
import useStore from '@/stores/stores'
import vWaves from '@/directive/waves/waves'
import vNoMoreClick from '@/directive/noMoreClick/noMoreClick'
import CompProgress from '@/components/form/progress/CompProgress.vue'

const store = useStore()
const sms = ref('')

const onSendMessage = async () => {
  const ok = await store.chatMessage.sendMessage(sms.value)
  if (ok) {
    sms.value = ''
  }
}
const progress = computed(() => {
  let p = (store.chatMessage.countDown.current.total / store.chatMessage.countDownTime) * 100
  if (store.chatMessage.getMessageLoading) p = 100
  return p.toFixed(2) + '%'
})
</script>
<template>
  <div class="relative min-h-dvh">
    <CompProgress :progress="progress" />
    <NavBar :title="t('chat')" />
    <van-cell-group inset class="!mt-2 border border-slate-200">
      <van-field
        v-model="sms"
        maxlength="200"
        autocomplete="off"
        clearable
        label=""
        class="!py-1 !px-2"
        placeholder="说点什么..."
      >
        <template #button>
          <van-button
            :loading="store.chatMessage.sendMessageLoading"
            loading-text="send"
            size="small"
            v-waves
            v-noMoreClick="1000"
            class="!w-20"
            type="primary"
            @click="onSendMessage"
            >send
          </van-button>
        </template>
      </van-field>
    </van-cell-group>

    <div v-for="(item, index) in store.chatMessage.messages" :key="index" style="padding: 5px 20px">
      <div class="text-xs text-slate-500">{{ item.sendTime }}&nbsp;&nbsp;</div>
      <span> {{ item.senderUserPlayerName }}： </span>
      <span class="break-all text-pretty">{{ item.content }}</span>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
