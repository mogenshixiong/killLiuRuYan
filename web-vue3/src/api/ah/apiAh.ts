import { http } from '@/api/http'
import { type Page } from '@/api/http'
import { type ItemLevel, type itemType } from '@/stores/userBagStore'
import { type UserClass } from '@/stores/userPlayerStore'

// import { api_addAhOrder, type addAhOrderVo} from '@/ah/apiAh'
export type OrderType = 'sell' | 'purchase'
export interface addAhOrderVo {
  orderType: OrderType
  itemId: string
  itemType?: itemType
  orderCount: number
  unitPrice: number
}
export const api_addAhOrder = async (form: addAhOrderVo) => {
  return await http.post<null>('/player/ah/addAhOrder', form)
}

// import { type GetAhOrderListDto, type AhOrderItem , type GetAhOrderListVO, api_getAhOrderListByPage} from '@/ah/apiAh'
export interface GetAhOrderListDto extends Page {
  itemName: string
}
export interface AhOrderItem {
  id: number
  userPlayerId: number
  userPlayerNickName: string
  orderCreateTime: string
  orderUpdateTime: string
  orderType: OrderType
  orderCount: number
  unitPrice: number
  itemId: string
  itemName: string
  itemLevel: ItemLevel
  itemType: itemType
  itemType2: string
  itemType3: string
  requirementLevel: number
  requirementClass: UserClass
  orderRemark: string
}
export interface GetAhOrderListVO {
  total: number
  orderList: AhOrderItem[]
}
export const api_getAhOrderListByPage = async (data: GetAhOrderListDto) => {
  return await http.post<GetAhOrderListVO>('/player/ah/list', data)
}

// import { type GetAhOrderListDto, type AhOrderItem , type GetAhOrderListVO, api_getMySellListByPage} from '@/ah/apiAh'
export interface GetMyAhOrderListVO {
  total: number
  orderList: AhOrderItem[]
}
export const api_getMySellListByPage = async (data: GetAhOrderListDto) => {
  return await http.post<GetMyAhOrderListVO>('/player/ah/getMySellList', data)
}

// import { type buyItemDto, api_buyItem} from '@/ah/apiAh'
export interface buyItemDto {
  OrderId: number
  BuyCount: number
}
export const api_buyItem = async (data: buyItemDto) => {
  return await http.post<null>('/player/ah/buyItem', data)
}

// import { api_cancelSell} from '@/ah/apiAh'
export const api_cancelSell = async (orderId: number) => {
  return await http.get<null>('/player/ah/cancelSell?orderId=' + orderId)
}
// import { api_getOrderInfoById} from '@/ah/apiAh'
export const api_getOrderInfoById = async (orderId: number) => {
  return await http.get<AhOrderItem>('/player/ah/getOrderInfoById?orderId=' + orderId)
}
