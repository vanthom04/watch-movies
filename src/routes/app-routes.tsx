import { Outlet, Route, Routes } from 'react-router-dom'
import config from '~/config'
import Layout from '~/layouts'
import HomePage from '~/pages/home'
import ListMoviePage from '~/pages/list-movie'
import MyFavoritesPage from '~/pages/my-favorites'
import SearchPage from '~/pages/search'
import WatchingPage from '~/pages/watching'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <Layout>
            <Outlet />
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
