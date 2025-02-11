import {
  START_LOCATION,
  createRouter,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'
import { routerOptions } from './vueRouterOptions'
import useStore from '@/stores/stores'
import { isDev } from '@/utils/utils'

const router = createRouter(routerOptions)

router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const store = useStore()
    if (isDev) console.log(`from: ${from.fullPath} to: ${to.fullPath}`)
    if (from === START_LOCATION) {
      // 初始导航 (首次访问触发)
      if (isDev) document.title = 'vue3-ts-vite'
      await store.init()
      if (!store.user.isLogin) {
        // 未登录 重定向到登录页面
        if (to.path === '/login') {
          next()
        } else {
          next('/login')
        }
        return
      } else {
        // 已登录，访问登录页时跳转到首页去
        if (to.path === '/login') {
          next('/')
        }
      }
    }
    if (to.meta.startGetMessage) {
      store.chatMessage.startGetMessage()
    } else {
      store.chatMessage.stopGetMessage()
    }
    next()
  }
)

export default router
