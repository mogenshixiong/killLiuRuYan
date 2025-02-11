import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import LZString from 'lz-string'
// import { log } from '@/utils/utils'
import { produce } from 'immer'
import { isDev } from '@/utils/utils'

export type TUser = {
  id: number
  /** 角色名称 */ name: string
  /** 性别 */ sex: '男' | '女'
  /** 等级 */ level: number
  /** 经验值 */ experience: number
  /** 攻击 */ attack: number
  /** 防御 */ defense: number
  /** 生命值 */ health: number
  /** 金币 */ gold: number
  /** 上一次资源结算的时间(离线时间超过3个结算周期时，需要进行一次离线资源结算) */ f_lastAddResourceTime: number
  /** 结算频率 */ f_addResourceIntervalTime: number
  /** 当前工人总数 */ f_worker: number
  /** 当前食物等级 */ f_food_level: number
  /** 当前食物储量 */ f_food: number
  /** 当前食物投入工人 */ f_food_worker: number
  /** 当前木材等级 */ f_wood_level: number
  /** 当前木材储量 */ f_wood: number
  /** 当前木材投入工人 */ f_wood_worker: number
  /** 当前陨铁等级 */ f_metal_level: number
  /** 当前陨铁储量 */ f_metal: number
  /** 当前陨铁投入工人 */ f_metal_worker: number
}
type TUsersStoreState = {
  user: TUser
  updateUser: (newData: Partial<TUser>) => void // 更新当前用户的方法
}

// 定义状态和操作
const useUsersStore = create(
  persist<TUsersStoreState>(
    (set) => ({
      user: {
        name: '无名',
        sex: '男',
        level: 1,
        experience: 0,
        attack: 1,
        defense: 1,
        health: 10,
        gold: 0,
        f_lastAddResourceTime: new Date().getTime(),
        f_addResourceIntervalTime: 10 * 1000,
        f_worker: 1,
        f_food_worker: 0,
        f_wood_worker: 0,
        f_metal_worker: 0,
        f_food_level: 1,
        f_wood_level: 1,
        f_metal_level: 1,
        f_metal: 1000,
        f_wood: 1000,
        f_food: 1000
      } as TUser,
      updateUser: (newData: Partial<TUser>) => {
        set(
          produce((state: TUsersStoreState) => {
            state.user = { ...state.user, ...newData }
          })
        )
      }
    }),
    {
      name: 'mogenshixiong-users', // 存储的名称，用于在 localStorage 中标识存储
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const compressedData = localStorage.getItem(key)
          if (isDev) return compressedData

          if (!compressedData) return null
          const decompressedData = LZString.decompress(compressedData)
          // log('decompressedData', JSON.parse(decompressedData))
          return JSON.parse(decompressedData)
        },
        setItem: (key, value) => {
          const compressedData = LZString.compress(JSON.stringify(value))
          // log('compressedData', value)
          if (isDev) {
            localStorage.setItem(key, value)
          } else {
            localStorage.setItem(key, compressedData)
          }
        },
        removeItem: (key) => localStorage.removeItem(key)
      }))
    }
  )
)

export default useUsersStore
