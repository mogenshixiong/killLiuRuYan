import { create } from 'zustand'
import { produce } from 'immer'

export const DialogOptions = [
  { dialogTitle: '技能', dialogName: 'JiNeng' },
  { dialogTitle: '炼金术', dialogName: 'LianJinShu' },
  { dialogTitle: '背包', dialogName: 'BeiBao' },
  { dialogTitle: '设置', dialogName: 'Settings' }
] as const

export type TDialogName = (typeof DialogOptions)[number]['dialogName']
type TDialogStoreState = {
  dialogZIndex: Record<TDialogName, number>
  // dialogZIndex: { JiNeng: number; LianJinShu: number; BeiBao: number; Settings: number }
  /** 设置指定的弹出框显示在最上层 */
  updateDialogZIndex: (type: TDialogName, zIndex?: number) => void
  getMaxDialogZIndex: () => number
}

export const useDialogStore = create<TDialogStoreState>()((set, get) => ({
  dialogZIndex: DialogOptions.reduce((acc, option) => {
    return { ...acc, [option.dialogName]: 1000 }
  }, {} as Record<TDialogName, number>), // dialogZIndex: { JiNeng: 1000, LianJinShu: 1000, BeiBao: 1000, Settings: 1000 },
  getMaxDialogZIndex: () => {
    const dialogZIndex = get().dialogZIndex
    return Math.max(...Object.values(dialogZIndex))
  },
  updateDialogZIndex: (type: TDialogName, zIndex?: number) => {
    set(
      produce((state: TDialogStoreState) => {
        const maxNumber = Math.max(...Object.values(state.dialogZIndex)) + 1
        state.dialogZIndex[type] = zIndex || maxNumber
      })
    )
  }
}))
