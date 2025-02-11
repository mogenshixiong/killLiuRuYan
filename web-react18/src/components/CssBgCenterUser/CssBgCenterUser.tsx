import '@/styles/CssBg.css'
import { bus } from '@/utils/utils'
import { useEffect, useRef, useState } from 'react'

// 获取随机位置函数
function getRandomPosition(currentX: number, currentY: number, containerWidth: number, containerHeight: number, elementWidth: number, elementHeight: number, maxMoveDistance: number) {
  // 计算容器宽度和高度减去元素宽度和高度，得到元素可以移动的最大范围
  const maxX = containerWidth - elementWidth
  const maxY = containerHeight - elementHeight

  // 生成随机的偏移量
  let newX = currentX + (Math.random() - 0.5) * maxMoveDistance
  let newY = currentY + (Math.random() - 0.5) * maxMoveDistance

  // 确保新的位置不会超出容器范围
  newX = Math.max(0, Math.min(newX, maxX))
  newY = Math.max(0, Math.min(newY, maxY))

  // 返回新的位置
  return { x: newX, y: newY }
}
function r(minAngle = -30, maxAngle = 30) {
  return Math.random() * (maxAngle - minAngle) + minAngle
}

/** 游戏中心小人 */
const CssBgCenterUser = () => {
  const [staticBg] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const movingElementRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let moveSwitch = true
    const handleBgChange = (v: any) => (moveSwitch = !v)
    bus.on('bgChange', handleBgChange)

    const container = containerRef.current
    const movingElement = movingElementRef.current
    if (container && movingElement) {
      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight
      const elementWidth = movingElement.offsetWidth
      const elementHeight = movingElement.offsetHeight
      let x = 0
      let y = 0
      const maxMoveDistance = 200 // 定义每次移动的最大距离

      const moveElement = () => {
        if (!moveSwitch) {
          movingElement.style.transform = `` // 风暴消失后归位
          clearInterval(intervalId) // 不再开启风暴了
        } else {
          const { x: newX, y: newY } = getRandomPosition(x, y, containerWidth, containerHeight, elementWidth, elementHeight, maxMoveDistance)
          movingElement.style.transform = `translate(${newX}px, ${newY}px) rotateX(${r(-360, 360)}deg) rotateY(${r(-360, 360)}deg) skew(${r(-360, 360)}deg, ${r(-360, 360)}deg) scale(${r(0.5, 2)}, ${r(0.5, 1)})`
          x = newX // 更新当前位置
          y = newY
        }
      }
      const intervalId = setInterval(moveElement, 500)
      moveElement()

      return () => {
        bus.off('bgChange', handleBgChange)
        clearInterval(intervalId)
      }
    }
  })
  return (
    <div className={`${staticBg ? '1' : '2'} z-[-99] h-screen w-full overflow-hidden flex justify-center items-center fixed `}>
      <div ref={containerRef} className="w-[400px] h-[400px] relative">
        <img ref={movingElementRef} src={'/img/_4.user.png'} className="w-[100px] h-auto absolute transition-transform duration-500 ease-in-out transform translate-x-[150px] translate-y-[146.5px]" />
      </div>
    </div>
  )
}
CssBgCenterUser.displayName = 'CssBgCenterUser'
export default CssBgCenterUser
