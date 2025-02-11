<script setup lang="ts">
import { ref } from 'vue'
import { type TypeUserBagItem, getItemLevelColor } from '@/stores/userBagStore'
import { computed } from 'vue'
import ItemInfo from '@/components/form/ItemInfo/ItemInfo.vue'
import { api_putOffArmor } from '@/api/user/apiUserArmor'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import audio from '@/utils/audio'
import { closeToast, showFailToast, showLoadingToast } from 'vant'
import useStore from '@/stores/stores'

const store = useStore()
const color = computed(() => {
  return itemInfo.value && getItemLevelColor(itemInfo.value.itemLevel)
})
const show = ref(false)
const itemInfo = ref<TypeUserBagItem>()
const openDialog = (item: TypeUserBagItem) => {
  itemInfo.value = item
  show.value = true
}

const putOffLoading = ref(false)
const onPutOffArmor = async (id: string) => {
  if (putOffLoading.value) return
  putOffLoading.value = true
  showLoadingToast({ message: '卸载中...' })
  const [err, res] = await api_putOffArmor(id)
  closeToast()
  putOffLoading.value = false
  if (err || !res) return
  if (res.code !== 0) {
    showFailToast({ message: res.msg, position: 'top' })
    return
  }
  show.value = false
  audio.play('equip')
  store.userBag.getUserBagItems()
  store.userArmor.getUserArmor()
}
defineExpose({ openDialog })
</script>

<template>
  <div>
    <van-dialog
      v-model:show="show"
      close-on-click-overlay
      style="
        --van-dialog-background: rgb(19, 20, 31);
        --van-text-color: #0070dd;
        --van-dialog-message-padding: 9px;
        --van-dialog-header-padding-top: 0px;
        --van-dialog-radius: 6px;
        --van-dialog-transition: 0.1s;
      "
      class="border-2 border-solid !top-[200px]"
      :style="{
        'border-color': color,
        'box-shadow': '1px 1px 15px ' + color + ' !important'
      }"
    >
      <template #title></template>
      <template #default>
        <div class="p-2.5" v-if="itemInfo">
          <ItemInfo :itemInfo="itemInfo" :show-diff-armor="false" />
        </div>
      </template>
      <template #footer>
        <PrimaryButton1
          text="&nbsp;&nbsp;卸下&nbsp;&nbsp;"
          v-if="itemInfo"
          @click="onPutOffArmor(itemInfo.itemId)"
          class="translate-y-[0px] !h-8 w-[100px]"
        />
      </template>
    </van-dialog>
  </div>
</template>

<style scoped lang="less"></style>
