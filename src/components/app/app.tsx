import MainPage from '../../pages/main-page/main-page.tsx';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from "../../const.ts";
import LoginPage from "../../pages/login-page/login-page.tsx";
import FavoritesPage from "../../pages/favorites-page/favorites-page.tsx";
import OfferPage from "../../pages/offer-page/offer-page.tsx";
import NotFoundPage from "../../pages/not-found-page/not-found-page.tsx";
import PrivateRoute from "../private-route/private-route.tsx";

type AppProps = {
  placesCount: number;
}

function App({placesCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage placesCount={placesCount}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offers}
          element={<OfferPage/>}
        />
        <Route
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
