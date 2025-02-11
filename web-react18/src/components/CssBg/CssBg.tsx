import '@/styles/CssBg.css'
import { bus } from '@/utils/utils'
import { useEffect, useState } from 'react'

/** 游戏背景图片 */
const CssBg = () => {
  const [staticBg, setStaticBg] = useState(true)
  /** 每间隔10秒钟，改变一下 className*/
  useEffect(() => {
    setStaticBg(false)
    bus.emit('bgChange', false)
    setTimeout(() => {
      setStaticBg(true)
      bus.emit('bgChange', true)
    }, 5000) // 6秒后关闭时空风暴
    // const timer = setInterval(
    //   () => {
    //     setStaticBg(!staticBg)
    //   },
    //   staticBg ? 5 * 60 * 1000 : 3 * 1000 // 5分钟发生一次时空轮流，时空乱流持续30秒
    // )

    // return () => clearInterval(timer)
  }, [])
  return (
    <div className={staticBg ? 'CssBg-static' : 'CssBg'}>
      <div className="g-container">
        <div className="g-group">
          <div className="item item-right"></div>
          <div className="item item-left"></div>
          <div className="item item-top"></div>
          <div className="item item-bottom"></div>
          <div className="item item-middle"></div>
        </div>
        <div className="g-group">
          <div className="item item-right"></div>
          <div className="item item-left"></div>
          <div className="item item-top"></div>
          <div className="item item-bottom"></div>
          <div className="item item-middle"></div>
        </div>
      </div>
    </div>
  )
}
CssBg.displayName = 'CssBg'
export default CssBg
