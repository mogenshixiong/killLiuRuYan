<script setup lang="ts">
import { isMobile } from '@/utils/utils'
import { useWindowSize } from '@vant/use'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const toPage = () => {
  router.push('/fortress')
}
const { width } = useWindowSize()

const imgWidth = computed(() => {
  if (isMobile()) {
    return width.value - 22
  } else {
    return 500 - 22
  }
})
</script>

<template>
  <div class="dashboard-view-item" @click="toPage">
    <div style="border-radius: 8px; overflow: hidden">
      <van-image
        block
        lazy-load
        width="100%"
        height="100px"
        :src="`https://picsum.photos/${imgWidth}/100`"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
        <template v-slot:error>failed</template>
      </van-image>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view-item {
  /* display: flex; */
  /* gap: 8px; */
  /* min-height: 80px; */
  padding: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 8px;
  /* background-image: url('@/assets/img/4.jpg'); */
  background-color: #1a150e;
  background-size: 100% auto;
  background-position: 0px -45px;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* border: 2px solid #8c690f;
  border: 2px solid #5f5a58; */
  border: 2px solid #373737;
}
.dashboard-view-item {
  padding: 0;
}
</style>
