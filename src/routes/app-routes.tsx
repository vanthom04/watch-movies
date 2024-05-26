import { lazy, Suspense } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

import config from '~/config'
import Layout from '~/layouts'

const HomePage = lazy(() => import('~/pages/home'))
const SearchPage = lazy(() => import('~/pages/search'))
const WatchingPage = lazy(() => import('~/pages/watching'))
const ListMoviePage = lazy(() => import('~/pages/list-movie'))
const MyFavoritesPage = lazy(() => import('~/pages/my-favorites'))

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <Layout>
            <Suspense>
              <Outlet />
            </Suspense>
          </Layout>
        }
      >
        <Route path={config.routes.home} element={<HomePage />} />
        <Route path={config.routes.search} element={<SearchPage />} />
        <Route path={config.routes.list} element={<ListMoviePage />} />
        <Route path={config.routes.watch} element={<WatchingPage />} />
        <Route path={config.routes.myFavorites} element={<MyFavoritesPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
