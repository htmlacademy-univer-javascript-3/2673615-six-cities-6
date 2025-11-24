import { CITIES } from '../../const';
import { City } from '../../types/offer';

type CitiesListProps = {
  activeCity: City;
  onCityChange: (city: City) => void;
};

function CitiesList({ activeCity, onCityChange }: CitiesListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li key={city.name} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  onCityChange(city);
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
