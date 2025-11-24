import MainPage from '../../pages/main-page/main-page.tsx';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthStatus, CITIES} from '../../const.ts';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import { Offers } from '../../types/offer.ts';
import {loadOffers, loadReviews} from '../../store/action.ts';
import { useEffect, useMemo } from 'react';
import {useDispatch} from 'react-redux';
import { offers } from '../../mocks/offers.ts';
import { reviews } from '../../mocks/reviews.ts';


function App() {
  const dispatch = useDispatch();

  const getOffersList: Offers = useMemo(() => offers.map((offer) => {
    const city = CITIES.find((c) => c.name === offer.city.name);
    if (!city) {
      throw new Error(`Failed to get city for offer id: ${offer.id}`);
    }

    return { ...offer, city };
  }), []);


  useEffect(() => {
    dispatch(loadOffers(getOffersList));
    dispatch(loadReviews(reviews));
  }, [dispatch, getOffersList]);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthStatus.Auth}>
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage offers={offers} reviews={reviews}/>}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
