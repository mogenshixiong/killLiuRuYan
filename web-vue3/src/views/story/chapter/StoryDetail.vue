<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import P1 from './P1.vue'

const P1Ref = ref<InstanceType<typeof P1> | null>()
const pages = [P1Ref]

const onClickBack = () => history.back()
const route = useRoute()
const title = ref()
const page = route.query.page
onMounted(() => {
  const pageRef = pages.find((i) => i?.value?.page === page)
  if (pageRef) {
    title.value = pageRef.value?.title
  }
})
</script>
<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="onClickBack" />
    <div style="padding: 0 20px"><P1 ref="P1Ref" v-if="page === '1'" /></div>
  </div>
</template>
