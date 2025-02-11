import { ref } from 'vue'
import { defineStore } from 'pinia'
import { showNotify } from 'vant'
import { type ItemLevel } from '@/stores/userBagStore'
import { api_getUserRide } from '@/api/user/apiUserRide'

// import  { type TypeUserRideItem } from '@/stores/userRideStore'
export interface TypeUserRideItem {
  // 坐骑ID
  rideId: string
  /** 坐骑名称 */
  rideName: string
  /** 物品等级：粗糙1 普通2、优秀3、精良4、史诗5、传说6 神器7  */
  itemLevel: ItemLevel
  /** 物品介绍 */
  desc: string
}

// import { useUserRideStore } from '@/stores/userRideStore'
export const useUserRideStore = defineStore('userRide', () => {
  const userRides = ref<TypeUserRideItem[]>([])

  async function getUserRides() {
    const [err, res] = await api_getUserRide()
    if (err || !res) return
    if (res.code !== 0) {
      showNotify(res.msg)
      return
    }
    userRides.value = res.data || []
  }

  return {
    userRides: userRides,
    getUserRides: getUserRides
  }
})
