<script lang="ts" setup>
import { ref } from 'vue'
import {
  api_getChestProbabilityService,
  type TypeChestProbability,
  type TypeChestAwardType
} from '@/api/chest/apiChest'
// import NavBar from '@/components/layout/NavBar/NavBar.vue'
import { formatGold } from '@/utils/format'
import { getitemTypeName } from '@/stores/userBagStore'
import { useWindowSize } from '@vant/use'

const { height } = useWindowSize()
const active = ref(0)
const list = ref<TypeChestProbability[]>()
// const totalProbability = ref(0)
const allChestType = ref<TypeChestAwardType[]>()

const getChestProbability = async () => {
  const [err, res] = await api_getChestProbabilityService()
  if (err || !res) return
  if (res.code !== 0 || !res.data) return
  allChestType.value = res.data.chestAwardType
  list.value = res.data.chestAward.sort(
    (a: TypeChestProbability, b: TypeChestProbability) => a.prob - b.prob
  )
  list.value.forEach((i: TypeChestProbability) => {
    if (i.awardType === 'gold') {
      i.name = `${i.name}*${formatGold(i.awardCount)}`
    } else {
      i.name = `${i.name}*${i.awardCount}`
    }
  })
  // totalProbability.value = res.data.chestAward.reduce(
  //   (p: number, c: TypeChestProbability) => p + c.prob,
  //   0
  // )
}
getChestProbability()
</script>
<template>
  <div>
    <!-- swipeable  -->
    <van-tabs
      v-model:active="active"
      :style="{ '--app-height': height + 'px' }"
      style="
        --van-tabs-nav-background: black;
        --van-tab-text-color: white;
        --van-tab-active-text-color: #ffd100;
        --van-tabs-bottom-bar-color: #ffd100;
      "
      sticky
    >
      <van-tab
        v-for="chest in allChestType"
        :key="chest.awardType"
        :title="`${getitemTypeName(chest.awardType)}`"
      >
        <div
          class="min-h-[calc(var(--app-height)-var(--van-tabs-line-height)-var(--van-tabbar-height))] px-2.5"
        >
          <div class="p-1 my-1">
            <div class="text-center mb-2.5">
              开出{{ getitemTypeName(chest.awardType) }}的概率为：{{
                Number(
                  (chest.prob /
                    (allChestType || []).map((i) => i.prob).reduce((p, c) => p + c, 0)) *
                    100
                ).toFixed(5) + '%'
              }}
            </div>
            <div>
              <span
                v-for="(item, index) in list?.filter((i) => i.awardType === chest.awardType)"
                :key="index"
                >【{{ item.name }}概率为：{{
                  Number(
                    (item.prob /
                      (list?.filter((i) => i.awardType === chest.awardType) || [])
                        .map((i) => i.prob)
                        .reduce((p, c) => p + c, 0)) *
                      100
                  ).toFixed(5) + '%'
                }}】</span
              >
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <!-- <NavBar title="抽奖概率" />
    <div class="px-4 mb-1 text-sm">Tips：概率会定时更新，如有疑问找管理员反馈。</div>
    <van-cell-group style="--van-cell-text-color: #fff; --van-cell-background: #15171e">
      <van-cell title="物品" value="概率" />
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.name"
        :value="(item.prob / totalProbability).toFixed(15)"
      />
    </van-cell-group> -->
    <van-back-top bottom="80px" immediate />
  </div>
</template>
