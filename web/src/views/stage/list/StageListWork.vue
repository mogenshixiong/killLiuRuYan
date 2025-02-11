<script lang="ts" setup>
import { ref } from 'vue'
import {
  api_stageBattle,
  api_getStageConfig,
  type StageConfig,
  type StageConfigItem
} from '@/api/stage/apiStage'
import { showConfirmDialog } from 'vant'
import NavBar from '@/components/layout/NavBar/NavBar.vue'
import { t } from '@/i18n'
import useStore from '@/stores/stores'

const store = useStore()
const stage = ref<StageConfig>()
const getStageConfig = async () => {
  const [err, res] = await api_getStageConfig()
  if (err || !res) return
  if (res.code !== 0 || !res.data) return
  stage.value = res.data
}
getStageConfig()

const battle = async (item: StageConfigItem): Promise<boolean> => {
  const [err, res] = await api_stageBattle(item.stageId)
  if (err || !res) return false
  if (res.code !== 0 || !res.data) return false
  showConfirmDialog({
    title: `${res.msg}:${res.data.res}`,
    message: res.data.battleLog.join('\n') + '\n' + res.data.award,
    closeOnClickOverlay: true,
    showConfirmButton: false,
    confirmButtonText: '关闭',
    showCancelButton: false,
    allowHtml: true,
    width: '100%',
    className: '!w-full !mx-0 !max-w-[100vw] !rounded-none ',
    overlayClass:
      'relative after:content-["点击任意位置关闭"] after:absolute after:top-1 after:text-center after:w-full after:text-slate-300'
  })
  store.userBag.updateBatItemCount(res.data.bagItem)
  return true
}
</script>

<template>
  <div class="translate-y-px mx-[1px]">
    <NavBar :title="t('stage')" />
    <div
      class="px-2.5 py-5 rounded-sm border border-solid border-gray-500 cursor-pointer mb-1"
      v-for="(item, index) in stage?.list"
      :key="index"
      @click="battle(item)"
      :class="{
        'bg-pink-50': item.npcPower >= store.userAttribute.userPower
      }"
    >
      {{ item.stageName }}[{{ `Power:${item.npcPower}` }}][award:{{ item.chestName }}*{{
        item.chestCount
      }}]
    </div>
  </div>
</template>

<style scoped lang="less"></style>
