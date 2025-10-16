import { useState } from 'react';
import { OfferCards } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
    offers: OfferCards;
}


function PlaceCardsList({offers}: PlacesListProps){
  const [, setActiveOfferId] = useState<string | null>(null);

  return(
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        />
      ))}
    </div>
  );
}

export default PlaceCardsList;
