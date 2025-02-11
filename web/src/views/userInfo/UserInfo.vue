<script setup lang="ts">
import useStore from '@/stores/stores'
import { getUserClassName } from '@/stores/userPlayerStore'
import { computed, ref } from 'vue'
import { getItemLevelColor } from '@/stores/userBagStore'
import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'
import { showFailToast, showSuccessToast } from 'vant'
import { api_addAttributeBySpecial1 } from '@/api/user/apiUserAttribute'
import { getAttrTypeName } from '@/stores/userAttributeStore'
import audio from '@/utils/audio'
import { type armorType } from '@/stores/userArmorStore'
import ArmorInfoDialog from './ArmorInfoDialog.vue'

const ArmorInfoDialogRef = ref()
const store = useStore()

const expProgress = computed(() => {
  if (store.userPlayer.userPlayerInfo) {
    if (
      store.userPlayer.userPlayerInfo.exp &&
      store.userPlayer.userPlayerInfo.levelUpRequirementExp
    ) {
      const p =
        (store.userPlayer.userPlayerInfo.exp /
          store.userPlayer.userPlayerInfo.levelUpRequirementExp) *
        100
      return p.toFixed(1) + '%'
    }
  }
  return '0'
})

const addUserAttributeLoading = ref(false)
const addUserAttribute = async () => {
  if (addUserAttributeLoading.value) return
  const special1Item = store.userBag.userBagItems.find((i) => i.itemId === 'special_1')
  if (!special1Item || special1Item.itemCount < 1) {
    showFailToast('缺少生命之种')
    return
  }
  addUserAttributeLoading.value = true
  const [err, res] = await api_addAttributeBySpecial1()
  addUserAttributeLoading.value = false
  if (err || !res) return false
  if (res.code !== 0) {
    showFailToast(res.msg)
    return
  }

  showSuccessToast(`${res.msg}\n${getAttrTypeName(res.data)}+1`)
  audio.play('sword1')
  store.userBag.getUserBagItems()
  store.userAttribute.getUserAttribute()
}

const getItem = (type: armorType) => {
  return store.userArmor.userArmor?.find((i) => i.armorType === type)
}

const getItemCover = (itemId: string) => {
  return `/wowResource/img/item/${itemId}.png`
}
</script>

<template>
  <div class="p-3">
    <ArmorInfoDialog ref="ArmorInfoDialogRef" />
    <van-row class="mb-3 text-center text-[#ffd100]">
      <van-col span="24">{{ store.userPlayer.userPlayerInfo?.nickName }}</van-col>
    </van-row>

    <van-row justify="center">
      <van-col span="4">
        <div class="relative w-full h-12 mb-[5px]">
          <div
            v-if="getItem('helmet')"
            @click="ArmorInfoDialogRef.openDialog(getItem('helmet'))"
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] rounded-md border border-solid z-[1] overflow-hidden"
            :style="{
              'border-color': getItemLevelColor(getItem('helmet')!.itemLevel)
            }"
          >
            <van-image
              :src="getItemCover(getItem('helmet')!.itemId)"
              class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
            />
            <span
              v-if="getItem('helmet')"
              class="absolute w-3 h-3 text-[10px] leading-3 text-center text-black bg-white rounded-full bottom-1 left-1"
              >{{ getItem('helmet')!.requirement }}
            </span>
          </div>
          <div
            v-else
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-cover"
          >
            头部
          </div>
        </div>

        <div class="relative w-full h-12 mb-[5px]">
          <div
            v-if="getItem('neck')"
            @click="ArmorInfoDialogRef.openDialog(getItem('neck'))"
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] rounded-md border border-solid z-[1] overflow-hidden"
            :style="{
              'border-color': getItemLevelColor(getItem('neck')!.itemLevel)
            }"
          >
            <van-image
              :src="getItemCover(getItem('neck')!.itemId)"
              class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
            />
            <span
              v-if="getItem('neck')"
              class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
              >{{ getItem('neck')!.requirement }}
            </span>
          </div>
          <div
            v-else
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-100%] bg-cover"
          >
            颈部
          </div>
        </div>

        <div class="relative w-full h-12 mb-[5px]">
          <div
            v-if="getItem('shoulder')"
            @click="ArmorInfoDialogRef.openDialog(getItem('shoulder'))"
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] rounded-md border border-solid z-[1] overflow-hidden"
            :style="{
              'border-color': getItemLevelColor(getItem('shoulder')!.itemLevel)
            }"
          >
            <van-image
              :src="getItemCover(getItem('shoulder')!.itemId)"
              class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
            />
            <span
              v-if="getItem('shoulder')"
              class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
              >{{ getItem('shoulder')!.requirement }}
            </span>
          </div>
          <div
            v-else
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-200%] bg-cover"
          >
            肩膀
          </div>
        </div>

        <div class="relative w-full h-12 mb-[5px]">
          <div
            v-if="getItem('back')"
            @click="ArmorInfoDialogRef.openDialog(getItem('back'))"
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] rounded-md border border-solid z-[1] overflow-hidden"
            :style="{
              'border-color': getItemLevelColor(getItem('back')!.itemLevel)
            }"
          >
            <van-image
              :src="getItemCover(getItem('back')!.itemId)"
              class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
            />
            <span
              v-if="getItem('back')"
              class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
              >{{ getItem('back')!.requirement }}
            </span>
          </div>
          <div
            v-else
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-300%] bg-cover"
          >
            披风
          </div>
        </div>

        <div class="relative w-full h-12 mb-[5px]">
          <div
            v-if="getItem('chest')"
            @click="ArmorInfoDialogRef.openDialog(getItem('chest'))"
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] rounded-md border border-solid z-[1] overflow-hidden"
            :style="{
              'border-color': getItemLevelColor(getItem('chest')!.itemLevel)
            }"
          >
            <van-image
              :src="getItemCover(getItem('chest')!.itemId)"
              class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
            />
            <span
              v-if="getItem('chest')"
              class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
              >{{ getItem('chest')!.requirement }}
            </span>
          </div>
          <div
            v-else
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-400%] bg-cover"
          >
            胸部
          </div>
        </div>
        <div class="relative w-full h-12 mb-[5px]">
          <div
            v-if="getItem('shirt')"
            @click="ArmorInfoDialogRef.openDialog(getItem('shirt'))"
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] rounded-md border border-solid z-[1] overflow-hidden"
            :style="{
              'border-color': getItemLevelColor(getItem('shirt')!.itemLevel)
            }"
          >
            <van-image
              :src="getItemCover(getItem('shirt')!.itemId)"
              class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
            />
            <span
              v-if="getItem('shirt')"
              class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
              >{{ getItem('shirt')!.requirement }}
            </span>
          </div>
          <div
            v-else
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-500%] bg-cover"
          >
            衬衣
          </div>
        </div>
        <div class="relative w-full h-12 mb-[5px]">
          <div
            v-if="getItem('robe')"
            @click="ArmorInfoDialogRef.openDialog(getItem('robe'))"
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] rounded-md border border-solid z-[1] overflow-hidden"
            :style="{
              'border-color': getItemLevelColor(getItem('robe')!.itemLevel)
            }"
          >
            <van-image
              :src="getItemCover(getItem('robe')!.itemId)"
              class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
            />
            <span
              v-if="getItem('robe')"
              class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
              >{{ getItem('robe')!.requirement }}
            </span>
          </div>
          <div
            v-else
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-400%] bg-cover"
          >
            外袍
          </div>
        </div>
        <div class="relative w-full h-12 mb-[5px]">
          <div
            v-if="getItem('wrist')"
            @click="ArmorInfoDialogRef.openDialog(getItem('wrist'))"
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] rounded-md border border-solid z-[1] overflow-hidden"
            :style="{
              'border-color': getItemLevelColor(getItem('wrist')!.itemLevel)
            }"
          >
            <van-image
              :src="getItemCover(getItem('wrist')!.itemId)"
              class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
            />
            <span
              v-if="getItem('wrist')"
              class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
              >{{ getItem('wrist')!.requirement }}
            </span>
          </div>
          <div
            v-else
            class="absolute inset-y-0 right-0 leading-[48px] text-center text-sm w-[48px] h-[48px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-600%] bg-cover"
          >
            护腕
          </div>
        </div>
      </van-col>
      <van-col span="16" class="relative text-center">
        <van-row class="text-[#1eff00]">
          <van-col span="24" class="text-center">
            <span v-if="store.userPlayer.userPlayerInfo"
              >职业：{{ getUserClassName(store.userPlayer.userPlayerInfo.class) }}</span
            >
          </van-col>
          <van-col span="24" class="mt-5 text-center">
            <span>等级：{{ store.userPlayer.userPlayerInfo?.stateLevel }}</span>
          </van-col>
          <van-col span="24" class="text-center">
            <span>经验值：{{ expProgress }}</span>
          </van-col>
          <van-col span="24" class="text-center">
            <span>
              {{ store.userPlayer.userPlayerInfo?.exp }}/{{
                store.userPlayer.userPlayerInfo?.levelUpRequirementExp
              }}
            </span>
          </van-col>
          <van-col span="24" class="mt-5 mb-1 text-center">
            <span>战力：{{ store.userAttribute.userPower }}</span>
            <span v-if="store.userArmor.userArmor"
              >(+{{
                (
                  store.userArmor.userArmor.map(
                    (i) => (i.sfk || 0) + (i.ac || 0) + (i.ap || 0) + (i.hp || 0) + (i.mdef || 0)
                  ) || []
                ).reduce((p, c) => (p || 0) + (c || 0), 0)
              }})
            </span>
          </van-col>
          <van-col span="24" class="text-center">
            <span class="text-white">生命值：{{ store.userAttribute.userAttribute?.hp }}</span>
            <span v-if="store.userArmor.userArmor"
              >(+{{
                (store.userArmor.userArmor.map((i) => i.hp) || []).reduce(
                  (p, c) => (p || 0) + (c || 0),
                  0
                )
              }})
            </span>
          </van-col>
          <van-col span="24" class="text-center">
            <span class="text-white">物理攻击：{{ store.userAttribute.userAttribute?.ap }}</span>
            <span v-if="store.userArmor.userArmor"
              >(+{{
                (store.userArmor.userArmor.map((i) => i.ap) || []).reduce(
                  (p, c) => (p || 0) + (c || 0),
                  0
                )
              }})
            </span>
          </van-col>
          <van-col span="24" class="text-center">
            <span class="text-white">物理防御：{{ store.userAttribute.userAttribute?.ac }}</span>
            <span v-if="store.userArmor.userArmor"
              >(+{{
                (store.userArmor.userArmor.map((i) => i.ac) || []).reduce(
                  (p, c) => (p || 0) + (c || 0),
                  0
                )
              }})
            </span>
          </van-col>
          <van-col span="24" class="text-center">
            <span class="text-white">法术攻击：{{ store.userAttribute.userAttribute?.sfk }}</span>
            <span v-if="store.userArmor.userArmor"
              >(+{{
                (store.userArmor.userArmor.map((i) => i.sfk) || []).reduce(
                  (p, c) => (p || 0) + (c || 0),
                  0
                )
              }})
            </span>
          </van-col>
          <van-col span="24" class="text-center">
            <span class="text-white">法术防御：{{ store.userAttribute.userAttribute?.mdef }}</span>
            <span v-if="store.userArmor.userArmor"
              >(+{{
                (store.userArmor.userArmor.map((i) => i.mdef) || []).reduce(
                  (p, c) => (p || 0) + (c || 0),
                  0
                )
              }})
            </span>
          </van-col>
        </van-row>
        <van-row justify="center" class="absolute bottom-0 w-full">
          <van-col span="6">
            <div
              v-if="getItem('mainHandWeapon')"
              @click="ArmorInfoDialogRef.openDialog(getItem('mainHandWeapon'))"
              class="relative overflow-hidden w-[48px] h-[48px] rounded-md border border-solid z-[1]"
              :style="{
                'border-color': getItemLevelColor(getItem('mainHandWeapon')!.itemLevel)
              }"
            >
              <van-image
                :src="getItemCover(getItem('mainHandWeapon')!.itemId)"
                class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
              />
              <span
                v-if="getItem('mainHandWeapon')"
                class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
                >{{ getItem('mainHandWeapon')!.requirement }}
              </span>
            </div>
            <div
              v-else
              class="leading-[48px] text-center text-sm w-[48px] h-[48px] mb-[5px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-1300%] bg-cover"
            >
              主手
            </div>
          </van-col>
          <van-col span="6">
            <div
              v-if="getItem('offHandWeapon')"
              @click="ArmorInfoDialogRef.openDialog(getItem('offHandWeapon'))"
              class="relative overflow-hidden w-[48px] h-[48px] rounded-md border border-solid z-[1]"
              :style="{
                'border-color': getItemLevelColor(getItem('offHandWeapon')!.itemLevel)
              }"
            >
              <van-image
                :src="getItemCover(getItem('offHandWeapon')!.itemId)"
                class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
              />
              <span
                v-if="getItem('offHandWeapon')"
                class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
                >{{ getItem('offHandWeapon')!.requirement }}
              </span>
            </div>
            <div
              v-else
              class="leading-[48px] text-center text-sm w-[48px] h-[48px] mb-[5px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-1400%] bg-cover"
            >
              副手
            </div></van-col
          >
          <van-col span="6">
            <div
              v-if="getItem('artifact')"
              @click="ArmorInfoDialogRef.openDialog(getItem('artifact'))"
              class="relative overflow-hidden w-[48px] h-[48px] rounded-md border border-solid z-[1]"
              :style="{
                'border-color': getItemLevelColor(getItem('artifact')!.itemLevel)
              }"
            >
              <van-image
                :src="getItemCover(getItem('artifact')!.itemId)"
                class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
              />
              <span
                v-if="getItem('artifact')"
                class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
                >{{ getItem('artifact')!.requirement }}
              </span>
            </div>
            <div
              v-else
              class="leading-[48px] text-center text-sm w-[48px] h-[48px] mb-[5px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-1600%] bg-cover"
            >
              圣物
            </div>
            <!-- <div
              class="leading-[48px] text-center text-sm w-[48px] h-[48px] mb-[5px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-1500%] bg-cover"
            >
              弓箭
            </div> -->
          </van-col>
        </van-row>
      </van-col>
      <van-col span="4" class="text-left">
        <div
          v-if="getItem('hands')"
          @click="ArmorInfoDialogRef.openDialog(getItem('hands'))"
          class="right-0 leading-[48px] text-sm w-[48px] h-[48px] mb-[5px] rounded-md border border-solid z-[1] overflow-hidden relative"
          :style="{
            'border-color': getItemLevelColor(getItem('hands')!.itemLevel)
          }"
        >
          <van-image
            :src="getItemCover(getItem('hands')!.itemId)"
            class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
          />
          <span
            v-if="getItem('hands')"
            class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
            >{{ getItem('hands')!.requirement }}
          </span>
        </div>
        <div
          v-else
          class="leading-[48px] text-center text-sm w-[48px] h-[48px] mb-[5px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-700%] bg-cover"
        >
          手部
        </div>
        <div
          v-if="getItem('waist')"
          @click="ArmorInfoDialogRef.openDialog(getItem('waist'))"
          class="right-0 leading-[48px] text-sm w-[48px] h-[48px] mb-[5px] rounded-md border border-solid z-[1] overflow-hidden relative"
          :style="{
            'border-color': getItemLevelColor(getItem('waist')!.itemLevel)
          }"
        >
          <van-image
            :src="getItemCover(getItem('waist')!.itemId)"
            class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
          />
          <span
            v-if="getItem('waist')"
            class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
            >{{ getItem('waist')!.requirement }}
          </span>
        </div>
        <div
          v-else
          class="leading-[48px] text-center text-sm w-[48px] h-[48px] mb-[5px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-800%] bg-cover"
        >
          腰带
        </div>
        <div
          v-if="getItem('legs')"
          @click="ArmorInfoDialogRef.openDialog(getItem('legs'))"
          class="right-0 leading-[48px] text-sm w-[48px] h-[48px] mb-[5px] rounded-md border border-solid z-[1] overflow-hidden relative"
          :style="{
            'border-color': getItemLevelColor(getItem('legs')!.itemLevel)
          }"
        >
          <van-image
            :src="getItemCover(getItem('legs')!.itemId)"
            class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
          />
          <span
            v-if="getItem('legs')"
            class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
            >{{ getItem('legs')!.requirement }}
          </span>
        </div>
        <div
          v-else
          class="leading-[48px] text-center text-sm w-[48px] h-[48px] mb-[5px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-900%] bg-cover"
        >
          腿部
        </div>
        <div
          v-if="getItem('feet')"
          @click="ArmorInfoDialogRef.openDialog(getItem('feet'))"
          class="right-0 leading-[48px] text-sm w-[48px] h-[48px] mb-[5px] rounded-md border border-solid z-[1] overflow-hidden relative"
          :style="{
            'border-color': getItemLevelColor(getItem('feet')!.itemLevel)
          }"
        >
          <van-image
            :src="getItemCover(getItem('feet')!.itemId)"
            class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
          />
          <span
            v-if="getItem('feet')"
            class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
            >{{ getItem('feet')!.requirement }}
          </span>
        </div>
        <div
          v-else
          class="leading-[48px] text-center text-sm w-[48px] h-[48px] mb-[5px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-1000%] bg-cover"
        >
          足部
        </div>
        <div
          v-if="getItem('finger1')"
          @click="ArmorInfoDialogRef.openDialog(getItem('finger1'))"
          class="right-0 leading-[48px] text-sm w-[48px] h-[48px] mb-[5px] rounded-md border border-solid z-[1] overflow-hidden relative"
          :style="{
            'border-color': getItemLevelColor(getItem('finger1')!.itemLevel)
          }"
        >
          <van-image
            :src="getItemCover(getItem('finger1')!.itemId)"
            class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
          />
          <span
            v-if="getItem('finger1')"
            class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
            >{{ getItem('finger1')!.requirement }}
          </span>
        </div>
        <div
          v-else
          class="leading-[48px] text-center text-sm w-[48px] h-[48px] mb-[5px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-1100%] bg-cover"
        >
          戒指
        </div>
        <div
          v-if="getItem('finger2')"
          @click="ArmorInfoDialogRef.openDialog(getItem('finger2'))"
          class="right-0 leading-[48px] text-sm w-[48px] h-[48px] mb-[5px] rounded-md border border-solid z-[1] overflow-hidden relative"
          :style="{
            'border-color': getItemLevelColor(getItem('finger2')!.itemLevel)
          }"
        >
          <van-image
            :src="getItemCover(getItem('finger2')!.itemId)"
            class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
          />
          <span
            v-if="getItem('finger2')"
            class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
            >{{ getItem('finger2')!.requirement }}
          </span>
        </div>
        <div
          v-else
          class="leading-[48px] text-center text-sm w-[48px] h-[48px] mb-[5px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-1100%] bg-cover"
        >
          戒指
        </div>
        <div
          v-if="getItem('trinket1')"
          @click="ArmorInfoDialogRef.openDialog(getItem('trinket1'))"
          class="right-0 leading-[48px] text-sm w-[48px] h-[48px] mb-[5px] rounded-md border border-solid z-[1] overflow-hidden relative"
          :style="{
            'border-color': getItemLevelColor(getItem('trinket1')!.itemLevel)
          }"
        >
          <van-image
            :src="getItemCover(getItem('trinket1')!.itemId)"
            class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
          />
          <span
            v-if="getItem('trinket1')"
            class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
            >{{ getItem('trinket1')!.requirement }}
          </span>
        </div>
        <div
          v-else
          class="leading-[48px] text-center text-sm w-[48px] h-[48px] mb-[5px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-1200%] bg-cover"
        >
          饰品
        </div>
        <div
          v-if="getItem('trinket2')"
          @click="ArmorInfoDialogRef.openDialog(getItem('trinket2'))"
          class="right-0 leading-[48px] text-sm w-[48px] h-[48px] mb-[5px] rounded-md border border-solid z-[1] overflow-hidden relative"
          :style="{
            'border-color': getItemLevelColor(getItem('trinket2')!.itemLevel)
          }"
        >
          <van-image
            :src="getItemCover(getItem('trinket2')!.itemId)"
            class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
          />
          <span
            v-if="getItem('trinket2')"
            class="absolute w-3 h-3 text-[10px] leading-3 font-bold text-center text-black bg-white rounded-full bottom-1 left-1"
            >{{ getItem('trinket2')!.requirement }}
          </span>
        </div>
        <div
          v-else
          class="leading-[48px] text-center text-sm w-[48px] h-[48px] mb-[5px] bg-gray-200 bg-[url('@/assets/img/5.png')] bg-[0_-1200%] bg-cover"
        >
          饰品
        </div>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24" class="mt-1 text-center">
        <PrimaryButton1
          text="&nbsp;&nbsp;基础属性强化&nbsp;&nbsp;"
          @click="addUserAttribute"
          class="translate-y-[0px] !h-8 left-[calc(50%-170px)] sm:left-[calc(50%-230px)]"
        />
      </van-col>
      <van-col span="24" class="text-center text-[#ffd100]">
        <span
          >生命之种：{{
            store.userBag.userBagItems.find((i) => i.itemId === 'special_1')?.itemCount || 0
          }}</span
        >
      </van-col>
    </van-row>
  </div>
</template>
