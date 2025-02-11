<script setup lang="ts">
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import { type StageConfigItem } from '@/api/stage/apiStage'
import useStore from '@/stores/stores'
import { api_startStage, api_endStage } from '@/api/stage/apiStage'
import { onUnmounted, ref } from 'vue'
import { formatStageTime } from '@/utils/format'
import { closeNotify, showNotify, showToast } from 'vant'
import audio from '@/utils/audio'

const store = useStore()
interface Props {
  item: StageConfigItem
}
const props = withDefaults(defineProps<Props>(), {})

const updateStageTime = () => {
  if (store.userPlayer.userPlayerInfo) {
    onStageTime.value = formatStageTime(store.userPlayer.userPlayerInfo.startStageTime)
  } else {
    onStageTime.value = ''
  }
}
const onStageTime = ref('')
updateStageTime()
const timer = setInterval(updateStageTime, 1000)
onUnmounted(() => {
  timer && clearInterval(timer)
})

const loading = ref(false)
const onClickStartStage = async () => {
  if (!props.item) return
  loading.value = true
  const [err, res] = await api_startStage(props.item.stageId)
  setTimeout(() => {
    loading.value = false
  }, 500)
  if (err || !res) return
  if (res.code !== 0 || !res.data) {
    showToast(res.msg)
    return
  }
  if (!res.data.res) {
    audio.play('die')
    showNotify({
      message: res.data.battleLog.join('\n') + '\n' + res.msg,
      duration: 0,
      className: 'h-screen',
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'red',
      onClick: closeNotify
    })
    return
  }
  showToast('挂机开始...')
  audio.play('readyToWork')
  store.userPlayer.getUserPlayerInfo()
}

const endLoading = ref(false)
const onClickEndStage = async () => {
  if (!props.item) return
  endLoading.value = true
  const [err, res] = await api_endStage(props.item.stageId)
  setTimeout(() => {
    endLoading.value = false
  }, 500)
  if (err || !res) return
  if (res.code !== 0 || !res.data) {
    showToast(res.msg)
    return
  }
  showToast({
    message: `${res.msg}\n(获得物品：${res.data.chestItemName}*${res.data.chestCount})`,
    duration: 4000
  })
  audio.play('finishTask')
  store.userPlayer.getUserPlayerInfo()
  store.userBag.getUserBagItems()
}
</script>

<template>
  <div class="p-1 border-[0.5px] border-[#ffd100] rounded-md my-1">
    <van-cell
      :border="false"
      style="
        --van-cell-background: transparnet;
        --van-cell-text-color: white;
        --van-cell-line-height: 18px;
        --van-cell-border-color: none;
        --van-cell-vertical-padding: 4px;
        --van-cell-horizontal-padding: 4px;
      "
    >
      <template #icon>
        <div
          class="relative overflow-hidden w-10 h-10 rounded-[4px] border border-solid z-[1] mr-2 border-[#0070dd]"
        >
          <van-image
            :src="`/wowResource/img/stage/${props.item.stageId}.png?v=2`"
            class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
          />
        </div>
      </template>
      <template #title>
        <div
          :class="{
            'text-[red]':
              props.item.npcPower >=
              store.userAttribute.userPower +
                (
                  (store.userArmor.userArmor || []).map(
                    (i) => (i.sfk || 0) + (i.ac || 0) + (i.ap || 0) + (i.hp || 0) + (i.mdef || 0)
                  ) || []
                ).reduce((p, c) => (p || 0) + (c || 0), 0)
          }"
        >
          {{ props.item.stageName }}
          <span class="text-xs">({{ props.item.npcPower }})</span>
        </div>
        <div class="text-xs">产出:{{ props.item.chestName }}</div>
        <!-- <div class="text-xs"></div> -->
        <!-- {{ `推荐战力:${props.item.npcPower}` }}， -->
        <!-- *{{ props.item.chestCount }} -->
        <div
          class="text-xs"
          v-if="
            store.userPlayer.userPlayerInfo &&
            store.userPlayer.userPlayerInfo.stageId == props.item.stageId
          "
        >
          已挂机:{{ onStageTime }}
        </div>
      </template>
      <template #right-icon>
        <PrimaryButton1
          text="&nbsp;&nbsp;开始挂机&nbsp;&nbsp;"
          v-if="store.userPlayer.userPlayerInfo && !store.userPlayer.userPlayerInfo.stageId"
          @click="onClickStartStage"
          class="translate-y-[0px] !h-8 w-[120px]"
        />
        <PrimaryButton1
          text="&nbsp;&nbsp;结束挂机&nbsp;&nbsp;"
          v-else-if="
            store.userPlayer.userPlayerInfo &&
            store.userPlayer.userPlayerInfo.stageId == props.item.stageId
          "
          @click="onClickEndStage"
          class="translate-y-[0px] !h-8 w-[120px]"
        />
      </template>
    </van-cell>
  </div>
</template>

<style scoped lang="less"></style>
