import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
  api_getUserPlayerInfo,
  api_createUserPlayer,
  api_updateLastloginTime,
  type createUserPlayerDto
} from '@/api/user/apiUserPlayer'
import VueCookies from 'vue-cookies'
import { bus } from '@/utils/utils'
import audio from '@/utils/audio'
import { usePageVisibility, useCountDown } from '@vant/use'

const Cookies: any = VueCookies
// import  { type UserClass,UserClassConfig,getUserClassName } from '@/stores/userPlayerStore'
export const UserClassConfig = [
  {
    value: 'Warrior',
    name: '战士',
    desc: '战士是在使用方面受到严格训练的近战士。他们在战场上强大而敏捷。身披武器板甲手持强力武器的他们能够造成巨大的伤害并承受大量的伤害以保护队友。'
  },
  {
    value: 'Paladin',
    name: '圣骑士',
    desc: '我们是圣骑士，不要让仇恨蒙蔽了我们的双眼。'
  },
  {
    value: 'Hunter',
    name: '猎人',
    desc: '猎人之道，就是驾驭世间的野兽，掌握无与伦比的精准枪法，以及懂得在他人将要灭亡的情况下如何生存的知识。'
  },
  {
    value: 'Rogue',
    name: '盗贼',
    desc: '作为匕首和毒药的拥护者，潜行者在寂静的黑暗中跟踪他们的敌人，随时准备割喉并拿走他们的战利品。'
  },
  {
    value: 'Priest',
    name: '牧师',
    desc: '我们内心的信仰让我们变得与众不同，我们有着能改变整个艾泽拉斯的力量。弱者会依赖你，病者会称你为王，无知者会向你寻求指引。'
  },
  {
    value: 'DeathKnight',
    name: '死亡骑士',
    desc: '我将我拥有的一切——愤怒，力量，意志——全部赐予你，我精心挑选的骑士。我赐予了你生命，使你肩负着为天灾军团创造一个崭新的黑暗时代而战的使命。'
  },
  {
    value: 'Shaman',
    name: '萨满祭司',
    desc: '谨记：萨满绝不能贪求力量；如此只会引发元素的愤怒，没有元素保护的萨满将一无是处。想要成为萨满，必须时刻牢记这一重要宗旨。不过在受人尊敬的群体中，元素赐予萨满无与伦比的力量。'
  },
  { value: 'Mage', name: '法师', desc: '身为法师，你必须知道能量可不是只往一个方向流动。' },
  {
    value: 'Warlock',
    name: '术士',
    desc: '我们活跃于阴暗之中，被社会所唾弃，但至少在这里——在战争的最前线，我们的力量使我们得到了最公正的评价和待遇。'
  },
  {
    value: 'Monk',
    name: '武僧',
    desc: '怒拳为谁握？护国安邦惩奸恶，道法自然除心魔，战无休而祸不止，吾辈何以为战？'
  },
  {
    value: 'Druid',
    name: '德鲁伊',
    desc: '我们是平衡的护卫者，无论现在还是将来，尽管玛法里奥陷入沉睡。永世勿忘。'
  },
  { value: 'DemonHunter', name: '恶魔猎手', desc: '如果能终结燃烧军团，那一切牺牲都是值得的。' }
] as const
export type UserClass = (typeof UserClassConfig)[number]['value']
export const getUserClassName = (userClass: UserClass) => {
  return UserClassConfig.find((i) => i.value === userClass)?.name || ''
}

// import  { type UserGender,getUserGenderName,UserGenderConfig } from '@/stores/userPlayerStore'
export const UserGenderConfig = [
  { value: 1, name: '男' },
  { value: 2, name: '女' }
] as const
export type UserGender = (typeof UserGenderConfig)[number]['value']
export const getUserGenderName = (userGender: UserGender) => {
  return UserGenderConfig.find((i) => i.value === userGender)?.name || ''
}

// import  { type TypeUserPlayer } from '@/stores/userPlayerStore'
export interface TypeUserPlayer {
  nickName: string
  class: UserClass
  gold: number
  exp: number
  power: number
  stateLevel: number
  gender: UserGender
  levelUpRequirementExp: number
  stageId: string
  startStageTime: string
}

// import  { useUserPlayerStore } from '@/stores/userPlayerStore'
export const useUserPlayerStore = defineStore('userPlayer', () => {
  // ↓ 定时给后台发送心跳，更新当前用户的最后在线时间
  const countDown = useCountDown({
    time: 300, // 设置为0可立马执行1次
    millisecond: true,
    onFinish: () => {
      api_updateLastloginTime()
      countDown.reset(30 * 1000) // 设置定时执行
      countDown.start()
    }
  })
  countDown.start()
  const pageVisibility = usePageVisibility() // 获取页面的可见状态
  watch(pageVisibility, (newValue) => {
    if (newValue === 'visible') {
      countDown.reset(300) // 设置为0可立马执行1次
      countDown.start()
    } else if (newValue === 'hidden') {
      countDown.pause()
    }
  })
  // ↑ 定时给后台发送心跳，更新当前用户的最后在线时间

  const userPlayerInfo = ref<TypeUserPlayer | undefined>()

  const beforeLevel = ref()
  async function getUserPlayerInfo() {
    let token = localStorage.getItem('token')
    if (!token) {
      token = Cookies.get('token')
    }
    if (!token) return
    const [err, res] = await api_getUserPlayerInfo()
    if (err || !res) return
    if (res && res.msg === 'record not found') {
      bus.emit('onCreateUserPlayer_openDialog', {})
    }
    if (res.code !== 0 || !res.data) return
    userPlayerInfo.value = res.data
    if (
      beforeLevel.value &&
      beforeLevel.value > 0 &&
      userPlayerInfo.value.stateLevel > beforeLevel.value
    ) {
      // 升级了
      audio.play('levelUp')
    }
    beforeLevel.value = userPlayerInfo.value.stateLevel
  }

  async function createUserPlayer(data: createUserPlayerDto): Promise<[Boolean, string]> {
    const [err, res] = await api_createUserPlayer(data)
    if (err || !res) {
      return [false, '创建失败']
    }
    if (res.code !== 0 || !res.data) {
      return [false, res.msg || '创建失败']
    }
    userPlayerInfo.value = res.data
    return [true, '创建成功']
  }

  return {
    userPlayerInfo,
    getUserPlayerInfo: getUserPlayerInfo,
    createUserPlayer
  }
})
