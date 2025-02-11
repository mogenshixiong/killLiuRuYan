import { http } from '@/api/http'
import { type TypeUserAttribute } from '@/stores/userAttributeStore'
import { type attrType } from '@/stores/userAttributeStore'

// import { api_getUserAttribute } from '@/api/user/apiUserAttribute'
export const api_getUserAttribute = async () => {
  return await http.get<TypeUserAttribute>('/player/userAttribute/getUserAttribute')
}

// import { api_addAttributeBySpecial1 } from '@/api/user/apiUserAttribute'
export const api_addAttributeBySpecial1 = async () => {
  return await http.post<attrType>('/player/userAttribute/addAttributeBySpecial1', undefined)
}
