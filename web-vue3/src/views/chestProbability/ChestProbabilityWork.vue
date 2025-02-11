<script lang="ts" setup>
import { ref } from 'vue'
import { api_getChestProbabilityService, type TypeChestProbability } from '@/api/chest/apiChest'
import NavBar from '@/components/layout/NavBar/NavBar.vue'
import { t } from '@/i18n'

const list = ref<TypeChestProbability[]>()
const totalProbability = ref(0)
const getChestProbability = async () => {
  const [err, res] = await api_getChestProbabilityService()
  if (err || !res) return
  if (res.code !== 0 || !res.data) return
  // list.value = res.data.sort((a: TypeChestProbability, b: TypeChestProbability) => a.prob - b.prob)
  // list.value.forEach((i: TypeChestProbability) => {
  //   const g = Math.floor(i.awardCount / 10000)
  //   const s = Math.floor((i.awardCount - g * 10000) / 100)
  //   const c = i.awardCount - g * 10000 - s * 100
  //   if (i.awardType === 'gold') {
  //     i.name = `${i.name}*${g}金${s}银${c}铜`
  //   } else {
  //     i.name = `${i.name}*${i.awardCount}`
  //   }
  // })
  // totalProbability.value = res.data.reduce((p: number, c: TypeChestProbability) => p + c.prob, 0)
}
getChestProbability()
</script>
<template>
  <div class="px-2.5">
    <NavBar :title="t('chest probability')" />
    <van-cell-group>
      <van-cell title="物品" value="概率" />
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.name"
        :value="(item.prob / totalProbability).toFixed(15)"
      />
    </van-cell-group>
  </div>
</template>
