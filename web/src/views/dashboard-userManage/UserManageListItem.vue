<script setup lang="ts">
import type { GetUserListByPageResUserVO } from '@/api/user/apiUser'

const item = defineModel<GetUserListByPageResUserVO>('item', { default: {} })
</script>

<template>
  <div class="item">
    <div>
      id:<van-tag v-if="item.id" type="primary" size="large">{{ item.id }}</van-tag>
    </div>
    <div>
      userType:<van-tag v-if="item.userType" type="primary" size="large">{{
        item.userType
      }}</van-tag>
    </div>
    <div>
      username:<van-tag v-if="item.username" type="primary" size="large">{{
        item.username
      }}</van-tag>
    </div>
    <!-- <div>
      nickName:<van-tag v-if="item.nickName" type="primary" size="large">{{
        item.nickName
      }}</van-tag>
    </div> -->
    <!-- <div>
      updateTime:<van-tag v-if="item.updateTime" type="primary" size="medium">{{
        item.updateTime
      }}</van-tag>
    </div> -->
  </div>
</template>

<style scoped>
.item {
  min-height: 50px;
  /* background-color: purple; */
  /* border-radius: 5px; */
  /* display: flex; */
  padding: 5px 10px;
  line-height: 30px;
  /* justify-content: center;
  align-items: center; */
  font-size: 20px;
  color: black;
  text-align: left;
  border-top: 1px solid #ddd;
  margin-bottom: 10px;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
