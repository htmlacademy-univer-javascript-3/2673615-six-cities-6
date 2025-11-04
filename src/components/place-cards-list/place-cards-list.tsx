import { OfferCards } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
    offers: OfferCards;
    onCardHover: (offerId: string | null) => void;
    activeOfferId: string | null;
}


function PlaceCardsList({offers, onCardHover, activeOfferId}: PlacesListProps): JSX.Element{
  return(
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onCardHover(offer.id)}
          onMouseLeave={() => onCardHover(null)}
          isActive={offer.id === activeOfferId}
        />
      ))}
    </div>
  );
}

export default PlaceCardsList;
