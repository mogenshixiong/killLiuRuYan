import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { produce } from 'immer'
import { formatTime3 } from '@/utils/time'

export type TLogType = 'fortree'
export type TLog = {
  /** 时间 */
  time: string
  type: TLogType
  /** 日志内容 */
  content: string
}
type TLogStoreState = {
  logList: TLog[]
  addLog: (content: string, type: TLogType) => void
}

const MAX_LOGS = 100 // 最大日志条数

// 定义状态和操作
const useLogStore = create(
  persist<TLogStoreState>(
    (set) => ({
      logList: [],
      addLog: (content: string, type: TLogType) => {
        set(
          produce((state: TLogStoreState) => {
            state.logList.unshift({
              content,
              type,
              time: formatTime3()
            })

            // 如果日志超过100条，删除最后多余的日志
            if (state.logList.length > MAX_LOGS) {
              state.logList = state.logList.slice(0, MAX_LOGS)
            }
          })
        )
      }
    }),
    {
      name: 'mogenshixiong-log', // 存储的名称，用于在 localStorage 中标识存储
      storage: createJSONStorage(() => ({
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) => localStorage.setItem(key, value),
        removeItem: (key) => localStorage.removeItem(key)
      }))
    }
  )
)

export default useLogStore
