import { fetchWrapper } from '@/api/fetchWrapper'

// import type { Page } from '@/api/http'
export interface Page {
  pageNum: number
  pageSize: number
}
export interface HData<T> {
  data: T
  /** 成功0 失败1 */
  code: number
  /** 后台msg */
  msg: string
}
export const http = {
  get<T = any>(url: string): Promise<[any, HData<T> | null]> {
    return new Promise<[any, HData<T> | null]>((resolve) => {
      fetchWrapper(url, { method: 'GET' })
        .then((data) => {
          resolve([null, data])
        })
        .catch((error) => {
          resolve([error, null])
        })
    })
  },
  post<T = any>(url: string, data: any): Promise<[any, HData<T> | null]> {
    return new Promise<[any, HData<T> | null]>((resolve) => {
      fetchWrapper(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((data) => {
          resolve([null, data])
        })
        .catch((error) => {
          resolve([error, null])
        })
    })
  }
}
