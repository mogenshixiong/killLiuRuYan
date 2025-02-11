<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@/i18n'
import useStore from '@/stores/stores'
import vWaves from '@/directive/waves/waves'
import vNoMoreClick from '@/directive/noMoreClick/noMoreClick'
import CompProgress from '@/components/form/progress/CompProgress.vue'
import NavBar from '@/components/layout/NavBar/NavBar.vue'

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
  <div
    class="relative"
    style="background-color: #15171e; min-height: calc(100vh - --van-nav-bar-height)"
  >
    <CompProgress :progress="progress" />
    <NavBar :title="t('chat')" />
    <div class="text-[#ffd100] text-center mb-1">世界频道</div>
    <van-cell-group inset>
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
            style="--van-blue: #148eff"
            :loading="store.chatMessage.sendMessageLoading"
            loading-text="send"
            v-waves
            v-noMoreClick="1000"
            size="small"
            class="!w-20"
            type="primary"
            @click="onSendMessage"
            >发送
          </van-button>
        </template>
      </van-field>
    </van-cell-group>

    <div v-for="(item, index) in store.chatMessage.messages" :key="index" style="padding: 5px 20px">
      <div class="!text-xs text-slate-400">{{ item.sendTime }}&nbsp;&nbsp;</div>
      <span :class="`cc-${item.senderUserPlayerClass}`" class="text-sm">
        {{ item.senderUserPlayerName }}：
      </span>
      <span class="break-all text-pretty text-chat text-[#e7aeab] leading-5 text-sm">{{
        item.content
      }}</span>
    </div>
    <van-back-top bottom="80px" immediate />
  </div>
</template>

<style scoped lang="less"></style>
