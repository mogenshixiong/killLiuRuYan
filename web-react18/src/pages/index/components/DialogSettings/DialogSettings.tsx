import { forwardRef, useImperativeHandle, useRef } from 'react'
import DraggableDialog from '@/components/DraggableDialog/DraggableDialog'
import SetBgImg from './SetBgImg'

const DialogSettings = forwardRef((_props, ref) => {
  const DraggableDialogRef = useRef(null) as any
  useImperativeHandle(ref, () => ({
    switchDialogVisible: () => DraggableDialogRef && DraggableDialogRef.current && DraggableDialogRef.current.switchDialogVisible()
  }))

  return (
    <>
      <DraggableDialog ref={DraggableDialogRef} dialogName={'Settings'} dialogWidth={600}>
        <div className="p-3">
          <SetBgImg />
        </div>
      </DraggableDialog>
    </>
  )
})

DialogSettings.displayName = 'DialogSettings'
export default DialogSettings
