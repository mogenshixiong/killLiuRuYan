import { loadAssetsJS, loadAssetsCss } from '@/utils/utils'

export type APlayerType = {
  /** 播放器容器元素 */
  container: HTMLElement
  /** 开启吸底模式。default:false */
  fixed?: boolean
  /** 开启迷你模式。default:false */
  mini?: boolean
  /** 自动播放。default:false */
  autoplay?: boolean
  /** 主题色。default:#b7daff */
  theme?: string
  /** (圈)音频循环播放 default 'all' */
  loop?: 'all' | 'one' | 'none'
  /** 音频循环顺序 default:list */
  order?: 'list' | 'random'
  /** 预加载 default:auto */
  preload?: 'none' | 'metadata' | 'auto'
  /** 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效 default 0.7 */
  volume?: number
  /** 加载歌词文件方式 default:0 https://aplayer.js.org/#/home?id=lrc */
  lrcType?: 0 | 1 | 2 | 3
  /** 自定义类型 */
  customAudioType?: any
  /** 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器。default:true */
  mutex?: boolean
  /** 列表默认折叠。default:false */
  listFolded?: boolean
  /** 列表最大高度 */
  listMaxHeight?: number | string
  /** default:aplayer-setting 存储播放器设置的 localStorage key */
  storageName?: string
  audio: {
    /** 音频名称 */
    name: string
    /** 艺术家（作者） */
    artist: string
    /** 音频地址 */
    url: string
    /** 封面地址 */
    cover: string
    /** 3种加载歌词文件方式：https://aplayer.js.org/#/home?id=lrc */
    lrc?: string
    /** 切换到此音频时的主题色，比上面的 theme 优先级高 */
    theme?: string
    /** default auto 可选值: 'auto', 'hls', 'normal' 或其他自定义类型 https://aplayer.js.org/#/home?id=mse-support */
    type?: 'auto' | 'hls' | 'normal'
  }[]
}

export let ap: any = undefined
export const initAPlayer = async (id: string) => {
  if (ap) return ap
  await loadAssetsJS('/wow.html/plugins/APlayer/APlayer.min.js', 'APlayer')
  await loadAssetsCss('/wow.html/plugins/APlayer/APlayer.min.css')
  await loadAssetsCss('/wow.html/plugins/APlayer/black.css?v=1')
  const dom = document.getElementById(id)
  if (!dom || !window.APlayer) return
  const opts: APlayerType = {
    listMaxHeight: 'calc(100vh - var(--van-nav-bar-height) - 66px)', // 66px 高度为播放器告诉
    theme: '#ffd100',
    lrcType: 3,
    container: dom,
    autoplay: false,
    mini: false,
    audio: [
      {
        name: 'Dreamtale - The Dawn',
        artist: '亡灵序曲',
        url: '/wowResource/music/wow/TheDawn.mp3',
        cover: '/wowResource/music/wow/TheDawn.jpg'
      },
      {
        name: 'Canticle Of Sacrifice',
        artist: '雄狮之眠',
        url: '/wowResource/music/wow/CanticleOfSacrifice.mp3',
        cover: '/wowResource/music/wow/CanticleOfSacrifice.jpg',
        lrc: '/wowResource/music/wow/CanticleOfSacrifice.lrc?v=1'
      },
      {
        // https://warcraft.huijiwiki.com/wiki/%E6%97%A0%E6%95%8C%EF%BC%88%E9%9F%B3%E4%B9%90%EF%BC%89
        name: 'Invincible',
        artist: '无敌',
        url: '/wowResource/music/wow/Invincible.mp3',
        cover: '/wowResource/music/wow/Invincible.jpg'
      },
      {
        // https://warcraft.huijiwiki.com/wiki/%E6%97%A0%E6%95%8C%EF%BC%88%E9%9F%B3%E4%B9%90%EF%BC%89
        name: 'Stormwind(City Theme).mp3',
        artist: '暴风城BGM',
        url: '/wowResource/music/wow/Stormwind.mp3',
        cover: '/wowResource/music/wow/Stormwind.jpg'
      },
      {
        name: 'Kingdoms Will Burn.mp3',
        artist: '军团再临登录BGM',
        url: '/wowResource/music/wow/KingdomsWillBurn.mp3',
        cover: '/wowResource/music/wow/CanticleOfSacrifice.jpg'
      }
    ]
  }
  /** https://aplayer.js.org/#/zh-Hans/ */
  ap = new window.APlayer(opts)
  return ap
}
