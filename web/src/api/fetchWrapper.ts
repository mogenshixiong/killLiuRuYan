import { showToast, showNotify } from 'vant'
import VueCookies from 'vue-cookies'

const Cookies: any = VueCookies
const baseUrl = '/wowApi'
export const fetchWrapper = async (url: string, options: RequestInit = {}): Promise<any> => {
  // Part 1: Add headers and attach auth token
  const headers = new Headers(options.headers || {})
  let token = localStorage.getItem('token')
  if (!token) {
    token = Cookies.get('token') // localStorage 没有，尝试从cookies里获取token
  } else {
    Cookies.set('token', token, 0) // 更新cookies的token
  }
  if (token) {
    headers.set('Authorization', `${token}`)
  } else {
    if (url.startsWith('/visitor') === false) {
      return { code: 401, msg: '未登录' }
    }
  }

  // Part 2: Fetch sends the request
  const response = await fetch(baseUrl + url, {
    ...options,
    headers
  })

  // Part 3: Handle the received response

  if (response.ok) {
    // If the status code is 200, convert data structure according to Content-Type
    const contentType = response.headers.get('Content-Type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    } else if (contentType && contentType.includes('text/plain')) {
      return await response.text()
    } else {
      // Manage other Content-Type cases or when Content-Type is absent
    }
  } else {
    const contentType = response.headers.get('Content-Type')
    if (contentType && contentType.includes('application/json')) {
      const res = await response.json()
      if (res.msg) {
        showToast(res.msg)
      }
    } else {
      showNotify(response.status.toString())
    }
    // Handle other non-200 status codes as needed
    throw new Error(`Request failed with status ${response.status}`)
  }
}
