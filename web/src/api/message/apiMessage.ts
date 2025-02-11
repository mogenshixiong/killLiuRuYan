import { http } from '@/api/http'
import type { TypeMessage } from '@/stores/chatMessageStore'

export const api_getMessages = async (startTime: string, endTime: string) => {
  const url = `/player/message/getMessages?startTime=${startTime}&endTime=${endTime}`
  return await http.get<{ messageList: TypeMessage[] }>(url)
}
export const api_sendMessage = async (content: string) => {
  const url = '/player/message/sendMessage'
  return await http.post<null>(url, { content })
}
