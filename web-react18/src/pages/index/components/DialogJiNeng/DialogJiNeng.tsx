import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { ConfigProvider, Modal } from 'antd'
import type { DraggableData, DraggableEvent } from 'react-draggable'
import Draggable from 'react-draggable'
import { useDialogStore } from '@/stores/dialog'
import DialogJiNengContent from './DialogJiNengContent'
// 定义一个名为DialogJiNeng的函数组件，使用forwardRef来传递ref属性
const DialogJiNeng = forwardRef((_props, ref) => {
  // 定义一个名为openResponsive的状态变量，初始值为false
  const [visible, setVisible] = useState(false)
  const dialogZIndex = useDialogStore((state) => state.dialogZIndex)
  const { updateDialogZIndex, getMaxDialogZIndex } = useDialogStore()
  const [disabled, setDisabled] = useState(true)
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const draggleRef = useRef<HTMLDivElement>(null!)

  const switchDialogVisible = (val?: boolean) => {
    if (val === false) {
      setVisible(false)
      updateDialogZIndex('JiNeng', 1000)
    } else if (visible === true && dialogZIndex.JiNeng < getMaxDialogZIndex()) {
      updateDialogZIndex('JiNeng')
      return
    } else if (visible === true) {
      setVisible(false)
      updateDialogZIndex('JiNeng', 1000)
    } else if (visible === false) {
      updateDialogZIndex('JiNeng')
      setVisible(true)
    }
  }
  // 使用useImperativeHandle来暴露一个名为 switchDialogVisible 的方法，用于打开对话框
  useImperativeHandle(ref, () => ({ switchDialogVisible }))

  // 定义一个名为onKeyDown的方法，用于监听键盘事件
  const onKeyDown = (e: any) => {
    if (e.key === 'a' && visible) {
      console.log('onKeyDown a')
    }
  }
  // 使用useEffect来添加全局事件监听器，监听键盘事件
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown) // 添加全局事件
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [visible])

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()
    if (!targetRect) return
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    })
  }
  return (
    <ConfigProvider theme={{ token: { motion: false } }}>
      <Modal
        title={
          <div
            style={{ width: '100%', cursor: 'move', backgroundColor: 'red', height: '32px', paddingLeft: '12px', lineHeight: '32px' }}
            onMouseOver={() => {
              // updateDialogZIndex('JiNeng')
              if (disabled) {
                setDisabled(false)
              }
            }}
            onMouseDown={() => {
              updateDialogZIndex('JiNeng')
            }}
            onMouseOut={() => {
              setDisabled(true)
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            技能书
          </div>
        }
        wrapClassName={'pointer-events-none [&_.ant-modal-header]:mb-0 [&_.ant-modal-close]:top-0 [&_.ant-modal-close]:end-0 [&_.ant-modal-content]:p-0 [&_.ant-modal-content]:rounded-none'}
        centered={true}
        zIndex={dialogZIndex.JiNeng}
        open={visible}
        mask={false}
        footer={null}
        maskClosable={false}
        destroyOnClose={false}
        onOk={() => switchDialogVisible()}
        onCancel={() => switchDialogVisible(false)}
        modalRender={(modal) => (
          <Draggable disabled={disabled} bounds={bounds} nodeRef={draggleRef} onStart={(event, uiData) => onStart(event, uiData)}>
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div
          className="h-[600px]"
          onClick={() => {
            updateDialogZIndex('JiNeng')
          }}
        >
          <DialogJiNengContent />
        </div>
      </Modal>
    </ConfigProvider>
  )
})

DialogJiNeng.displayName = 'DialogJiNeng'
export default DialogJiNeng
