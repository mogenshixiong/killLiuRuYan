import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Demo',
  props: {
    msg: String
  },
  setup(props) {
    return () => (
      <div class="wrapper">
        <div class="inner">msg is {props.msg}</div>
      </div>
    )
  }
})

/**
使用demo
<script lang="tsx" setup>
import Demo from '@/components/Demo'

const DemoRef = ref()
const show = ref(false)
</script>

<template>
  <div @click="show = !show">显示/隐藏</div>
  <Demo msg="123" ref="DemoRef" v-if="show" />
</style>

 */
