import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { showToast } from 'vant'
import { api_getMessages, api_sendMessage } from '@/api/message/apiMessage'
import { getBeforeDateTime, getBeforeDateTime2, getCurrentDateTime } from '@/utils/time'
import { usePageVisibility, useCountDown } from '@vant/use'
import { useUserStore } from '@/stores/userStore'
import router from '@/router/router'

// import type { TypeMessageType } from '@/stores/messageStore'
/** 消息频道类型 */
export enum TypeMessageChannel {
  /** 系统消息 */
  system = 'system',
  /** 公会频道 */
  association = 'association',
  /** 队伍频道 */
  team = 'team',
  /** 私聊频道 */
  provate = 'provate',
  /** 世界频道 */
  word = 'word'
}
// import type { TypeMessage } from '@/stores/messageStore'
export interface TypeMessage {
  /** 消息ID */
  id: string
  /** 公会频道的公会ID */
  associationId?: string
  /** 队伍频道的队伍ID */
  teamId?: string
  /** 消息频道类型 */
  channelType: TypeMessageChannel
  /** 发送者 */
  senderId: string
  senderUserPlayerName: string
  senderUserPlayerClass: string
  sendTime: string
  content: string

  /** 接受者 */
  receiverId: string
  receiverUserPlayerName: string

  isDelete: boolean
  deleteTime: string
}

// import { useMessageStore } from '@/stores/messageStore'
export const useChatMessageStore = defineStore('chatMessage', () => {
  const maxMessage = 2000
  const startTime = ref(getBeforeDateTime(30))
  const messages = ref<TypeMessage[]>([])

  // TODO 缓存500条消息。
  const localMessages = localStorage.getItem('messages')
  if (localMessages) {
    try {
      messages.value = JSON.parse(localMessages)
      startTime.value = messages.value[messages.value.length - 1].sendTime
    } catch (_error) {
      console.log(localMessages)
    }
  }

  const user = useUserStore()
  const getMessageLoading = ref(false)
  const getMessages = async () => {
    if (isStop.value) return
    if (getMessageLoading.value) return // 防止重复请求
    if (user.isLogin === false) return false
    const endTime = getCurrentDateTime()
    getMessageLoading.value = true
    const [err, res] = await api_getMessages(
      getBeforeDateTime2(startTime.value, 3000),
      getBeforeDateTime2(endTime, -3000)
    )
    getMessageLoading.value = false

    // 重新进行倒计时，倒计时结束后再次获取消息
    countDown.reset()
    countDown.start()

    if (err || !res) return false
    if (res.code !== 0 || !res.data) {
      showToast(res.msg || '获取消息失败')
      return false
    }
    if (messages.value.length === 0) {
      messages.value = res.data.messageList
    } else {
      res.data.messageList.reverse().forEach((i) => {
        const isExt = messages.value.findIndex((j) => j.id === i.id) > -1
        if (!isExt) {
          messages.value.unshift(i)
        }
      })
    }
    if (messages.value.length > maxMessage) {
      // 最多保存maxMessage条消息
      messages.value = messages.value.slice(0, maxMessage)
    }
    startTime.value = endTime
    return true
  }

  const countDownTime = 5 * 1000
  const countDown = useCountDown({
    time: countDownTime,
    millisecond: true,
    onFinish: getMessages
  })

  const sendMessageLoading = ref(false)
  const sendMessage = async (content: string) => {
    sendMessageLoading.value = true
    const [err, res] = await api_sendMessage(content)
    sendMessageLoading.value = false
    if (err || !res) return false
    startGetMessage() // 发送成功后立即获取消息
    if (res.code !== 0) {
      showToast(res.msg || '获取消息失败')
      return false
    }
    return true
  }

  const pageVisibility = usePageVisibility() // 获取页面的可见状态
  watch(pageVisibility, (newValue) => {
    if (newValue === 'visible' && router.currentRoute.value.meta.startGetMessage) {
      startGetMessage()
    } else if (newValue === 'hidden') {
      stopGetMessage()
    }
  })

  const isStop = ref(false) // 是否停止获取消息
  /** 开始获取消息 */
  const startGetMessage = () => {
    isStop.value = false
    countDown.reset()
    getMessages()
  }
  /** 暂停获取消息 */
  const stopGetMessage = () => {
    isStop.value = true
    countDown.pause()
  }
  return {
    sendMessageLoading: sendMessageLoading,
    getMessageLoading: getMessageLoading,
    countDownTime: countDownTime,
    countDown: countDown,
    messages: messages,
    startGetMessage: startGetMessage,
    getMessages: getMessages,
    sendMessage: sendMessage,
    stopGetMessage: stopGetMessage
  }
})
