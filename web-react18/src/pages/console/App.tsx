import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
// import '@/styles/App.css'
import { api_getConfig } from '@/api'
import { useBearStore } from '@/stores/bear'
import { isDev } from '@/utils/utils'

function App() {
  const [count, setCount] = useState(10)
  const bears = useBearStore((state) => state.bears)
  const { increasePopulation } = useBearStore()

  const handleClick = async () => {
    setCount(count + 1)
    increasePopulation()
    if (isDev) {
      const [err, res] = await api_getConfig()
      console.log(err, res)
    }
  }
  return (
    <>
      <div className="flex justify-between">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="">Vite + React + console</h1>
      <h1 className="text-red-500">{bears}</h1>
      <div className="card">
        <button onClick={handleClick}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
