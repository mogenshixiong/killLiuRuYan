import { http } from '@/api/http'

export const BooleanOptions = [
  { label: '是', value: 1 },
  { label: '否', value: 0 }
] as const
/** 1是 0否 */
export type BooleanType = (typeof BooleanOptions)[number]['value']

export interface ConfigType {
  id: number
  /** 是否开启用户模块(是1否0) */
  isUser: BooleanType
  mustLogin: BooleanType
  isRequiredInvitationCode: BooleanType
  isDownloadIp: BooleanType
  /** 是否开启文件完整性校验 */
  isHash: BooleanType
  /** 系统存储空间上限 */
  maxStorage: number
}

/** 测试接口：获取系统配置 */
export const api_getConfig = async () => {
  return await http.get<ConfigType>('/visitor/getConfig')
}
