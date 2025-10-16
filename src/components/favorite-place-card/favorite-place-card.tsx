import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { OfferCard } from '../../types/offer';
import PlaceCardInfo from '../place-card-info/place-card-info';


type FavoritePlaceCardProps = {
    offer: OfferCard;
}

function FavoritePlaceCard({offer} : FavoritePlaceCardProps){
  const offerUrl = `${AppRoute.Offer}/${offer.id}`;

  return (
    <article className="favorites__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={offerUrl}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110"alt="Place image"/>
        </Link>
      </div>
      <div className="favorites__card-info">
        <PlaceCardInfo
          price={offer.price}
          isFavorite
          rating={offer.rating}
          title={offer.title}
          url={offerUrl}
          placeType={offer.type}
        />
      </div>
    </article>

  );
}

export default FavoritePlaceCard;
