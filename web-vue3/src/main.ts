import '@/styles/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import vant from 'vant'
import { Lazyload, setToastDefaultOptions } from 'vant'
// import { Locale } from 'vant'
import { i18n } from '@/i18n'
// import enUS from 'vant/es/locale/lang/en-US' // 引入英文语言包
import App from '@/App.vue'
import router from '@/router/router'
// showToast  修改默认配置
// https://vant-contrib.gitee.io/vant/#/zh-CN/toast#xiu-gai-mo-ren-pei-zhi
import VConsole from 'vconsole'
import { isMobile, isDev } from '@/utils/utils'
/**
 * Vant 中有个别组件是以函数的形式提供的，
 * 包括 Toast，Dialog，Notify 和 ImagePreview 组件。
 * 在使用函数组件时，unplugin-vue-components 无法解析自动注册组件，
 * 导致 @vant/auto-import-resolver 无法解析样式，
 * 因此需要手动引入样式。
 */
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
// import 'vant/es/image-preview/style'

if (isDev) {
  console.log(import.meta.env)
  if (isMobile()) {
    new VConsole()
  }
}
// Locale.use('en-US', enUS)
setToastDefaultOptions({ position: 'top' })

const app = createApp(App)
// app.use(vant)
app.use(createPinia())
app.use(router)
// 注册时设置`lazyComponent`选项
// https://vant-contrib.gitee.io/vant/#/zh-CN/lazyload
app.use(Lazyload, {
  lazyComponent: true
})
app.use(i18n)
app.mount('#app')
