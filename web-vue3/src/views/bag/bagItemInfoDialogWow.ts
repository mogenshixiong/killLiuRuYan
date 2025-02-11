import { type TypeUserBagItem } from '@/stores/userBagStore'
import { showToast } from 'vant'
import { showConfirmDialog } from 'vant'
import { validateNickName } from '@/utils/utils'
import { formatGold } from '@/utils/format'
import { api_reNickName } from '@/api/user/apiUserPlayer'
import useStore from '@/stores/stores'
import { type itemType } from '@/stores/userBagStore'
import audio from '@/utils/audio'

export const onClickRename = (item: TypeUserBagItem, newName: string) => {
  if (item.itemType !== 'special') return
  if (item.itemId !== 'special_2') return
  const validateRes = validateNickName(newName)
  if (validateRes !== true) {
    showToast(validateRes)
    return
  }
  showConfirmDialog({
    title: '重要提醒',
    allowHtml: true,
    overlayClass: '', // 遮罩层样式
    message: `<div>是否确定修改名称为</div><div>【${newName}】</div><div class="text-xs text-gray-500">提示：重命名后旧名字将可以被其他人注册。</div>`,
    beforeClose: async (action: string) => {
      if (action !== 'confirm') return true
      const [err, res] = await api_reNickName(newName)
      if (err || !res) return false
      showToast(res.msg)
      if (res.code === 0) {
        const store = useStore()
        store.userPlayer.getUserPlayerInfo()
      }
      return res.code === 0
    }
  })
}

export const showToastByAddItem = (resData: TypeUserBagItem, str: string = '') => {
  if (resData.itemType === 'gold') {
    showToast({
      message: formatGold(resData.itemCount) + str,
      position: 'top'
    })
  } else if (resData.itemType === 'armor') {
    showToast({
      message: `${resData.itemName}*${resData.itemCount}` + str,
      position: 'top'
    })
  } else if (resData.itemType === 'ride') {
    showToast({
      message: `${resData.itemName}*${resData.itemCount}` + str,
      position: 'top'
    })
  } else {
    showToast({
      message: `${resData.itemName}*${resData.itemCount}` + str,
      position: 'top'
    })
  }
}

export const playAddItemAudio = (type: itemType) => {
  if (type === 'gold') {
    audio.play('gold')
  } else if (type === 'armor') {
    audio.play('getItem') // TODO 改一下,设置一个单独的
  } else if (type === 'ride') {
    audio.play('getItem')
  }
}
