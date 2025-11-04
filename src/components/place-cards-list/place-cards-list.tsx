import { OfferCards } from '../../types/offer';
import { PlaceCardLocation } from '../../types/place-card';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
    offers: OfferCards;
    onCardHover: (offerId: string | null) => void;
    activeOfferId: string | null;
    location: PlaceCardLocation;
}


function PlaceCardsList({offers, onCardHover, activeOfferId, location}: PlacesListProps): JSX.Element{
  return(
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          location={location}
          onMouseEnter={() => onCardHover(offer.id)}
          onMouseLeave={() => onCardHover(null)}
          isActive={offer.id === activeOfferId}
        />
      ))}
    </div>
  );
}

export default PlaceCardsList;
