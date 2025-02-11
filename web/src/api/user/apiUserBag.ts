import { http } from '@/api/http'
import { type TypeUserBagItem, type itemType } from '@/stores/userBagStore'

// import { api_getUserBagItems } from '@/api/user/apiUserBag'
export const api_getUserBagItems = async () => {
  return await http.get<TypeUserBagItem[]>('/player/bag/getUserBagItems')
}

// import { api_sellItem, type SellItemVO } from '@/api/user/apiUserBag'
export interface SellItemVO {
  /** 主键ID */
  id: number
  /** 物品ID */
  itemId: string
  /** 出售数量 */
  sellCount: number
}
export const api_sellItem = async (data: SellItemVO) => {
  return await http.post<null>('/player/bag/sellItem', data)
}

// import { getBagItemInfo, type GetBagItemInfoVO } from '@/api/user/apiUserBag'
export interface GetBagItemInfoVO {
  itemId: string
  itemType: itemType
}
export const getBagItemInfo = async (data: GetBagItemInfoVO) => {
  return await http.post<TypeUserBagItem>('/player/bag/getBagItemInfo', data)
}
