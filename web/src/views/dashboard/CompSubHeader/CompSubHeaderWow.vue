<script setup lang="ts">
import png7 from '@/assets/img/7.png'
import png10 from '@/assets/img/10.png'
import png11 from '@/assets/img/11.png'
import png12 from '@/assets/img/12.png'
import jpg1 from '@/assets/img/1.jpg'
import { useRouter } from 'vue-router'

const router = useRouter()
const to = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div>
    <van-grid
      :border="false"
      :gutter="10"
      square
      :column-num="7"
      style="--van-grid-item-content-padding: 0px; --van-grid-item-content-background: transparent"
    >
      <van-grid-item @click="to('/friendList')">
        <van-image :src="png12" class="grid-item" />
      </van-grid-item>
      <van-grid-item> </van-grid-item>
      <van-grid-item> </van-grid-item>
      <van-grid-item> </van-grid-item>
      <van-grid-item> </van-grid-item>
      <van-grid-item> </van-grid-item>
      <van-grid-item @click="to('/ah')">
        <van-image :src="png10" class="grid-item" />
      </van-grid-item>
    </van-grid>
    <van-grid
      :border="false"
      :gutter="10"
      square
      :column-num="7"
      style="--van-grid-item-content-padding: 0px; --van-grid-item-content-background: transparent"
    >
      <van-grid-item @click="to('/musicBox')">
        <van-image :src="jpg1" class="grid-item" />
      </van-grid-item>
      <van-grid-item> </van-grid-item>
      <van-grid-item> </van-grid-item>
      <van-grid-item> </van-grid-item>
      <van-grid-item> </van-grid-item>
      <van-grid-item> </van-grid-item>
      <van-grid-item @click="to('/classRoom')">
        <div
          class="rounded-lg overflow-hidden w-[calc(100%-0px)] h-[calc(100%-0px)] border border-solid border-[#767675]"
        >
          <van-image :src="png11" class="grid-item" />
        </div>
      </van-grid-item>
    </van-grid>
    <van-grid
      :border="false"
      :gutter="10"
      square
      :column-num="7"
      style="--van-grid-item-content-padding: 0px; --van-grid-item-content-background: #15171e"
    >
      <van-grid-item @click="to('/userRide')">
        <van-image :src="png7" class="grid-item" />
      </van-grid-item>
    </van-grid>
  </div>
</template>

<style scoped>
.grid-item {
  width: 100%;
  border-radius: 7px;
  cursor: pointer;
  overflow: hidden;
}
</style>
