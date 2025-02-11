<script lang="ts" setup>
import { ref } from 'vue'
import {
  api_stageBattle,
  api_getStageConfig,
  type StageConfig,
  type StageConfigItem
} from '@/api/stage/apiStage'
import { showNotify, closeNotify } from 'vant'
import NavBar from '@/components/layout/NavBar/NavBar.vue'
import { t } from '@/i18n'
import useStore from '@/stores/stores'
import audio from '@/utils/audio'
import StageItem from './StageItem.vue'

const store = useStore()
const stage = ref<StageConfig>()
const getStageConfig = async () => {
  const [err, res] = await api_getStageConfig()
  if (err || !res) return
  if (res.code !== 0 || !res.data) return
  stage.value = res.data
}
getStageConfig()

const battleLoading = ref(false)
const _battle = async (item: StageConfigItem) => {
  if (battleLoading.value) return
  audio.play('sword1')
  battleLoading.value = true
  const [err, res] = await api_stageBattle(item.stageId)
  setTimeout(() => {
    battleLoading.value = false
  }, 500)
  if (err || !res) return
  if (res.code !== 0 || !res.data) return
  // TODO 未完成
  showNotify({
    // title: `${res.msg}:${res.data.res}`,
    message: res.data.battleLog.join('\n') + '\n' + res.data.award,
    duration: 0,
    className: 'h-screen',
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'red',
    onClick: closeNotify
  })
  store.userBag.updateBatItemCount(res.data.bagItem)
  return
}
</script>

<template>
  <div class="translate-y-px mx-[1px]">
    <NavBar :title="t('stage')" style="" />
    <div class="text-[#ffd100] px-2.5 text-center">世界地图</div>
    <div>
      <StageItem :item="item" v-for="(item, index) in stage?.list" :key="index" />
      <!-- @click="battle(item)" -->
    </div>
  </div>
</template>

<style scoped lang="less"></style>
