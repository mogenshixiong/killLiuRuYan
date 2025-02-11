import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { api_getUserAttribute } from '@/api/user/apiUserAttribute'

// import  { type attrType, attrTypeConfig,getAttrTypeName} from '@/stores/userAttributeStore'
export const attrTypeConfig = [
  { value: 'hp', name: '生命值' },
  { value: 'ac', name: '物理防御' },
  { value: 'ap', name: '物理伤害' },
  { value: 'mdef', name: '法术防御' },
  { value: 'sfk', name: '法术伤害' }
] as const
export type attrType = (typeof attrTypeConfig)[number]['value']
export const getAttrTypeName = (val: attrType) => {
  return attrTypeConfig.find((i) => i.value.toUpperCase() === val.toUpperCase())?.name || ''
}

// import  { type TypeUserPlayer,useUserAttributeStore } from '@/stores/userAttributeStore'
export interface TypeUserAttribute {
  /** 生命值 */ hp: number
  /** 物理防御 */ ac: number
  /** 物理伤害 */ ap: number
  /** 法术防御 */ mdef: number
  /** 法术伤害 */ sfk: number
}

// import  { useUserAttributeStore } from '@/stores/userAttributeStore'
export const useUserAttributeStore = defineStore('userAttribute', () => {
  const userAttribute = ref<TypeUserAttribute | undefined>()
  const userPower = computed(() => {
    if (userAttribute.value) {
      return (
        userAttribute.value.ac +
        userAttribute.value.sfk +
        userAttribute.value.mdef +
        userAttribute.value.hp +
        userAttribute.value.ap
      )
    } else {
      return 0
    }
  })

  async function getUserAttribute() {
    const [err, res] = await api_getUserAttribute()
    if (err || !res) return
    if (res.code !== 0 || !res.data) return
    userAttribute.value = res.data
  }

  return {
    userPower,
    userAttribute,
    getUserAttribute
  }
})
