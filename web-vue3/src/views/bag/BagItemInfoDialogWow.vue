<script setup lang="ts">
import { ref } from 'vue'
import useStore from '@/stores/stores'
import { type TypeUserBagItem, getItemLevelColor } from '@/stores/userBagStore'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import { api_openChest } from '@/api/chest/apiChest'
import { closeToast, showFailToast, showLoadingToast, showSuccessToast, showToast } from 'vant'
import { computed } from 'vue'
import { api_studyRide } from '@/api/user/apiUserRide'
import { onClickRename, showToastByAddItem, playAddItemAudio } from './bagItemInfoDialogWow'
import SellItemDialog from '@/views/bag/SellItemDialog.vue'
import ItemInfo from '@/components/form/ItemInfo/ItemInfo.vue'
import { api_putOnArmor } from '@/api/user/apiUserArmor'
import audio from '@/utils/audio'

const SellItemDialogRef = ref()
const onClickSell = (item: TypeUserBagItem) => {
  SellItemDialogRef.value.openDialog(item)
}

const color = computed(() => {
  return itemInfo.value && getItemLevelColor(itemInfo.value.itemLevel)
})
const newName = ref('')
const show = ref(false)
const itemInfoId = ref('')
const openDialog = (item: TypeUserBagItem) => {
  itemInfoId.value = item.itemId
  show.value = true
}
const itemInfo = computed<TypeUserBagItem | undefined>(() => {
  return store.userBag.userBagItems.find((item) => item.itemId === itemInfoId.value)
})

const store = useStore()
const openChestLoading = ref(false)
const onClickOpenChest = async (item: TypeUserBagItem) => {
  if (item.itemType !== 'chest') return
  closeToast()
  if (openChestLoading.value) return
  openChestLoading.value = true
  const [err, res] = await api_openChest(item.itemId)
  setTimeout(() => {
    openChestLoading.value = false
  }, 500)
  if (err || !res) return
  if (res.code !== 0 || !res.data) {
    showFailToast({ message: res.msg, position: 'top' })
    return
  }
  playAddItemAudio(res.data.itemType)
  showToastByAddItem(res.data)
  updateUser()
}

const isAutoOpenChest = ref(false)
const onClickOpenChestByAuto = async (item: TypeUserBagItem) => {
  if (item.itemType !== 'chest') return
  isAutoOpenChest.value = !isAutoOpenChest.value
  if (openChestLoading.value) return
  openChestLoading.value = true

  for (let index = 0; index < item.itemCount; index++) {
    if (show.value === false || isAutoOpenChest.value === false) {
      updateUser()
      openChestLoading.value = false
      isAutoOpenChest.value = false
      break
    }
    const [err, res] = await api_openChest(item.itemId)
    if (err || !res) return
    if (res.code !== 0 || !res.data) {
      showFailToast({ message: res.msg, position: 'top' })
      continue
    }
    playAddItemAudio(res.data.itemType)
    showToastByAddItem(res.data, `\n(${index + 1}/${item.itemCount})`)
  }
  openChestLoading.value = false
  updateUser()
}

const updateUser = () => {
  store.userBag.getUserBagItems()
  store.userPlayer.getUserPlayerInfo()
}

const putOnLoading = ref(false)
const onClickEquipArmor = async (item: TypeUserBagItem) => {
  if (putOnLoading.value) return
  putOnLoading.value = true
  showLoadingToast({ message: '装备中...' })
  const [err, res] = await api_putOnArmor({ id: item.id, armorId: item.itemId })
  closeToast()
  putOnLoading.value = false
  if (err || !res) return
  if (res.code !== 0) {
    showFailToast({ message: res.msg, position: 'top' })
    return
  }
  showSuccessToast({ message: res.msg, position: 'top' })
  audio.play('equip')
  store.userBag.getUserBagItems()
  store.userArmor.getUserArmor()
}

const sturyRideLoading = ref(false)
const onClickStudyRide = async (item: TypeUserBagItem) => {
  if (sturyRideLoading.value) return
  sturyRideLoading.value = true
  const [err, res] = await api_studyRide(item.itemId)
  sturyRideLoading.value = false
  if (err || !res) return
  showToast({
    message: res.msg,
    position: 'top'
  })
  if (res.code !== 0) return
  store.userBag.getUserBagItems()
  store.userPlayer.getUserPlayerInfo()
  store.userRide.getUserRides()
}
defineExpose({ openDialog })
</script>

<template>
  <div>
    <SellItemDialog ref="SellItemDialogRef" />
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
      class="border-2 border-solid !top-[300px]"
      :style="{
        'border-color': color,
        'box-shadow': '1px 1px 15px ' + color + ' !important'
      }"
    >
      <template #title></template>
      <template #default>
        <div class="p-2.5" v-if="itemInfo">
          <ItemInfo :itemInfo="itemInfo" />
          <template
            v-if="itemInfo && itemInfo.itemType === 'special' && itemInfo.itemId === 'special_2'"
          >
            <div class="pt-2">
              <van-cell-group inset class="mt-2">
                <van-field
                  v-model="newName"
                  label=""
                  autocomplete="off"
                  placeholder="请输入角色名称"
                />
              </van-cell-group>
            </div>
          </template>
        </div>
      </template>
      <template #footer>
        <template v-if="itemInfo?.itemType === 'chest'">
          <PrimaryButton1
            text="&nbsp;&nbsp;开箱&nbsp;&nbsp;"
            @click="onClickOpenChest(itemInfo)"
            class="translate-y-[0px] !h-8 w-[100px]"
          />
          <PrimaryButton1
            :text="isAutoOpenChest ? '&nbsp;停止开箱&nbsp;' : '&nbsp;一键开箱&nbsp;'"
            @click="onClickOpenChestByAuto(itemInfo)"
            class="translate-y-[0px] !h-8 w-[130px]"
          />
        </template>
        <template v-else-if="itemInfo?.itemType === 'armor'">
          <PrimaryButton1
            v-if="
              store.userPlayer.userPlayerInfo &&
              itemInfo.requirement &&
              store.userPlayer.userPlayerInfo.stateLevel >= itemInfo.requirement
            "
            text="&nbsp;&nbsp;装备&nbsp;&nbsp;"
            @click="onClickEquipArmor(itemInfo)"
            class="translate-y-[0px] !h-8 w-[100px]"
          />
        </template>
        <template v-else-if="itemInfo?.itemType === 'ride'">
          <PrimaryButton1
            text="&nbsp;&nbsp;学习&nbsp;&nbsp;"
            @click="onClickStudyRide(itemInfo)"
            class="translate-y-[0px] !h-8 w-[100px]"
          />
        </template>
        <template v-else-if="itemInfo?.itemType === 'special'">
          <PrimaryButton1
            v-if="itemInfo.itemId === 'special_2'"
            text="&nbsp;&nbsp;使用&nbsp;&nbsp;"
            @click="onClickRename(itemInfo, newName)"
            class="translate-y-[0px] !h-8 w-[100px]"
          />
        </template>
        <template v-if="itemInfo?.price">
          <PrimaryButton1
            text="&nbsp;&nbsp;出售&nbsp;&nbsp;"
            @click="onClickSell(itemInfo)"
            class="translate-y-[0px] !h-8"
          />
        </template>
      </template>
    </van-dialog>
  </div>
</template>

<style scoped lang="less"></style>
