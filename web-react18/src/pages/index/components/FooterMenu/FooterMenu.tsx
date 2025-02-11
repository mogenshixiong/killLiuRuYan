import { useEffect, useRef } from 'react'
import { Button } from 'antd'
// import { useDialogStore } from '@/stores/dialog'
import DialogJiNeng from '@/pages/index/components/DialogJiNeng/DialogJiNeng'
import DialogLianJinShu from '@/pages/index/components/DialogLianJinShu/DialogLianJinShu'
import DialogBeiBao from '@/pages/index/components/DialogBeiBao/DialogBeiBao'
import DialogSettings from '@/pages/index/components/DialogSettings/DialogSettings'

const FooterMenu = () => {
  // const dialogZIndex = useDialogStore((state) => state.dialogZIndex)
  const DialogJiNengRef = useRef(null) as any
  const DialogLianJinShuRef = useRef(null) as any
  const DialogDialogBeiBaoRef = useRef(null) as any
  const DialogSettingsRef = useRef(null) as any

  const onKeyDown = (e: any) => {
    if (e.key === 'p') {
      openDialog(DialogJiNengRef)
    } else if (e.key === 'k') {
      openDialog(DialogLianJinShuRef)
    } else if (e.key === 'b') {
      openDialog(DialogDialogBeiBaoRef)
    } else if (e.key === 'Escape') {
      openDialog(DialogSettingsRef)
    }
  }
  const openDialog = (dialogRef: any) => {
    if (dialogRef && dialogRef.current && dialogRef.current.switchDialogVisible) {
      dialogRef.current.switchDialogVisible()
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown) // 添加全局事件
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <>
      <div className="fixed bottom-0 w-full p-2 text-center ">
        {/*bg-[#1c2434] */}
        <DialogBeiBao ref={DialogDialogBeiBaoRef} />
        <Button type="primary" className="mr-2" onClick={() => openDialog(DialogDialogBeiBaoRef)}>
          广义相对论无限背包(B)
        </Button>
        <DialogJiNeng ref={DialogJiNengRef} />
        <Button type="primary" className="mr-2" onClick={() => openDialog(DialogJiNengRef)}>
          技能大全(P)
        </Button>
        <DialogLianJinShu ref={DialogLianJinShuRef} />
        <Button type="primary" className="mr-2" onClick={() => openDialog(DialogLianJinShuRef)}>
          自动炼丹炉(K)
        </Button>
        <DialogSettings ref={DialogSettingsRef} />
        <Button type="primary" onClick={() => openDialog(DialogSettingsRef)}>
          自动锻造机(Esc)
        </Button>
      </div>
    </>
  )
}

FooterMenu.displayName = 'FooterMenu'
export default FooterMenu
