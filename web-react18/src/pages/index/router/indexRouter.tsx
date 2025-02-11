import { Route, Routes } from 'react-router'
import HomeView from '@/pages/index/views/HomeView/HomeView'

const IndexRouter = () => {
  return (
    <Routes>
      <Route index element={<HomeView />} />
      <Route path="about" element={<HomeView />} />

      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route> */}

      {/* <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}
    </Routes>
  )
}

export default IndexRouter
