<script setup lang="ts">
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import router from '@/router/router'
import useStore from '@/stores/stores'
import { ref } from 'vue'
// import { ref } from 'vue'

const store = useStore()

const src = ref('')
const afterRead = ((
  file: { file: File; status: string; message: string; objectUrl: string; contetn: string },
  _obj: { name: number | string; index: number }
): void => {
  src.value = file.objectUrl
  store.userConfig.setBg(file.file)
  router.push('/')
}) as any
</script>

<template>
  <div class="h-11 px-2.5">
    <van-uploader :after-read="afterRead" class="cursor-pointer">
      <PrimaryButton1 text="自定义背景" />
    </van-uploader>
    <!-- <img :src="store.userConfig.userConfig.bg" class="max-h-20" /> -->
  </div>
</template>
