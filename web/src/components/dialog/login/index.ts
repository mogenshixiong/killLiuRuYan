import Comp from './LoginDialog.vue'
import { createApp } from 'vue'
// import { installNoMoreClickDirective } from '@/directive/noMoreClick/noMoreClick'

/**
 * @example
 * import LoginDialog from '@/components/dialog/login/index'
 * LoginDialog.open()
 */
const CompDialog = (
  options: any
): {
  openDialog: any
} => {
  // 新建一个弹出框容器
  const rootNode = document.createElement('div')
  // 插入到body中
  document.body.appendChild(rootNode)

  // 渲染dialog组件
  const dialog = createApp(Comp, {
    ...options,
    close() {
      // 关闭弹出框时注销DOM
      dialog.unmount()
      document.body.removeChild(rootNode)
    }
  })
  // installNoMoreClickDirective(dialog)
  // 把dialog 渲染到 弹出框容器上
  return dialog.mount(rootNode) as any
}

CompDialog.open = (options?: any) => {
  CompDialog(options).openDialog()
}
export default CompDialog
