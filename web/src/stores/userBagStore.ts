import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api_getUserBagItems } from '@/api/user/apiUserBag'
import { showNotify } from 'vant'
import { type armorType } from '@/stores/userArmorStore'
import { type UserClass } from '@/stores/userPlayerStore'

// import  { type ItemLevel, ItemLevelConfig,getItemLevelName} from '@/stores/userBagStore'
export const ItemLevelConfig = [
  { value: '1', name: '粗糙', color: '#9d9d9d' },
  { value: '2', name: '普通', color: '#ffffff' },
  { value: '3', name: '优秀', color: '#1eff00' },
  { value: '4', name: '精良', color: '#0070dd' },
  { value: '5', name: '史诗', color: '#a335ee' },
  { value: '6', name: '传说', color: '#FF8000' },
  { value: '7', name: '神器', color: '#e5cc80' },
  { value: '8', name: '超神器', color: '#fd1c1d' }
] as const
// 物品等级：粗糙1 普通2、优秀3、精良4、史诗5、传说6 神器7
export type ItemLevel = (typeof ItemLevelConfig)[number]['value']
export const getItemLevelName = (val: ItemLevel) => {
  return ItemLevelConfig.find((i) => i.value === val)?.name || ''
}
export const getItemLevelColor = (val: ItemLevel) => {
  return ItemLevelConfig.find((i) => i.value === val)?.color || ''
}

// import  { type itemType, itemTypeConfig,getitemTypeName} from '@/stores/userBagStore'
export const itemTypeConfig = [
  { value: 'chest', name: '宝箱' },
  { value: 'ride', name: '坐骑' },
  { value: 'armor', name: '装备' },
  { value: 'gold', name: '金币' },
  { value: 'exp', name: '经验值' },
  { value: 'special', name: '道具' }
] as const
export type itemType = (typeof itemTypeConfig)[number]['value']
export const getitemTypeName = (val: itemType) => {
  return itemTypeConfig.find((i) => i.value === val)?.name || ''
}

// import  { type TypeUserBagItem } from '@/stores/userBagStore'
export interface TypeUserBagItem {
  // 主键ID
  id: number
  // 持有数量
  itemCount: number
  // 物品(装备)ID
  itemId: string
  /** 物品名称 */
  itemName: string
  /** 是否可交易 */
  transaction: boolean
  /** 物品类型 宝箱chest 坐骑ride */
  itemType: itemType
  /** 物品等级：粗糙1 普通2、优秀3、精良4、史诗5、传说6 神器7  */
  itemLevel: ItemLevel
  /** 物品介绍 */
  desc: string
  /** 物品介绍 */
  descGold?: string
  /** hp 加成 */
  hp?: number
  /** 物攻 加成 */
  ap?: number
  /** 物防 加成 */
  ac?: number
  /** 法伤 加成 */
  sfk?: number
  /** 法防 加成 */
  mdef?: number
  /** 等级要求 */
  requirement?: number
  /** 职业要求 */
  requirementClass?: UserClass
  /** 装备类型 */
  armorType?: armorType
  /** 售价 */
  price?: number
}

// import  { useUserBagStore } from '@/stores/userBagStore'
export const useUserBagStore = defineStore('userBag', () => {
  const userBagItems = ref<TypeUserBagItem[]>([])

  async function getUserBagItems() {
    const [err, res] = await api_getUserBagItems()
    if (err || !res) return
    if (res.code !== 0) {
      showNotify(res.msg)
      return
    }
    if (!res.data) {
      userBagItems.value = []
      return
    }
    userBagItems.value = res.data
      .filter((i) => i.itemCount > 0)
      .sort((a, b) => Number(b.itemLevel) - Number(a.itemLevel))
  }
  async function updateBatItemCount(_item: TypeUserBagItem) {
    getUserBagItems()
    // const oldItem = userBagItems.value.find((i) => i.id === item.id)
    // if (oldItem) {
    //   oldItem.itemCount = item.itemCount
    // }
  }

  return {
    userBagItems: userBagItems,
    getUserBagItems,
    updateBatItemCount
  }
})
