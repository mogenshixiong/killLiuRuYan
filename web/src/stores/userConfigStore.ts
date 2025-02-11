import { ref } from 'vue'
import { defineStore } from 'pinia'
import { setStore, getStore } from '@/utils/store'
import { isDev, isMobile } from '@/utils/utils'
import localforage from 'localforage'
import { useWindowSize } from '@vant/use'

type UserConfig = {
  theme: 'work' | 'wow'
  /** 音效开关 */
  sound: boolean
  floatingBack: boolean
  bg?: string
  floatingBackOffsetX: number
  floatingBackOffsetY: number
  /** 上次阅读的通知公告（用来判断是否在首页显示最新的通知公告，已经阅读过的就不要显示了） */
  lastReadNotice: string
}

const getDetaultValue = <K extends keyof UserConfig>(key: K, defaultValue: UserConfig[K]) => {
  const localConfig: UserConfig = getStore({ name: 'userConfig' })
  if (localConfig) {
    if (localConfig[key] !== null && localConfig[key] !== undefined) {
      return localConfig[key]
    }
  }
  return defaultValue
}

const { width } = useWindowSize()
const getDefaultFloatingBackOffsetX = () => {
  if (isMobile()) {
    return getDetaultValue('floatingBackOffsetX', 20)
  }
  // PC时固定在版心右侧下方，方便点击。
  return width.value / 2 + 480 / 2 + 10
}
export const useUserConfigStore = defineStore('userConfig', () => {
  // 默认用户配置
  const userConfig = ref<UserConfig>({
    theme: 'wow', // getDetaultValue('theme', isDev ? 'work' : 'wow'), // 暂时隐藏了修改主题的功能
    floatingBack: getDetaultValue('floatingBack', true),
    sound: getDetaultValue('sound', isDev ? false : true),
    bg: '/wowResource/img/bg/1.jpg',
    floatingBackOffsetX: getDefaultFloatingBackOffsetX(),
    floatingBackOffsetY: getDetaultValue('floatingBackOffsetY', 400),
    lastReadNotice: getDetaultValue('lastReadNotice', '')
  })

  // 保存用户配置
  function SaveUserConfig() {
    setStore({
      type: 'local',
      name: 'userConfig',
      content: userConfig.value
    })
  }
  // 显示/隐藏返回悬浮球按钮
  function changeFloatingBack() {
    userConfig.value.floatingBack = !userConfig.value.floatingBack
    SaveUserConfig()
  }
  // 返回悬浮球默认坐标
  function changeFloatingBackOffset(offset: { x: string; y: string }) {
    userConfig.value.floatingBackOffsetY = Number(offset.y)
    userConfig.value.floatingBackOffsetX = Number(offset.x)
    SaveUserConfig()
  }
  // 设置皮肤
  function changeTheme(theme: 'work' | 'wow') {
    userConfig.value.theme = theme
    setThemeBackground()
    SaveUserConfig()
  }
  // 设置最新已读通知
  function saveLastReadNotice(notice: string) {
    userConfig.value.lastReadNotice = notice
    SaveUserConfig()
  }
  // 设置音效
  function changeSound() {
    userConfig.value.sound = !userConfig.value.sound
    SaveUserConfig()
  }
  const mogenshixiongDB = localforage.createInstance({
    name: 'mogenshixiongDB'
  })
  mogenshixiongDB
    .getItem('bg')
    .then((file) => {
      if (file) {
        const windowURL = window.URL || window.webkitURL
        userConfig.value.bg = windowURL.createObjectURL(file as File)
      }
    })
    .catch((err) => {
      console.log('错误信息', err)
    })
  // 自定义首页背景图片
  function setBg(file: File) {
    mogenshixiongDB.setItem('bg', file)
    const windowURL = window.URL || window.webkitURL
    userConfig.value.bg = windowURL.createObjectURL(file)
  }
  const setThemeBackground = () => {
    if (userConfig.value.theme === 'wow') {
      document.documentElement.style.backgroundColor = 'black'
    } else if (userConfig.value.theme === 'work') {
      document.documentElement.style.backgroundColor = '#ffffff'
    }
  }
  return {
    userConfig,
    saveLastReadNotice,
    changeFloatingBack,
    changeFloatingBackOffset,
    changeTheme,
    changeSound: changeSound,
    setBg: setBg,
    setThemeBackground: setThemeBackground
  }
})
