<script lang="ts" setup>
import { UserClassConfig } from '@/stores/userPlayerStore'
import { ref } from 'vue'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import { api_changeUserPlayerClass } from '@/api/user/apiUserPlayer'
import { showFailToast, showSuccessToast } from 'vant'
import useStore from '@/stores/stores'
import audio from '@/utils/audio'

const store = useStore()
const getImageUrl = (item: any) => {
  return new URL(`/src/assets/img/class_${item.value}.png`, import.meta.url).href
}

const active = ref()
const chooseClass = (item: (typeof UserClassConfig)[number]) => {
  active.value = item
}

const loading = ref(false)
const onChooseClass = async () => {
  if (!active.value) return
  if (!active.value.value) return
  if (loading.value) return
  loading.value = true
  const [err, res] = await api_changeUserPlayerClass(active.value.value)
  loading.value = false
  if (err || !res) return
  if (res.code !== 0) {
    showFailToast({ message: res.msg, position: 'top' })
    return
  }
  showSuccessToast({ message: res.msg, position: 'top' })
  store.userPlayer.getUserPlayerInfo()
  store.userBag.getUserBagItems()
  audio.play('levelUp')
}
</script>

<template>
  <div class="translate-y-px mx-[1px]">
    <div class="text-[#ffd100] px-2.5 text-center h-5">职业大厅</div>
    <div class="p-2.5">请选择职业，将消耗一张转职证明。</div>
    <van-grid
      :border="false"
      :gutter="10"
      square
      :column-num="6"
      style="--van-grid-item-content-padding: 0px; --van-grid-item-content-background: transparent"
    >
      <van-grid-item v-for="item in UserClassConfig" :key="item.value" @click="chooseClass(item)">
        <van-image :src="getImageUrl(item)" class="cursor-pointer" />
      </van-grid-item>
    </van-grid>

    <div class="px-2.5 font-bold text-lg" :class="`cc-${active?.value}`">
      {{ active?.name }}
    </div>
    <div class="p-2.5 text-[#1eff00]">{{ active?.desc }}</div>
    <div class="p-2.5" v-if="active">
      <PrimaryButton1
        text="&nbsp;&nbsp;确定转职&nbsp;&nbsp;"
        @click="onChooseClass"
        class="translate-y-[0px] !h-8 w-[100px] left-[50%] translate-x-[-50%]"
      />
    </div>
  </div>
</template>

<style scoped lang="less"></style>
