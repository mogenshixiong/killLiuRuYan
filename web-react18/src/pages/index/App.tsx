import IndexRouter from '@/pages/index/router/indexRouter'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider theme={{}}>
      {/* bg-[#111722] */}
      <div className="min-w-full min-h-screen ">
        <IndexRouter />
      </div>
    </ConfigProvider>
  )
}

export default App
