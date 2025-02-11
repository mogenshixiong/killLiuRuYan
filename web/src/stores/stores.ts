import { useChatMessageStore } from './chatMessageStore'
import { useUserAttributeStore } from './userAttributeStore'
import { useUserArmorStore } from './userArmorStore'
import { useUserBagStore } from './userBagStore'
import { useUserRideStore } from './userRideStore'
import { useUserConfigStore } from './userConfigStore'
import { useUserPlayerStore } from './userPlayerStore'
import { useUserStore } from './userStore'
import { showNotify, closeNotify } from 'vant'
import { ref } from 'vue'

/**
写在外面，加载完就不会再调用了，是一次性的
const counter = useCounterStore();
const user = useUserStore();
通过属性调用，每次都保证拿到最新的 store
<script setup>
import { toRefs } from 'vue';
import useStore from '@/stores/stores'
const { chatMessage } = useStore()
const { double } = toRefs(chatMessage)

或者
import useStore from '@/stores/stores'

const store = useStore()
store.chatMessage
</script>
 */
const appLoading = ref(false)
const useStore = () => {
  const chatMessage = useChatMessageStore()
  const userAttribute = useUserAttributeStore()
  const userArmor = useUserArmorStore()
  const userBag = useUserBagStore()
  const userConfig = useUserConfigStore()
  const userPlayer = useUserPlayerStore()
  const userRide = useUserRideStore()
  const user = useUserStore()

  const store = {
    chatMessage,
    userAttribute,
    userBag,
    userArmor: userArmor,
    userConfig: userConfig,
    userPlayer: userPlayer,
    userRide: userRide,
    user,
    appLoading: appLoading,
    init: async () => {
      appLoading.value = true
      const timer = setTimeout(() => {
        showNotify({ message: '玩命加载中...', duration: 0 })
      }, 500)
      await user.getUserInfo()
      if (user.isLogin === false) {
        setTimeout(() => {
          clearTimeout(timer)
          closeNotify()
        }, 500)
        appLoading.value = false
        return
      }
      try {
        await userPlayer.getUserPlayerInfo()
        await userAttribute.getUserAttribute()
        await userArmor.getUserArmor()
        await userBag.getUserBagItems()
        await userRide.getUserRides()
        userConfig.setThemeBackground()
        clearTimeout(timer)
        closeNotify()
        appLoading.value = false
      } catch (_error) {
        clearTimeout(timer)
        closeNotify()
        appLoading.value = false
      }
    }
  }
  return store
}
export default useStore
