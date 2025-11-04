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
    <>
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
    </>
  );
}

export default PlaceCardsList;
