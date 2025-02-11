<script lang="ts" setup>
import { ref } from 'vue'
import img9 from '@/assets/img/9.png'
import png1 from '@/assets/img/1.png'
import png2 from '@/assets/img/2.png'
import jpg1 from '@/assets/img/1.jpg'
import img18 from '@/assets/img/18.png'
import { useRouter } from 'vue-router'
import audio from '@/utils/audio'

const router = useRouter()
const to = (path: string) => {
  router.push(path)
  audio.play('pig')
}

const active = ref(0)

const config = [
  { src: jpg1, path: '/musicBox' },
  { src: png1, path: '/bag' },
  { src: png2, path: '/stage' },
  { src: img9, path: '/bag' },
  { src: img18, path: '/settings' }
]
</script>

<template>
  <van-tabbar
    v-model="active"
    style="
      --van-tabbar-background: transparent;
      --van-tabbar-item-active-background: transparent;
      --van-tabbar-item-text-color: #148eff;
      --van-tabbar-item-active-color: #148eff;
      --van-border-color: transparent;
    "
  >
    <van-tabbar-item v-for="(item, index) in config" :key="index">
      <!-- <van-image :src="item.src" class="cursor-pointer transform-gpu" /> -->
      <div class="border border-solid border-[#ffd100] overflow-hidden rounded-md -translate-y-0.5">
        <van-image
          :src="item.src"
          @click="to(item.path)"
          class="w-[calc(var(--van-tabbar-height)-4px)] cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
        />
      </div>
    </van-tabbar-item>
  </van-tabbar>
</template>
