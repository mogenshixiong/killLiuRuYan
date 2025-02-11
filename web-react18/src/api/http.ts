import { fetchWrapper } from '@/api/fetchWrapper'

export const serializeGetParams = (obj: any) => {
  if (typeof obj === 'object' && obj !== null && !(obj instanceof Array)) {
    return Object.keys(obj)
      .map((key) => key + '=' + obj[key] || '')
      .join('&')
  } else {
    console.error('参数错误')
    return ''
  }
}

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
  },
  post2<T = any>(url: string, data: any): Promise<[any, HData<T> | null]> {
    return new Promise<[any, HData<T> | null]>((resolve) => {
      fetchWrapper(url, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      })
        .then((data) => {
          resolve([null, data])
        })
        .catch((error) => {
          resolve([error, null])
        })
    })
  },
  put<T = any>(url: string, data: any): Promise<[any, HData<T> | null]> {
    return new Promise<[any, HData<T> | null]>((resolve) => {
      fetchWrapper(url, {
        method: 'PUT',
        body: data,
        headers: {
          'Content-Type': 'application/octet-stream'
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
