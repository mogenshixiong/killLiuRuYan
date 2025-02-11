<script setup lang="ts">
import { showToast } from 'vant'
import { ref } from 'vue'
import type { GetUserListByPageResUserVO } from '@/api/user/apiUser'
import { api_getUserListByPage } from '@/api/user/apiUser'
import UserManageListItem from './UserManageListItem.vue'
import UserManageUserFormDialog from './UserManageUserFormDialog.vue'

const UserManageUserFormDialogRef = ref<InstanceType<typeof UserManageUserFormDialog> | null>()
const userList = ref<GetUserListByPageResUserVO[]>([])
const total = ref(0)
const query = ref({
  username: '',
  nickName: '',
  pageNum: 1,
  pageSize: 10
})
const loading = ref(false) // 是否处于加载状态，加载过程中不触发 load 事件
const finished = ref(false) // 是否已加载完成，加载完成后不再触发 load 事件
const refreshing = ref(false) // 是否执行了下拉刷新动作

const onRefresh = () => {
  // 下拉刷新时 refreshing.value === true
  query.value.pageNum = 1
  finished.value = false
  loading.value = true
  userList.value = []
  total.value = 0
  refreshing.value = false
  onLoad()
}

// 滚动条与底部距离小于 offset 时触发
const onLoad = async () => {
  const [err, res] = await api_getUserListByPage(query.value)
  loading.value = false
  if (err || !res) {
    finished.value = true
    return
  }
  if (res.code !== 0 || !res.data) {
    showToast(res.msg || '请求失败' + res.code)
    finished.value = true
    return
  }
  query.value.pageNum++
  userList.value = [...userList.value, ...res.data.userList]
  total.value = res.data.total

  if (userList.value.length >= total.value) {
    finished.value = true // no more data
  }
}
const onClickBack = () => history.back()
// const onClickRight = () => {
//   UserManageUserFormDialogRef.value?.openDialog('add')
// }
// right-text="add"
// @click-right="onClickRight"
</script>
<template>
  <div>
    <van-nav-bar :title="`user manage(${total})`" left-arrow @click-left="onClickBack" />
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      style="min-height: calc(100vh - var(--van-nav-bar-height))"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="300"
      >
        <UserManageListItem :item v-for="item in userList" :key="item.id" />
      </van-list>
    </van-pull-refresh>
    <van-back-top bottom="80px" immediate />
    <UserManageUserFormDialog ref="UserManageUserFormDialogRef" />
  </div>
</template>

<style scoped></style>
