<script setup lang="ts">
import { computed } from 'vue'
import NavBar from '@/components/layout/NavBar/NavBar.vue'
import { t } from '@/i18n'
import useStore from '@/stores/stores'
import { api_openChest } from '@/api/chest/apiChest'
import { closeToast, showFailToast, showSuccessToast } from 'vant'
import { type TypeUserBagItem } from '@/stores/userBagStore'

const store = useStore()
const list = computed(() => store.userBag.userBagItems)

const test = async (item: TypeUserBagItem) => {
  if (item.itemType !== 'chest') return
  closeToast()
  const [err, res] = await api_openChest(item.itemId)
  if (err || !res) return
  if (res.code !== 0 || !res.data) {
    showFailToast(res.msg)
    return
  }
  if (res.data.itemType === 'gold') {
    const g = Math.floor(res.data.itemCount / 10000)
    const s = Math.floor((res.data.itemCount - g * 10000) / 100)
    const c = res.data.itemCount - g * 10000 - s * 100
    showSuccessToast(`${g}金${s}银${c}铜`)
  } else {
    showSuccessToast(`${res.data.itemName}*${res.data.itemCount}`)
  }
  store.userBag.getUserBagItems()
  store.userPlayer.getUserPlayerInfo()
}
</script>
<template>
  <div class="translate-y-px mx-[1px]">
    <NavBar :title="t('bag')" />
    <div
      class="px-2.5 py-5 rounded-sm border border-solid border-gray-500 cursor-pointer mb-1"
      v-for="(item, index) in list"
      :key="index"
      @click="test(item)"
    >
      {{ item.itemName }}{{ `*${item.itemCount}` }}
    </div>
    <van-back-top bottom="80px" immediate />
  </div>
</template>

<style scoped></style>
