// import lodashCloneDeep from 'lodash/cloneDeep'
// import lodashMerge from 'lodash/merge'
// export const clone = lodashCloneDeep
// export const merge = lodashMerge

// import { bus } from '@/utils/utils'
import mitt from 'mitt'

// 事件总线
export const bus = mitt()

export const isDev = import.meta.env.DEV
export const isMobile = () => {
  const flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
  return flag
}

/**
 * 生成uuid
 * @return {String} uuid 826fe4be-631c-4a63-83e9-96a788e8a569
 */
export const Guid = (): string => {
  let d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() //use high-precision timer if available
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0 // d是随机种子
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
// 事件总线
// export const bus = mitt()
export const sleep = async (ms = 3000) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export const randomLenNum = (len: number, date: Date | boolean) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, typeof len === 'number' ? len : 4)
  if (date) random = random + Date.now()
  return random
}

/**
 * 统一返回上一页面方法
 * 默认返回首页
 */
export const back = (router: any, params: object = { path: '/' }) => {
  router.push(params)
}

export const loadAssetsJS = (url: string, instanceName: string) => {
  return new Promise<void>((resolve, _reject) => {
    if (instanceName in window) {
      resolve()
    } else {
      const asset = document.createElement('script')
      asset.type = 'text/javascript'
      asset.src = url
      document.body.appendChild(asset)
      asset.onload = () => {
        resolve()
        // setTimeout(() => {
        //   resolve()
        // }, 10)
      }
    }
  })
}
export const loadAssetsCss = (url: string) => {
  return new Promise<void>((resolve, _reject) => {
    const asset = document.createElement('link')
    asset.rel = 'stylesheet'
    asset.href = url
    document.body.appendChild(asset)
    asset.onload = () => {
      resolve()
      // setTimeout(() => {
      //   resolve()
      // }, 10)
    }
  })
}
/**
 * 需要复制的内容
 * import { copyText } from '@/utils/utils'
 */
export const copyText = (text: string) => {
  const textareaC = document.createElement('textarea')
  textareaC.setAttribute('readonly', 'readonly') //设置只读属性防止手机上弹出软键盘
  textareaC.value = text
  document.body.appendChild(textareaC) //将textarea添加为body子元素
  textareaC.select()
  const res = document.execCommand('copy')
  document.body.removeChild(textareaC) //移除DOM元素

  if (res) {
    return true
  } else {
    return false
  }
}

// import {validateNickName} from '@/utils/utils'
export const validateNickName = (nickName: string): true | string => {
  if (!nickName) return '请输入角色名称'
  if (nickName === '' || nickName.trim() === '') {
    return '请输入角色名称'
  }
  const pattern = /^[\w\u4e00-\u9fa5]+$/
  if (pattern.test(nickName) === false) {
    return '角色名称只能包含中文英文和数字'
  }
  return true
}
