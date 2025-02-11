import { Button, message, Popconfirm } from 'antd'
import { ArrowUpOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import useUsersStore from '@/stores/users'
import {
  // addFResource,
  addFResource2,
  computeAddWorkerNeedFood,
  computeFoodFullTime,
  computeFoodLevelUpNeedWood,
  computeMaxFood,
  computeMaxFoodWorker,
  computeMaxMetal,
  computeMaxMetalWorker,
  computeMaxWood,
  computeMaxWoodWorker,
  computeMetalFullTime,
  computeMetalLevelUpNeedWood,
  computeWoodFullTime,
  computeWoodLevelUpNeedWood
} from './utils'
import { useEffect, useRef, useState } from 'react'
import { getIconUrl } from '@/utils/utils'
// import { formatTime1, formatTime2 } from '@/utils/time'
import useLogStore from '@/stores/log'

/** 要塞 */
const FortressModule = () => {
  // const addResourceIntervalTime = 3000 // 一次结算周期（毫秒）
  const { addLog } = useLogStore()
  const user = useUsersStore((state) => state.user)
  const { updateUser } = useUsersStore()
  /** 当前空闲人口 */
  const idleWorker = user.f_worker - user.f_metal_worker - user.f_food_worker - user.f_wood_worker

  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<number | null>(null) // 使用 useRef 来存储定时器 ID

  // 离线结算
  useEffect(() => {
    addFResource2(user, updateUser, addLog)
    return () => {}
  }, [])

  const updateProgressBar = () => {
    intervalRef.current = window.setInterval(() => {
      if (progress >= 99) {
        const ok = addFResource2(user, updateUser, addLog)
        if (ok) {
          setProgress(0)
        } else {
          console.log('结算频率太快了，请稍后再试')
        }
      } else {
        setProgress(progress + 1)
      }
    }, user.f_addResourceIntervalTime / 100) // 3秒结算一次
  }
  // 在线结算
  useEffect(() => {
    updateProgressBar()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [progress])

  return (
    <>
      <div className="border-2 border-white w-[300px] h-[556px]">
        <div className="border-4 w-full border-black text-black bg-[#e2dfce] ">
          <div className="w-full leading-[30px] text-[20px] h-[34px] text-center border-b-black  border-b-4 bg-[#1f2937] relative">
            <div
              style={
                {
                  '--progress-weight': progress + '%'
                } as React.CSSProperties
              }
              className={`absolute top-0 left-0 w-[var(--progress-weight)] h-full bg-[#fec955] z-[100]`}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full z-[101] text-white">自动资源获取装置</div>
          </div>
          <div className="w-full">
            <div className="w-full h-[64px] [&_div]:height-[30px] [&_div]:leading-[30px] border-b-black border-b-4">
              <div>
                总人口: {user.f_worker}
                <span className="text-[14px] ml-1 float-right ">
                  <Popconfirm
                    title={`是否确认消耗【${computeAddWorkerNeedFood(user.f_worker)}食物】招募1个工人？`}
                    description=""
                    onConfirm={() => {
                      if (user.f_food >= computeAddWorkerNeedFood(user.f_worker)) {
                        updateUser({ f_worker: user.f_worker + 1, f_food: user.f_food - computeAddWorkerNeedFood(user.f_worker) })
                        addLog(`呦，又来一头牛马`, 'fortree')
                      } else {
                        message.error('食物储量不够')
                      }
                    }}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button
                      type="primary"
                      icon={<ArrowUpOutlined />}
                      size={'small'}
                      danger={false}
                      className={(user.f_food >= computeAddWorkerNeedFood(user.f_worker) ? 'bg-[green] hover:!bg-[green]' : 'bg-[#ff4d4f] hover:!bg-[#ff4d4f]') + ' gap-0'}
                    >
                      招募(
                      <img className="w-[20px] h-[20px] inline-block" src={getIconUrl('_1.f_food_icon.png')} alt="" />
                      {computeAddWorkerNeedFood(user.f_worker)})
                    </Button>
                  </Popconfirm>
                </span>
              </div>
              <div>闲置人口: {idleWorker}</div>
            </div>
            <div className="w-full h-[124px] [&_div]:height-[30px] [&_div]:leading-[30px]">
              <div>
                <img className="w-[20px] h-[20px] inline-block" src={getIconUrl('_1.f_food_icon.png')} alt="" />
                食物：{user.f_food_level}级
                <span className="text-[14px] ml-1 float-right">
                  <Popconfirm
                    title={`是否确认消耗【${computeFoodLevelUpNeedWood(user.f_food_level)}木材】升级食物等级？`}
                    description=""
                    onConfirm={() => {
                      if (user.f_wood >= computeFoodLevelUpNeedWood(user.f_food_level)) {
                        updateUser({ f_food_level: user.f_food_level + 1, f_wood: user.f_wood - computeFoodLevelUpNeedWood(user.f_food_level) })
                        addLog(`工欲善其事，必先利其器。用上等灵木，将【食物等级】提升至【${user.f_food_level + 1}级】`, 'fortree')
                      } else {
                        message.error('木材储量不够')
                      }
                    }}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button
                      type="primary"
                      icon={<ArrowUpOutlined />}
                      size={'small'}
                      className={(user.f_wood >= computeFoodLevelUpNeedWood(user.f_food_level) ? 'bg-[green] hover:!bg-[green]' : 'bg-[#ff4d4f] hover:!bg-[#ff4d4f]') + ' gap-0'}
                    >
                      升级( <img className="w-[20px] h-[20px] inline-block" src={getIconUrl('_2.f_wood_icon.png')} alt="" />
                      {computeFoodLevelUpNeedWood(user.f_food_level)})
                    </Button>
                  </Popconfirm>
                </span>
              </div>
              <div className="truncate" title={`储量：${user.f_food}/${computeMaxFood(user.f_food_level)}`}>
                储量：{user.f_food}/{computeMaxFood(user.f_food_level)}
              </div>
              <div>
                人口：
                <Button
                  onClick={() => {
                    if (user.f_food_worker >= 1) updateUser({ f_food_worker: user.f_food_worker - 1 })
                  }}
                  type="primary"
                  icon={<MinusOutlined />}
                  size={'small'}
                ></Button>
                <span className="text-[14px] mx-2 ">
                  {user.f_food_worker}/{computeMaxFoodWorker(user.f_food_level)}
                </span>
                <Button
                  onClick={() => {
                    if (idleWorker >= 1 && computeMaxFoodWorker(user.f_food_level) > user.f_food_worker) updateUser({ f_food_worker: user.f_food_worker + 1 })
                  }}
                  type="primary"
                  icon={<PlusOutlined />}
                  size={'small'}
                ></Button>
              </div>
              <div className="flex">
                <span> 产量：{user.f_food_worker - user.f_wood_worker * 2 - user.f_metal_worker * 4}</span>
                <span className="text-[14px] ml-1 text-right flex-1 truncate">{computeFoodFullTime(user, user.f_addResourceIntervalTime)}</span>
              </div>
            </div>
            <div className="bg-[#688da0] text-[14px] w-full h-[26px] leading-[22px] text-white border-b-black border-b-4">每投入1名工人增加1点食物产量</div>
            <div className="w-full h-[124px] [&_div]:height-[30px] [&_div]:leading-[30px]">
              <div>
                <img className="w-[20px] h-[20px] inline-block" src={getIconUrl('_2.f_wood_icon.png')} alt="" />
                木材：{user.f_wood_level}级
                <span className="text-[14px] ml-1 float-right">
                  <Popconfirm
                    title={`是否确认消耗【${computeWoodLevelUpNeedWood(user.f_wood_level)}木材】升级木材等级？`}
                    description=""
                    onConfirm={() => {
                      if (user.f_wood >= computeWoodLevelUpNeedWood(user.f_wood_level)) {
                        updateUser({ f_wood_level: user.f_wood_level + 1, f_wood: user.f_wood - computeWoodLevelUpNeedWood(user.f_wood_level) })
                        addLog(`工欲善其事，必先利其器。用上等灵木，将【木材等级】提升至【${user.f_metal_level + 1}级】`, 'fortree')
                      } else {
                        message.error('木材储量不够')
                      }
                    }}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button
                      type="primary"
                      icon={<ArrowUpOutlined />}
                      size={'small'}
                      className={(user.f_wood >= computeWoodLevelUpNeedWood(user.f_wood_level) ? 'bg-[green] hover:!bg-[green]' : 'bg-[#ff4d4f] hover:!bg-[#ff4d4f]') + ' gap-0'}
                    >
                      升级(
                      <img className="w-[20px] h-[20px] inline-block" src={getIconUrl('_2.f_wood_icon.png')} alt="" />
                      {computeWoodLevelUpNeedWood(user.f_wood_level)})
                    </Button>
                  </Popconfirm>
                </span>
              </div>
              <div className="truncate" title={`储量：${user.f_wood}/${computeMaxWood(user.f_wood_level)}`}>
                储量：{user.f_wood}/{computeMaxWood(user.f_wood_level)}
              </div>
              <div>
                人口：
                <Button
                  onClick={() => {
                    if (user.f_wood_worker >= 1) updateUser({ f_wood_worker: user.f_wood_worker - 1 })
                  }}
                  type="primary"
                  icon={<MinusOutlined />}
                  size={'small'}
                ></Button>
                <span className="text-[14px] mx-2 ">
                  {user.f_wood_worker}/{computeMaxWoodWorker(user.f_wood_level)}
                </span>
                <Button
                  onClick={() => {
                    if (idleWorker >= 1 && computeMaxWoodWorker(user.f_wood_level) > user.f_wood_worker) updateUser({ f_wood_worker: user.f_wood_worker + 1 })
                  }}
                  type="primary"
                  icon={<PlusOutlined />}
                  size={'small'}
                ></Button>
              </div>
              <div className="flex">
                <span> 产量：{user.f_wood_worker}</span>
                <span className="text-[14px] ml-1 text-right flex-1 truncate">{computeWoodFullTime(user, user.f_addResourceIntervalTime)}</span>
              </div>
            </div>
            <div className="bg-[#688da0] text-[14px] h-[26px] leading-[22px] text-white border-b-black border-b-4">每投入1名工人增加2点食物消耗</div>
            <div className="w-full h-[124px] [&_div]:height-[30px] [&_div]:leading-[30px]">
              <div>
                <img className="w-[20px] h-[20px] inline-block" src={getIconUrl('_3.f_metal_icon.png')} alt="" />
                陨铁：{user.f_metal_level}级
                <span className="text-[14px] ml-1 float-right">
                  <Popconfirm
                    title={`是否确认消耗【${computeMetalLevelUpNeedWood(user.f_metal_level)}木材】升级陨铁等级？`}
                    description=""
                    onConfirm={() => {
                      if (user.f_wood >= computeMetalLevelUpNeedWood(user.f_metal_level)) {
                        updateUser({ f_metal_level: user.f_metal_level + 1, f_wood: user.f_wood - computeMetalLevelUpNeedWood(user.f_metal_level) })
                        addLog(`工欲善其事，必先利其器。用上等灵木，将【陨铁等级】提升至【${user.f_metal_level + 1}级】`, 'fortree')
                      } else {
                        message.error('木材储量不够')
                      }
                    }}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button
                      type="primary"
                      icon={<ArrowUpOutlined />}
                      size={'small'}
                      className={(user.f_wood >= computeMetalLevelUpNeedWood(user.f_metal_level) ? 'bg-[green] hover:!bg-[green]' : 'bg-[#ff4d4f] hover:!bg-[#ff4d4f]') + ' gap-0'}
                    >
                      升级(
                      <img className="w-[20px] h-[20px] inline-block" src={getIconUrl('_2.f_wood_icon.png')} alt="" />
                      {computeMetalLevelUpNeedWood(user.f_metal_level)})
                    </Button>
                  </Popconfirm>
                </span>
              </div>
              <div className="truncate" title={`储量：${user.f_metal}/${computeMaxMetal(user.f_metal_level)}`}>
                储量：{user.f_metal}/{computeMaxMetal(user.f_metal_level)}
              </div>
              <div>
                人口：
                <Button
                  onClick={() => {
                    if (user.f_metal_worker >= 1) updateUser({ f_metal_worker: user.f_metal_worker - 1 })
                  }}
                  type="primary"
                  icon={<MinusOutlined />}
                  size={'small'}
                ></Button>
                <span className="text-[14px] mx-2 ">
                  {user.f_metal_worker}/{computeMaxMetalWorker(user.f_metal_level)}
                </span>
                <Button
                  onClick={() => {
                    if (idleWorker >= 1 && computeMaxMetalWorker(user.f_metal_level) > user.f_metal_worker) updateUser({ f_metal_worker: user.f_metal_worker + 1 })
                  }}
                  type="primary"
                  icon={<PlusOutlined />}
                  size={'small'}
                ></Button>
              </div>
              <div className="flex">
                <span> 产量：{user.f_metal_worker}</span>
                <span className="text-[14px] ml-1 text-right flex-1 truncate">{computeMetalFullTime(user, user.f_addResourceIntervalTime)}</span>
              </div>
            </div>
            <div className="bg-[#688da0] text-[14px] h-[22px] leading-[22px] text-white">每投入1名工人增加4点食物消耗</div>
          </div>
        </div>
      </div>
    </>
  )
}

FortressModule.displayName = 'FortressModule'
export default FortressModule
