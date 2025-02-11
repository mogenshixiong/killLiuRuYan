import { useEffect } from 'react'

// 定义一个名为DialogJiNeng的函数组件，使用forwardRef来传递ref属性
const DialogBeiBaoContent = () => {
  // 定义一个名为openResponsive的状态变量，初始值为false

  // 定义一个名为onKeyDown的方法，用于监听键盘事件
  const onKeyDown = (e: any) => {
    if (e.key === 'a') {
      console.log('onKeyDown a')
    }
  }
  // 使用useEffect来添加全局事件监听器，监听键盘事件
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown) // 添加全局事件
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <>
      <div>哈哈，你有个毛线</div>
    </>
  )
}

export default DialogBeiBaoContent
