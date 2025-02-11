<script setup lang="ts">
// import { showNotify, showToast } from 'vant'
import { useRouter } from 'vue-router'
import { t } from '@/i18n'
import { back } from '@/utils/utils'

const router = useRouter()
const to = (page: string) => {
  router.push({ path: '/storyDetail', query: { page } })
}
const onClickBack = () => back(router)
</script>
<template>
  <div style="padding: 10px">
    <van-nav-bar :title="t('《锚点生存指南》')" left-arrow @click-left="onClickBack" />
    <van-space direction="vertical" fill>
      <div class="item" @click="to('1')">
        <div>链接</div>
        <div style="color: #999; font-size: 12px; line-height: 15px">
          最后更新日期：2023年04月03日
          <!-- 发条狐狸 于1年前修改了此页面。 -->
        </div>
      </div>
      <!-- <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div> -->
      <!-- <van-button type="primary" block>按钮</van-button>
      <van-button type="primary" block>按钮</van-button>
      <van-button type="primary" block>按钮</van-button>-->
    </van-space>
  </div>
</template>

<style scoped>
.item {
  /* height: 30px; */
  /* background-color: purple; */
  border-radius: 0px;
  /* display: flex; */
  padding: 5px 0px;
  line-height: 30px;
  /* justify-content: center;
  align-items: center; */
  font-size: 16px;
  text-align: left;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}
</style>
