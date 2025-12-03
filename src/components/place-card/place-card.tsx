import { Link } from 'react-router-dom';
import { OfferCard } from '../../types/offer';
import { AppRoute, PLACE_CARD_CONFIG_DATA } from '../../const';
import PlaceCardInfo from '../place-card-info/place-card-info';
import { PlaceCardLocation } from '../../types/place-card';

type PlaceCardProps = {
  offer: OfferCard;
  location: PlaceCardLocation;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
}


function PlaceCard({offer, location, onMouseEnter, onMouseLeave, isActive}: PlaceCardProps): JSX.Element {
  const offerUrl = `${AppRoute.Offer}/${offer.id}`;
  const className = PLACE_CARD_CONFIG_DATA[location];

  const handleMouseEnter = () => {
    onMouseEnter?.(offer.id);
  };

  const handleMouseLeave = () => {
    onMouseLeave?.();
  };

  return (
    <article className={`${className}__card place-card ${isActive ? 'place-card--active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={offerUrl}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
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
