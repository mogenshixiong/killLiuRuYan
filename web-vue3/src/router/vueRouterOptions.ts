import { createWebHashHistory, type RouterOptions, type RouterScrollBehavior } from 'vue-router'
import audio from '@/utils/audio'
// import useStore from '@/stores/stores'

declare module 'vue-router' {
  // https://router.vuejs.org/zh/guide/advanced/meta.html#TypeScript
  interface RouteMeta {
    /** 是否允许不登录访问当前页面 */
    unlogin?: boolean
    /** 是否在当前页面显示背景图片 */
    showBg?: boolean
    /** 允许浮动返回 */
    floatingBack?: true
    /** 进入到该页面后是否自动开始获取消息 */
    startGetMessage?: boolean
  }
}

export const routerOptions: RouterOptions = {
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: ((_to, _from, _savedPosition) => {
    // https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
    // return { top: 0 } // 始终滚动到顶部
    if (_savedPosition) {
      return _savedPosition
    } else {
      return { top: 0 }
    }
  }) as RouterScrollBehavior,
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      beforeEnter: (_to: any, _from: any) => {
        audio.play('openBag')
        return true
      },
      component: () => import('@/views/userInfo/UserInfo.vue')
    },
    {
      path: '/stage',
      name: 'stage',
      beforeEnter: (_to: any, _from: any) => {
        audio.play('openBag')
        return true
      },
      component: () => import('@/views/stage/list/StageList.vue')
    },
    {
      path: '/classRoom',
      name: 'classRoom',
      beforeEnter: (_to: any, _from: any) => {
        audio.play('forLight')
        return true
      },
      component: () => import('@/views/classRoom/ClassRoom.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        showBg: true, // 显示背景图片
        startGetMessage: true // 允许聊天消息
      },
      beforeEnter: (_to: any, _from: any) => {
        audio.play('openBag')
        return true
      },
      component: () => import('@/views/dashboard/Dashboard.vue')
    },
    {
      path: '/bag',
      name: 'bag',
      meta: {},
      beforeEnter: (_to: any, _from: any) => {
        audio.play('openBag')
        return true
      },
      component: () => import('@/views/bag/BagList.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      beforeEnter: (_to: any, _from: any) => {
        audio.play('openBag')
        return true
      },
      component: () => import('@/views/settings/SettingsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        unlogin: true // 允许不登录访问
      },
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        floatingBack: true // 允许浮动返回
      },
      component: () => import('@/views/about/AboutList.vue')
    },
    {
      path: '/userRide',
      name: 'userRide',
      component: () => import('@/views/userRide/UserRide.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      meta: {
        startGetMessage: true // 允许聊天消息
      },
      component: () => import('@/views/chat/ChatView.vue')
    },
    {
      path: '/friendList',
      name: 'friendList',
      component: () => import('@/views/friendList/FriendList.vue')
    },
    {
      path: '/ah',
      name: 'ah',
      beforeEnter: (_to: any, _from: any) => {
        audio.play('timeIsGold')
        return true
      },
      component: () => import('@/views/ah/AhView.vue')
    },
    // {
    //   path: '/orderLevel',
    //   name: 'orderLevel',
    //   component: () => import('@/views/orderLevel/OrderLevel.vue')
    // },
    // {
    //   path: '/orderGold',
    //   name: 'orderGold',
    //   component: () => import('@/views/orderGold/OrderGold.vue')
    // },
    {
      path: '/fortress',
      name: 'fortress',
      component: () => import('@/views/fortress/FortressView.vue')
    },
    {
      path: '/musicBox',
      name: 'musicBox',
      component: () => import('@/views/musicBox/MusicBox.vue')
    },

    {
      path: '/gallery',
      name: 'gallery',
      meta: {
        floatingBack: true // 允许浮动返回
      },
      component: () => import('@/views/gallery/GalleryView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/dashboard-search/SearchView.vue')
    },
    {
      path: '/story',
      name: 'story',
      component: () => import('@/views/story/StoryView.vue')
    },
    {
      path: '/notice',
      name: 'notice',
      meta: {
        floatingBack: true // 允许浮动返回
      },
      component: () => import('@/views/notice/NoticeView.vue')
    },
    {
      path: '/storyDetail',
      name: 'storyDetail',
      component: () => import('@/views/story/chapter/StoryDetail.vue')
    },

    {
      path: '/theme',
      name: 'theme',
      component: () => import('@/views/dashboard-theme/ThemePalette.vue')
    },
    {
      path: '/userManage',
      name: 'userManage',
      component: () => import('@/views/dashboard-userManage/UserManage.vue')
    },

    {
      path: '/chest',
      name: 'chest',
      meta: {},
      component: () => import('@/views/chest/ChestView.vue')
    },
    {
      path: '/chestProbability',
      name: 'chestProbability',
      meta: {
        floatingBack: true // 允许浮动返回
      },
      component: () => import('@/views/chestProbability/ChestProbability.vue')
    },
    {
      path: '/:pathMatch(.*)', // 放在最后 匹配任意路由
      redirect: '/'
    }
  ]
}
