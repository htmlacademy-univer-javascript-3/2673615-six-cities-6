import { useEffect, useMemo } from 'react';
import FavoritePlaceCard from '../../components/favorite-place-card/favorite-place-card.tsx';
import Header from '../../components/header/header.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { getFavoriteOffers } from '../../store/data-process/selectors.ts';
import { OfferCards } from '../../types/offer.ts';
import { fetchFavoriteOffersAction } from '../../store/api-actions.ts';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty.tsx';
import Footer from '../../components/footer/footer.tsx';


function getGroupedFavorites(offers: OfferCards){
  const grouped = offers.reduce((map, offer) => {
    if (offer.isFavorite) {
      const city = offer.city.name;
      const cityOffers = map.get(city) || [];
      cityOffers.push(offer);
      map.set(city, cityOffers);
    }
    return map;
  }, new Map<string, OfferCards>());

  return Array.from(grouped);
}

function FavoritesPage() {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getFavoriteOffers);

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  const groupedFavorites = useMemo(() => getGroupedFavorites(offers), [offers]);

  return (
    <div className="page">
      <Header />

      {
        offers.length === 0
          ? <FavoritesEmpty/>
          :
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {groupedFavorites.map(([cityName, cityOffers]) => (
                    <li key={cityName} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{cityName}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {cityOffers.map((offer) => (
                          <FavoritePlaceCard
                            key={offer.id}
                            offer={offer}
                          />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </main>
      }

      <Footer/>
    </div>
  );
}

export default FavoritesPage;
