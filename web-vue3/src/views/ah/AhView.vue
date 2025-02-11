<script lang="ts" setup>
import AhForm from './AhForm.vue'
import AhList from './AhList.vue'
import AhListMy from './AhListMy.vue'
import { ref } from 'vue'
import { useWindowSize } from '@vant/use'

// import CompTabbar from './CompTabbar/CompTabbar.vue'
// import useStore from '@/stores/stores'
const { height } = useWindowSize()
// const store = useStore()
const active = ref(0)
const AhFormRef = ref()
const AhListRef = ref()
const AhListMyRef = ref()
</script>

<template>
  <div>
    <!-- swipeable 加上这个滑动之后，有BUG。点击item时 tabs出现了滑动的操作 -->
    <van-tabs
      v-model:active="active"
      :style="{ '--app-height': height + 'px' }"
      style="
        --van-tabs-nav-background: black;
        --van-tab-text-color: white;
        --van-tab-active-text-color: #ffd100;
        --van-tabs-bottom-bar-color: #ffd100;
      "
      sticky
    >
      <van-tab title="商品列表">
        <AhList
          ref="AhListRef"
          class="min-h-[calc(var(--app-height)-var(--van-tabs-line-height)-var(--van-tabbar-height))]"
        />
      </van-tab>
      <van-tab title="出售">
        <AhForm
          ref="AhFormRef"
          class="min-h-[calc(var(--app-height)-var(--van-tabs-line-height)-var(--van-tabbar-height))]"
        />
      </van-tab>
      <van-tab title="我的在售">
        <AhListMy
          ref="AhListMyRef"
          class="min-h-[calc(var(--app-height)-var(--van-tabs-line-height)-var(--van-tabbar-height))]"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>
