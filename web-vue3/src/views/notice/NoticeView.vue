<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.beforeRouteEnter(to, from)
    })
  }
})
</script>

<script setup lang="ts">
import { t } from '@/i18n'
import NavBar from '@/components/layout/NavBar/NavBar.vue'
import { devLog } from '@/views/notice/devLog'
import useStore from '@/stores/stores'

const store = useStore()
const beforeRouteEnter = async (to: any, from: any) => {
  //每次进入这个页面的时候，存一下最新一条公告
  // 已实现：已读的通知则不在首页显示公告条
  store.userConfig.saveLastReadNotice(devLog[0].date + devLog[0].content)
}
defineExpose({ beforeRouteEnter })
</script>
<template>
  <div>
    <NavBar :title="t('开发者日志')" />
    <div class="text-[#ffd100] px-2.5 text-center">开发者日志</div>
    <van-space direction="vertical" fill>
      <div class="p-5">
        <div v-for="(item, index) in devLog" :key="index" class="mb-5">
          <div class="text-sm text-slate-400">{{ item.date }}</div>
          <div>{{ item.content }}</div>
        </div>
      </div>
    </van-space>
  </div>
</template>

<style scoped lang="less"></style>
