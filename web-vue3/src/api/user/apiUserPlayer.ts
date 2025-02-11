import { http } from '@/api/http'
import type { TypeUserPlayer } from '@/stores/userPlayerStore'
import { type UserClass, type UserGender } from '@/stores/userPlayerStore'

// import { api_getUserInfoByToken } from '@/api/user/apiUserPlayer'
export const api_getUserPlayerInfo = async () => {
  return await http.get<TypeUserPlayer>('/player/userPlayer/getUserPlayerInfo')
}

// import type { createUserPlayerDto } from '@/api/user/apiUserPlayer'
export interface createUserPlayerDto {
  class: UserClass
  nickName: string
  gender: UserGender
}
// import { api_createUserPlayer } from '@/api/user/apiUserPlayer'
export const api_createUserPlayer = async (form: createUserPlayerDto) => {
  return await http.post<TypeUserPlayer>('/player/userPlayer/createUserPlayer', form)
}

// import { api_reNickName } from '@/api/user/apiUserPlayer'
export const api_reNickName = async (newName: string) => {
  return await http.post<null>('/player/userPlayer/reNickName', { nickName: newName })
}

// import { api_getOnlineUserPlayerList, type GetOnlineUserPlayerListVO } from '@/api/user/apiUserPlayer'
export interface GetOnlineUserPlayerVO {
  nickName: string
  stageName: string
  class: UserClass
  stateLevel: number
  lastloginTime: string
}
export interface GetOnlineUserPlayerListVO {
  playerList: GetOnlineUserPlayerVO[]
  total: number
}
export const api_getOnlineUserPlayerList = async (query: { nickName: string }) => {
  return await http.post<GetOnlineUserPlayerListVO>(
    '/player/userPlayer/getOnlineUserPlayerList',
    query
  )
}

// import { api_changeUserPlayerClass } from '@/api/user/apiUserPlayer'
export const api_changeUserPlayerClass = async (userClass: UserClass) => {
  return await http.post<null>('/player/userPlayer/changeUserPlayerClass', { class: userClass })
}

export interface GetUserPlayerListByOrderLevelVO {
  nickName: string
  stateLevel: number
}
// import { api_getUserPlayerListByOrderLevel, type GetUserPlayerListByOrderLevelVO } from '@/api/user/apiUserPlayer'
export const api_getUserPlayerListByOrderLevel = async () => {
  return await http.get<GetUserPlayerListByOrderLevelVO[]>(
    '/player/userPlayer/getUserPlayerListByOrderLevel'
  )
}

// import { api_updateLastloginTime } from '@/api/user/apiUserPlayer'
export const api_updateLastloginTime = async () => {
  return await http.get<null>('/player/userPlayer/updateLastloginTime')
}

export interface GetUserPlayerListByOrderGoldVO {
  nickName: string
  gold: number
}
// import { api_getUserPlayerListByOrderGold, type GetUserPlayerListByOrderGoldVO } from '@/api/user/apiUserPlayer'
export const api_getUserPlayerListByOrderGold = async () => {
  return await http.get<GetUserPlayerListByOrderGoldVO[]>(
    '/player/userPlayer/getUserPlayerListByOrderGold'
  )
}
