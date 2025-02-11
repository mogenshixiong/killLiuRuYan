<script lang="ts" setup>
import img9 from '@/assets/img/9.png'
import jpg2 from '@/assets/img/2.jpg'
import png2 from '@/assets/img/2.png'
import png4 from '@/assets/img/4.png'
import img18 from '@/assets/img/18.png'
import { useRouter } from 'vue-router'
import { closeToast, showToast } from 'vant'
import useStore from '@/stores/stores'

const router = useRouter()
const store = useStore()
const to = (path: string) => {
  if (store.appLoading.value) {
    showToast('加载中...')
    return
  }
  closeToast()
  router.push(path)
}

const config = [
  { src: png4, path: '/userInfo' },
  { src: png2, path: '/stage' },
  { src: jpg2, path: '/' },
  { src: img9, path: '/bag' },
  { src: img18, path: '/settings', text: '设置' }
]
</script>

<template>
  <van-tabbar
    class="bg-center bg-no-repeat bg-cover sm:!w-[480px] sm:!m-auto sm:!left-[unset]"
    style="
      --van-tabbar-background: #15171e;
      --van-tabbar-item-active-background: #15171e;
      --van-border-color: #148eff;
      --van-border-color: transparent;
    "
  >
    <van-tabbar-item v-for="(item, index) in config" :key="index">
      <div class="-translate-y-0.5 overflow-hidden rounded-[8px]" @click="to(item.path)">
        <van-image
          :src="item.src"
          class="cursor-pointer transform-gpu w-[calc(var(--van-tabbar-height)-7px)]"
        />
      </div>
      <!-- <div class="overflow-hidden rounded-md border border-solid border-[#ffd100] -translate-y-0.5">
        <van-image
          :src="item.src"
          @click="$router.push(item.path)"
          class="w-[calc(var(--van-tabbar-height)-4px)] cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
        />
      </div> -->
    </van-tabbar-item>
  </van-tabbar>
</template>
