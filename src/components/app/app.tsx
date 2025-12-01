import MainPage from '../../pages/main-page/main-page.tsx';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const.ts';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {loadReviews} from '../../store/actions.ts';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { reviews } from '../../mocks/reviews.ts';
import Loader from '../loader/loader.tsx';
import { useAppSelector } from '../../hooks/store.ts';
import HistoryRouter from '../history-router/history-router.tsx';
import browserHistory from '../../browser-history.ts';


function App() {
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  const authStatus = useAppSelector((state) => state.authStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadReviews(reviews));
  }, [dispatch]);

  if (isOffersLoading || authStatus === AuthStatus.Unknown) {
    return (
      <Loader />
    );
  }

  return (
    <HistoryRouter history={browserHistory} >
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage/>
            </PrivateRoute>
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
  );
}

export default App;
