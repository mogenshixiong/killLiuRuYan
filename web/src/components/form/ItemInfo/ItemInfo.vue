<script setup lang="ts">
import { type TypeUserBagItem, getItemLevelName, getItemLevelColor } from '@/stores/userBagStore'
import { getUserClassName } from '@/stores/userPlayerStore'
import { getArmorTypeName } from '@/stores/userArmorStore'
import { computed } from 'vue'
import useStore from '@/stores/stores'
import CoinComp from '@/components/form/coin/CoinComp.vue'

// import ItemInfo from '@/components/form/ItemInfo/ItemInfo.vue'
interface Props {
  itemInfo: TypeUserBagItem
  showDiffArmor?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  showDiffArmor: true
})
const color = computed(() => {
  return props.itemInfo && getItemLevelColor(props.itemInfo.itemLevel)
})
const getItemCover = () => {
  return `/wowResource/img/item/${props.itemInfo.itemId}.png`
}
const store = useStore()
</script>

<template>
  <div>
    <template v-if="itemInfo">
      <p
        :style="{
          color: color
        }"
      >
        {{ itemInfo.itemName }}
        <template v-if="itemInfo.itemCount">*{{ itemInfo.itemCount }}</template>
      </p>
      <p class="text-sm" v-if="props.showDiffArmor && props.itemInfo.itemType === 'armor'">
        当前装备：
        <span
          v-if="
            store.userArmor.userArmor &&
            store.userArmor.userArmor.find((i) => i.armorType === itemInfo.armorType)
          "
          :style="{
            color: getItemLevelColor(
              store.userArmor.userArmor.find((i) => i.armorType === itemInfo.armorType)!.itemLevel
            )
          }"
          >{{ store.userArmor.userArmor.find((i) => i.armorType === itemInfo.armorType)!.itemName }}
        </span>
        <span v-else>无</span>
      </p>
      <div
        class="relative overflow-hidden w-10 h-10 rounded-md border border-solid z-[1]"
        :style="{
          'border-color': color
        }"
      >
        <van-image
          :src="getItemCover()"
          class="w-full cursor-pointer ml-[0.7px] scale-[1.11] transform-gpu"
        />
      </div>
      <!-- <p class="text-sm">ID:{{ itemInfo.itemId }}</p> -->
      <p class="text-sm" v-if="itemInfo.armorType">
        装备类型：{{ getArmorTypeName(itemInfo.armorType) }}
      </p>
      <p class="text-sm" v-if="itemInfo.transaction">可交易</p>
      <p class="text-sm" v-else>不可交易</p>
      <p class="text-sm" :style="{ color: color }">
        物品等级: {{ getItemLevelName(itemInfo.itemLevel) }}
      </p>
      <p class="text-sm" v-if="itemInfo.price">售价: <CoinComp :coin="itemInfo.price" /></p>
      <p
        class="text-sm text-[red]"
        v-if="store.userRide.userRides.map((i) => i.rideId).includes(itemInfo.itemId)"
      >
        已学会
      </p>

      <p
        v-if="itemInfo.requirement && store.userPlayer.userPlayerInfo"
        class="text-sm"
        :class="{
          'text-[red]': itemInfo.requirement > store.userPlayer.userPlayerInfo.stateLevel
        }"
      >
        等级要求: {{ itemInfo.requirement }}
      </p>
      <p
        v-if="itemInfo.requirementClass"
        class="text-sm"
        :class="{
          'text-[red]':
            itemInfo.requirementClass &&
            itemInfo.requirementClass !== store.userPlayer.userPlayerInfo?.class
        }"
      >
        职业要求:
        {{ getUserClassName(itemInfo.requirementClass) || '无' }}
      </p>
      <p v-if="itemInfo.hp" class="text-[#1eff00]">血量：{{ itemInfo.hp }}</p>
      <p v-if="itemInfo.ap" class="text-[#1eff00]">物理攻击：{{ itemInfo.ap }}</p>
      <p v-if="itemInfo.ac" class="text-[#1eff00]">物理防御：{{ itemInfo.ac }}</p>
      <p v-if="itemInfo.sfk" class="text-[#1eff00]">魔法攻击：{{ itemInfo.sfk }}</p>
      <p v-if="itemInfo.mdef" class="text-[#1eff00]">魔法防御：{{ itemInfo.mdef }}</p>
      <p v-if="itemInfo.desc" class="text-[#1eff00]">{{ itemInfo.desc }}</p>
      <p v-if="itemInfo.descGold" class="text-[#FF8000]">{{ itemInfo.descGold }}</p>
    </template>
  </div>
</template>
