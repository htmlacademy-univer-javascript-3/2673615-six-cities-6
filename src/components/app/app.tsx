import MainPage from '../../pages/main-page/main-page.tsx';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const.ts';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import RouteGuard from '../route-guard/route-guard.tsx';
import Loader from '../loader/loader.tsx';
import { useAppSelector } from '../../hooks/store.ts';
import HistoryRouter from '../history-router/history-router.tsx';
import browserHistory from '../../browser-history.ts';
import { ToastContainer } from 'react-toastify';
import { getIsOffersLoading } from '../../store/data-process/selectors.ts';
import { getAuthStatus } from '../../store/user-process/selectors.ts';


function App() {
  const isOffersLoading = useAppSelector(getIsOffersLoading);
  const authStatus = useAppSelector(getAuthStatus);

  if (isOffersLoading || authStatus === AuthStatus.Unknown) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <ToastContainer/>
      <HistoryRouter history={browserHistory} >
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage/>}
          />
          <Route
            path={AppRoute.Login}
            element={
              <RouteGuard isPrivateRoute={false}>
                <LoginPage/>
              </RouteGuard>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <RouteGuard isPrivateRoute>
                <FavoritesPage/>
              </RouteGuard>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage/>}
          />
          <Route
            path={AppRoute.NotFound}
            element={<NotFoundPage/>}
          />
        </Routes>
      </HistoryRouter>
    </>
  );
}

export default App;
