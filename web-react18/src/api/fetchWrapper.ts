// import { isDev } from '@/utils/utils'
// import { useStoreStore } from '@/stores'

export const baseUrl = '/api'
export const fetchWrapper = async (url: string, options: RequestInit = {}): Promise<any> => {
  // Part 1: Add headers and attach auth token
  const headers = new Headers(options.headers || {})
  // const store = useStoreStore()
  // if (store.token) {
  //   headers.set('Authorization', store.token)
  // }

  // Part 2: Fetch sends the request
  const response = await fetch(url.startsWith('http') ? url : baseUrl + url, {
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
        // ElMessage({ message: res.msg, type: 'warning' })
      } else if (res.error_description) {
        // ElMessage({ message: res.error_description, type: 'warning' })
      }
    } else {
      try {
        // const res = await response.json()
        // ElMessage({ message: res.msg, type: 'warning' })
      } catch (_error) {
        // ElMessage({ message: response.status.toString(), type: 'warning' })
      }
    }
    // Handle other non-200 status codes as needed
    throw new Error(`Request failed with status ${response.status}`)
  }
}
