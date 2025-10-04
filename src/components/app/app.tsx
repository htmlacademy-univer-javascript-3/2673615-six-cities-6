import MainPage from '../../pages/main-page/main-page.tsx';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from "../../const.ts";
import LoginPage from "../../pages/login-page/login-page.tsx";
import FavoritesPage from "../../pages/favorites-page/favorites-page.tsx";
import OfferPage from "../../pages/offer-page/offer-page.tsx";
import NotFoundPage from "../../pages/not-found-page/not-found-page.tsx";

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
          element={<FavoritesPage/>}
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
