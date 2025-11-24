import Logo from '../../components/logo/logo.tsx';
import Map from '../../components/map/map.tsx';
import { useMemo, useState } from 'react';

import { City, Offer } from '../../types/offer.ts';
import { Point, Points } from '../../types/map.ts';
import PlaceCardsList from '../../components/place-cards-list/place-cards-list.tsx';
import { PlaceCardLocation } from '../../types/place-card.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { changeCity } from '../../store/action.ts';
import CitiesList from '../../components/cities-list/cities-list.tsx';


function MainPage() {
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);

  const offers = useMemo(
    () => allOffers.filter((offer) => offer.city === currentCity),
    [currentCity, allOffers]
  );

  const [activeOffer, setActiveOffer] = useState<Offer | undefined>(undefined);

  const points: Points = offers.map((offer) => ({
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  }));
  const selectedPoint: Point | null = activeOffer
    ? {
      title: activeOffer.title,
      lat: activeOffer.location.latitude,
      lng: activeOffer.location.longitude,
    }
    : null;


  const handleCardHover = (offerId: string | null) => {
    const currentOffer = offers.find((offer) => offer.id === offerId);
    setActiveOffer(currentOffer);
  };

  const handleCityChange = (newCity: City) => {
    dispatch(changeCity(newCity));
  };


  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList activeCity={currentCity} onCityChange={handleCityChange}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {currentCity.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <PlaceCardsList
                  offers={offers}
                  onCardHover={handleCardHover}
                  location={PlaceCardLocation.MainPage}
                  activeOfferId={activeOffer ? activeOffer.id : null}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={currentCity}
                  points={points}
                  selectedPoint={selectedPoint}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
