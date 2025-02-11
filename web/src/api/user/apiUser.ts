import { http } from '@/api/http'
import type { Page } from '@/api/http'
import type { TypeUser } from '@/stores/userStore'
import type { TypeLang } from '@/i18n'

// import { api_registerByEmail } from '@/api/user/apiUser'
export const api_registerByEmail = async (username: string) => {
  return await http.post<null>('/visitor/registerByEmail', { username })
}

// import type { loginReqVO } from '@/api/user/apiUser'
// import { api_login } from '@/api/user/apiUser'
export interface loginReqVO extends Pick<TypeUser, 'username'> {
  password: string
}
export const api_login = async (data: loginReqVO) => {
  return await http.post<string>('/visitor/login', data)
}

// export const api_setUserNickname = async (nickName: string) => {
//   return await http.post<null>('/player/user/updateOwnNickName', { nickName })
// }
export const api_updateUserLang = async (lang: TypeLang) => {
  return await http.post<null>('/player/user/updateUserLang', { lang })
}

// import type { UpdateUserPasswordReqVO } from '@/api/user/apiUser'
export interface UpdateUserPasswordReqVO {
  // userId: string
  oldPassword: string
  newPassword: string
}
// import { api_updateUserPassword } from '@/api/user/apiUser'
export const api_updateUserPassword = async (form: UpdateUserPasswordReqVO) => {
  return await http.post<null>('/player/user/changePassword', form)
}

// import { api_getUserInfoByToken } from '@/api/user/apiUser'
export interface GetUserInfoByTokenResVO extends Pick<TypeUser, 'userType' | 'username'> {}
export const api_getUserInfoByToken = async () => {
  return await http.get<GetUserInfoByTokenResVO>('/player/user/getUserInfoByToken')
}

// import { api_getUserListByPage } from '@/api/user/apiUser'
// import type { GetUserListByPageResVO } from '@/api/user/apiUser'
// import type { GetUserListByPageResUserVO } from '@/api/user/apiUser'
export interface GetUserListByPageReqVO extends Pick<TypeUser, 'username'>, Page {}
export interface GetUserListByPageResUserVO extends Pick<TypeUser, 'userType' | 'username'> {
  id: string
  isFreeze: string
  isDelete: string
}
export interface GetUserListByPageResVO {
  total: number
  userList: GetUserListByPageResUserVO[]
}
// extends Pick<TypeUser, 'id' | 'coin' | 'userType' | 'username' | 'nickName' | 'updateTime'> {}
export const api_getUserListByPage = async (data: GetUserListByPageReqVO) => {
  return await http.post<GetUserListByPageResVO>('/admin/user/getUserListByPage', data)
}
