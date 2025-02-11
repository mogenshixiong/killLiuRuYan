<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import useStore from '@/stores/stores'
import UserRideItem from './UserRideItem.vue'
import { type TypeUserRideItem } from '@/stores/userRideStore'
import { onMounted } from 'vue'

const store = useStore()
const list = computed(() => store.userRide.userRides)
const showRide = ref<TypeUserRideItem>()

onMounted(() => {
  if (list.value) {
    showRide.value = list.value[list.value.length - 1]
  }
})

// fixBug:获得第一个坐骑的时候 showRide 没有值
watch(
  () => list.value.length,
  (newValue) => {
    if (newValue > 0) {
      showRide.value = list.value[list.value.length - 1]
    }
  }
)
</script>

<template>
  <div>
    <div class="p-2 text-center text-[#ffd100]">马厩({{ list.length }}/200)</div>
    <div v-if="!showRide || !list || list.length === 0" class="text-center text-[#e5e7eb]">
      暂无坐骑
    </div>
    <van-sticky>
      <div
        v-if="showRide"
        class="mx-3 p-2 border border-[#ffd100] rounded-lg overflow-hidden text-center bg-[#181818]"
      >
        <div class="h-5 text-center">{{ showRide.rideName }}</div>
        <van-image
          class="transform-gpu h-60 w-60"
          :src="`/wowResource/img/item/${showRide.rideId}_big.png?v=1`"
          style="
            --van-image-placeholder-background: #181818;
            --van-image-placeholder-text-color: white;
          "
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
          <template v-slot:error>暂无图片</template>
        </van-image>
        <!-- <van-image
          :src="`/wowResource/img/item/${showRide.rideId}_big.png`"
          class="h-60 transform-gpu"
        /> -->
      </div>
    </van-sticky>
    <van-grid
      :border="false"
      :gutter="0"
      :column-num="7"
      square
      class="m-3"
      style="--van-grid-item-content-padding: 0px; --van-grid-item-content-background: #15171e"
    >
      <van-grid-item
        v-for="item in list.slice().reverse()"
        :key="item.rideId"
        style="--van-grid-item-content-padding: 0px"
      >
        <UserRideItem
          :item="item"
          v-if="showRide"
          :class="{
            '!border-2': showRide.rideId === item.rideId,
            '!border-[#ffd100]': showRide.rideId === item.rideId
          }"
          @click="showRide = item"
        />
      </van-grid-item>
    </van-grid>
  </div>
</template>
