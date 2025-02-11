<script setup lang="ts">
import { t } from '@/i18n'
import { useRouter } from 'vue-router'
// import img22 from '@/assets/img/22.jpg'

const router = useRouter()
const toPage = () => {
  router.push('/stage')
}
</script>
<!-- https://render.worldofwarcraft.com/tw/zones/throne-of-thunder-small.jpg -->
<!-- https://render.worldofwarcraft.com/tw/zones/terrace-of-endless-spring-small.jpg -->
<!-- https://render.worldofwarcraft.com/tw/zones/icecrown-citadel-small.jpg -->
<!-- backdrop-blur-sm -->
<template>
  <div
    style="padding: 10px"
    class="mx-[10px] h-[110px] w-[calc(100%-20px)] bg-[url('https://render.worldofwarcraft.com/tw/zones/icecrown-citadel-small.jpg')] bg-cover bg-no-repeat bg-center rounded-[10px] border-2 border-solid border-[#373737] cursor-pointer"
    @click="toPage"
  >
    <div class="mg-text-gold -mt-[2px]">{{ t('stage') }}</div>
  </div>
</template>

<style scoped lang="less"></style>
