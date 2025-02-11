<script setup lang="ts">
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import useStore from '@/stores/stores'

const store = useStore()
const onClick = () => {
  store.userConfig.changeSound()
}
</script>

<template>
  <div class="h-11 px-2.5">
    <PrimaryButton1
      :text="`音效：已${store.userConfig.userConfig.sound ? '开启' : '关闭'}`"
      @click="onClick"
    />
  </div>
</template>
