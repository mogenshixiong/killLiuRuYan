<script setup lang="ts">
import { ref } from 'vue'
import TabBar from '@/components/layout/TabBar/TabBar.vue'
import FloatingBack from '@/components/button/floatingBack/FloatingBack.vue'
import CreateUserPlayer from '@/components/dialog/createUserPlayer/CreateUserPlayer.vue'
import useStore from '@/stores/stores'
import { useWindowSize } from '@vant/use'
import { onMounted } from 'vue'
import type { ConfigProviderThemeVars } from 'vant'
import { isMobile } from '@/utils/utils'

/**
 * van-config-provider component
 * 通过这两个元素的高度和滚动条设置，禁用了整个页面的滚动条。
 * 改成了只让app元素内部产生滚动条，这样做的原因是保持滚动条行为的一致
 * 移动端页面滚动条滚动过快，有时会收起(隐藏)地址栏，这将导致视口高度随之变化，
 * 首页也出现了滚动条。非常影响用户体验。
 */
const { height, width } = useWindowSize()

const store = useStore()
const CreateUserPlayerRef = ref()

const tabbarShow = ref(false)

const themeVars = ref<ConfigProviderThemeVars>({
  tabbarHeight: '65px',
  backTopBackground: 'translate',
  backTopTextColor: '#ffd100',
  backTopRight: isMobile() ? '30px' : width.value / 2 - 480 / 2 - 40 + 'px',
  toastTextColor: '#ffd100'
})

onMounted(() => {
  tabbarShow.value = true
})
const toDom = ref('body')

setTimeout(() => {
  toDom.value = '#app'
}, 3000)
</script>

<template>
  <van-config-provider
    :theme-vars="themeVars"
    theme-vars-scope="global"
    class="sm:w-[480px] sm:m-auto sm:bg-contain overflow-hidden bg-fixed bg-top bg-no-repeat bg-cover bg-[#15171e] text-white"
    :style="{
      height: `${height - 1}px`, // PC端AH页面会出现外部纵向滚动条。
      'background-image': $route.meta.showBg ? `url(${store.userConfig.userConfig.bg})` : 'none'
    }"
  >
    <!-- :class="{
      'bg-slate-50': store.userConfig.userConfig.theme === 'work',
      'text-black': store.userConfig.userConfig.theme === 'work',
      'bg-[#15171e]': store.userConfig.userConfig.theme === 'wow',
      'text-white': store.userConfig.userConfig.theme === 'wow'
    }" -->
    <FloatingBack />
    <CreateUserPlayer ref="CreateUserPlayerRef" />
    <teleport :to="toDom" :disabled="false">
      <div>
        <!-- 需要移动的内容 -->
      </div>
    </teleport>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive>
            <Suspense :timeout="500">
              <component
                :is="Component"
                :key="$route.fullPath"
                class="overflow-auto"
                :style="{
                  height:
                    $route.path === '/login'
                      ? `${height}px`
                      : `calc(${height}px - ${themeVars.tabbarHeight})`
                }"
              />
              <template #fallback>
                <div class="mt-3 text-center">
                  正在加载中...
                </div>
              </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
    <!-- <TabBar v-show="tabbarShow" /> -->
    <TabBar v-show="tabbarShow && $route.path !== '/login'" />
  </van-config-provider>
</template>

<style scoped lang="less"></style>
