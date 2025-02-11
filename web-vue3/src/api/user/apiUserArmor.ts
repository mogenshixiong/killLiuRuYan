import { http } from '@/api/http'
import { type TypeUserBagItem } from '@/stores/userBagStore'

// import { api_getUserArmor } from '@/api/user/apiUserArmor'
export const api_getUserArmor = async () => {
  return await http.get<TypeUserBagItem[]>('/player/userArmor/getUserArmor')
}

// import { api_putOnArmor } from '@/api/user/apiUserArmor'
export const api_putOnArmor = async (data: { id: number; armorId: string }) => {
  return await http.post<null>('/player/userArmor/putOnArmor', data)
}
// import { api_putOffArmor } from '@/api/user/apiUserArmor'
export const api_putOffArmor = async (armorId: string) => {
  return await http.post<null>('/player/userArmor/putOffArmor', { armorId })
}
