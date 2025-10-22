import { Link } from 'react-router-dom';
import { OfferCard } from '../../types/offer';
import { AppRoute } from '../../const';
import PlaceCardInfo from '../place-card-info/place-card-info';

type PlaceCardProps = {
  offer: OfferCard;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}


function PlaceCard({offer, onMouseEnter, onMouseLeave}: PlaceCardProps): JSX.Element {
  const offerUrl = `${AppRoute.Offer}/${offer.id}`;

  return (
    <article className="cities__card place-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={offerUrl}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200"
            alt="Place image"
          />
        </Link>
      </div>

      <PlaceCardInfo
        price={offer.price}
        isFavorite={offer.isFavorite}
        rating={offer.rating}
        title={offer.title}
        url={offerUrl}
        placeType={offer.type}
      />
    </article>
  );
}

export default PlaceCard;
