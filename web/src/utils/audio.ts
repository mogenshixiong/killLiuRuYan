import useStore from '@/stores/stores'

/**
 * The play() request was interrupted by a call to pause().
 * 错误发生的过程为：
 * 1.media.play() 开始异步加载video/audio内容。
 * 2.media.pause() 在video/audio没有准备好时中断加载。
 * 3.media.play() 此时进行继续播放，报错。
 * https://blog.csdn.net/weixin_34220623/article/details/93503960
 */
const config: any = {
  openBag: { path: '/wowResource/sound/openBag.mp3', desc: '打开背包音效' },
  readyToWork: { path: '/wowResource/sound/readyToWork.mp3', desc: '兽人：readyToWork' },
  pig: { path: '/wowResource/sound/pig.mp3', desc: '猪叫：哦~' },
  gold: { path: '/wowResource/sound/gold.mp3', desc: '金币' },
  getItem: { path: '/wowResource/sound/getItem.mp3', desc: '获得物品音效' },
  levelUp: { path: '/wowResource/sound/levelUp.mp3', desc: '升级' },
  equip: { path: '/wowResource/sound/equip.mp3', desc: '装备武器的音效' },
  die: { path: '/wowResource/sound/die.mp3', desc: '死亡男性音效' },
  forLight: { path: '/wowResource/sound/forLight.mp3', desc: '乌瑟尔：为了圣光' },
  finishTask: { path: '/wowResource/sound/finishTask.mp3', desc: '完成任务音效' },
  ahSuccess: { path: '/wowResource/sound/ahSuccess.mp3', desc: '拍卖成功音效' },
  timeIsGold: { path: '/wowResource/sound/timeIsGold.mp3', desc: '时间就是金钱我的朋友' },
  sword1: { path: '/wowResource/sound/Sword1.mp3', desc: '声效：锤铁' },
  getTeamer: { path: '/wowResource/sound/getTeamer.mp3', desc: '组到人音效' },
  battleground: { path: '/wowResource/sound/battleground.mp3', desc: '战场背景音效' },
  s2: { path: '/wowResource/sound/UndeadFemaleSigh01.mp3', desc: '女声：伸懒腰' }
}

/**
import audio from '@/utils/audio'
 */
const music = {
  play: (type: keyof typeof config) => {
    const store = useStore()
    if (store.userConfig.userConfig.sound === false) return
    const item = config[type]
    // https://zhuanlan.zhihu.com/p/593505083
    for (const key in config) {
      // 关闭其他音乐的播放。
      const curAudio = config[key].audio
      if (curAudio) {
        if (item.canPause) {
          curAudio.pause()
        }
        config[key].audio = undefined // 释放对象
      }
    }
    // 播放当前音乐
    item.audio = new Audio(item.path)
    item.canPause = false // 资源未加载完全时，不能播放
    item.audio.onended = () => {
      item.audio = undefined // 播放结束时释放对象
    }
    item.audio
      .play()
      .then(() => {
        item.canPause = true // 异步加载 音乐资源加载完成，可以播放了。
        item.audio.play()
      })
      .catch(() => {
        item.canPause = false // 资源加载失败无法播放
      })
  },
  close: (type: keyof typeof config) => {
    const item = config[type]
    if (!item.audio) return
    if (item.canPause) {
      item.audio.pause() // 如果处于播放状态，则先暂停
    }
    item.audio.currentTime = 0 // 进度条重置到0的位置
    item.audio = undefined // 释放对象
  }
}

export default music
