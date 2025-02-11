import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api_getUserArmor } from '@/api/user/apiUserArmor'
import { type TypeUserBagItem } from '@/stores/userBagStore'

// import  { type armorType, armorType,getArmorTypeName} from '@/stores/userArmorStore'
export const armorTypeConfig = [
  { value: 'helmet', name: '头部' },
  { value: 'neck', name: '颈部' },
  { value: 'shoulder', name: '肩膀' },
  { value: 'back', name: '披风' },
  { value: 'chest', name: '胸部' },
  { value: 'shirt', name: '衬衣' },
  { value: 'robe', name: '外袍' },
  { value: 'wrist', name: '手腕' },
  { value: 'mainHandWeapon', name: '主手武器' },
  { value: 'offHandWeapon', name: '副手武器' },
  { value: 'artifact', name: '圣物' },
  { value: 'hands', name: '手部' },
  { value: 'waist', name: '腰部' },
  { value: 'legs', name: '腿部' },
  { value: 'feet', name: '足部' },
  { value: 'finger1', name: '戒指1' },
  { value: 'finger2', name: '戒指2' },
  { value: 'trinket1', name: '饰品1' },
  { value: 'trinket2', name: '饰品2' }
] as const
export type armorType = (typeof armorTypeConfig)[number]['value']
export const getArmorTypeName = (val: armorType) => {
  return armorTypeConfig.find((i) => i.value === val)?.name || ''
}

// import  { type TypeUserArmor,useUserArmorStore } from '@/stores/userArmorStore'
export interface TypeUserArmor {
  /** 头部装备ID */ helmet: string
  /** 颈部装备ID */ neck: string
  /** 肩膀装备ID */ shoulder: string
  /** 披风装备ID */ back: string
  /** 胸部装备ID */ chest: string
  /** 衬衣装备ID */ shirt: string
  /** 外袍装备ID */ robe: string
  /** 手腕装备ID */ wrist: string
  /** 主手武器装备ID */ mainHandWeapon: string
  /** 副手武器装备ID */ offHandWeapon: string
  /** 圣物装备ID */ artifact: string
  /** 手部装备ID */ hands: string
  /** 腰部装备ID */ waist: string
  /** 腿部装备ID */ legs: string
  /** 足部装备ID */ feet: string
  /** 戒指1装备ID */ finger1: string
  /** 戒指2装备ID */ finger2: string
  /** 饰品1装备ID */ trinket1: string
  /** 饰品2装备ID */ trinket2: string
}

// import  { useUserArmorStore } from '@/stores/userArmorStore'
export const useUserArmorStore = defineStore('userArmor', () => {
  const userArmor = ref<TypeUserBagItem[]>([])

  async function getUserArmor() {
    const [err, res] = await api_getUserArmor()
    if (err || !res) return
    if (res.code !== 0) return
    userArmor.value = res.data || []
  }

  return {
    userArmor,
    getUserArmor
  }
})
