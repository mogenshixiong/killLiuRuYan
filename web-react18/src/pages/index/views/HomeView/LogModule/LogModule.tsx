import useLogStore from '@/stores/log'

/** 日志模块 */
const LogModule = () => {
  const { logList } = useLogStore()

  return (
    <div className="border-2 border-white">
      <div className="border-4 w-[400px]  border-black text-black bg-[#e2dfce] overflow-hidden ">
        <div className="w-full leading-[30px] text-[20px] h-[34px] text-center border-b-black  border-b-4 bg-[#1f2937] text-white">日志</div>
        <ul className="overflow-y-auto h-[510px]">
          {logList.map((log, index) => (
            <li key={index}>
              <strong className="text-[14px]">{log.time}</strong>
              <div className="mb-3">
                {log.type === 'fortree' && <span className="bg-[#fec955] rounded-md p-0.5">自动资源获取装置</span>}
                <span>{log.content}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
LogModule.displayName = 'LogModule'
export default LogModule
