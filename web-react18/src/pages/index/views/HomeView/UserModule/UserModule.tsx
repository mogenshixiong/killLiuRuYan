import useUsersStore from '@/stores/users'

/** 日志模块 */
const UserModule = () => {
  const user = useUsersStore((state) => state.user)
  return (
    <div className="border-2 border-white w-[300px] h-[556px]">
      <div className="border-4 w-full  border-black text-black bg-[#e2dfce] overflow-hidden ">
        <div className="w-full leading-[30px] text-[20px] h-[34px] text-center border-b-black  border-b-4 bg-[#1f2937] text-white">属性</div>
        <div className="h-[510px]">
          <div>姓名：{user.name}</div>
          <div className="mb-3">性别：{user.sex}</div>
          <div className="mb-3">灵石：{user.gold}</div>
          <div>等级：{user.level}</div>
          <div className="mb-3">经验值：{user.experience}</div>
          <div>境界：{user.level}</div>
          <div className="mb-3">肉身：{user.level}</div>
          <div>生命：{user.health}</div>
          <div>攻击：{user.attack}</div>
          <div>防御：{user.defense}</div>
        </div>
      </div>
    </div>
  )
}
UserModule.displayName = 'UserModule'
export default UserModule
