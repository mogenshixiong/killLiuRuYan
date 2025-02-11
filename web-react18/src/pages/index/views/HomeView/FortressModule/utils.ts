import { TUser } from '@/stores/users'
import { formatTime1, formatTime2 } from '@/utils/time'

/**
 * 计算招募一个工人所需要的食物
 * userFWorker: 当前工人总数
 */
export const computeAddWorkerNeedFood = (userFWorker: number): number => {
  const s = 100 + 60 * (userFWorker - 1)
  return s > 4000 ? 4000 : s // 最多4000食物
}
/** 计算当前等级升级食物所需的木材数量 */
export const computeFoodLevelUpNeedWood = (l: number): number => 60 * l * l - 60 * l + 120
/** 计算当前等级最大食物储量 */
export const computeMaxFood = (l: number): number => 180 * l * l - 180 * l + 4800
/** 计算当前食物等级可投入工人数量上限 */
export const computeMaxFoodWorker = (l: number): number => 3 * l + 3

/** 计算当前等级升级木材所需的木材数量 */
export const computeWoodLevelUpNeedWood = (l: number): number => 60 * l * l - 60 * l + 120
/** 计算当前等级最大木材储量 */
export const computeMaxWood = (l: number): number => 120 * l * l - 120 * l + 720
/** 计算当前木材等级可投入工人数量上限 */
export const computeMaxWoodWorker = (l: number): number => l * 2

/** 计算当前等级陨铁木材所需的木材数量 */
export const computeMetalLevelUpNeedWood = (l: number): number => 40 * l * l - 40 * l + 120
/** 计算当前等级最大陨铁储量 */
export const computeMaxMetal = (l: number): number => 60 * l * l - 60 * l + 360
/** 计算当前陨铁等级可投入工人数量上限 */
export const computeMaxMetalWorker = (l: number): number => l

/** 计算陨铁满仓需要用时 */
export const computeMetalFullTime = (currentUser: TUser, addResourceIntervalTime: number): string => {
  if (currentUser.f_metal_worker === 0) return '已停产' // 没有工人时，无法生产
  const foodOut = currentUser.f_food_worker - currentUser.f_wood_worker * 2 - currentUser.f_metal_worker * 4 // 产量
  if (currentUser.f_food === 0 && foodOut <= 0) return '已停产' // 食物储量为0且没有食物产出时，无法生产
  // 公示： （（陨铁最大储量-当前陨铁储量）/ 产量）* 每个结算周期的时间
  const s = ((computeMaxMetal(currentUser.f_metal_level) - currentUser.f_metal) / currentUser.f_metal_worker) * addResourceIntervalTime
  const r = formatTime2(s)
  return s === 0 ? '已满仓' : r + '后满仓'
}

/** 计算木材满仓需要用时 */
export const computeWoodFullTime = (currentUser: TUser, addResourceIntervalTime: number): string => {
  if (currentUser.f_wood_worker === 0) return '已停产' // 没有工人时，无法生产
  const foodOut = currentUser.f_food_worker - currentUser.f_wood_worker * 2 - currentUser.f_metal_worker * 4 // 产量
  if (currentUser.f_food === 0 && foodOut <= 0) return '已停产' // 食物储量为0且没有食物产出时，无法生产
  // 公示： （（最大储量-当前储量）/ 产量）* 每个结算周期的时间
  const s = ((computeMaxWood(currentUser.f_wood_level) - currentUser.f_wood) / currentUser.f_wood_worker) * addResourceIntervalTime
  const r = formatTime2(s)
  return s === 0 ? '已满仓' : r + '后满仓'
}
/** 计算食物满仓或者耗尽需要用时 */
export const computeFoodFullTime = (currentUser: TUser, addResourceIntervalTime: number): string => {
  const out = currentUser.f_food_worker - currentUser.f_wood_worker * 2 - currentUser.f_metal_worker * 4 // 食物产量
  if (out === 0) return '已停产' // 没有工人时，无法生产
  else if (out > 0) {
    // 公示： （（最大储量-当前储量）/ 产量）* 每个结算周期的时间
    const s = ((computeMaxFood(currentUser.f_food_level) - currentUser.f_food) / out) * addResourceIntervalTime
    const r = formatTime2(s)
    return s === 0 ? '已满仓' : r + '后满仓'
  } else {
    // 公示： （（当前储量）/ 产量）* 每个结算周期的时间
    const s = (currentUser.f_food / (0 - out)) * addResourceIntervalTime
    const r = formatTime2(s)
    return s === 0 ? '已耗尽' : r + '后耗尽'
  }
}

export const addFResource2 = (beforeUser: TUser, updateUser: Function, addLog: Function) => {
  const currentTime = new Date().getTime() // 当前时间
  const diffTime = currentTime - beforeUser.f_lastAddResourceTime // 计算距离上次结算的时间
  const offlineTime = Math.floor(diffTime / beforeUser.f_addResourceIntervalTime) // 计算距离上次结算时间的结算次数
  console.log('diffTime', diffTime, offlineTime)
  if (offlineTime < 1) return false // 如果距离上次结算的时间小于1个结算周期，则不进行结算

  let afterUser: TUser = JSON.parse(JSON.stringify(beforeUser)) // 本次结算后的用户数据
  let res = {} // 最终的结算结果保存在这里
  for (let i = 0; i < offlineTime; i++) {
    res = addFResource(afterUser)
    afterUser = { ...afterUser, ...res }
  }

  updateUser({ ...res, f_lastAddResourceTime: beforeUser.f_lastAddResourceTime + offlineTime * beforeUser.f_addResourceIntervalTime }) // 更新用户资源

  if (offlineTime > 1) {
    addLog(
      `上次登录时间：${formatTime1(beforeUser.f_lastAddResourceTime as any)}，本次离线时长：${formatTime2(diffTime)}，总计结算次数：${offlineTime}，本次离线收益：食物增加：${afterUser.f_food - beforeUser.f_food}（${beforeUser.f_food}→${
        afterUser.f_food
      }），木材增加：${afterUser.f_wood - beforeUser.f_wood}（${beforeUser.f_wood}→${afterUser.f_wood}），陨铁增加：${afterUser.f_metal - beforeUser.f_metal}（${beforeUser.f_metal}→${afterUser.f_metal}）`,
      'fortree'
    )
  }

  return true
}
/** 进行一次【资源结算】计算 */
export const addFResource = (currentUser: TUser) => {
  const maxFood = computeMaxFood(currentUser.f_food_level) // 食物储量上限
  const addFood = currentUser.f_food_worker - currentUser.f_wood_worker * 2 - currentUser.f_metal_worker * 4 // 食物产量（该值可能为负数）
  let resFood = currentUser.f_food + addFood // 结算结果
  if (resFood <= 0) {
    resFood = 0 // 产量为负数时，储量可能会低于0。低于0时则设置为0
  } else if (resFood >= maxFood) {
    resFood = maxFood // 超出最大储量时则只加到最大储量
  }

  const maxWood = computeMaxWood(currentUser.f_wood_level) // 木材储量上限
  const addWood = currentUser.f_wood_worker // 木材产量(该值只能是正数)
  let resWood = currentUser.f_wood + addWood // 结算结果
  if (currentUser.f_wood >= maxWood) {
    resWood = currentUser.f_wood // 满仓时，停止生产。
  } else if (resFood <= 0) {
    resWood = currentUser.f_wood // 食物为0时，停止生产。
  } else if (resWood >= maxWood) {
    resWood = maxWood // 超出最大储量时则只加到最大储量
  }

  const maxMetal = computeMaxMetal(currentUser.f_metal_level) // 陨铁储量上限
  const addMetal = currentUser.f_metal_worker // 陨铁产量
  let resMetal = currentUser.f_metal + addMetal // 结算结果
  if (currentUser.f_metal >= maxMetal) {
    resMetal = currentUser.f_metal // 满仓时，停止生产。
  } else if (resFood <= 0) {
    resMetal = currentUser.f_metal // 食物为0时，停止生产。
  } else if (resMetal >= maxMetal) {
    resMetal = maxMetal // 超出最大储量时则只加到最大储量
  }
  return { f_food: resFood, f_wood: resWood, f_metal: resMetal }
}
