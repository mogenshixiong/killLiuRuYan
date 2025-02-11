import { lazy, Suspense } from 'react'
// import { api_getConfig } from '@/api'
// import useUsersStore from '@/stores/users'
import CssBg from '@/components/CssBg/CssBg'
import CssBgCenterUser from '@/components/CssBgCenterUser/CssBgCenterUser'

function HomeView() {
  const FooterMenu = lazy(() => import('@/pages/index/components/FooterMenu/FooterMenu'))
  const FortreeModule = lazy(() => import('@/pages/index/views/HomeView/FortressModule/FortressModule'))
  const LogModule = lazy(() => import('@/pages/index/views/HomeView/LogModule/LogModule'))
  const Wiki = lazy(() => import('@/pages/index/views/HomeView/Wiki/Wiki'))
  const UserModule = lazy(() => import('@/pages/index/views/HomeView/UserModule/UserModule'))

  return (
    <>
      <CssBg />
      <CssBgCenterUser />

      <Suspense fallback={<div>加载中...</div>}>
        <div className="flex justify-between">
          <div>
            <UserModule />
            <FortreeModule />
          </div>

          <div>
            <LogModule />
            <Wiki />
          </div>
        </div>
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <FooterMenu />
      </Suspense>
    </>
  )
}

HomeView.displayName = 'HomeView'
export default HomeView
