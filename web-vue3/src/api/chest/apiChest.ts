import { http } from '@/api/http'
import { type TypeUserBagItem } from '@/stores/userBagStore'
import { type itemType } from '@/stores/userBagStore'
import { type ItemLevel } from '@/stores/userBagStore'

export const api_openChest = async (chestId: string) => {
  return await http.post<TypeUserBagItem>('/player/chest/openChest', {
    chestId: chestId,
    openCount: 1
  })
}

export interface TypeChestProbability {
  /** 物品（金币和经验则没有ID） */
  id?: string
  /** 概率 */
  prob: number
  /** 得奖数量 */
  awardCount: number
  /** 物品名称 */
  name: string
  /** 是否可交易 */
  transaction: boolean
  /** 物品类型 宝箱chest 坐骑ride */
  awardType: itemType
  /** 物品等级：粗糙1 普通2、优秀3、精良4、史诗5、传说6 神器7  */
  itemLevel: ItemLevel
}

export interface TypeChestAwardType {
  /** 概率 */
  prob: number
  /** 物品类型 宝箱chest 坐骑ride */
  awardType: itemType
}
export interface getChestProbabilityServiceVo {
  chestAward: TypeChestProbability[]
  chestAwardType: TypeChestAwardType[]
}
export const api_getChestProbabilityService = async () => {
  const url = '/player/chest/getChestProbability'
  return await http.get<getChestProbabilityServiceVo>(url)
}
