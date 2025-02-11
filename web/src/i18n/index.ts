import { createI18n } from 'vue3-i18n'
import { Locale } from 'vant'
import { computed } from 'vue'
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US'
import zhCN from 'vant/es/locale/lang/zh-CN'
import { langMessage } from './langMessage'

export type TypeMessage = { msgKey: string; en: string; zh: string }
export type TypeLang = 'en' | 'zh'
const getMessage = (list: TypeMessage[], lang: TypeLang) => {
  const message: { [key: string]: string } = {}
  list.forEach((item: TypeMessage) => {
    message[item.msgKey] = item[lang]
  })
  return message
}

// 语言配置
const messages = {
  en: {
    ...getMessage(langMessage, 'en')
  },
  zh: {
    ...getMessage(langMessage, 'zh')
  }
}
// translate
const t = (key: string) => {
  if (!key) {
    return key
  }
  return i18n.t(key) || key
}

const defaultLang = 'zh'

const i18n = createI18n({
  locale: defaultLang,
  messages: messages
})

// 修改语言
const changeLanguage = (lang: 'zh' | 'en') => {
  i18n.setLocale(lang)
  if (lang === 'en') {
    Locale.use('en-US', enUS)
  } else if (lang === 'zh') {
    Locale.use('zh-CN', zhCN)
  }
}

// 初始默认设置为英文
changeLanguage(defaultLang)

// 当前语言
const curLang = computed(() => {
  const lang = i18n.getLocale()
  if (lang === 'en') {
    return 'English'
  } else if (lang === 'zh') {
    return '中文'
  }
  return '未知'
})
export { i18n, t, changeLanguage, curLang }
