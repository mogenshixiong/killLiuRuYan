import { Button } from 'antd'

/** 日志模块 */
const Wiki = () => {
  return (
    <div className="border-2 border-white">
      <div className="border-4 w-[400px]  border-black text-black bg-[#e2dfce] overflow-hidden ">
        <div className="w-full leading-[30px] text-[20px] h-[34px] text-center border-b-black  border-b-4 bg-[#1f2937] text-white">全自动修炼装置1.0使用说明书</div>
        <div className="overflow-y-auto h-[510px]">
          <div className="text-[red] text-[18px] text-center font-bold">《杀死柳如烟》</div>
          <div className="mb-4 text-[red]">
            曾经的你凭借强大的修炼天赋，已经站在了世界的巅峰。但是与你青梅竹马的女朋友柳如烟背叛了你，她与你的好兄弟赵无极一起设计陷害与你，夺走了你的一切，你被迫逃亡，躲藏至一处空间裂缝，发现一个神秘的全自动修炼装置，借助这个装置你将重新变的强大起来，然后踏上复仇之路，与你的仇人展开一场生死对决。
          </div>
          <div>自动资源获取装置：</div>
          <div className="mb-4">消耗食物招募工人，工人可投入食物、木材、陨铁的生产。木材可以提升食物、木材、陨铁的等级。建议优先升级食物和木材。等级提升到一定阶段之后再升级陨铁。陨铁可以用来建设聚能阵。</div>

          <div>北孚聚灵池：</div>
          <div className="mb-4">消耗陨铁，提升自动聚灵池等级，聚灵池可以从宇宙空间中提取能量并转换为灵力保存。消耗灵力可以提升技能等级。</div>

          <div>技能大全：</div>
          <div className="mb-4">消耗灵力，可以提升技能等级。</div>

          <div>万能合成机：</div>
          <div className="mb-4">1+1=2，投入多个相同的物品，可以对物品进行强化</div>

          <div>广义相对论无限背包：</div>
          <div className="mb-4">可通过万能合成机强化背包</div>

          <div>自动钓鱼机器人：</div>
          <div className="mb-4">自动钓鱼，可从空间裂缝中随机钓起物品，产出炼丹和锻造材料。</div>

          <div>自动炼丹炉：</div>
          <div className="mb-4">投入材料，可自动炼丹。</div>

          <div>自动锻造机：</div>
          <div className="mb-4">投入材料，可自动锻造装备。</div>

          <div>无人售货机：</div>
          <div className="mb-4">出售装备、丹药、技能书，食物、木材、陨铁等。</div>

          <div>赌坊：</div>
          <div className="mb-4">搏一搏，单车变摩托。</div>

          <div>坐骑/宠物：</div>
          <div className="mb-4"></div>

          <div>丽春院：</div>
          <div className="mb-4">该赚赚，该花花。通过双修快速提升。</div>

          <div>耻辱柱：</div>
          <div className="mb-4">回顾历史，勿忘吾耻。每日打开一次，可获得奖励。</div>

          <Button type="primary" className="mr-2">
            售后服务
          </Button>
        </div>
      </div>
    </div>
  )
}
Wiki.displayName = 'Wiki'
export default Wiki
